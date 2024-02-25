interface IButtonProps {
    /**
     * To decide which layer we need for our 
     * button
     */
    varient?: 'outline' | 'contained';
    /**
     * To make our button disabled
     */
    disabled?: boolean;
    /**
     * Having different color pattern's
     */
    color?: 'primary' | 'secondary' | 'success' | 'error';
    /**
     * Having different button sizes
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * Mentioning the text value
     */
    text?: string;
    /**
     * Adding the color of the text
     */
    textColor?: string;
    icon?: string;
    /**
     * Event Action
     * @returns void
     */
    onClick?: () => void;
  }

  export type {
    IButtonProps
  }