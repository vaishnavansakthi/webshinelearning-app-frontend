import { studyplanData } from "../../common/studyplan"
import Timeline from "../../components/moleclues/Timeline/Timeline"

const StudyPlan = () => {
  return (
    <div className=" container px-36 py-4 mx-auto max-lg:px-8 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {" "}
        {/* Utilize CSS grid */}
        {studyplanData.map((studyplan, index) => {
          // Add index to track items
          return (
            <Timeline
              id={index}
              topic={studyplan.topic}
              subtopic={studyplan.subtopic}
              date={studyplan.date}
              contentData={studyplan.contentList}
            />
            // <ol key={index} className="relative border-s border-gray-200 dark:border-gray-700">
            //   <li className="mb-10 ms-6">
            //     <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            //       <svg
            //         className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
            //         aria-hidden="true"
            //         xmlns="http://www.w3.org/2000/svg"
            //         fill="currentColor"
            //         viewBox="0 0 20 20"
            //       >
            //         <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            //       </svg>
            //     </span>
            //     <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            //       {studyplan.topic}{" "}
            //       <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
            //         {studyplan.subtopic}
            //       </span>
            //     </h3>
            //     <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            //       {studyplan.date}
            //     </time>
            //     <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            //         {studyplan.contentList.map((content, contentIndex) => { // Add contentIndex
            //           return (
            //             <dl key={contentIndex}> {/* Use React.Fragment */}
            //               <dt>{content.topic}</dt>
            //               <dd>- {content.content}</dd>
            //             </dl>
            //           );
            //         })}

            //     </div>
            //   </li>
            // </ol>
          )
        })}
      </div>
    </div>
  )
}

export default StudyPlan
