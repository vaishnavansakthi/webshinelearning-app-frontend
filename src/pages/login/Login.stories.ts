
import { Meta, StoryObj } from '@storybook/react'
import Login from './Login'

const meta = {
    title: 'pages/Login',
    component: Login,
    parameters: {
        layout: 'centered',
    },
    /* eslint-disable no-use-before-define */
    decorators: [(_StoryFn: any): any => {
        return(
            null
        )
    }]
} satisfies Meta<typeof Login>

export default meta

type Story = StoryObj<typeof meta>

export const LoginForm: Story = {}