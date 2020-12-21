class Node {
    constructor(element, parent) {
        this.element = element
        this.parent = parent
        this.left = null
        this.right = null
    }

    addNode(node) {
        if (node.element < this.element) {
            if (this.left !== null) {
                this.left.addNode(node)
            } else {
                this.left = node
                node.parent = this
            }
        } else if (node.element > this.element) {
            if (this.right !== null) {
                this.right.addNode(node)
            } else {
                this.right = node
                node.parent = this
            }
        }
    }

    printNode() {
        console.log(this.element)
        if (this.left !== null) {
            this.left.printNode()
        }

        if (this.right !== null) {
            this.right.printNode()
        }
    }

}

class BST {
    constructor() {
        this.root = null
        this.size = 0
    }
    addNode(node) {
        if (this.root === null) {
            this.root = node
            this.size++
        } else {
            this.root.addNode(node)
            this.size++
        }
    }
    addElement(element) {
        let node = new Node(element, null)
        this.addNode(node)
    }

    printTree() {
        if (this.root !== null) {
            this.root.printNode()
        }
    }
}

let bst = new BST()
let arr = [10, 8, 19, 6, 15, 22, 20]
arr.forEach(element => {
    bst.addElement(element)
})

bst.printTree()
