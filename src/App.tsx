import { useState } from 'react'
import './App.css'

/**
 * Creating App Component
 * @returns {React.Component} App component
 */
function App() {
  const [greet] = useState('Everyone!')

  return (
    <>
      <h1>Hello {greet}, Project Yet to start</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad excepturi esse distinctio labore obcaecati suscipit
        repellendus, odio aliquid in voluptates, animi, quae itaque cumque aspernatur provident maxime officiis mollitia
        maiores!
      </p>
    </>
  )
}

export default App
