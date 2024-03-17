import { Meta, StoryObj } from "@storybook/react"
import Alert from "./Alert"

const meta = {
  title: "atoms/DropContent",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const AlertSuccess: Story = {
  args: {
    message: "Get a better understanding of your traffic",
    bgColor: "bg-green-300",
  },
}

export const AlertFailure: Story = {
    args: {
      message: "Get a better understanding of your traffic",
      bgColor: "bg-red-300",
    },
  }