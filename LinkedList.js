class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(value) {
        const node = new Node(value);
        if(!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            let currentNode = this.tail;
            currentNode.next = node;
            this.tail = node    
        }
    }
  
    prepend(value) {
    const newNode = new Node(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
    newNode.next = this.head;
    this.head = newNode;
    }
    
    size() {
        let currentNode = this.head;
        let count = 0;
        while(currentNode) {
            count+= 1;
            currentNode = currentNode.next;   //Making the next node the current node, thereby moving forward in the list
        }
        console.log("The size of the list is : ",count)
        return size;
    }
    
    getHead() {
        console.log("The head node is : ",this.head)
        return this.head;
    }
    
    getTail() {
        console.log("The tail node is : ",this.tail);
        return this.tail
    }
    at(index) {
        let currentNode = this.head;
        let count = 0;
        while(count<index) {
            count+= 1;
            currentNode = currentNode.next;
        }
        console.log(`The node in index ${index} is`, currentNode)
        return currentNode;
    }
    pop() {
        if(!this.head) {
            console.log("List is empty POP cannot be done!")
            return;
        }
        if(!this.head.next) {
            console.log("Popped node is : ",this.head);
            return;
        }
        let currentNode = this.head;
        while(currentNode.next.next) {  //loop till you find null, but stop before the last node.
            currentNode = currentNode.next;
        }
        const poppedNode = currentNode.next
        currentNode.next = null;
        console.log("Popped node is : ",poppedNode);
    }
    contains(value) {
        let currentNode = this.head;
        while(currentNode) {
            if(currentNode.value === value) {
                console.log("The value exists");
                return true;
            }
            currentNode = currentNode.next;
        }
        console.log("The value does not exists");
        return false;
    }
    find(value) {
        let currentNode = this.head;
        let count = 0;
        while(currentNode) {
            if(currentNode.value === value) {
                console.log("The value found in index ",count);
                return count;
            }
            currentNode = currentNode.next;
            count++;
        }
        console.log("The value is not in the list or check your input");
        return null;
    }
    toString() {
        let currentNode = this.head;
        let string = ""
        if(!this.head) {
            console.log("Sorry! But your list is empty.");
            return null;
        }
        while(currentNode) {
            string = string + `${currentNode.value} =>`;
            currentNode = currentNode.next   //Making the next node the current node, thereby moving forward in the list
        }
        string+= "null";
        console.log("The List is : ",string);
        return string;
    }
}

class Node {
    constructor(value, next=null) {
        this.value = value;
        this.next = next;
    }
}

const list = new LinkedList();

//Below are the methods that can be done in the abouve linked list
list.append('mini')      //Appends a node to the end of the list
list.prepend('das')      //Adds a node to the start of the list
list.append("123")
list.prepend("abcd")
list.size()              //Returns the size of the list
list.getHead()            //Returns the head node
list.getTail()            //Returns the tail node
list.at(0)               //Returns the node at the given index
list.pop()                //Performs POP in the list
list.contains("123")     //Checks whether the value passed exist in the list or not
list.find("das")        //Returns the index of the passed value
list.toString();        //Returns the list in string for a visual representation
