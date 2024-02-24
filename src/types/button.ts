interface IButtonProps {
    varient?: 'outline' | 'contained';
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'error';
    size?: 'large' | 'medium' | 'small';
    text?: string;
    textColor?: string;
    onClick?: () => void;
  }

  export type {
    IButtonProps
  }