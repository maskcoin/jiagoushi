class Node {
    constructor(element, next) {
        this.element = element
        this.next = next
    }
}

// 对数据的增删改查
class LinkedList {
    constructor() {
        this.head = null //链表的头
        this.size = 0 //链表的长度
    }

    add(index, element) {
        if (arguments.length === 1) {
            // 向后面添加
            element = index //如果只传一个参数 那么传入的参数就是要添加的元素
            index = this.size
        }
        if (index < 0 || index > this.size) {
            throw new Error('越界')
        }

        if (index === 0) {
            let head = this.head //以前的头
            this.head = new Node(element, head)
        } else {
            // 先找到当前索引的上一个
            let prevNode = this.getNode(index - 1)
            prevNode.next = new Node(element, prevNode.next)
        }
        this.size++
    }

    remove() {

    }

    set() {

    }

    get() {

    }

    getNode(index) {
        if (index < 0 || index > this.size) {
            throw new Error('越界')
        }
        let current = this.head //从头开始找
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }

    reverseLinkList() {
        // 传入参数要有出口，传出参数要记得赋值，整体思考
        // 单向链表反转的递归写法
        const reverse = (head) => {
            if (head === null || head.next === null) return head
            let newHead = reverse(head.next)
            head.next.next = head
            head.next = null
            return newHead
        }
        const reverse2 = (head) => {
            let ret = head
            if (head !== null && head.next !== null) {
                while (ret.next != null) {
                    ret = ret.next
                }

                while (head.next !== null) {
                    let current = head
                    let prev
                    while (current.next != null) {
                        prev = current
                        current = current.next
                    }
                    current.next = prev
                    prev.next = null
                }
            }
            return ret
        }
        // 只需要遍历一遍O(n)
        const reverse3 = (head) => {
            let newHead = null
            let current
            while (head !== null) {
                current = newHead
                newHead = head
                head = head.next
                newHead.next = current
            }
            return newHead
        }

        const reverse4 = (head) => {
            let pre = null
            let current = head
            let next = current.next
            while (next != null) {
                current.next = pre
                pre = current
                current = next
                next = next.next
            }
            current.next = pre
            return current
        }



        this.head = reverse4(this.head)
    }
}

const mergeList = (list1, list2) => {
    let newList = new LinkedList()
    let currentNode1 = list1.head
    let currentNode2 = list2.head
    let current
    while (currentNode1 != null && currentNode2 != null) {
        if (currentNode1.element <= currentNode2.element) {
            // newList.add(0, currentNode1.element)
            current = currentNode1
            currentNode1 = currentNode1.next
            current.next = newList.head
            newList.head = current
            newList.size++
        } else {
            current = currentNode2
            currentNode2 = currentNode2.next
            current.next = newList.head
            newList.head = current
            newList.size++
        }
    }

    while (currentNode1 != null) {
        current = currentNode1
        currentNode1 = currentNode1.next
        current.next = newList.head
        newList.head = current
        newList.size++
    }

    while (currentNode2 != null) {
        current = currentNode2
        currentNode2 = currentNode2.next
        current.next = newList.head
        newList.head = current
        newList.size++
    }
    return newList
}

let l1 = new LinkedList()
let l2 = new LinkedList()

l1.add(1)
l1.add(3)
l1.add(5)
l1.add(7)
l1.add(9)

l1.reverseLinkList()
console.dir(l1, {
    depth: 2000
})

// l2.add(2)
// l2.add(4)
// l2.add(6)

// let ret = mergeList(l1, l2)
// console.dir(ret, { depth: 2000 })

// console.dir(ll, {
//     depth: 2000
// })



