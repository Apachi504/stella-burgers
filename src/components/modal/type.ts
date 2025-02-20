import {ReactNode} from "react";

export type TModal={
    title: string,
    onClose: () => void,
    children?: ReactNode
}