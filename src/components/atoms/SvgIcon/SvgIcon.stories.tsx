import { Meta, StoryObj } from "@storybook/react"
import SvgIcon from "./SvgIcon"

const meta = {
  title: "atoms/SvgIcon",
  component: SvgIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SvgIcon>

export default meta

type Story = StoryObj<typeof meta>

export const ShowDropContent: Story = {
  args: {
    className: "",
    paths: [
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z",
      },
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z",
      },
    ],
  },
}
