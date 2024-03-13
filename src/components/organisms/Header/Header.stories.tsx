import { Meta, StoryObj } from '@storybook/react'
import Header from './Header'
import { BrowserRouter } from 'react-router-dom'

const meta = {
    title: 'organisms/Header',
    component: Header,
    decorators: [
        (storyFn) => (
            <BrowserRouter>
                <div>{storyFn()}</div>
            </BrowserRouter>
        ),
    ]
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Navbar: Story = {}