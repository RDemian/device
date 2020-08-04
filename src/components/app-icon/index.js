import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import './styles.scss';

export const AppIcon = ({ name, moveCard, index, arrId, isDrag, isLight, hasPopup }) => {
    const ref = useRef(null);
    const imgSrc = `/images/icons/${name}`;
    const [isPopupShow, setPopupShow] = useState(false);
    
    const togglePopup = () => {
        if (hasPopup) {
            setPopupShow(!isPopupShow);
        }
    }

    useEffect(() => {
        const handleClick = () => setPopupShow(false);
        
        if (isPopupShow)  {
            document.addEventListener("click", handleClick);
        } else {
            document.removeEventListener("click", handleClick);  
        }
    
        return function() {
            document.removeEventListener("click", handleClick);
        };
    });

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
            if (param) moveCard(param);
        },
    })

    if (isDrag) drag(drop(ref))
    
    return (
        <div ref={ref} className='AppIcon' onClick={togglePopup}>
            <img className='AppIcon__img' src={imgSrc} alt='' width='50' height='50' />
            <div className={`AppIcon__name ${isLight ? 'AppIcon__name_light' : ''}`}>{name.replace('.png', '')}</div>
            <div className={`AppIcon__popup ${isPopupShow ? 'AppIcon__popup_show' : ''}`}>
                <img className='AppIcon__img' src={imgSrc} alt='' width='50' height='50' />
            </div>
        </div>
    )
}

AppIcon.defaultProps = {
    moveCard: ()=>{},
    index: null,
    arrId: null,
    isDrag: false,
    isLight: false,
    hasPopup: false,
}

AppIcon.propTypes = {
    name: PropTypes.string.isRequired,
    moveCard: PropTypes.func,
    index: PropTypes.number,
    arrId: PropTypes.number,
    isDrag: PropTypes.bool,
    isLight: PropTypes.bool,
    hasPopup: PropTypes.bool,
}
