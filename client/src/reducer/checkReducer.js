import { SORT_COMPLETED } from '../actions/types';

export default (state = false, action) => {
    switch (action.type) {
        case SORT_COMPLETED:
            return action.payload;
        default:
            return state;
    }
}