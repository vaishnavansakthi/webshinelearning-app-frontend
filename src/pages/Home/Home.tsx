import { Helmet } from "react-helmet"
import { Accordion } from "../../components/moleclues"
import { useEffect, useState } from "react"

const Home = () => {
  const [accordionItems, setAccordionItems] = useState([
    {
      id: 1,
      question: "What is Flowbite?",
      answer:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
      isOpen: false,
    },
    {
      id: 2,
      question: "What is Flowbite?",
      answer:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
      isOpen: false,
    },
    {
      id: 3,
      question: "What is Flowbite?",
      answer:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
      isOpen: false,
    },
    // Add more items as needed
  ])

  const [countValues, setCountValues] = useState<any>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const courseStartDate: any = new Date("2024-06-01")

  function updateCountdown() {
    const currentDate: any = new Date()
    const timeDifference = courseStartDate - currentDate

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    // Function to add leading zeros
    const addLeadingZero = (value: number) => {
      return value < 10 ? `0${value}` : value
    }

    setCountValues({
      days: addLeadingZero(days),
      hours: addLeadingZero(hours),
      minutes: addLeadingZero(minutes),
      seconds: addLeadingZero(seconds),
    })

    setTimeout(updateCountdown, 1000)
  }

  const toggleAccordion = (id: number) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false })),
    )
  }

  useEffect(() => {
    updateCountdown()
  }, [])

  return (
    <>
      <Helmet>
        <title>Webshine talents - Home</title>
        <meta
          name="description"
          content="Dive into the world of full-stack development with our comprehensive MERN stack course within 4 months. Gain the skills and knowledge to create dynamic web applications from scratch using MongoDB, Express.js, React, and Node.js - the powerful technologies that fuel modern web development. Whether you're a beginner or experienced developer, our course will equip you with the tools to build scalable, robust, and feature-rich applications. Join us and unleash your potential in the world of full-stack development!"
        />
      </Helmet>
      {/* 
            Hero section
         */}
      <section className="bg-white dark:bg-[#282828] mt-[-40px]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="/booking"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 dark:text-black bg-gray-100 rounded-full dark:bg-[#dbd5d5] hover:bg-gray-200 dark:hover:bg-[#b1a9a9]"
            role="alert"
          >
            <span className="text-xs bg-primary-600 rounded-full text-black dark:text-black px-4 py-1.5 mr-3">New</span>{" "}
            <span className="text-sm font-medium">Batch starts from June 1st week onwards</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Learn to Build with MERN Stack
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Dive into the world of full-stack development with our comprehensive MERN stack course{" "}
            <span className="font-extrabold">within 4 months</span>. Gain the skills and knowledge to create dynamic web
            applications from scratch using MongoDB, Express.js, React, and Node.js - the powerful technologies that
            fuel modern web development. Whether you're a beginner or experienced developer, our course will equip you
            with the tools to build scalable, robust, and feature-rich applications. Join us and unleash your potential
            in the world of full-stack development!
          </p>

          {/* count down */}
          <div className="w-[400px] max-sm:w-[340px] mx-auto">
            <div className="flex flex-col gap-2 mb-3">
              <h1 className="text-center sm:text-3xl text-xl font-semibold leading-8 dark:text-[#FBFAF8]">
                Hurry, Limited Availability
              </h1>
              <span className="text-sm font-semibold text-center leading-8 text-[#959AAE]">
                Be a part of Full stack hero, Grab the Course before seat fills!
              </span>
            </div>
            <div
              id="countdown"
              className="flex justify-evenly items-center text-center text-5xl max-md:text-3xl font-medium text-gray-600 mb-10 dark:text-white"
            >
              <div className="bg-gray-50 dark:bg-[#404040] shadow-md p-3">
                <div>{countValues.days}</div>
                <div>
                  <span className="text-[16px] dark:text-[#FBFAF8] font-bold">
                    {countValues.days === 1 ? "Day" : "Days"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#404040] shadow-md p-3">
                <div>{countValues.hours}</div>

                <div>
                  {" "}
                  <span className="text-[16px] dark:text-[#FBFAF8] font-bold">
                    {countValues.hours === 1 ? "Hour" : "Hours"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#404040] shadow-md p-3">
                <div>{countValues.minutes}</div>
                <div>
                  <span className="text-[16px] dark:text-[#FBFAF8] font-bold">
                    {countValues.minutes === 1 ? "Minute" : "Minutes"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#404040] shadow-md p-3">
                <div>{countValues.seconds}</div>
                <div>
                  <span className="text-[16px] dark:text-[#FBFAF8] font-bold">
                    {countValues.seconds === 1 ? "Second" : "Seconds"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* count down */}

          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="/booking"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 bg-blue-600"
            >
              Book your seat
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* 
            Hero section
         */}
      <div className="flex justify-evenly mt-[-80px] max-lg:mt-[-20px] px-3 flex-wrap">
        <div className="max-w-sm bg-white border border-gray-200rounded-lg shadow dark:bg-[#404040] dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src="https://wallpapercave.com/wp/wp8725091.jpg" alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mern Stack Development
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Unlock the power of full-stack development with our MERN stack course. From MongoDB to Node.js, learn to
              build dynamic web applications that scale. Whether you're a newcomer or seasoned developer, discover the
              tools to craft feature-rich apps and realize your full potential.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span className="text-white mr-2 text-xl">&#x20B9; 9999</span>

              <span className="mr-2 line-through text-[14px]">&#x20B9; 16999</span>
              <span className="text-[14px]">30% off</span>
            </a>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#404040] dark:border-gray-700 max-lg:mt-5">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://media.licdn.com/dms/image/D4D12AQGozixPY9TTHg/article-cover_image-shrink_720_1280/0/1694441317997?e=2147483647&v=beta&t=my_U0qqKwHBAi3ZUpgwtR3v_lM6AOx-hw8ZWoX1j408"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                UI/UX Masterclass
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Elevate your design skills with our UI/UX Master Class. Perfect for beginners and seasoned designers
              alike, this course will unlock the secrets to creating captivating digital experiences. Join us and take
              your design career to new heights!
            </p>
            <a
              href="/booking"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span className="text-white mr-2 text-xl">&#x20B9; 9999</span>

              <span className="mr-2 line-through text-[14px]">&#x20B9; 16999</span>
              <span className="text-[14px]">30% off</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-24 flex-wrap">
        <div className="">
          <iframe
            className="w-[500px] h-[100%] max-sm:w-[340px] max-sm:h-[220px] rounded-lg shadow-md"
            src="https://www.youtube.com/embed/jE47yZ2NtiQ?si=x-5DOydnhgWjxLDK"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="w-[480px] max-sm:w-[340px] text-left dark:text-[#9BA3AF] max-lg:mt-7 ml-5">
          <h1 className="text-2xl dark:text-white mb-3 text-black">Full Stack Development</h1>
          <p>
            Dive into the world of Full Stack Development, where you'll learn to build dynamic web applications from
            start to finish. From crafting responsive front-end interfaces with HTML, CSS, and JavaScript to developing
            powerful server-side applications with Node.js, our comprehensive course covers it all. You'll delve into
            databases, APIs, deployment, and more, equipping you with the skills to create robust and scalable web
            solutions. Whether you're a beginner or looking to expand your skill set, join us and embark on your journey
            to becoming a proficient Full Stack Developer.
          </p>
        </div>
      </div>
      {/* stats */}
      <section className="dark:bg-[#282828] mt-8">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
            <div className="flex flex-col items-center justify-center max-sm:mt-10">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">50+</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">Leaners till now</dd>
            </div>
            <div className="flex flex-col items-center justify-center max-sm:mt-10">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">100%</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">Job Guidence and Assurance</dd>
            </div>
            <div className="flex flex-col items-center justify-center max-sm:mt-10">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">3</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">Batches completed successfully</dd>
            </div>
          </dl>
        </div>
      </section>
      {/* timeline */}
      <div className="flex justify-center mt-5 p-5">
        <div className="container">
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">June 2024</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">HTML, CSS, Javascript</h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                E-commerce & Marketing pages. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt omnis sequi
                ratione officiis, odio quo rem velit culpa veniam, amet animi quis nobis, provident eum. Pariatur fugit
                enim eaque velit? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis maxime sapiente,
                voluptate quia ea dolorem nam saepe totam est soluta itaque excepturi facilis aliquam dignissimos
                praesentium assumenda quis, commodi aspernatur.
              </p>
              {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg></a> */}
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">July 2024</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">React and Redux</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                All of the pages and components are first designed in Figma and we keep a parity between the two
                versions even as we update the project. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum,
                in mollitia quasi cupiditate laudantium deserunt hic, nulla soluta molestias distinctio ipsum non
                consequuntur animi odit omnis officiis tempore corrupti laborum. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Mollitia alias itaque illo facilis repellendus. Suscipit, eaque odio! Inventore
                facilis nihil aperiam eveniet tenetur ut culpa veritatis illum nisi, maxime nemo.
              </p>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                August 2024
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Node.js and Express.Js</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get started with dozens of web components and interactive elements built on top of Tailwind CSS. Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptate perspiciatis distinctio tenetur
                culpa dolorum sint ullam exercitationem, illum inventore odio? Repudiandae reiciendis sint quidem
                similique voluptatibus labore perferendis tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Voluptas dolores libero accusantium, odit repellat nulla quasi magni similique consequuntur
                debitis quam, mollitia, hic voluptates reiciendis. Sequi nobis velit ullam earum? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Debitis quam doloribus tempora voluptatibus alias. Perspiciatis
                distinctio accusantium perferendis sequi earum eligendi. Dignissimos ipsum voluptatem doloribus corrupti
                deleniti qui dicta aspernatur.
              </p>
            </li>
            <li className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                September 2024
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">MongoDB</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get started with dozens of web components and interactive elements built on top of Tailwind CSS. Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Cumque dolorum, amet vero tenetur sint sapiente odit
                nulla autem consequuntur voluptate velit temporibus, assumenda recusandae impedit blanditiis sed tempora
                doloremque voluptatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore suscipit
                laboriosam praesentium possimus nobis neque maxime vero rerum non? Eligendi quos consectetur dignissimos
                maxime! Voluptatem molestias earum numquam iusto sint? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Iste odio expedita aperiam illum modi similique, fugiat officia accusamus in
                exercitationem non ad beatae velit maiores sit deleniti nulla recusandae itaque. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Voluptas adipisci reiciendis, hic impedit distinctio qui, at deserunt
                harum minus corrupti, molestias quod consequuntur non temporibus? Modi eius blanditiis velit quam!
              </p>
            </li>
          </ol>
        </div>
      </div>
     
      {/* FAQ */}
      <div className="flex justify-center p-3">
        <div className="container" id="accordion-open" data-accordion="open">
          <div className="mb-10 text-4xl text-center">
            <h1 className="dark:text-white">Frequently asked questions</h1>
          </div>
          {accordionItems.map((item) => (
            <Accordion
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={item.isOpen}
              toggleAccordion={toggleAccordion}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
