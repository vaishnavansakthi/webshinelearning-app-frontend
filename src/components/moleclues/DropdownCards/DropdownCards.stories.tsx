import { Meta, StoryObj } from "@storybook/react"
import DropdownCards from "./DropdownCards"

const meta = {
  title: "moleclues/DropdownCards",
  component: DropdownCards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownCards>

export default meta

type Story = StoryObj<typeof meta>

export const ShowDropdownCards: Story = {
    args: {
        title: "Analytics",
        description: "Get a better understanding of your traffic",
        paths: [
            {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              d: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z',
            },
            {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              d: 'M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z',
            },
          ],
    }
}


