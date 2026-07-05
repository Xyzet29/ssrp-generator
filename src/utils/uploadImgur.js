const CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID

export async function uploadImgur(blob) {
  const formData = new FormData()
  formData.append("image", blob)

  const response = await fetch(
    "https://api.imgur.com/3/image",
    {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`
      },
      body: formData
    }
  )

  const data = await response.json()

  if (!data.success) {
    console.error(data)
    throw new Error("Upload Imgur gagal")
  }

  return data.data.link
}