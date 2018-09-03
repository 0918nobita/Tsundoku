type Range = {start: number, end: number};

type Fragment = Range | number;

type Fragments = Array<Fragment>;

/**
 * @desc 読書の進捗状況を表すクラス<br>読んだページを断片的に記録する
 * @example
 * const p1 = Progress.parse('1,3, 4-5'),
 *       p2 = Progress.parse('6, 2');
 * 
 * console.log(p1.toString());  // => '1, 3-5'
 * console.log(p2.toString());  // => '2, 6'
 * 
 * console.log(p1.add(p2).toString());  // '1-6'
 */
export class Progress {
  private fragments: Fragments;

  /**
   * Progress インスタンスを生成する
   * @param {Fragments} fragments - 読んだページを表す、Range または number を要素とする配列
   */
  constructor(fragments: Fragments) {
    /**
     * @private
     * @type {Fragments}
     */
    this.fragments = fragments;
  }

  /**
   * @desc Progress インスタンス同士を合成する
   * @param {Progress} right - 合成する Progress インスタンス
   * @return {Progress} - 合成後の Progress インスタンス
   */
  add(right: Progress): Progress {
    if (right.fragments.length === 0) return this.simplify();

    let array = this.toArray();
    Array.prototype.push.apply(array, right.toArray());
    array = array.filter((x, i, self) => self.indexOf(x) === i);
    array.sort((a: number, b: number) => a - b);
    this.fragments = array;
    return this.simplify();
  }

  /**
   * @private
   * @desc フラグメントを数値の配列に変換して返す
   * @return {number[]}
   */
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

  /**
   * @private
   * @desc 冗長な表現を修正する
   * @return {Progress}
   */
  private simplify(): Progress {
    this.fragments = this.toArray();

    if (this.fragments.length >= 2) {
      for (let i = 1; i < this.fragments.length;) {
        const former: Fragment = this.fragments[i-1],
              latter: Fragment = this.fragments[i],
              formerT = typeof former,
              latterT = typeof latter;

        if (formerT === 'number' && latterT === 'number') {
          if ((latter as number) - (former as number) === 1) {
            this.fragments.splice(i, 1);
            this.fragments[i-1] = { start: former, end: latter } as Fragment;
            continue;
          }
        } else if (formerT === 'number' && latterT === 'object') {
          if ((latter as Range).start - (former as number) === 1) {
            this.fragments.splice(i, 1);
            this.fragments[i-1] = { start: former, end: (latter as Range).end } as Fragment;
            continue;
          }
        } else if (formerT === 'object' && latterT === 'number') {
          if ((latter as number) - (former as Range).end === 1) {
            this.fragments.splice(i, 1);
            this.fragments[i-1] = { start: (former as Range).start, end: latter } as Fragment;
            continue;
          }
        } else {
          if ((latter as Range).start - (former as Range).end === 1) {
            this.fragments.splice(i, 1);
            this.fragments[i-1] = { start: (former as Range).start, end: (latter as Range).end };
            continue;
          }
        }

        i++;
      }
    }

    return this;
  }

  /**
   * Progress インスタンスを文字列に変換する
   */
  toString(): string {
    let result = '';
    
    for (let i = 0; i < this.fragments.length; i++) {
      if (typeof this.fragments[i] === 'object') {
        result += (this.fragments[i] as Range).start + '-' + (this.fragments[i] as Range).end;
      } else {
        result += this.fragments[i];
      }
      
      if (i < this.fragments.length - 1) result += ', ';
    }

    return result;
  }

  /**
   * 文字列から Progress インスタンスを生成する
   */
  static parse(str: string): Progress {
    const parts: Array<string> = str.replace(/\s/g, '').split(',');
    const result: Fragments = [];

    for (let i = 0; i < parts.length; i++) {
      if (/^([1-9]\d*|0)$/.test(parts[i])) {
        result.push(parseInt(parts[i]));
      } else if (/^([1-9]\d*|0)-([1-9]\d*|0)$/.test(parts[i])) {
        const both = parts[i].split('-');
        const left = Number(both[0]),
              right = Number(both[1]);
        if (left >= right) return new Progress([]);  // Error
        result.push({start: left, end: right});
      } else {
        return new Progress([]);  // Error
      }
    }

    return (new Progress(result)).simplify();
  }
}
