import { render } from "@testing-library/react"
import Login from "./Login"

test("Renders the main page", () => {
    render(<Login />)
    expect(true).toBeTruthy()
})

