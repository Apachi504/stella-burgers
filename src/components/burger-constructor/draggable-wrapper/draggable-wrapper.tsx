import {sortIngredients} from "../../../services/burger-constructor/burger-constructor-slice";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {useDispatch} from "../../../services/store";
import {FC, useRef} from "react";
import styles from "./draggable-wrapper.module.scss";
import {TDraggableWrapper, TDragItem} from "./types";


export const DraggableWrapper: FC<TDraggableWrapper> = ({children, id, index}) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    const [{ isDragging }, drag] = useDrag<TDragItem, void, { isDragging: boolean }>({
        type: "sortElement",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop<TDragItem>({
        accept: "sortElement",
        hover(item:TDragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(
                sortIngredients({ dragIndex: dragIndex, hoverIndex: hoverIndex })
            );
            item.index = hoverIndex;
        },
    });
    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));
    return (
        <li
            className={styles.content}
            style={{ opacity: opacity }}
            ref={ref}
            draggable
        >
            {children}
        </li>
    );
}