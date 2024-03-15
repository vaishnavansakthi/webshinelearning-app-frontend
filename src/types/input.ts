interface IInputProps {
    /**
     * Placeholder input value
     */
    placeholder?: string;
    /**
     * type of the input box
     */
    type: string;
    /**
     * Input design
     */
    varient?: 'square' | 'rounded';
    /**
     * ClassName to extended css
     */
    className?: string;
    /**
     * disabling the input
     */
    disabled?: boolean;
    /**
     * onChange event handling
     */
    onChange?: any;

    name?: any;

    value?: string;

    isErrors?: boolean;
}

export type {
    IInputProps
}