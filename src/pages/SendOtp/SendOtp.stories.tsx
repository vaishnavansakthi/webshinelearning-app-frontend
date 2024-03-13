import { Meta, StoryObj } from '@storybook/react'
import SendOtp from './SendOtp'
import { BrowserRouter } from 'react-router-dom'

const meta = {
    title: 'pages/VerifyOtp',
    component: SendOtp,
    decorators: [
        (storyFn) => (
            <BrowserRouter>
                <div>{storyFn()}</div>
            </BrowserRouter>
        ),
    ]
} satisfies Meta<typeof SendOtp>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayVerifyOtp: Story = {}