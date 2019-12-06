import { SET_ARRAY } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_ARRAY:
            return [...action.payload];
        default:
            return state;
    }
}