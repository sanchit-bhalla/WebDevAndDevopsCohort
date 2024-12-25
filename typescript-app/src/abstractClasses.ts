abstract class Shape {
  abstract name: string;

  abstract calculateArea(): number;

  describe(): void {
    console.log(`It is a ${this.name}. It's area is ${this.calculateArea()}`);
  }
}

class Rectangle extends Shape {
  name = "Rectangle";
  width: number; // or use public as we did in case of height

  constructor(width: number, public height: number) {
    super();
    this.width = width;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  name = "Square";

  constructor(public radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const rect = new Rectangle(5, 4);
rect.describe();

const sq = new Square(10);
sq.describe();
