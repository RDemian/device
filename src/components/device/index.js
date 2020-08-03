import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useDrop } from 'react-dnd';
import { setToStorage, getFromStorage } from 'helpers';
import { Screen } from 'components/screen';
import { DeviceMenu } from 'components/device-menu';
import { randomInteger } from 'helpers';
import apps from './apps-data.json';
import './styles.scss';

const ELEM_COUNT = 20;
const RANDOM_COUNT = 4;
const mqTablet = '(min-width: 768px)';
const MOBILE_KEY = 'mobile_key';
const TABLET_KEY = 'tablet_key';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
};

const getScreenArray = (arr) => {
    const isTablet = window.matchMedia(mqTablet).matches;
    const currKey = isTablet ? TABLET_KEY : MOBILE_KEY;
    const localData = getFromStorage(currKey);
    
    if (Array.isArray(localData) && localData.length) return localData;
    
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

const swapArray = (arr, params) => {
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
    let canSlide = true;
    const setCanSlide = (val) => {
        canSlide = val;
    }
    
    const handleMediaChange = useCallback((mql) => {
        setAppsArray(getScreenArray(apps, mql.matches))
    }, [])

    useEffect(()=>{
        const tabletQuery = window.matchMedia(mqTablet);
        tabletQuery.addListener(handleMediaChange);

        return () => {
            tabletQuery.removeListener(handleMediaChange);
        }
    }, [handleMediaChange]);
    
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

        const isTablet = window.matchMedia(mqTablet).matches;
        setToStorage(isTablet ? TABLET_KEY : MOBILE_KEY , newArr);
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