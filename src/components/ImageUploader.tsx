import { useState } from "react";
import { uploadImage } from "../services/uploadService";

interface Props {
  onUpload: (url: string) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  function handleFile(f: File) {
    setPreview(URL.createObjectURL(f));
    setFile(f);
    setUploadedUrl(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImage(file);
      setUploadedUrl(url);
      onUpload(url);
    } catch {
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        className={`
          relative flex flex-col items-center justify-center
          w-full h-52 rounded-2xl border-2 border-dashed cursor-pointer
          transition-all duration-200
          ${isDragging
            ? "border-white/40 bg-white/10"
            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
          }
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

        {preview ? (
          <img src={preview} className="h-full w-full object-contain rounded-2xl p-2" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white text-lg">
              ↑
            </div>
            <p className="text-sm font-medium text-white/60">
              Drop image here or <span className="text-white">browse</span>
            </p>
            <p className="text-xs text-white/30">PNG, JPG up to 10MB</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
            <p className="text-sm font-medium text-white/70">Uploading...</p>
          </div>
        )}
      </label>

      {file && !uploadedUrl && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-40"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      )}

      {uploadedUrl && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
          <span className="text-green-400 text-sm">✓</span>
          <p className="text-xs text-white/50 truncate">{uploadedUrl}</p>
        </div>
      )}
    </div>
  );
}