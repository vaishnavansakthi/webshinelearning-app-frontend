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
    onChange?: () => void;
    /**
     * isError to check error
     */
    isError?: boolean;
    /**
     * errorMessage is to load errormeassage
     */
    errorMessage?: any;

    name?: string;
}

export type {
    IInputProps
}