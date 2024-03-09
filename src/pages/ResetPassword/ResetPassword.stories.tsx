import { Meta, StoryObj } from '@storybook/react'
import ResetPassword from './ResetPassword'

const meta = {
    title: 'pages/ResetPassword',
    component: ResetPassword,
} satisfies Meta<typeof ResetPassword>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayResetPassword: Story = {}