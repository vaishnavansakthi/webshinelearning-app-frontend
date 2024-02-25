
import type { Meta, StoryObj } from "@storybook/react"
import Button from "./Button"

const meta = {
  title: "atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    textColor: {
      control: "text",
    }
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta

type StoryArgs = StoryObj<typeof meta>

export const Primary: StoryArgs = {
  args: {
    size: "large",
    text: "Click Now",
    varient: "contained",
    color: "primary",
  },
}

export const Secondary: StoryArgs = {
  args: {
    size: "large",
    text: "Click Now",
    varient: "contained",
    color: "secondary",
  },
}

export const Success: StoryArgs = {
  args: {
    size: "large",
    text: "Click Now",
    varient: "contained",
    color: "success",
  },
}

export const Error: StoryArgs = {
  args: {
    size: "large",
    text: "Click Now",
    varient: "contained",
    color: "error",
  },
}

export const Facebook: StoryArgs = {
  args: {
    text: "Sign in with Facebook",
    varient: "contained",
    color: "primary",
    size: "large",
    icon: "M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z",
    textColor: "text-white",
  },
}

export const Contained: StoryArgs = {
  args: {
    size: "large",
    text: "Contained",
    varient: "contained",
    color: "primary",
  },
}

export const Outlined: StoryArgs = {
  args: {
    size: "large",
    text: "Outlined",
    varient: "outline",
    textColor: "text-black",
  },
}

export const Disable: StoryArgs = {
  args: {
    size: "large",
    text: "Contained",
    varient: "contained",
    color: "primary",
    disabled: true,
  },
}

