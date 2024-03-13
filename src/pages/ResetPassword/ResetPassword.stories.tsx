import { Meta, StoryObj } from '@storybook/react'
import ResetPassword from './ResetPassword'
import { BrowserRouter } from 'react-router-dom'

const meta = {
    title: 'pages/ResetPassword',
    component: ResetPassword,
    decorators: [
        (storyFn) => (
            <BrowserRouter>
                <div>{storyFn()}</div>
            </BrowserRouter>
        ),
    ]
} satisfies Meta<typeof ResetPassword>

export default meta

type Story = StoryObj<typeof meta>

export const DisplayResetPassword: Story = {}