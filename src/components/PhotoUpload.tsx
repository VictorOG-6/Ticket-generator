import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { useFormStore } from "@/store/form-store";
import { LoaderCircle } from "lucide-react";

const PhotoUpload = () => {
  const { formData, setFormData, errors } = useFormStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    useFormStore.getState().formData.photoUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (formData.photoUrl) {
      setPreviewUrl(formData.photoUrl);
    }
  }, [formData.photoUrl]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Upload failed");
      return await response.json();
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setIsUploading(true);
    try {
      // Show local preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const { secure_url } = await uploadToCloudinary(file);
      setFormData({ photoUrl: secure_url });
    } catch (error) {
      console.error("Upload failed:", error);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const hasError = !!errors.photoUrl;

  return (
    <>
      <div
        className="relative w-full cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && handleFileSelect(e.target.files[0])
          }
        />

        <div className="py-5">
          <span className="block h-[200px] w-full bg-[#00000033]" />
        </div>

        <div
          className={`group absolute top-0 left-[50%] flex h-full w-[251px] translate-x-[-50%] flex-col items-center justify-center overflow-hidden rounded-4xl border-4 bg-[#0E464F] p-6 transition-all duration-300 ${
            isUploading
              ? "cursor-wait border-[#249fb577] opacity-50"
              : `cursor-pointer ${
                  isDragging
                    ? "border-[#24A0B5] bg-[#24a0b520]"
                    : hasError
                      ? "border-red-500"
                      : "border-[#249fb554] hover:border-[#24A0B5]"
                }`
          }`}
          style={{
            backgroundImage: previewUrl ? `url('${previewUrl}')` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`transition-opacity duration-300 ${
              previewUrl && !isDragging
                ? "opacity-0 group-hover:opacity-100"
                : "opacity-100"
            }`}
          >
            <div className="relative z-1 flex flex-col items-center justify-center">
              {isUploading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Icon icon="cloud" size={32} />
                  <p className="mt-4 text-center">
                    {isDragging
                      ? "Drop image to upload"
                      : "Drag & drop or click to upload"}
                  </p>
                </>
              )}
            </div>
            {previewUrl && (
              <span className="absolute top-0 left-0 h-full w-full bg-black opacity-30" />
            )}
          </div>
        </div>
      </div>
      {hasError && (
        <p className="mx-auto mt-2 w-max !text-xs !text-red-500">
          {errors.photoUrl[0]}
        </p>
      )}
    </>
  );
};

export default PhotoUpload;
