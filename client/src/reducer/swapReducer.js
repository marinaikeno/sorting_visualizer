import { SET_SWAP, EMPTY_SWAP } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_SWAP:
            return [...action.payload];
        case EMPTY_SWAP:
            return [];
        default:
            return state;
    }
}