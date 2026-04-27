import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../../../../backend/func2url.json";

interface Props {
  title: string;
  photoUrl?: string;
  uploadedAt?: string;
  canUpload: boolean;
  onSave: (next: { photoUrl: string; uploadedAt: string }) => void;
}

export default function HousePhotoWidget({
  title,
  photoUrl,
  uploadedAt,
  canUpload,
  onSave,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const handlePick = () => inputRef.current?.click();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setError("Файл больше 8 МБ");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const b64 = await fileToBase64(file);
      const ext =
        (file.name.split(".").pop() || "jpg").toLowerCase().replace("jpeg", "jpg");
      const res = await fetch(func2url["upload-house-photo"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: b64, ext, projectId: "default" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка загрузки");
      onSave({
        photoUrl: data.url,
        uploadedAt: new Date().toISOString(),
      });
      setPreviewLoaded(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const niceDate = uploadedAt
    ? new Date(uploadedAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-sam-blue-soft">
            <Icon name="Camera" size={14} flat className="text-sam-blue" />
          </div>
          <div className="font-inter font-bold text-sam-text text-xs uppercase tracking-wider truncate">
            {title}
          </div>
        </div>
        {canUpload && photoUrl && (
          <button
            onClick={handlePick}
            disabled={busy}
            className="text-sam-blue text-[11px] font-semibold hover:underline disabled:opacity-50"
          >
            Заменить
          </button>
        )}
      </div>

      <div className="flex-1 relative rounded-xl overflow-hidden bg-sam-bg border border-sam-border min-h-0">
        {photoUrl ? (
          <>
            {!previewLoaded && (
              <div className="absolute inset-0 flex items-center justify-center text-sam-text-soft text-xs">
                Загрузка фото…
              </div>
            )}
            <img
              src={photoUrl}
              alt="Фото дома"
              className="w-full h-full object-cover"
              onLoad={() => setPreviewLoaded(true)}
            />
            {niceDate && (
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-sam-text text-[10px] font-semibold">
                Обновлено: {niceDate}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
            <div className="w-14 h-14 rounded-full bg-sam-blue-soft flex items-center justify-center">
              <Icon name="ImagePlus" size={26} flat className="text-sam-blue" />
            </div>
            <div className="text-sam-text text-sm font-semibold">
              Фото дома пока не загружено
            </div>
            <div className="text-sam-text-soft text-[11px]">
              {canUpload
                ? "Загрузите свежее фото со стройки"
                : "Руководитель проекта пришлёт фото"}
            </div>
            {canUpload && (
              <button
                onClick={handlePick}
                disabled={busy}
                className="mt-2 px-4 py-2 rounded-full bg-sam-blue text-white text-xs font-semibold hover:bg-sam-blue-dark disabled:opacity-60 flex items-center gap-1.5"
              >
                <Icon name="Upload" size={12} flat />
                {busy ? "Загрузка…" : "Загрузить фото"}
              </button>
            )}
          </div>
        )}

        {busy && photoUrl && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-sam-blue text-xs font-semibold">
              Загружаем новое фото…
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-[11px] shrink-0">{error}</div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
