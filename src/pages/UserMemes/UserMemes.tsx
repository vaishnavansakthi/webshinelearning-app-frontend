import React, { useEffect, useState } from "react"
import { createMemes, getAllMemes, deleteMemes } from "../../services/memes.services"
import { decryptData } from "../../utils/security"
import { Modal } from "../../components/moleclues"
import { MdCancel } from "react-icons/md"
import dayjs from "dayjs"

const UserMemes = () => {
  const [image, setImage] = useState<any>(null)
  const [isModal, setisModal] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [memesData, setMemesData] = useState<any>([])

  const user = decryptData("userData", "object")

  useEffect(() => {
    const res = getAllMemes()
    res.then((meme: any) => {
      setMemesData(meme)
    })
  }, [])

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

  const handleModal = () => {
    setisModal(!isModal)
    setUploadProgress(0)
    setImage(null)
  }

  const handleUploadClear = (e: any) => {
    e.stopPropagation()
    setUploadProgress(0)
    setImage(null)
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

          try {
            await createMemes(user?.user?.id, formData)
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

  const handleDelete = (id: number) => {
    const deleteMeme = memesData.filter((data: any) => data.id !== id)
    const res = deleteMemes(id)
    res
      .then(() => {
        setMemesData(deleteMeme)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  return (
    <>
      <section className="relative container overflow-x-auto m-auto flex items-center justify-center">
        <div className="flex items-center justify-between flex-wrap max-sm:justify-center p-6">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Memes</h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {memesData.length}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Memes to explore the tech meme world</p>
          </div>

          <div className="flex items-center mt-4 gap-x-3 px-7 py-1">
            <button
              onClick={handleModal}
              className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add Memes</span>
            </button>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center py-2">
        {isModal && (
          <Modal title="Add memes">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center w-[450px] h-[300px] max-md:w-[430px] max-md:h-[250px] max-sm:w-[280px] max-sm:h-[250px] justify-center border-2 mt-7 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center w-full pt-5 pb-6">
                  {image ? (
                    <div onClick={handleUploadClear} style={{ position: "relative", display: "inline-block" }}>
                      <img width={80} height={120} src={image} alt="Uploaded" className="max-w-full max-h-full mb-4" />
                      <span className="dark:text-white ml-16 mt-6" style={{ position: "absolute", top: -35, left: 8 }}>
                        <MdCancel />
                      </span>
                    </div>
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
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF Max file size 2mb</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
                {uploadProgress > 0 && (
                  <div className="flex items-center justify-center mt-4">
                    <div className="w-64 bg-neutral-200 dark:bg-neutral-600">
                      <div
                        className="bg-primary p-1 text-center text-xs font-medium leading-none text-primary-100"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                {uploadProgress >= 100 && (
                  <input
                    type="submit"
                    placeholder="upload"
                    value="Upload"
                    className="flex items-center justify-center px-5 py-2 text-sm cursor-pointer tracking-wide text-white transition-colors mt-5 text-center duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                  />
                )}
              </label>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors mt-5 text-center duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                  onClick={handleModal}
                >
                  Close
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-sm:ml-3">
        {memesData.length > 0 &&
          memesData.map((meme: any) => {
            return (
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#181818] dark:border-black">
                <a href="#">
                  <img width={"100%"} className="rounded-t-lg h-[350px]" src={meme?.url} alt="" />
                </a>
                <div className="p-5">
                  <a>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize dark:text-white">
                      {meme?.user?.username}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {dayjs(meme?.createAt).format("MMM D, YYYY")}
                  </p>
                  {user?.user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(meme?.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default UserMemes
