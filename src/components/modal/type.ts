import {ReactNode} from "react";

export type TModal={
    title?: string | null,
    onClose: () => void,
    children?: ReactNode,
    orderNumber?: string|null
}