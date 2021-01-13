export const loadState = (state) => {
    try {
        const serializedState = localStorage.getItem(state);
        if ( serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);

    } catch (err) {
        return undefined;
    }
}

export const saveState = (name, state) => {
    try {
        const serializState = JSON.stringify(state);
        localStorage.setItem(name, serializedState);
        
    } catch (err) {
        // ignore errors
    }
}