import {
        SET_ARRAY, 
        SET_SWAP, 
        EMPTY_SWAP, 
        SET_SELECTED, 
        EMPTY_SELECTED, 
        SET_SORTED,
        SET_HIGHLIGHTED,
        EMPTY_HIGHLIGHTED
    } from '../types';

import Queues from './Queues';

export const queueBubbleSort = (arr) => {
    let queues = new Queues();

    for (let i = 0; i < arr.length; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            queues.addToQueue(SET_SELECTED, [j, j - 1]);
            if (arr[j] < arr[j - 1]) {
                queues.addToQueue(SET_SWAP, [j, j - 1]);
                const temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
                queues.addToQueue(SET_ARRAY, [...arr]);
                queues.addToQueue(EMPTY_SWAP);
            }
            queues.addToQueue(EMPTY_SELECTED);
        }
        queues.addToQueue(SET_SORTED, [i]);
    }

    return queues.list;
}

export const queueSelectionSort = (arr) => {
    let queues = new Queues();

    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            queues.addToQueue(SET_HIGHLIGHTED, [min]);
            queues.addToQueue(SET_SELECTED, [j]);
            if (arr[j] < arr[min]) {
                min = j;
            }
            queues.addToQueue(EMPTY_SELECTED);
        }

        if (min != i) {
            queues.addToQueue(SET_SWAP, [min, i]);
            const temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
            queues.addToQueue(SET_ARRAY, [...arr]);
            queues.addToQueue(EMPTY_SWAP);
        }
        queues.addToQueue(SET_SORTED, [i]);
    }

    return queues.list;
}

export const queueInsertionSort = (arr) => {
    let queues = new Queues();

    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        let idx = i - 1;
        while (idx >= 0 && arr[idx] > el) {
            queues.addToQueue(SET_SWAP, [idx, idx + 1]);
            arr[idx + 1] = arr[idx];
            queues.addToQueue(SET_ARRAY, [...arr]);
            queues.addToQueue(EMPTY_SWAP);
            idx--;
        }

        queues.addToQueue(SET_SELECTED, [idx + 1]);
        arr[idx + 1] = el;
        queues.addToQueue(SET_ARRAY, [...arr]);
        queues.addToQueue(EMPTY_SELECTED);
    }

    queues.addToQueue(SET_SORTED, arr.map((val, idx) => {
        return idx;
    }));

    return queues.list;
}

export const queueShellSort = (arr) => {
    let queues = new Queues();
    let length = arr.length;

    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < length; i++) {
            const el = arr[i];
            let idx = i;

            while (idx >= gap && arr[idx - gap] > el) {
                queues.addToQueue(SET_SWAP, [idx, idx - gap]);

                arr[idx] = arr[idx - gap];
                queues.addToQueue(SET_ARRAY, [...arr]);
                queues.addToQueue(EMPTY_SWAP);
                idx -= gap;
            }

            queues.addToQueue(SET_SELECTED, [idx]);
            arr[idx] = el;
            queues.addToQueue(SET_ARRAY, [...arr]);
            queues.addToQueue(EMPTY_SELECTED);
        }
    }
    queues.addToQueue(SET_SORTED, arr.map((val, idx) => {
        return idx;
    }));

    return queues.list;
}

export const queueHeapSort = (arr) => {
    let queues = new Queues();

    function heapify(nodeIdx, sortedLength) {
        let max = nodeIdx; // index of node with max value. intial is set to node
        const left = 2 * nodeIdx + 1; // index of its left child node
        const right = 2 * nodeIdx + 2; // index of its right child node
        queues.addToQueue(SET_HIGHLIGHTED, [max, left, right]);
        if (left < sortedLength && arr[left] > arr[max]) {
            // if left index is less than the length of the sorted side and the left child node value is greater
            max = left; // set max to left child node index
        }

        if (right < sortedLength && arr[right] > arr[max]) {
            // if right index is less than the length of the sorted side, and its value is greater than the current max (either node value or left)
            max = right;
        }

        if (max !== nodeIdx) {
            queues.addToQueue(SET_SWAP, [nodeIdx, max]);

            const temp = arr[nodeIdx];
            arr[nodeIdx] = arr[max];
            arr[max] = temp;

            queues.addToQueue(SET_ARRAY, [...arr]);
            queues.addToQueue(EMPTY_SWAP);

            heapify(max, sortedLength);
        }
    }

    let length = arr.length; // length of the array

    for (let i = Math.floor((arr.length - 1) / 2); i >= 0; i--) {
        // Math.floor((arr.length-1)/2) (calculates the last node with children)
        heapify(i, length);
    }

    // swap the first index with the first index of the sorted side
    for (let j = arr.length - 1; j >= 0; j--) {
        queues.addToQueue(SET_SELECTED, [0, j]);
        const temp = arr[j];
        arr[j] = arr[0];
        arr[0] = temp;

        queues.addToQueue(SET_ARRAY, [...arr]);
        queues.addToQueue(EMPTY_SELECTED);
        queues.addToQueue(SET_SORTED, [j]);
        length--; // update the length of the sorted side
        heapify(0, length); // run heapify on first node until the last index of sorted side
    }

    return queues.list;
}

