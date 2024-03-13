import { Meta, StoryObj } from "@storybook/react"
import ForgotPassword from "./ForgotPassword"
import { BrowserRouter } from "react-router-dom"

const meta = {
  title: "pages/ForgotPassword",
  component: ForgotPassword,
  decorators: [
    (storyFn) => (
      <BrowserRouter>
        <div>{storyFn()}</div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof ForgotPassword>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayForgotPassword: Story = {}
