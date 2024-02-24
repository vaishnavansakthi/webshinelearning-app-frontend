import React from "react"
import "./App.css"
import { LinkText } from "./components/atoms/linktext/LinkText"
import Button from "./components/atoms/button/Button"

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
      <LinkText color="green" size="large" href="https://www.youtube.com/watch?v=HbSjyU2vf6Y" text="Click to views" />
      <br /><br />
<<<<<<< HEAD
      {/* 
      facebook - M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z
       */}
      <Button
        text="Sign in with Facebook"
        varient="contained"
        color="primary"
        size="large"
        icon="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
=======
      <Button
        text="Register Now"
        varient="contained"
        color="secondary"
        size="large"
>>>>>>> 8aa0d9d (feat: updating the story button)
        textColor="text-white"
      />
      <p className="p-10 capitalize font-extrabold ">Test tailwindcss</p>
    </>
  )
}

export default App
