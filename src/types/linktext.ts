interface ILinkText {
    /**
     * color of the text
     */
    color?: string;
    /**
     * text content
     */
    text: string;
    size?: 'small' | 'medium' | 'large';
    href: string;
}

export type {
    ILinkText
}