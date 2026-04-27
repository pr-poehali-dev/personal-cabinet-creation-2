import json
import urllib.parse
import urllib.request
import base64
import os
import uuid
import boto3


STYLE_PRESETS = {
    'modern': 'modern minimalist private house facade, white plaster walls, large panoramic windows, flat roof, contemporary architecture, soft daylight, photorealistic',
    'classic': 'classic european private house, beige stucco facade, pitched tiled roof, wooden window frames, decorative cornices, sunny day, photorealistic',
    'scandi': 'scandinavian style private house, dark wood facade with white trim, pitched metal roof, large vertical windows, snowy yard, photorealistic',
    'loft': 'industrial loft style private house, exposed dark brick facade, black metal frames, large factory-style windows, urban look, photorealistic',
    'wood': 'wooden country house, natural log walls, pitched shingle roof, cozy porch, surrounded by pine trees, sunset light, photorealistic',
    'highend': 'luxury premium villa, natural stone and concrete facade, panoramic glass walls, flat terrace roof, swimming pool in front, photorealistic',
}


def handler(event: dict, context) -> dict:
    """
    Генерирует стиль отделки дома через бесплатный сервис Pollinations (FLUX).
    Параметры: style (модель пресета), prompt (доп. описание).
    Возвращает url с CDN, картинка перезаливается в наш S3.
    """
    method = event.get('httpMethod', 'POST')
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
        'Access-Control-Max-Age': '86400',
    }
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
        style_key = body.get('style') or 'modern'
        extra = (body.get('prompt') or '').strip()
        seed = int(body.get('seed') or uuid.uuid4().int % 1_000_000)

        base_prompt = STYLE_PRESETS.get(style_key, STYLE_PRESETS['modern'])
        full_prompt = f"{base_prompt}, {extra}" if extra else base_prompt

        url = (
            "https://image.pollinations.ai/prompt/"
            + urllib.parse.quote(full_prompt)
            + f"?width=1024&height=768&seed={seed}&nologo=true&model=flux"
        )

        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=80) as resp:
            data = resp.read()

        if not data:
            return {
                'statusCode': 502,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Пустой ответ от генератора'}),
            }

        access_key = os.environ['AWS_ACCESS_KEY_ID']
        secret_key = os.environ['AWS_SECRET_ACCESS_KEY']
        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
        )
        key = f"ai-styles/{style_key}-{seed}-{uuid.uuid4().hex[:8]}.jpg"
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=data,
            ContentType='image/jpeg',
        )
        cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'url': cdn_url,
                'style': style_key,
                'seed': seed,
                'prompt': full_prompt,
            }),
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
        }
