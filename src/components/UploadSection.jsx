export default function UploadSection({ setSceneFile }) {
  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      setSceneFile(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="card upload-card">
      <div className="upload-icon">📸</div>

      <h3>Upload Scene</h3>

      <p>Upload file / Ctrl+V / Drag & Drop</p>

      <label className="custom-upload-btn">
        Choose Screenshot
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
      </label>
    </div>
  )
}