interface ISvgIconProps {
    /**
     * Extending the style
     */
    className?: string;
    /**
     * Paths for SVG
     */
    paths?: {
        strokeLinecap?: "round" | "butt" | "square" | "inherit";
        strokeLinejoin?: "round" | "bevel" | "miter" | "inherit";
        d: string;
    }[];
}

export type { ISvgIconProps };
