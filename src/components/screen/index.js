import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { AppIcon } from 'components/app-icon';
import './styles.scss';

export const Screen = ({apps, arrId, moveCard, setCanSlide}) => {
    const [, drop] = useDrop({
        accept: 'box',
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) return;
            const dragIndex = item.index;
            const dragCard = item.arrId;
            const dropIndex = null;
            const dropCard = arrId;
            
            return {dragIndex, dragCard, dropIndex, dropCard}
        },
        hover: () => {
            setCanSlide(true);
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    })

    return (
        <div className='Screen' ref={drop}>
            {apps.map((item, index) => {
                const { id, name } = item;
                
                return (
                    <AppIcon
                        key={id}
                        name={name}
                        index={index}
                        arrId={arrId}
                        moveCard={moveCard}
                        isDrag={true}
                    />
                )
            })}
        </div>
    )
}

Screen.defaultProps = {
    apps: [],
    moveCard: () => {},
}

Screen.propTypes = {
    apps: PropTypes.array,
    arrId: PropTypes.number.isRequired,
    moveCard: PropTypes.func,
    setCanSlide: PropTypes.func.isRequired,
}
