import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { storage } from "./firebase/config";

function App() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Load all files from Firebase Storage on mount
  const loadFiles = async () => {
    try {
      const storageRef = ref(storage, "uploads/");
      const result = await listAll(storageRef);
      const fileData = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            url,
            ref: itemRef,
          };
        })
      );
      setFiles(fileData);
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload file to Firebase Storage
  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `uploads/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        alert("Upload failed: " + error.message);
        setUploading(false);
      },
      async () => {
        // Upload completed
        await loadFiles();
        setUploading(false);
        setUploadProgress(0);
        setSelectedFile(null);
        // Reset file input
        document.getElementById("file-input").value = "";
      }
    );
  };

  // Delete file from Firebase Storage
  const handleDelete = async (fileRef) => {
    try {
      await deleteObject(fileRef);
      await loadFiles();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed: " + error.message);
    }
  };

  // Format file size
  const formatSize = (url) => {
    return "Click to download";
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📁 Firebase Storage</h1>
        <p>Simple file upload, view & delete with React</p>
      </header>

      <main className="app-main">
        {/* Upload Section */}
        <section className="upload-section">
          <h2>Upload File</h2>
          <div className="upload-form">
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? `Uploading... ${uploadProgress}%` : "Upload"}
            </button>
          </div>

          {uploading && (
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <span className="progress-text">{uploadProgress}%</span>
            </div>
          )}
        </section>

        {/* Files List Section */}
        <section className="files-section">
          <h2>Uploaded Files ({files.length})</h2>
          {files.length === 0 ? (
            <p className="no-files">No files uploaded yet.</p>
          ) : (
            <div className="files-grid">
              {files.map((file, index) => (
                <div key={index} className="file-card">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <p className="file-name" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                  <div className="file-actions">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-download"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(file.ref)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Powered by React & Firebase Storage</p>
      </footer>
    </div>
  );
}

export default App;

