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
     * className to extend the styling
     */
    className?: string;
    /**
     * Adding the color of the text
     */
    textColor?: string;
    /**
     * add icon to the button
     */
    icon?: any;
    /**
     * background color
     */
    bgColor?: string;
    /**
     * Event Action
     * @returns void
     */
    onClick?: () => void;

    type?: "submit" | "reset" | "button" | undefined;

    loading?: boolean;
  }

  export type {
    IButtonProps
  }