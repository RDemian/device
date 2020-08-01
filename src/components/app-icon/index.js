import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import './styles.scss';

export const AppIcon = ({ imgSrc, name, moveCard, index, arrId }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'box',
        drop(item, monitor) {
            const dragIndex = item.index;
            const dragCard = item.arrId;
            const dropIndex = index;
            const dropCard = arrId;

            return { dragIndex, dragCard, dropIndex, dropCard }
        }
    })

    const [, drag] = useDrag({
        item: { type: 'box', index, arrId },
        end: (item, monitor) => {
            const param = monitor.getDropResult();
            moveCard(param);
        },
    })

    drag(drop(ref))

    return (
        <div ref={ref} className='AppIcon'>
            <img className='AppIcon__img' src={imgSrc} alt='' width='50' height='50' />
            <div className='AppIcon__name'>{name}</div>
        </div>
    )
}

AppIcon.defaultProps = {
    moveCard: ()=>{},
}

AppIcon.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    moveCard: PropTypes.func,
    index: PropTypes.number.isRequired,
    arrId: PropTypes.number.isRequired,
}
