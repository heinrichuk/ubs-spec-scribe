import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import { Upload, File, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isUploading?: boolean;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  label?: string;
  description?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  isUploading = false,
  acceptedFileTypes = 'application/pdf',
  maxSizeMB = 10,
  label = 'Upload File',
  description = 'Drag and drop or click to upload'
}) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const processFile = (file: File) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `The file exceeds the maximum size of ${maxSizeMB}MB.`,
        variant: "destructive",
      });
      return;
    }
    
    // Check file type if acceptedFileTypes is provided
    if (acceptedFileTypes && !isFileTypeAccepted(file, acceptedFileTypes)) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file with one of these formats: ${acceptedFileTypes}`,
        variant: "destructive",
      });
      return;
    }
    
    onFileSelected(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };
  
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  const isFileTypeAccepted = (file: File, acceptedTypes: string): boolean => {
    const fileTypeArray = acceptedTypes.split(',').map(type => type.trim());
    
    // Check MIME type
    if (fileTypeArray.includes(file.type)) {
      return true;
    }
    
    // Check file extension
    const fileName = file.name;
    const extension = `.${fileName.split('.').pop()}`.toLowerCase();
    
    return fileTypeArray.some(type => {
      if (type.startsWith('.')) {
        return extension === type.toLowerCase();
      }
      return false;
    });
  };
  
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-ubs-lightGray/50 transition-colors",
        isDragging ? "border-ubs-accent bg-ubs-lightGray/70" : "border-ubs-gray/30",
        isUploading ? "opacity-70 cursor-not-allowed" : ""
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={isUploading ? undefined : handleClick}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
        disabled={isUploading}
      />
      
      <div className="flex flex-col items-center justify-center">
        {isUploading ? (
          <Loader2 className="h-10 w-10 text-ubs-darkBlue animate-spin mb-3" />
        ) : (
          <div className="bg-ubs-lightGray w-12 h-12 rounded-full flex items-center justify-center text-ubs-darkBlue mb-3">
            <Upload size={24} />
          </div>
        )}
        
        <p className="text-lg font-medium mb-1">{isUploading ? 'Uploading...' : label}</p>
        <p className="text-sm text-ubs-gray mb-2">{description}</p>
        <p className="text-xs text-ubs-gray">
          Max size: {maxSizeMB}MB
        </p>
      </div>
    </div>
  );
};
