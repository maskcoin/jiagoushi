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
        let current = this.head //从头开始找
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }
}

let ll = new LinkedList()

ll.add(0, 100)
ll.add(0, 200)
ll.add(300)
ll.add(1, 500)
// 在尾部添加内容
// ll.add(1)
// ll.add(2)
console.dir(ll, { depth: 1000 })

