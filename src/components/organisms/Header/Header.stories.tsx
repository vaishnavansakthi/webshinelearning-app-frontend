import { Meta, StoryObj } from '@storybook/react'
import Header from './Header'

const meta = {
    title: 'organisms/Header',
    component: Header,
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Navbar: Story = {}