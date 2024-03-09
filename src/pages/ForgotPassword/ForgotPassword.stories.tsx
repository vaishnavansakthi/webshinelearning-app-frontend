import { Meta, StoryObj } from '@storybook/react'
import ForgotPassword from './ForgotPassword'

const meta = {
    title: 'organisms/ForgotPassword',
    component: ForgotPassword,
} satisfies Meta<typeof ForgotPassword>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayForgotPassword: Story = {}