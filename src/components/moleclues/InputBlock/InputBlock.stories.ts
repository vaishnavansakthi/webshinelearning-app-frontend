import { Meta, StoryObj } from "@storybook/react"
import InputBlock from "./InputBlock"

const meta = {
  title: "moleclues/InputBlock",
  component: InputBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputBlock>

export default meta

type Story = StoryObj<typeof meta>

export const InputTextBlock: Story = {
    args: {
        text: 'Username',
        htmlFor: 'Username',
        placeholder: 'Enter the username',
        type: 'text'
    }
}


