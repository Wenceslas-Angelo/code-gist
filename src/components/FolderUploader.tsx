// src/components/FolderUploader.tsx
import React from "react";

interface FileData {
  path: string;
  content: string;
  language: string;
}

const FolderUploader: React.FC<{ onFilesLoaded: (files: FileData[]) => void }> = ({ onFilesLoaded }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: FileData[] = [];

    for (const file of Array.from(e.target.files)) {
      const text = await file.text();
      const ext = file.name.split(".").pop() || "txt";

      files.push({
        path: file.webkitRelativePath || file.name,
        content: text,
        language: ["ts", "tsx"].includes(ext) ? "typescript" : ext,
      });
    }

    onFilesLoaded(files);
  };

  return (
    <label className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-medium inline-flex items-center gap-2 cursor-pointer">
      📂 Choisir un dossier
      <input
        type="file"
        webkitdirectory="true"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </label>
  );
};

export default FolderUploader;

