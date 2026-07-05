export function handlePasteImage(event, setSceneFile) {
  const items = event.clipboardData?.items

  if (!items) return

  for (let i = 0; i < items.length; i++) {
    const item = items[i]

    if (item.type.includes("image")) {
      const file = item.getAsFile()

      if (!file) return

      // optional size validation (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert("Gambar terlalu besar. Maksimal 10MB.")
        return
      }

      const reader = new FileReader()

      reader.onload = (e) => {
        setSceneFile(e.target.result)
      }

      reader.onerror = () => {
        alert("Gagal membaca gambar dari clipboard.")
      }

      reader.readAsDataURL(file)

      event.preventDefault()
      break
    }
  }
}