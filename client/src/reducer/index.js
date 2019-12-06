import { combineReducers } from "redux";
import selectedReducer from './selectedReducer';
import swapReducer from './swapReducer';
import sortedReducer from './sortedReducer';
import arrayReducer from './arrayReducer';
import highlightedReducer from "./highlightedReducer";
import checkReducer from './checkReducer';

export default combineReducers({
    array: arrayReducer,
    selected: selectedReducer,
    sorted: sortedReducer,
    swaped: swapReducer,
    highlighted: highlightedReducer,
    checkSorted: checkReducer
});