import {
    SET_ARRAY,
    SET_SELECTED,
    EMPTY_SELECTED,
    SET_SORTED,
    SET_HIGHLIGHTED,
} from '../types';
import Queues from './Queues';
import { BST, Node } from './BinaryTree';

export const queueQuickSort = (arr) => {
    let queues = new Queues();

    let queueing = [];

    let tree = new BST();
    tree.insert(0);

    quickSort([...arr], tree.root, queueing, 0, arr.length);

    let prevSorted = [...arr];

    for (let i = 0; i < queueing.length; i++) {
        queues.addToQueue(SET_HIGHLIGHTED, queueing[i].pivotList);

        while (queueing[i].idxList.length) {
            let queued = queueing[i].idxList.shift();

            const { resultArr, swapColor, pivotColor, pivotAfter } = queued;

            // created current array
            for (let result of resultArr) {
                if (result.arr.length == 1) {
                    queues.addToQueue(SET_SORTED, [result.start])
                };

                prevSorted.splice(result.start, result.arr.length, ...result.arr);
            }

            if (pivotColor.length) {
                queues.addToQueue(SET_HIGHLIGHTED, pivotColor);
            }

            if (swapColor.length) {
                queues.addToQueue(SET_SELECTED, swapColor);
            }

            queues.addToQueue(SET_ARRAY, [...prevSorted]);

            if (pivotAfter.length) {
                queues.addToQueue(SET_SORTED, pivotAfter);
            }
        }

        queues.addToQueue(EMPTY_SELECTED);
    }

    return queues.list;
}

function quickSort(arr, parentNode, queueing, start, end) {
    if (!queueing[parentNode.level]) {
        queueing[parentNode.level] = { pivotList: [], idxList: [] };
    }

    if (arr.length <= 1) {
        queueing[parentNode.level].idxList.push({ 
                resultArr: [{ arr, start }],
                swapColor: [],
                pivotColor: [],
                pivotAfter: []
            });

        return arr;
    }

    let level = parentNode.level + 1;

    parentNode.left = new Node(level);
    parentNode.right = new Node(level);

    queueing[parentNode.level].pivotList.push(start);

    const pivot = arr[0];
    let pivotIdx = 0;
    let greaterEnd = 0;
    let left = [];
    let right = [];
    let arr2 = [...arr];

    for (let i = 1; i < arr.length; i++) {
        if (!queueing[parentNode.level].idxList[i - 1]) {
            queueing[parentNode.level].idxList[i - 1] = {
                resultArr: [],
                swapColor: [],
                pivotColor: [],
                pivotAfter: []
            };
        }

        queueing[parentNode.level].idxList[i - 1].swapColor.push(i+start);
        queueing[parentNode.level].idxList[i - 1].swapColor.push(pivotIdx + start);
        queueing[parentNode.level].idxList[i - 1].pivotColor.push(pivotIdx + start);
        if (arr[i] < pivot) {
            left.push(arr[i]);
            let temp = arr2[i];
            let sliced = arr2.slice(pivotIdx, pivotIdx+greaterEnd+1);
            arr2[pivotIdx] = temp;
            pivotIdx = i - greaterEnd;

            arr2.splice(pivotIdx, sliced.length, ...sliced);
            queueing[parentNode.level].idxList[i - 1].resultArr.push({
                start,
                arr: [...arr2]
            })
        } else {
            greaterEnd++;
            right.push(arr[i]);
        }

        if (i == arr.length-1) {
            var updatedPivotIdx = start + left.length;
            queueing[parentNode.level].idxList[i - 1].pivotAfter.push(updatedPivotIdx)
        }

    }

    return quickSort(left, parentNode.left, queueing, start, updatedPivotIdx - 1).concat(arr[0], quickSort(right, parentNode.right, queueing, updatedPivotIdx+1, end));
}