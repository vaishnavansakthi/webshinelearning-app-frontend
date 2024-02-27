import { Meta, StoryObj } from '@storybook/react'
import Login from './Login'

const meta = {
    title: 'organisms/Login',
    component: Login,
} satisfies Meta<typeof Login>

export default meta

type Story = StoryObj<typeof meta>

export const LoginForm: Story = {}