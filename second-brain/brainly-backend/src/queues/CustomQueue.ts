class Node<T> {
  constructor(public data: T, public next: Node<T> | null = null) {}
}

class CustomQueue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  enqueue(data: T): void {
    const newNode = new Node(data);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue(): T | null {
    if (!this.head) return null;

    const removedData = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // Queue is now empty

    return removedData;
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}

// Singleton pattern: Ensuring only **one** instance of the queue exists
const customQueue = new CustomQueue<JobData>();

export { customQueue };
