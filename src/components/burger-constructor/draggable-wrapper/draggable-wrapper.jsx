import {sortIngredients} from "../../../services/burger-constructor/burger-constructor-slice.js";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {useRef} from "react";
import PropTypes from "prop-types";
import styles from "./draggable-wrapper.module.scss";

export const DraggableWrapper = ({children, id, index}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: "sortElement",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: "sortElement",
        hover(item, monitor) {
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
    const opacity = isDragging ? 0 : 1;
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
DraggableWrapper.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    index: PropTypes.number
};