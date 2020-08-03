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
