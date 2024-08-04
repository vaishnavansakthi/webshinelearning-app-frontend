import React, { useEffect, useState } from "react"
import { getAllIframeVideos } from "../../services/iframeVideos.service"

function Videos() {
  const [iframeVideos, setIframeVideos] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [videosPerPage] = useState(6)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getAllIframeVideos()
      setIframeVideos(data)
    }
    fetchVideos()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
    setSelectedTag(null)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag)
    setCurrentPage(1)
  }

  // Get unique tags
  const allTags = Array.from(new Set(iframeVideos.flatMap((iframe: any) => iframe.tags)))
  console.log("allTags: ", allTags)

  // Filter videos based on search query and selected tag
  const filteredVideos = iframeVideos.filter((iframe: any) => {
    const matchesSearch = iframe.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag ? iframe.tags.includes(selectedTag) : true
    return matchesSearch && matchesTag
  })

  // Get current videos for pagination
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="dark:text-white p-1">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search videos"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md shadow-sm w-full max-w-md dark:text-white outline-none dark:bg-gray-500 dark:border-gray-500"
        />
      </div>
      <div className="mb-4 flex justify-center flex-wrap gap-2">
        {allTags.map((tag: any) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 border rounded-md capitalize dark:bg-gray-500 dark:border-gray-600 ${
              selectedTag === tag ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {currentVideos.length > 0 ? (
          currentVideos.map((iframe: any) => (
            <div
              key={iframe.id}
              className="border-2 border-gray-200 dark:border-gray-600 w-[440px] max-md:w-[370px] max-sm:w-[340px] shadow-2xl p-4 flex flex-col items-center"
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
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 mt-6">No search results found.</div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Videos
