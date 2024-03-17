
import { Meta, StoryObj } from '@storybook/react'
import NotFound from './NotFound'

const meta = {
    title: 'pages/NotFound',
    component: NotFound,
    parameters: {
        layout: 'centered',
    }
} satisfies Meta<typeof NotFound>

export default meta

type Story = StoryObj<typeof meta>

export const NotFoundPage: Story = {}