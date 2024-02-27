import { IdropdownCardsProps } from "./dropdownCards";

interface IDropdownMenu extends IdropdownCardsProps {
    /**
     * className to extend the style
     */
    className?: string;
    /**
     * onMouseEnter event
     */
    onMouseEnter?: React.MouseEventHandler
    /**
     * onMouseLeave Event
     */
    onMouseLeave?: React.MouseEventHandler
}

export type {
    IDropdownMenu
}