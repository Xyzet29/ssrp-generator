import { useState, useEffect, useRef } from "react"
import { parseChat } from "../utils/parseChat"

export default function PreviewCanvas({
  previewRef,
  sceneFile,
  setSceneFile,
  topChat,
  bottomChat,
  fontSize
}) {
  const topParsed = parseChat(topChat)
  const bottomParsed = parseChat(bottomChat)

  const containerRef = useRef(null)

  const [scale, setScale] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)

  useEffect(() => {
    previewRef.current = containerRef.current
  }, [previewRef])

  // zoom wheel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      e.preventDefault()

      const delta = e.deltaY > 0 ? -0.1 : 0.1

      setScale((prev) => {
        const next = prev + delta
        return Math.min(Math.max(next, 0.5), 3)
      })
    }

    container.addEventListener("wheel", handleWheel, {
      passive: false
    })

    return () => {
      container.removeEventListener("wheel", handleWheel)
    }
  }, [])

  // mouse drag move
  const handleMouseDown = (e) => {
    setDragging(true)
    setStartX(e.clientX - x)
    setStartY(e.clientY - y)
  }

  const handleMouseMove = (e) => {
    if (!dragging) return

    setX(e.clientX - startX)
    setY(e.clientY - startY)
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  // button controls
  const moveImage = (dx, dy) => {
    setX(prev => prev + dx)
    setY(prev => prev + dy)
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3))
  }

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5))
  }

  const resetImage = () => {
    setScale(1)
    setX(0)
    setY(0)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const file = e.dataTransfer.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      setSceneFile(event.target.result)
      resetImage()
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="preview-wrapper">

    <div className="control-panel">
    <button onClick={zoomIn}>+</button>
    <button onClick={zoomOut}>−</button>
    <button onClick={() => moveImage(0, -20)}>↑</button>
    <button onClick={() => moveImage(0, 20)}>↓</button>
    <button onClick={() => moveImage(-20, 0)}>←</button>
    <button onClick={() => moveImage(20, 0)}>→</button>
    <button onClick={resetImage}>Reset</button>
    </div>

      <div
        ref={containerRef}
        className="preview-container"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {sceneFile ? (
          <img
            src={sceneFile}
            alt="scene"
            className="preview-image"
            draggable={false}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              cursor: dragging ? "grabbing" : "grab"
            }}
          />
        ) : (
          <div className="empty-preview">
            Drag / Paste / Upload Screenshot
          </div>
        )}

        <div className="chat-overlay top">
          {topParsed.map((line, i) => (
            <p
              key={i}
              className={line.className}
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: line.text }}
            />
          ))}
        </div>

        <div className="chat-overlay bottom">
          {bottomParsed.map((line, i) => (
            <p
              key={i}
              className={line.className}
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: line.text }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}