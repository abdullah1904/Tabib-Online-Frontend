import React from "react";
import { Input } from "@heroui/react";
import { Controller, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form";
import { Upload, X } from "lucide-react";
import Image from "next/image";

// Update the component props interface
interface FileUploadProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    name: TName;
    control: Control<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    errorMessage?: string;
    accept?: string;
    maxSize?: number;
    onChange?: (file: File | null) => void;
}

// Update the component definition to use the props
const FileUpload = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    label,
    errorMessage,
    accept = "image/svg+xml,image/png,image/jpeg,image/gif",
    maxSize,
    onChange,
}: FileUploadProps<TFieldValues, TName>) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange: fieldOnChange, value }, fieldState: { error } }) => {
                const selectedFile = value as File | null;
                const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

                const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];

                        // Check file size if maxSize is provided
                        if (maxSize && file.size > maxSize) {
                            // You can handle size error here
                            return;
                        }

                        // Update the form field value
                        fieldOnChange(file);

                        // Call custom onChange if provided
                        if (onChange) {
                            onChange(file);
                        }
                    }
                };

                const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];

                        // Check file size if maxSize is provided
                        if (maxSize && file.size > maxSize) {
                            // You can handle size error here
                            return;
                        }

                        // Update the form field value
                        fieldOnChange(file);

                        // Call custom onChange if provided
                        if (onChange) {
                            onChange(file);
                        }
                    }
                };

                const handleClick = () => {
                    fileInputRef.current?.click();
                };

                const clearFile = () => {
                    fieldOnChange(null);
                    if (onChange) {
                        onChange(null);
                    }
                };

                return (
                    <div className="w-full">
                        <div
                            className={`w-full border ${error ? 'border-danger' : 'border-primary'} rounded-lg overflow-hidden`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Input
                                type="file"
                                className="hidden"
                                label={label}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept={accept}
                                classNames={{
                                    base: "w-full",
                                    input: "text-base",
                                    label: "text-sm font-medium",
                                    errorMessage: "text-xs"
                                }}
                            />

                            {previewUrl ? (
                                <div className="relative">
                                    <Image
                                        src={previewUrl}
                                        width={200}
                                        height={200}
                                        alt="Selected file preview"
                                        className="w-full h-auto max-h-[400px] object-contain"
                                    />
                                    <button
                                        className="absolute top-4 right-4 text-white p-2 rounded-full transition-all"
                                        onClick={clearFile}
                                        type="button"
                                    >
                                        <X className="w-5 h-5 text-danger cursor-pointer" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center py-16 px-4 cursor-pointer"
                                    onClick={handleClick}
                                >
                                    <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-4">
                                        <Upload
                                            className={`w-6 h-6 ${error ? 'text-danger' : 'text-primary'}`}
                                        />
                                    </div>
                                    <p className={`${error ? 'text-danger' : 'text-primary'} text-center font-medium`}>
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-primary text-sm text-center mt-2">
                                        SVG, PNG, JPG or GIF {maxSize ? `(max ${Math.round(maxSize / (1024 * 1024))}MB)` : '(max 800x400)'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {(error || errorMessage) && (
                            <p className="mt-1 text-xs text-danger">
                                {errorMessage || error?.message}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default FileUpload;