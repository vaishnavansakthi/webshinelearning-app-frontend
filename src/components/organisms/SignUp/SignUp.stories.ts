import { Meta, StoryObj } from '@storybook/react'
import SignUp from './SignUp'

const meta = {
    title: 'organisms/SignUp',
    component: SignUp,
    tags:['autodocs']
} satisfies Meta<typeof SignUp>

export default meta

type Story = StoryObj<typeof meta>

export const SignUpForm: Story = {}