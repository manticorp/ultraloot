// Class for handling keyboard inputs.
export default class Vector {
  x = 0;
  y = 0;
  z = 0;

  constructor (x = 0, y, z) {
    this.z = z ?? 0;
    this.y = y ?? 0;
    this.x = x ?? 0;
    if (typeof x === 'object') {
      this.x = x.x ?? this.x;
      this.y = x.y ?? this.y;
      this.z = x.z ?? this.z;
    }
  }

  toString () {
    return `${this.x}, ${this.y}, ${this.z}`;
  }

  clone () {
    return new Vector(this.x, this.y, this.z);
  }

  get copy () {
    return this.clone();
  }

  get length () {
    return Math.sqrt(this.sqlength);
  }

  get sqlength () {
    return this.dot(this);
  }

  assertVector (other, msg = 'Argument must be a vector') {
    if (!(other instanceof Vector)) {
      throw new Error(msg);
    }
  }

  distanceTo (other) {
    this.assertVector(other);
    return Math.sqrt(
      Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2) + Math.pow(other.z - this.z, 2)
    );
  }

  all (n) {
    this.x = n;
    this.y = n;
    this.z = n;
    return this;
  }

  zero () {
    this.all(0);
    return this;
  }

  fallToZeroIfBelowMagnitude (other) {
    this.assertVector(other);
    if (Math.abs(this.x) < other.x) {
      this.x = 0;
    }
    if (Math.abs(this.y) < other.y) {
      this.y = 0;
    }
    if (Math.abs(this.z) < other.z) {
      this.z = 0;
    }
    return this;
  }

  maxMagnitude (mag) {
    if (this.length > mag) {
      this.divide(this.length / mag);
    }
  }

  min (other) {
    this.assertVector(other);
    this.x = Math.min(this.x, other.x);
    this.y = Math.min(this.y, other.y);
    this.z = Math.min(this.z, other.z);
    return this;
  }

  max (other) {
    this.assertVector(other);
    this.x = Math.max(this.x, other.x);
    this.y = Math.max(this.y, other.y);
    this.z = Math.max(this.z, other.z);
    return this;
  }

  bound (topleft, bottomright) {
    this.max(topleft);
    this.min(bottomright);
    return this;
  }

  minAbs (other, num2) {
    if (typeof other === 'number') {
      return (other < 0) ? Math.max(other, -num2) : Math.min(other, num2);
    }
    this.assertVector(other);
    this.x = this.minAbs(this.x, other.x);
    this.y = this.minAbs(this.y, other.y);
    this.z = this.minAbs(this.z, other.z);
    return this;
  }

  maxAbs (other, num2) {
    if (typeof other === 'number') {
      return (other < 0) ? Math.min(other, -num2) : Math.max(other, num2);
    }
    this.assertVector(other);
    this.x = this.maxAbs(this.x, other.x);
    this.y = this.maxAbs(this.y, other.y);
    this.z = this.maxAbs(this.z, other.z);
    return this;
  }

  dot (other) {
    this.assertVector(other);
    return ((this.x * other.x) + (this.y * other.y) + (this.z * other.z));
  }

  add (other) {
    if (other instanceof Vector) {
      this.x += other.x;
      this.y += other.y;
      this.z += other.z;
    } else if (typeof other === 'number') {
      this.x += other;
      this.y += other;
      this.z += other;
    }
    return this;
  }

  subtract (other) {
    if (other instanceof Vector) {
      this.x -= other.x;
      this.y -= other.y;
      this.z -= other.z;
    } else if (typeof other === 'number') {
      this.x -= other;
      this.y -= other;
      this.z -= other;
    }
    return this;
  }

  divide (other) {
    if (other instanceof Vector) {
      this.x /= other.x;
      this.y /= other.y;
      this.z /= other.z;
    } else if (typeof other === 'number') {
      this.x /= other;
      this.y /= other;
      this.z /= other;
    }
    return this;
  }

  multiply (other) {
    if (other instanceof Vector) {
      this.x *= other.x;
      this.y *= other.y;
      this.z *= other.z;
    } else if (typeof other === 'number') {
      this.x *= other;
      this.y *= other;
      this.z *= other;
    }
    return this;
  }
}
