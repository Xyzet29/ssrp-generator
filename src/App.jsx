import { useRef, useState } from "react"
import PreviewCanvas from "./components/PreviewCanvas"
import UploadButton from "./components/UploadButton"
import { handlePasteImage } from "./utils/imagePaste"

export default function App() {
  const previewRef = useRef(null)

  const [sceneFile, setSceneFile] = useState(null)
  const [topChat, setTopChat] = useState("")
  const [bottomChat, setBottomChat] = useState("")
  const [fontSize, setFontSize] = useState(14)
  const [imgurLink, setImgurLink] = useState("")

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      setSceneFile(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  const resetAll = () => {
    setSceneFile(null)
    setTopChat("")
    setBottomChat("")
    setFontSize(14)
    setImgurLink("")
  }

  return (
    <div
      className="app-container"
      onPaste={(e) => handlePasteImage(e, setSceneFile)}
    >
      {/* hidden upload input */}
      <input
        id="uploadScene"
        type="file"
        hidden
        accept="image/*"
        onChange={handleUpload}
      />

      {/* TOP TOOLBAR */}
      <div className="top-toolbar">
        <UploadButton
          previewRef={previewRef}
          setImgurLink={setImgurLink}
        />

        <button
          className="toolbar-btn secondary"
          onClick={resetAll}
        >
          Reset
        </button>
      </div>

      {/* MAIN */}
      <div className="main-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="control-card upload-card">
            <div className="upload-icon">📸</div>

            <h3>Scene Input</h3>

            <p>
              Upload file, paste screenshot,
              atau drag-drop langsung ke canvas.
            </p>

            <label
              htmlFor="uploadScene"
              className="choose-btn"
            >
              Choose File
            </label>
          </div>

          <div className="control-card">
            <h3>Top Chat</h3>

            <textarea
              value={topChat}
              onChange={(e) =>
                setTopChat(e.target.value)
              }
              placeholder="Top chat..."
            />
          </div>

          <div className="control-card">
            <h3>Bottom Chat</h3>

            <textarea
              value={bottomChat}
              onChange={(e) =>
                setBottomChat(e.target.value)
              }
              placeholder="Bottom chat..."
            />
          </div>

          <div className="control-card">
            <h3>Text Size</h3>

            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) =>
                setFontSize(e.target.value)
              }
            />

            <div className="font-size-label">
              {fontSize}px
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="preview-section">
          <PreviewCanvas
            previewRef={previewRef}
            sceneFile={sceneFile}
            setSceneFile={setSceneFile}
            topChat={topChat}
            bottomChat={bottomChat}
            fontSize={fontSize}
          />
        </div>
      </div>

      {imgurLink && (
        <div className="link-box">
          <a
            href={imgurLink}
            target="_blank"
            rel="noreferrer"
          >
            {imgurLink}
          </a>
        </div>
      )}
    </div>
  )
}