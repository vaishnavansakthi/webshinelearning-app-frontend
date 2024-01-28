import React from "react"
import "./App.css"

/**
 * Creating App Component
 * @returns {React.Component} App component
 */
function App() {
  const [greet] = React.useState("Everyone!")

  return (
    <>
      <h1>Hello {greet}, Project Yet to start. Webshine learning portal! </h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad excepturi esse distinctio labore obcaecati suscipit
        repellendus, odio aliquid in voluptates, animi, quae itaque cumque aspernatur provident maxime officiis mollitia
        maiores!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus facere dolorum, fugiat incidunt itaque,
        saepe repudiandae quis officia dicta iste, assumenda veritatis enim sequi minima neque velit. Voluptates, rem a?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci modi atque fugit fugiat inventore sint?
        Quaerat earum ea cupiditate, accusantium amet, est eveniet eligendi sint illo molestiae dolore doloribus!
        Incidunt!
      </p>
    </>
  )
}

export default App
