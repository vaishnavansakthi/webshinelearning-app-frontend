import { Meta, StoryObj } from "@storybook/react"
import Input from "./Input"

const meta = {
  title: "atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta;

type Story = StoryObj<typeof meta>

export const InputText: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter the username',
        varient: 'rounded'
    }
}

export const InputPassword: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter the password',
        varient: 'rounded'
    }
}

export const InputEmail: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter the Email',
        varient: 'rounded'
    }
}

export const InputNumber: Story = {
    args: {
        type: 'number',
        placeholder: 'Enter the Number',
        varient: 'rounded'
    }
}

export const InputDate: Story = {
    args: {
        type: 'date',
        varient: 'rounded'
    }
}

