import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Screen } from 'components/screen';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop } from 'react-dnd';
import apps from './apps-data.json';
import './styles.scss';

const ELEM_COUNT = 20;

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

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
};

export class Device extends React.Component {
    sliderInstance = React.createRef();
    state = {
        screenApps: getScreenArray(apps),
    }

    changeSlide = () => {
        const { slickNext } = this.sliderInstance?.current;
        typeof slickNext === 'function' && slickNext();
    }

    swapArray = function (arr, params) {
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

    moveCard = (params) => {
        const { screenApps } = this.state;
        const newArr = this.swapArray(screenApps, params);
        
        if (newArr === screenApps) return null;
        
        this.setState(
            {
                screenApps: newArr,
            }
        );
    }

    render() {
        const { screenApps } = this.state;
        return (
            <div className='Device'>
                <div className='Device__display'>
                    <div className='Device__side'>{'<'}</div>
                    <div className='Device__sliderWrap'>
                        <DndProvider backend={HTML5Backend}>
                            <Slider className='Slider' ref={this.sliderInstance} {...settings}>
                                {screenApps.map((elems, i) => {
                                    return <Screen key={i} arrId={i} apps={elems} moveCard={this.moveCard} />
                                })}
                            </Slider>
                        </DndProvider>
                    </div>
                    <div className='Device__side' onMouseEnter={(el)=>{
                        console.log("Device -> render -> el=", el.target);
                    }}>{'>'}</div>
                </div>
            </div>
        )
    }
}