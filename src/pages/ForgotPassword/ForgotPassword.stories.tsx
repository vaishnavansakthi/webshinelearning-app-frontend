import { Meta, StoryObj } from '@storybook/react'
import ForgotPassword from './ForgotPassword'

const meta = {
    title: 'pages/ForgotPassword',
    component: ForgotPassword,
} satisfies Meta<typeof ForgotPassword>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayForgotPassword: Story = {}