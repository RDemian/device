import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useDrop } from 'react-dnd';
import { setToStorage } from 'helpers';
import { Screen } from 'components/screen';
import { DeviceMenu } from 'components/device-menu';
import { Watch } from 'components/watch';
import { getScreenArray, getRandomApp, swapArray, isMatch, MQ_TABLET, MOBILE_KEY, TABLET_KEY } from 'helpers';
import apps from './apps-data.json';
import './styles.scss';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
};

export const Device = () => {
    const sliderInstance = useRef(null);
    const isTablet = isMatch(MQ_TABLET);
    const [appsArray, setAppsArray] = useState(useMemo(()=>getScreenArray(apps, isTablet), [isTablet]));
    const randomArray = useMemo(()=>getRandomApp(apps), []);
    let canSlide = true;
    const setCanSlide = (val) => {
        canSlide = val;
    }
    
    const handleMediaChange = useCallback((mql) => {
        setAppsArray(getScreenArray(apps, mql.matches))
    }, [])

    useEffect(() => {
        const mqTablet = window.matchMedia(MQ_TABLET);
        mqTablet.addListener(handleMediaChange);

        return () => {
            mqTablet.removeListener(handleMediaChange);
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

        setToStorage(isMatch(MQ_TABLET) ? TABLET_KEY : MOBILE_KEY , newArr);
    }

    const getDropSettings = (isToRight) => ({
        accept: 'box',
        hover: () => {
            if (canSlide) {
                changeSlide(isToRight);
                canSlide = false;
            }
        },
        canDrop: () => {
            return false
        },
    });

    const [, leftArrow] = useDrop(getDropSettings(false));

    const [, rightArrow] = useDrop(getDropSettings(true));

    return (
        <div className='Device' >
            <div className='Device__display'>
                <div className='Device__top'>
                    <Watch />
                </div>
                <div className='Device__mid'>
                    <div className='Device__side' ref={leftArrow} ></div>
                    <div className='Device__sliderWrap'>
                        <Slider className='Slider' ref={sliderInstance} {...settings}>
                            {appsArray.map((elems, i) => {
                                return <Screen key={i} arrId={i} apps={elems} moveCard={moveCard} setCanSlide={setCanSlide} />
                            })}
                        </Slider>
                    </div>
                    <div className='Device__side' ref={rightArrow} ></div>
                </div>
                <div className='Device__bottom'>
                    <DeviceMenu apps={randomArray}/>
                </div>
            </div>
        </div>
    )
}