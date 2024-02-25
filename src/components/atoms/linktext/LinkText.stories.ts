import type { Meta, StoryObj } from '@storybook/react';
import { LinkText } from './LinkText';

const meta = {
    title: 'atoms/LinkText',
    component: LinkText,
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        color: { control: 'color'}
    },

    tags: ['autodocs'],
} satisfies Meta<typeof LinkText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
    args: {
        size: 'large',
        text: 'Dummy Link',
        href: '#'
    }
}

export const Medium: Story = {
    args: {
        size: 'medium',
        text: 'Dummy Link',
        href: '#'
    }
}

export const Small: Story = {
    args: {
        size: 'small',
        text: 'Dummy Link',
        href: '#'
    }
}