import React, { useEffect, useState } from "react"
import { createMemes, getAllMemes } from "../../services/memes.services"
import { decryptData } from "../../utils/security"

const UserMemes = () => {
  const [image, setImage] = useState<any>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [memesData, setMemesData] = useState<any>([])

  const user = decryptData("userData", "object")
  console.log("user", user)

  useEffect(() => {
    const res = getAllMemes()
    res.then((meme: any) => {
      setMemesData(meme)
    })
  }, [])

  console.log("meme", memesData)

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      setImage(reader?.result)
    }

    if (file) {
      reader.readAsDataURL(file)
      simulateUploadProgress(file)
    }
  }

  const simulateUploadProgress = (file: File) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        clearInterval(interval)
      }
      setUploadProgress(progress)
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    const fileInput = document.getElementById("dropzone-file") as HTMLInputElement
    const file = fileInput.files && fileInput.files[0]
    if (file) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "application/pdf" ||
        file.type === "text/csv" ||
        file.type === "application/x-cfb" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.oasis.opendocument.spreadsheet" ||
        file.type === "application/vnd.oasis.opendocument.text" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        if (file.size <= 2100000) {
          formData.append("file", file)
          console.log("file", file)

          try {
            const response = await createMemes(user?.user?.id, formData)
            console.log("response", response)
            setUploadProgress(0)
            setImage(null)
            window.location.reload()
          } catch (error) {
            console.error("Error uploading meme:", error)
          }
        } else {
          console.error("File size exceeds the maximum allowed size")
        }
      } else {
        console.error("Invalid file type")
      }
    } else {
      console.error("No file selected")
    }
  }

  return (
    <>
      <div className="flex items-center justify-center py-2">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[600px] h-[280px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {image ? (
                <img width={80} height={120} src={image} alt="Uploaded" className="max-w-full max-h-full mb-4" />
              ) : (
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              )}
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
            {uploadProgress >= 100 && (
              <input
                type="submit"
                placeholder="upload"
                value="Upload"
                className="cursor-pointer border-2 border-blue-400 py-1 px-5 rounded-sm"
              />
            )}
            {uploadProgress > 0 && (
              <div className="flex items-center justify-center mt-4">
                {uploadProgress < 100 && image != null && <div className="px-2">{Math.round(uploadProgress)}</div>}
                <div className="w-64 bg-neutral-200 dark:bg-neutral-600">
                  <div
                    className="bg-primary p-1 text-center text-xs font-medium leading-none text-primary-100"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </label>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {memesData.length > 0 &&
          memesData.map((meme: any) => {
            return (
              <div className="flex flex-col">
                <img className="w-full mb-4" src={meme?.url} alt="meme show" />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default UserMemes
