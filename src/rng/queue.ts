export default class Dequeue<T> {
  size: number;
  elements: T[] = [];
  constructor (length: T[] | number = 1) {
    if (Array.isArray(length)) {
      this.elements = length;
      this.size = this.elements.length;
    } else {
      this.size = length;
    }
  }

  get length () {
    return this.elements.length;
  }

  public push (el: T) : T | undefined {
    this.elements.push(el);
    if (this.elements.length > this.size) {
      return this.pop();
    }
  }

  public pop (): T | undefined {
    return this.elements.pop();
  }

  public full (): boolean {
    return this.length >= this.size;
  }

  public empty (): void {
    this.elements = [];
  }

  public get (i: number) {
    return this.elements[i];
  }

  public allSame (): boolean {
    if (this.length > 0) {
      return this.elements.every(a => a === this.elements[0]);
    }
    return true;
  }
}

export class NumberQueue extends Dequeue<number> {
  public sum (): number {
    return this.elements.reduce((a, b) => a + b, 0);
  }

  public avg (): number {
    return this.sum() / this.length;
  }
}

class LoopDetectedError extends Error {}

export class NonRandomDetector<T> extends Dequeue<T> {
  minsequencelength: number = 2;
  errormessage: string = 'Loop detected in input data. Randomness source not random?';

  constructor (length: T[] | number = 1, minsequencelength: number = 2) {
    super(length);
    if (this.size > 10000) {
      throw new Error('Cannot detect loops for more than 10000 elements');
    }
    this.minsequencelength = minsequencelength;
  }

  public push (el: T): T | undefined {
    this.detectLoop();
    this.elements.push(el);
    if (this.elements.length > this.size) {
      return this.pop();
    }
  }

  public detectLoop (msg?: string) {
    if (this.full()) {
      if (this.allSame()) {
        this.loopDetected(msg);
      }
      if (this.hasRepeatingSequence(this.elements, this.minsequencelength)) {
        this.loopDetected(msg);
      }
    }
  }

  protected loopDetected (msg?: string) {
    throw new LoopDetectedError(msg ?? this.errormessage);
  }

  /**
   * Checks if there is a repeating sequence longer than a specified length in an array of numbers.
   *
   * @param {number[]} arr - The array of numbers.
   * @param {number} n - The minimum length of the repeating sequence.
   * @returns {boolean} True if a repeating sequence longer than length n is found, otherwise false.
   */
  public hasRepeatingSequence (arr: T[], n: number): boolean {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        let k = 0;
        while (j + k < arr.length && arr[i + k] === arr[j + k]) {
          k++;
          if (k > n) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
