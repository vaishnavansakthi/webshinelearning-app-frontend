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
      <h1 className="text-3xl font-bold underline text-red-400">Hello world!</h1>
      <h1>Hello {greet}, Project Yet to start. Webshine learning portal!</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad excepturi esse distinctio labore obcaecati suscipit
        repellendus, odio aliquid in voluptates, animi, quae itaque cumque aspernatur provident maxime officiis mollitia
        maiores!
      </p>
    </>
  )
}

export default App
