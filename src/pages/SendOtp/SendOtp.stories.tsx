import { Meta, StoryObj } from '@storybook/react'
import SendOtp from './SendOtp'

const meta = {
    title: 'pages/VerifyOtp',
    component: SendOtp,
} satisfies Meta<typeof SendOtp>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayVerifyOtp: Story = {}