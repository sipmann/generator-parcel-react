import { createStore } from 'redux';

export const defaultState = {
    
};

const basicReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default createStore(basicReducer, defaultState);