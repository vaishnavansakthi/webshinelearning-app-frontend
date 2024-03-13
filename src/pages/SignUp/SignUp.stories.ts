import { Meta, StoryObj } from '@storybook/react'
import SignUp from './SignUp'

const meta = {
    title: 'pages/SignUp',
    component: SignUp,
    /* eslint-disable no-use-before-define */
    decorators: [(_StoryFn: any): any => {
        return(
            null
        )
    }]
} satisfies Meta<typeof SignUp>

export default meta

type Story = StoryObj<typeof meta>

export const SignUpForm: Story = {}