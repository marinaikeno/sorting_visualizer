export class BST {
    constructor() {
        this.root = null;
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

export class Node {
    constructor(val) {
        this.level = val;
        this.left = null;
        this.right = null;
    }
}