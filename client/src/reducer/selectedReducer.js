import { SET_SELECTED, EMPTY_SELECTED } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_SELECTED:
            return [ ...action.payload ];
        case EMPTY_SELECTED:
            return [];
        default:
            return state;
    }
}