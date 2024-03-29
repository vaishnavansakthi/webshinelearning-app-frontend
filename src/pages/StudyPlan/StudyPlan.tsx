import React, { useState, useRef, useEffect } from "react"
import { studyplanData } from "../../common/studyplan"
import Timeline from "../../components/moleclues/Timeline/Timeline"

const StudyPlan = () => {
  const [activeTopic, setActiveTopic] = useState(null)
  const timelineRefs = useRef<React.MutableRefObject<HTMLDivElement>[]>([])

  useEffect(() => {
    timelineRefs.current = Array(studyplanData.length)
      .fill(null)
      .map((_, index) => timelineRefs.current[index] || React.createRef())
  }, [studyplanData.length])

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const topics = studyplanData.map((_: any, index: any) => ({
      index,
      offsetTop: timelineRefs.current[index]?.current?.offsetTop || 0,
    }))

    for (let i = topics.length - 1; i >= 0; i--) {
      const { index, offsetTop } = topics[i]
      if (scrollPosition >= offsetTop) {
        setActiveTopic(index)
        break
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTopicClick = (index: any) => {
    setActiveTopic(index)
    const element = document.getElementById(`studyplan-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="flex justify-between px-12 max-sm:px-2">
      <div className="py-4 max-sm:hidden">
        <div className="sticky top-10">
          {studyplanData.map((studyplan, index: any) => (
            <div
              key={index}
              className={`cursor-pointer mb-2 ${
                activeTopic === index ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
              }`}
              onClick={() => handleTopicClick(index)}
            >
              {studyplan.topic}
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 max-sm:px-3 max-lg:px-20">
        {studyplanData.map((studyplan, index) => (
          <div key={index} id={`studyplan-${index}`} className="mb-8 px-3" ref={timelineRefs.current[index]}>
            <Timeline
              id={index}
              topic={studyplan.topic}
              subtopic={studyplan.subtopic}
              date={studyplan.date}
              contentData={studyplan.contentList}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudyPlan
