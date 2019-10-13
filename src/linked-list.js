const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        this._myFunctions = 
        { 
            searchAtIndex: ((index => {
                if (index >= 0) {
                    let i = 0;
                    let node = this._head;
                    while(i < index) {
                    node = node.next;
                    i++;
                    }
                    return node;
                } else {
                    return null;
                }
            }))
        };
    }

    append(data) {
        let node = new Node(data);
        if(this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        else {
            this._head=node;
            this._tail=node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        if (index >= 0 & index <= this.length-1) {
            let result = this._myFunctions.searchAtIndex(index);
            return result.data;
        } else {
            return 'Заданного индекса нет в списке. ' +
            `Последний индекс: ${this.length - 1}`;
        }
    }

    insertAt(index, data) {
        if(index === this.length) {
            return this.append(data);
        } else {
            let prevNode = this._myFunctions.searchAtIndex(index - 1);
            let currentNode = this._myFunctions.searchAtIndex(index);
            let newNode = new Node(data);
            newNode.next = currentNode;
            prevNode.next = newNode;
            currentNode.prev = newNode;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        } 
    }

    clear() {
        this._head.data = null;
        this._tail.data = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let prevNode = this._myFunctions.searchAtIndex(index - 1);
        let currentNode = this._myFunctions.searchAtIndex(index);
        let nextNode = this._myFunctions.searchAtIndex(index + 1);
        if (index === 0) {
          if (nextNode) {
            nextNode.prev = null;
            currentNode = nextNode;
            currentNode = this._head;
          } else {
            this._head.data = null;
            this._tail.data = null;
            this.length = 0;
            return this;
          }
        } else if (index === this.length - 1) {
          if(prevNode) {
            prevNode.next = null;
            currentNode = prevNode;
            currentNode = this._tail;
          } else {
            this._head.data = null;
            this._tail.data = null;
            this.length = 0;
            return this;
          }
        } else {
          nextNode.prev = prevNode;
          prevNode.next = nextNode;
          currentNode = nextNode;
        }
    
        this.length--;
        return this;
    }

    reverse() {
        let node = this._head;
        let memoryNext = null;
        let memoryPrev = null;
        let memoryHead = this._head;
        let memoryTail = this._tail;
        for (let i = 0; i < this.length; i++) {
            memoryNext = node.next;
            memoryPrev = node.prev;
            node.prev = memoryNext;
            node.next = memoryPrev;
            node = memoryNext;
        }
        this._head = memoryTail;
        this._tail = memoryHead;
        return this;
    }

    indexOf(data) {
        let node = this._head;
        let i = 0;
        let result = null;
        while(i < this.length) {
            if (node.data === data){
            result = i;
            return result;
            } 
            node = node.next;
            i++;
        }
        if (result === null) {
            return -1;
        }
    }
}

module.exports = LinkedList;
