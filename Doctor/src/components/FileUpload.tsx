import React from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    value?: File | null;
    onChange?: (file: File | null) => void;
    onBlur?: () => void;
    name?: string;
    disabled?: boolean;
    accept?: string;
    maxSize?: number;
    minSize?: number;
    label?: string;
    className?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    (
        {
            value,
            onChange,
            onBlur,
            name,
            disabled = false,
            accept = "image/*",
            maxSize = 5 * 1024 * 1024, // 5MB default
            minSize = 10 * 1024, // 10KB default
            label = "Upload a file",
        },
        ref
    ) => {
        const fileInputRef = React.useRef<HTMLInputElement>(null);
        const [isDragging, setIsDragging] = React.useState(false);

        React.useImperativeHandle(ref, () => fileInputRef.current!);

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) {
                setIsDragging(true);
            }
        };

        const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        };

        const formatFileSize = (bytes: number) => {
            if (bytes < 1024) return bytes + " B";
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
            return (bytes / (1024 * 1024)).toFixed(2) + " MB";
        };

        const selectedFile = value as File | null;
        const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

        React.useEffect(() => {
            return () => {
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                }
            };
        }, [previewUrl]);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];

                if (maxSize && file.size > maxSize) {
                    return;
                }

                if (minSize && file.size < minSize) {
                    return;
                }

                onChange?.(file);
            }
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (disabled) return;

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];

                if (maxSize && file.size > maxSize) {
                    return;
                }

                if (minSize && file.size < minSize) {
                    return;
                }

                onChange?.(file);
            }
        };

        const handleClick = () => {
            if (!disabled) {
                fileInputRef.current?.click();
            }
        };

        const clearFile = (e: React.MouseEvent) => {
            e.stopPropagation();
            onChange?.(null);
        };

        return (
            <div className="w-full">
                <div
                    className={cn(
                        "relative rounded-lg border-2 border-dashed transition-colors",
                        isDragging && "border-primary bg-primary/5",
                        !disabled && "cursor-pointer hover:border-primary/50",
                        disabled && "opacity-50 cursor-not-allowed",
                        "border-border",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        onBlur={onBlur}
                        accept={accept}
                        name={name}
                        disabled={disabled}
                    />

                    {previewUrl ? (
                        <div className="relative p-4">
                            <Image
                                src={previewUrl}
                                width={200}
                                height={200}
                                alt="Selected file preview"
                                className="w-full h-auto max-h-[400px] object-contain rounded-md"
                            />
                            {!disabled && (
                                <button
                                    className="absolute top-6 right-6 bg-background/80 hover:bg-background p-2 rounded-full transition-all shadow-sm"
                                    onClick={clearFile}
                                    type="button"
                                >
                                    <X className="w-4 h-4 text-destructive" />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Upload className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <h3 className="text-sm font-medium text-foreground mb-1">
                                {label}
                            </h3>
                            <p className="text-xs text-muted-foreground text-center">
                                Drag and drop or click to upload
                            </p>
                            <p className="text-xs text-muted-foreground text-center mt-2">
                                Accepts {accept} between {formatFileSize(minSize)} and {formatFileSize(maxSize)}.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;