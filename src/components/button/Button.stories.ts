import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
    title: 'atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        size: 'large',
        text: 'Click Now',
        varient: 'contained',
        color: 'primary'
    }
}

export const Secondary: Story = {
    args: {
        size: 'large',
        text: 'Click Now',
        varient: 'contained',
        color: 'secondary'
    }
}

export const Success: Story = {
    args: {
        size: 'large',
        text: 'Click Now',
        varient: 'contained',
        color: 'success'
    }
}

export const Error: Story = {
    args: {
        size: 'large',
        text: 'Click Now',
        varient: 'contained',
        color: 'error'
    }
}

export const Contained: Story = {
    args: {
        size: 'large',
        text: 'Contained',
        varient: 'contained',
        color: 'primary'
    }
}

export const Outlined: Story = {
    args: {
        size: 'large',
        text: 'Outlined',
        varient: 'outline',
    }
}

export const Disable: Story = {
    args: {
        size: 'large',
        text: 'Contained',
        varient: 'contained',
        color: 'primary',
        disabled: true
    }
}

