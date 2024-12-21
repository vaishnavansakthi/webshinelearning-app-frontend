import React, { useState, useRef, useEffect } from "react";
import ReactGA from "react-ga4";
import { studyplanData } from "../../common/studyplan";
import Timeline from "../../components/moleclues/Timeline/Timeline";
import withProtectedRoute from "../../hoc/ProductedRoute";

const StudyPlan = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const timelineRefs = useRef<any>([]);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/studyplan", title: "Study Plan Page" });
  }, [])

  useEffect(() => {
    timelineRefs.current = Array(studyplanData.length)
      .fill(null)
      .map((_, index) => timelineRefs.current[index] || React.createRef());
  }, [studyplanData.length]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const categories = studyplanData.map((studyplan, index) => ({
      index,
      offsetTop: timelineRefs.current[index]?.current?.offsetTop || 0,
      topics: studyplan.topics.map((_, topicIndex) => ({
        topicIndex,
        offsetTop: timelineRefs.current[index]?.current?.childNodes[topicIndex]?.getBoundingClientRect().top + scrollPosition || 0,
      })),
    }));
  
    let activeCategoryIndex: any = null;
    
  
    for (let i = categories.length - 1; i >= 0; i--) {
      const { index, offsetTop, topics } = categories[i];
      let activeTopicIndex: any = null;
      if (scrollPosition >= offsetTop) {
        activeCategoryIndex = index;
        for (let j = topics.length - 1; j >= 0; j--) {
          const { topicIndex, offsetTop: topicOffsetTop } = topics[j];
          if (scrollPosition >= topicOffsetTop) {
            activeTopicIndex = topicIndex;
            break;
          }
        }
        break;
      }
    }
  
    setActiveCategory(activeCategoryIndex);
    // setActiveTopic(activeTopicIndex);
  };
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (index: any) => {
    setActiveCategory(index);
    const element = document.getElementById(`studyplan-category-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTopicClick = (categoryIndex: any, topicIndex: any) => {
    
    const element = document.getElementById(`studyplan-category-${categoryIndex}-topic-${topicIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(categoryIndex);
    }
  };

  return (
    <div className="flex justify-between px-12 max-sm:px-2">
      <div className="py-4 max-sm:hidden">
        <div className="sticky top-10">
        {studyplanData.map((studyplan, index) => (
            <div key={index} className="mb-2">
              <div
                className={`cursor-pointer ${activeCategory === index ? "font-semibold text-blue-500" : "text-gray-600 dark:text-gray-400"} mb-3`}
                onClick={() => handleCategoryClick(index)}
              >
                {studyplan.category}
              </div>
              {activeCategory === index && (
                <ul className="ml-4 space-y-2">
                  {studyplan.topics.map((topic, topicIndex) => (
                    <li
                      key={topicIndex}
                      className={`cursor-pointer dark:text-white`}
                      onClick={() => handleTopicClick(index, topicIndex)}
                    >
                      {topic.subtopic && <div className="ml-4">{topic.topic}</div>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 max-sm:px-3 max-lg:px-20">
        {studyplanData.map((studyplan, categoryIndex) => (
          <div key={categoryIndex} id={`studyplan-category-${categoryIndex}`} className="mb-8 px-3" ref={timelineRefs.current[categoryIndex]}>
            <h2 className="text-xl font-semibold mb-10 ml-[-15px] dark:text-white">{studyplan.category}</h2>
            {studyplan.topics.map((topic, topicIndex) => (
              <div key={topicIndex} id={`studyplan-category-${categoryIndex}-topic-${topicIndex}`} className="mb-8">
                <Timeline
                  id={topicIndex}
                  topic={topic.topic}
                  subtopic={topic.subtopic}
                  date={topic.date}
                  contentData={topic.contentList}
                  onClick={() => handleTopicClick(categoryIndex, topicIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withProtectedRoute(StudyPlan);
