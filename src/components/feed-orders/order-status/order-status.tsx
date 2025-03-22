import React, {FC} from 'react'

export const OrderStatus:FC<{ status: 'created' | 'pending' | 'done' }> = ({status}) => {
    let toRussian: 'Создан' | 'Готовится' | 'Выполнен';
    switch (status) {
        case 'created':
            toRussian = 'Создан';
            break;
        case 'pending':
            toRussian = 'Готовится';
            break;
        case 'done':
            toRussian = 'Выполнен';
            break;
        default:
            toRussian = 'Выполнен';
    }
    return (
        <div
            className='text text_type_main-default'
            style={toRussian === 'Выполнен' ? { color: 'rgba(0, 204, 204, 1)' } : undefined}>
            {toRussian}
        </div>
    );
}
