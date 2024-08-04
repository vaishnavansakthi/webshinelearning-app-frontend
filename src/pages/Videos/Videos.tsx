import React, { useEffect, useState } from "react"
import { getAllIframeVideos } from "../../services/iframeVideos.service"

function Videos() {
  const [iframeVideos, setIframeVideos] = useState<any>([])

  useEffect(() => {
    const res = getAllIframeVideos()
    res.then((data) => {
      console.log(data)
      setIframeVideos(data)
    })
  }, [])

  return (
    <div className="dark:text-white p-10">
      <div className="mb-6">
        <h1 className="text-center text-2xl">Learning Center</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {iframeVideos.length > 0 &&
          iframeVideos.map((iframe: any) => {
            return (
              <div
                key={iframe.id}
                className="border-2 border-gray-300 w-[440px] max-md:w-[370px] max-sm:w-[340px] shadow-2xl p-4 flex flex-col items-center"
              >
                <iframe
                  className="w-[420px] h-[270px] max-md:w-[350px] max-md:h-[220px] max-sm:w-[320px] max-sm:h-[220px] rounded-md"
                  loading="lazy"
                  src={iframe.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">{iframe.title}</p>
                  <p className="text-sm text-gray-500">
                    Posted by <span className="font-bold">{iframe?.user?.username}</span> on{" "}
                    <span className="font-bold">{new Date(iframe.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Videos
