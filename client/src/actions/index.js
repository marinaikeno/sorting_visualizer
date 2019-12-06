import { queueBubbleSort, queueSelectionSort, queueInsertionSort, queueShellSort, queueHeapSort } from './queues/queueSorts';
import { queueMergeSort } from './queues/queueMergeSort';
import { SET_ARRAY, EMPTY_HIGHLIGHTED, EMPTY_SELECTED, EMPTY_SWAP, EMPTY_SORTED, SORT_COMPLETED } from './types';

let time = 60;

export const bubbleSort = () => (dispatch, getState) => {
    let arr = [...getState().array];
    let queueList = queueBubbleSort(arr);
    queueDispatch(queueList, dispatch, time);
}

export const selectionSort = () => (dispatch, getState) => {
    let arr = [...getState().array];
    let queueList = queueSelectionSort(arr);
    queueDispatch(queueList, dispatch, time);
}

export const insertionSort = () => (dispatch, getState) => {
    let arr = [...getState().array];
    let queueList = queueInsertionSort(arr);
    queueDispatch(queueList, dispatch, time);
}

export const shellSort = () => (dispatch, getState) => {
    let arr = [...getState().array];
    let queueList = queueShellSort(arr);
    queueDispatch(queueList, dispatch, time);
}

export const heapSort = () => (dispatch, getState) => {
    let arr = [...getState().array];
    let queueList = queueHeapSort(arr);
    queueDispatch(queueList, dispatch, time);
}

export const mergeSort = () => (dispatch, getState) => {
    let arr = [...getState().array];
    let queueList = queueMergeSort(arr, dispatch);
    queueDispatch(queueList, dispatch, time);
}

export const generateUnsorted = () => (dispatch) => {
    let arr = createUnsorted();
    dispatch({ type: EMPTY_HIGHLIGHTED });
    dispatch({ type: EMPTY_SELECTED });
    dispatch({ type: EMPTY_SWAP });
    dispatch({ type: EMPTY_SORTED });
    dispatch({ type: SORT_COMPLETED, payload: false });
    dispatch({ type: SET_ARRAY, payload: arr });
}

const queueDispatch = (queueList, dispatch, speed) => {
    if (!queueList.length) {
        dispatch({ type: SORT_COMPLETED, payload: true });
        return;
    }

    let queue = queueList.shift();
    dispatch(queue);
    
    setTimeout(() => {
        queueDispatch(queueList, dispatch, speed);
    }, speed);
}

const createUnsorted = () => {
    let arr = [];
    for (let i = 1; i <= 100; i += 3.125) {
        arr.push(i);
    }
    console.log("length: " + arr.length);
    for (let j = 0; j < arr.length; j++) {
        let rand = Math.floor(Math.random() * (arr.length - 1));
        let temp = arr[rand];
        arr[rand] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

