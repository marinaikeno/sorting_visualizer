import {
    SET_ARRAY,
    SET_SWAP,
    EMPTY_SWAP,
    SET_SELECTED,
    EMPTY_SELECTED,
    SET_SORTED
} from '../types';
import Queues from './Queues';

export const queueMergeSort = (arr) => {
    let queues = new Queues();
    let idValPair = arr.map((val, idx) => {
        return { val, idx }
    });

    let tree = new BST();
    tree.insert(-1)
    
    let queueing = [];
    for (let i=0; i < Math.log2(arr.length); i++) {
        const temp = { idxList: [], sorted: [] };
        queueing.push(temp);
    }

    mergeSort(idValPair, queues, tree.root, queueing);

    for (let i=queueing.length-1; i>=0; i--) {
        for (let queued of queueing[i].idxList) {
            queues.addToQueue(SET_SWAP, queued);
        }

        queues.addToQueue(EMPTY_SWAP);

        queues.addToQueue(SET_SELECTED, queueing[i].sorted.map(pair => pair.idx));
        queues.addToQueue(SET_ARRAY, queueing[i].sorted.map(pair => pair.val));
        if (i == 0) {
            queues.addToQueue(SET_SORTED, queueing[i].sorted.map(pair => pair.idx));

        } else {
            queues.addToQueue(EMPTY_SELECTED);
        }
    }

    return queues.list;
}

function merge(arr1, arr2, level, queueing) {
    let result = [];
    let idx1 = 0;
    let idx2 = 0;
    let count = 0;


    while (result.length < arr1.length + arr2.length) {
        if (!queueing[level].idxList[count]) {
            queueing[level].idxList[count] = [];
        }

        let arr1Pair = arr1[idx1];
        let arr2Pair = arr2[idx2];

        if (arr1Pair) queueing[level].idxList[count].push(arr1Pair.idx);
        if (arr2Pair) queueing[level].idxList[count].push(arr2Pair.idx);

        if (idx1 >= arr1.length || (arr1Pair && arr2Pair && arr1Pair.val > arr2Pair.val)) {
            result.push(arr2[idx2]);
            idx2++;
        } else if (idx2 >= arr2.length || (arr1Pair && arr2Pair && arr1Pair.val < arr2Pair.val)) {
            result.push(arr1[idx1]);
            idx1++;
        }
        count++;
    }

    queueing[level].sorted = queueing[level].sorted.concat(result);
    
    return result;
}

function mergeSort(arr, queues, selected, queueing) {
    if (arr.length <= 1) return arr;

    let level = selected.level + 1;
    
    selected.left = new Node(level);
    selected.right = new Node(level);

    const half = Math.floor(arr.length/2);
    let left = arr.slice(0, half);
    let right = arr.slice(half, arr.length);

    return merge(mergeSort(left, queues, selected.left, queueing), mergeSort(right, queues, selected.right, queueing), level, queueing);

}

class Node {
    constructor(val) {
        this.level = val;
        this.left = null; 
        this.right = null; 
    }
}

class BST {
    constructor() {
        this.root = null; // first node of the BST
    }
}

BST.prototype.insert = function (val) {
    let current = this.root;
    const newNode = new Node(val);
    if (!this.root) {
        this.root = newNode;
    }

    while (current) {
        if (val > current.level) {
            if (!current.right) {
                current.right = newNode;
                break;
            } else {
                current = current.right;
            }
        } else {
            if (!current.left) {
                current.left = newNode;
                break;
            } else {
                current = current.left;
            }
        }
    }

    return;
}