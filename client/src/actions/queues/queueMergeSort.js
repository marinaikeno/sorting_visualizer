import {
    SET_ARRAY,
    SET_SWAP,
    EMPTY_SWAP,
    SET_SORTED
} from '../types';
import Queues from './Queues';
import { BST, Node } from './BinaryTree';

export const queueMergeSort = (arr) => {
    let queues = new Queues();
    let idValPair = arr.map((val, idx) => {
        return { val, idx }
    });

    let tree = new BST();
    tree.insert(-1)
    
    let queueing = [];
    mergeSort(idValPair, queues, tree.root, queueing);

    let prevSorted = [...idValPair];
    for (let i = queueing.length - 1; i >= 0; i--) {
        for (let queued of queueing[i].idxList) {
            const { resultList, swapIdx } = queued;

            // created current array
            for (let result of resultList) {
                prevSorted.splice(result.start, result.arr.length, ...result.arr.map(pair => pair.val));
            }

            queues.addToQueue(SET_SWAP, swapIdx);
            queues.addToQueue(SET_ARRAY, [...prevSorted]);

        }

        queues.addToQueue(EMPTY_SWAP);

        if (i == 0) {
            queues.addToQueue(SET_SORTED, prevSorted.map(pair => pair.idx));

        }
    }

    return queues.list;
}

function merge(arr1, arr2, level, start, queueing) {
    if (!queueing[level]) {
        queueing[level] = { idxList: [] };
    }
    
    let result = [];
    let idx1 = 0;
    let idx2 = 0;
    let count = 0;
    let copy1 = [...arr1];

    while (result.length < arr1.length + arr2.length) {
        if (!queueing[level].idxList[count]) {
            queueing[level].idxList[count] = {
                resultList: [],
                swapIdx: [],
                sortedIdx: []
            };
        }

        let arr1Pair = arr1[idx1];
        let arr2Pair = arr2[idx2];
        
        if (arr1Pair) queueing[level].idxList[count].swapIdx.push(start + idx1);
        if (arr2Pair) queueing[level].idxList[count].swapIdx.push(start + arr1.length + idx2);
        

        if (idx1 >= arr1.length || (arr1Pair && arr2Pair && arr1Pair.val > arr2Pair.val)) {
            result.push(arr2[idx2]);
            copy1.splice(count, 0, arr2[idx2]);
            idx2++;
        } else if (idx2 >= arr2.length || (arr1Pair && arr2Pair && arr1Pair.val < arr2Pair.val)) {
            result.push(arr1[idx1]);
            idx1++;
        }

        queueing[level].idxList[count].resultList.push({
            start,
            arr: [...copy1]
        });

        count++;
    }

    
    return result;
}

function mergeSort(arr, queues, selected, queueing) {
    if (arr.length <= 1) return arr;

    let level = selected.level + 1;
    
    selected.left = new Node(level);
    selected.right = new Node(level);
    selected.start = arr[0].idx;

    const half = Math.floor(arr.length/2);
    let left = arr.slice(0, half);
    let right = arr.slice(half, arr.length);

    return merge(mergeSort(left, queues, selected.left, queueing), mergeSort(right, queues, selected.right, queueing), level, arr[0].idx, queueing);

}