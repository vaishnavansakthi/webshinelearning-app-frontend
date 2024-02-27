import { Meta, StoryObj } from "@storybook/react"
import DropContent from "./DropContent"

const meta = {
  title: "atoms/DropContent",
  component: DropContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropContent>

export default meta

type Story = StoryObj<typeof meta>

export const ShowDropContent: Story = {
  args: {
    title: "Analytics",
    description: "Get a better understanding of your traffic",
  },
}
