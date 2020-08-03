export const randomInteger = (min, max) => {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const getFromStorage = key => {
    try {
        if (!key) return;
        let data = localStorage.getItem(key);
        data = JSON.parse(data);
        return data;
    } catch (e) {
        console.log('Nothing in storage');
        return null;
    }
};

export const setToStorage = (key, value) => {
    if (!key || !value) return;
    localStorage.setItem(key, JSON.stringify(value))
};

export const ELEM_COUNT = 20;
export const RANDOM_COUNT = 4;
export const MOBILE_KEY = 'mobile_key';
export const TABLET_KEY = 'tablet_key';

export const MQ_TABLET = '(min-width: 768px)';
export const isMatch = (MQ) => window.matchMedia(MQ).matches;

export const getScreenArray = (arr, isTablet) => {
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

export const getRandomApp = (arr) => {
    const randomValue = randomInteger(0, arr.length - RANDOM_COUNT);
    return arr.slice(randomValue, randomValue + RANDOM_COUNT);
}

export const swapArray = (arr, params) => {
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
