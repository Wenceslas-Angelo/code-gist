// src/components/CodeGist.tsx
import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-dark.css";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import FolderUploader from "./FolderUploader";

interface FileData {
  path: string;
  content: string;
  language: string;
}

const CodeGist: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    Prism.highlightAll();
  }, [files]);

  const copyAllFiles = async () => {
    const allContent = files
      .map(file => `// ${file.path}\n${file.content}`)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(allContent);
      alert("✅ Tous les fichiers copiés !");
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
      alert("❌ Erreur lors de la copie");
    }
  };

  const FileCard: React.FC<{ file: FileData }> = ({ file }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
        <h3 className="text-sm font-medium text-gray-200 font-mono">{file.path}</h3>
      </div>
      <div className="overflow-x-auto">
        <pre className="!bg-transparent !m-0 p-4">
          <code className={`language-${file.language} text-sm`}>
            {file.content}
          </code>
        </pre>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <FolderUploader onFilesLoaded={setFiles} />

      {files.length > 0 && (
        <>
          <button
            onClick={copyAllFiles}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-medium inline-flex items-center gap-2"
          >
            📋 Copier tout
          </button>

          <div className="space-y-4">
            {files.map((file, index) => (
              <FileCard key={index} file={file} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CodeGist;

