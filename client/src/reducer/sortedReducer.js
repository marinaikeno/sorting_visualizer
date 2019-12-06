import { SET_SORTED, EMPTY_SORTED } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_SORTED:
            return state.concat(action.payload);
        case EMPTY_SORTED:
            return [];
        default:
            return state;
    }
}