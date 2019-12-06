import { SET_HIGHLIGHTED, EMPTY_HIGHLIGHTED } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_HIGHLIGHTED:
            return [...action.payload];
        case EMPTY_HIGHLIGHTED:
            return [];
        default:
            return state;
    }
}