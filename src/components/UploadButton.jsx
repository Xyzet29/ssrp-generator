import { useState } from "react"
import html2canvas from "html2canvas"
import { uploadImgur } from "../utils/uploadImgur"

export default function UploadButton({
  previewRef,
  setImgurLink
}) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    try {
      if (!previewRef.current) {
        alert("Preview belum tersedia.")
        return
      }

      setLoading(true)

      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      )

      const canvas = await html2canvas(
        previewRef.current,
        {
          useCORS: true,
          backgroundColor: null,
          scale: 2,
          logging: false
        }
      )

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(
              new Error("Gagal generate gambar")
            )
            return
          }

          resolve(blob)
        }, "image/png")
      })

      const link = await uploadImgur(blob)

      setImgurLink(link)

      await navigator.clipboard.writeText(
        `[img]${link}[/img]`
      )

      alert(
        "Upload berhasil. Link otomatis tercopy."
      )
    } catch (err) {
      console.error(err)
      alert("Upload gagal.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className="toolbar-btn secondary"
      onClick={handleUpload}
      disabled={loading}
    >
      {loading
        ? "Generating..."
        : "Generate & Upload"}
    </button>
  )
}