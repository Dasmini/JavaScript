class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(key, value) {

        const node = new Node(key, value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            let currentNode = this.tail;
            currentNode.next = node;
            this.tail = node
        }
        // console.log(node)
    }
    size() {
        let currentNode = this.head;
        let count = 0;
        while (currentNode) {
            count += 1;
            currentNode = currentNode.next;   //Making the next node the current node, thereby moving forward in the list
        }
        console.log("The size of the list is : ", count)
    }
    delete(key) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.key === key) {
                this.head = this.head.next;
                return true
            }
            if (currentNode.next.key === key) {
                currentNode.next = currentNode.next.next;
                return true
            }
            currentNode = currentNode.next;
        }
        return false;
    }
    contains(key) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.key === key) {
                console.log("The value exists");
                return true;
            }
            currentNode = currentNode.next;
        }
        console.log("The value does not exists");
        return false;
    }
    findAndReplace(key, value) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.key === key) {
                currentNode.value = value
                return
            }
            currentNode = currentNode.next;
        }
    }
    getValue(key) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.key === key) {
                return currentNode.value
            }
        }
        return undefined
    }
    hasValue(key) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.key === key) {
                return true
            }
        }
        return false
    }

    toString() {
        let currentNode = this.head;
        let string = ""
        if (!this.head) {
            console.log("Sorry! But your list is empty.");
            return null;
        }
        while (currentNode) {
            string = string + `${currentNode.value} =>`;
            currentNode = currentNode.next   //Making the next node the current node, thereby moving forward in the list
        }
        string += "null";
        console.log("The List is : ", string);
        return string;
    }
}

class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashMap {
    constructor() {
        this.bucketSize = 16;
        this.bucketsRemaining = this.bucketSize;
        this.loadFactor = 0.75;        //the maximum buckets occupied limit
        this.store = [];
        this.numOfKeys = 0;
        this.keysArray = [];           //to keep a track of all keys
        this.valuesArray = [];         //to keep a track of all values
        this.entriesArray = []
    }

    hash(key) {                                //to generate a hash code
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.bucketSize;
    }
    set(key, value) {                       //to append a new key value pair to the hash map
        const hashCode = this.hash(key);
        if (this.store[hashCode]) {
            if (this.store[hashCode].contains(key)) {
                console.log("true")
                this.store[hashCode].findAndReplace(key, value)  //Search for the node with the same key and update the value
            } else {
                console.log("false");
                this.store[hashCode].append(key, value)

            }
        } else {

            this.store[hashCode] = new LinkedList();
            this.store[hashCode].append(key, value)   //this append is not the built-in method . Its a method in the linked list class above      
            this.bucketsRemaining = this.bucketsRemaining - 1;
            this.bucketSizeChecker()

        }
        this.numOfKeys += 1;
        this.keysArray.push(key);
        this.valuesArray.push(value);
    }
    get(key) {                               //get the value of a specific key
        const hashCode = this.hash(key);
        if (this.store[hashCode]) {
            const value = this.store[hashCode].getValue(key);
            if (value !== undefined) {
                console.log(`The value for the key "${key}" is : ${value}`);
                return value;
            } else {
                console.log("Oops! Key not found")
            }
        } else {
            console.log("Oops! Key not found")
        }

    }
    remove(key) {                              //delete a specific key and its value
        const hashCode = this.hash(key);
        if (this.store[hashCode]) {
            let isDeleted = this.store[hashCode].delete(key)
            console.log(`The key ${key} is deleted`)
            let index = this.keysArray.indexOf(key)
            if (index > -1) {
                this.keysArray.splice(index, 1);
                console.log(this.keysArray)
            }
            return isDeleted
        } else {
            console.log("key not found")
            return
        }
    }
    has(key) {                                        //to check whether the hashmap contains the specific key or not
        const hashCode = this.hash(key);
        if (this.store[hashCode]) {
            const result = this.store[hashCode].hasValue(key);
            if (result) {
                console.log("The key exists");
            } else { console.log("Key not found!") }
            return result;


        } else {
            console.log("Oops! Key not found")
        }

    }
    length() {                                               //to find the total number of keys in the hashmap
        console.log("The total number of keys are : ", this.numOfKeys)
        return this.numOfKeys
    }
    clear() {                                              //to delete all the entries of the hashmap
        this.store.length = 0;
        console.log("The hash map entries are cleared")
    }
    keys() {                                         //returns all the keys
        console.log(this.keysArray);
        return this.keys
    }
    values() {                                  //returns all the values
        console.log(this.valuesArray)
        return this.values
    }
    entries() {                                   //returns all the entries of the hashmap in a key value pair
        if (this.keysArray) {
            for (let i = 0; i < this.keysArray.length; i++) {

                const key = this.keysArray[i];
                const value = this.get(key);
                this.entriesArray[i] = [key, value]
            }
            return this.entriesArray
        } else {
            console.log("There are no entries")
        }
        return
    }

    bucketSizeChecker() {
        const percentage = (this.bucketsRemaining * 100) / this.bucketSize;
        if (percentage / 100 <= this.loadFacor) {
            this.bucketSize *= 2;
            const newStore = new Array(this.bucketSize)
            for (let i = 0; i < this.bucketSize; i++) {
                if (this.store[i]) {
                    newStore[i] = this.store[i];
                }
            }
            this.store = newStore
        }
    }
}

const hashMap = new HashMap();

hashMap.set("key1", "value")
hashMap.set("key2", "oneMore")
hashMap.set("key5", "something")
hashMap.set("apple", "Red")
hashMap.entries();
