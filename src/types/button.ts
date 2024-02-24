interface IButtonProps {
    varient?: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'error',
    size?: 'large' | 'medium' | 'small',
    text: string
    className?: string
  }

  export type {
    IButtonProps
  }