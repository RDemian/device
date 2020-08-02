import React, { useState, useRef, useMemo } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useDrop } from 'react-dnd';

import { Screen } from 'components/screen';
import { DeviceMenu } from 'components/device-menu';
import { randomInteger } from 'helpers';
import apps from './apps-data.json';
import './styles.scss';

const ELEM_COUNT = 20;
const RANDOM_COUNT = 4;

const getScreenArray = (arr) => {
    const result = [];
    let tempArr = [];
    arr.forEach(curr => {
        if (tempArr.length === ELEM_COUNT) {
            result.push([...tempArr]);
            tempArr = [];
        }
        tempArr.push(curr);
    });
    if (tempArr.length > 0) {
        result.push([...tempArr]);
    }
    result.push([]);
    return result;
}

const getRandomApp = (arr) => {
    const randomValue = randomInteger(0, arr.length - RANDOM_COUNT);
    return arr.slice(randomValue, randomValue + RANDOM_COUNT);
}

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
};

const swapArray = function (arr, params) {
    const { dragIndex, dragCard, dropIndex, dropCard } = params;
    const culcDropIndex = dropIndex === null ? arr[dropCard].length : dropIndex;
    const dragElem = arr[dragCard][dragIndex];
    const dropEl = arr[dropCard][culcDropIndex];
    
    if (dragElem === dropEl) return arr;

    if (dropEl) {
        arr[dragCard][dragIndex] = dropEl;
        arr[dropCard][dropIndex] = dragElem;
    } else if (arr[dropCard].length < ELEM_COUNT) {
        arr[dropCard][culcDropIndex] = dragElem;
        arr[dragCard].splice(dragIndex, 1);
    } else {
        return arr;
    }
    
    return [...arr];
}

export const Device = () => {
    const sliderInstance = useRef(null);
    const [appsArray, setAppsArray] = useState(useMemo(()=>getScreenArray(apps), []));
    const randomArray = useMemo(()=>getRandomApp(apps), []);
    console.log("Device -> randomArray=", randomArray)
    let canSlide = true;
    const setCanSlide = (val) => {
        canSlide = val;
    }

    const changeSlide = (isNext) => {
        const { slickNext, slickPrev } = sliderInstance?.current;
        if (isNext) {
            typeof slickNext === 'function' && slickNext();
        } else {
            typeof slickPrev === 'function' && slickPrev();
        }
        
    }

    const moveCard = (params) => {
        const newArr = swapArray(appsArray, params);
        
        if (newArr === appsArray) return null;
        
        setAppsArray(newArr);
    }

    const [, leftArrow] = useDrop({
        accept: 'box',
        hover: () => {
            if (canSlide) {
                changeSlide(false);
                canSlide = false;
            }
        },
        canDrop: () => {
            return false
        },
    });

    const [, rightArrow] = useDrop({
        accept: 'box',
        hover: () => {
            if (canSlide) {
                changeSlide(true);
                canSlide = false;
            }
        },
        canDrop: () => {
            return false
        },
    });

    return (
        <div className='Device'>
            <div className='Device__display'>
                <div className='Device__top'>123456</div>
                <div className='Device__mid'>
                    <div className='Device__side' ref={leftArrow} >{'<'}</div>
                    <div className='Device__sliderWrap'>
                        <Slider className='Slider' ref={sliderInstance} {...settings}>
                            {appsArray.map((elems, i) => {
                                return <Screen key={i} arrId={i} apps={elems} moveCard={moveCard} setCanSlide={setCanSlide} />
                            })}
                        </Slider>
                    </div>
                    <div className='Device__side' ref={rightArrow} >{'>'}</div>
                </div>
                <div className='Device__bottom'>
                    <DeviceMenu apps={randomArray}/>
                </div>
            </div>
        </div>
    )
}