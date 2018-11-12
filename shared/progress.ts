type Range = { start: number; end: number };

type Fragment = Range | number;

type Fragments = Array<Fragment>;

export class Progress {
  fragments: Fragments;

  constructor(fragments: Fragments) {
    this.fragments = fragments;
  }

  add(right: Progress): Progress {
    if (right.fragments.length === 0) return this.simplify();

    let array = this.toArray();
    Array.prototype.push.apply(array, right.toArray());
    array = array.filter((x, i, self) => self.indexOf(x) === i);
    array.sort((a: number, b: number) => a - b);
    this.fragments = array;
    return this.simplify();
  }

  private toArray(): Array<number> {
    let numbers: Array<number> = [];

    for (let i = 0; i < this.fragments.length; i++) {
      if (typeof this.fragments[i] === 'object') {
        const fragment = this.fragments[i] as Range;
        for (let n = fragment.start; n <= fragment.end; n++) numbers.push(n);
      } else {
        numbers.push(this.fragments[i] as number);
      }
    }

    numbers.sort((a: number, b: number) => a - b);
    numbers = numbers.filter((x, i, self) => self.indexOf(x) === i);
    return numbers;
  }

  private simplify(): Progress {
    this.fragments = this.toArray();

    if (this.fragments.length >= 2) {
      for (let i = 1; i < this.fragments.length; ) {
        const former = this.fragments[i - 1],
          latter = this.fragments[i],
          formerT = typeof former,
          latterT = typeof latter;

        if (
          formerT === 'number' &&
          latterT === 'number' &&
          (latter as number) - (former as number) === 1
        ) {
          this.concatNumberAndNumber(i);
          continue;
        } else if (
          formerT === 'number' &&
          latterT === 'object' &&
          (latter as Range).start - (former as number) === 1
        ) {
          this.concatNumberAndObject(i);
          continue;
        } else if (
          formerT === 'object' &&
          latterT === 'number' &&
          (latter as number) - (former as Range).end === 1
        ) {
          this.concatObjectAndNumber(i);
          continue;
        } else if (
          formerT === 'object' &&
          latterT === 'number' &&
          (latter as Range).start - (former as Range).end === 1
        ) {
          this.concatObjectAndObject(i);
          continue;
        }

        i++;
      }
    }

    return this;
  }

  private concatNumberAndNumber(index: number) {
    this.fragments.splice(index, 1);
    this.fragments[index - 1] = {
      start: this.fragments[index - 1],
      end: this.fragments[index]
    } as Fragment;
  }

  private concatNumberAndObject(index: number) {
    this.fragments.splice(index, 1);
    this.fragments[index - 1] = {
      start: this.fragments[index - 1],
      end: (this.fragments[index] as Range).end
    } as Fragment;
  }

  private concatObjectAndNumber(index: number) {
    this.fragments.splice(index, 1);
    this.fragments[index - 1] = {
      start: (this.fragments[index - 1] as Range).start,
      end: this.fragments[index]
    } as Fragment;
  }

  private concatObjectAndObject(index: number) {
    this.fragments.splice(index, 1);
    this.fragments[index - 1] = {
      start: (this.fragments[index - 1] as Range).start,
      end: (this.fragments[index] as Range).end
    };
  }

  toString(): string {
    let result = '';

    for (let i = 0; i < this.fragments.length; i++) {
      if (typeof this.fragments[i] === 'object') {
        result +=
          (this.fragments[i] as Range).start +
          '-' +
          (this.fragments[i] as Range).end;
      } else {
        result += this.fragments[i];
      }

      if (i < this.fragments.length - 1) result += ', ';
    }

    return result;
  }

  static parse(str: string): Progress {
    const parts: Array<string> = str.replace(/\s/g, '').split(',');
    const result: Fragments = [];

    for (let i = 0; i < parts.length; i++) {
      if (/^([1-9]\d*|0)$/.test(parts[i])) {
        result.push(parseInt(parts[i], 10));
      } else if (/^([1-9]\d*|0)-([1-9]\d*|0)$/.test(parts[i])) {
        const both = parts[i].split('-');
        const left = Number(both[0]),
          right = Number(both[1]);
        if (left >= right) return new Progress([]); // Error
        result.push({ start: left, end: right });
      } else {
        return new Progress([]); // Error
      }
    }

    return new Progress(result).simplify();
  }
}
