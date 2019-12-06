class Queues {
    constructor() {
        this.list = [];
    }

    addToQueue = (type, payload = null) => {
        let queue = { type, payload };
        this.list.push(queue);
    }
}

export default Queues;