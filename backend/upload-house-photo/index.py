import json
import os
import base64
import uuid
import boto3


def handler(event: dict, context) -> dict:
    """
    Загружает фото реального дома (от ГИПа) в S3.
    Принимает base64-строку, возвращает публичный URL.
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

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
        b64 = body.get('image', '')
        ext = (body.get('ext') or 'jpg').lower()
        project_id = body.get('projectId', 'default')

        if ',' in b64:
            b64 = b64.split(',', 1)[1]

        if not b64:
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Нет изображения'}),
            }

        if ext not in ('jpg', 'jpeg', 'png', 'webp'):
            ext = 'jpg'

        binary = base64.b64decode(b64)
        if len(binary) > 8 * 1024 * 1024:
            return {
                'statusCode': 413,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Файл больше 8 МБ'}),
            }

        access_key = os.environ['AWS_ACCESS_KEY_ID']
        secret_key = os.environ['AWS_SECRET_ACCESS_KEY']

        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
        )

        key = f"house-photos/{project_id}/{uuid.uuid4().hex}.{ext}"
        content_type = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'webp': 'image/webp',
        }[ext]

        s3.put_object(
            Bucket='files',
            Key=key,
            Body=binary,
            ContentType=content_type,
        )

        url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'url': url, 'key': key}),
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
        }
