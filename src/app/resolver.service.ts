import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})

export class ResolverService {

	private N: number;
	private LENGTH: number;
	private ARR: number[][];
	private OFFSET: number[];
	private INDEX0: number;
	private OLDINDEX0: number;
	private HASH: string;
	private PATH: number[];
	private COUNT_STEP: number;
	private ALL_HASH: any;
	private INDEXES_FOR_DELETE_LIST: any;


	private contVariablesForArr(arr: number[][]) {
		this.ARR = arr;
		this.N = this.ARR.length;
		this.LENGTH = this.N * this.N;
		this.OFFSET = [-this.N, this.N, -1, 1];
		this.INDEX0 = (this.INDEX0 = this.getIndexByValue(0, 0)) >= 0 ? this.INDEX0 : this.LENGTH - 1;
	}

	public getNewArray(n: number): Observable<number[][]> {
		n = +n;
		this.ARR = Array(n).fill(null).map(() => Array(n).fill(null));

		this.contVariablesForArr(this.ARR);

		for (let i = 0; i < this.LENGTH; i++) {
			this.setValueByIndex(i, i != this.LENGTH - 1 ? i + 1 : 0);
		}


		for (let i = 0; i < this.LENGTH * 1000; i++) {

			let options = this.getOptions();
			let random = Math.floor(Math.random() * (options.length));
			this.replaseByindex(options[random], true)
		}

		return of(this.ARR);
	}

	private solution(arr: number[][]) {

		this.contVariablesForArr(arr);

		var currentIndex = 0,
			GoFromBelowNow;

		this.INDEXES_FOR_DELETE_LIST = [];
		this.ALL_HASH = {};
		this.COUNT_STEP = 0;
		this.PATH = [];
		this.HASH = this.getHashByArr();
		this.ALL_HASH[this.HASH] = this.COUNT_STEP++;

		return solved();

		function solved() {

			while ((currentIndex = findIndexProblem()) != -1) {

				if (!going(findWay(this.getIndexByValue(currentIndex + 1, currentIndex), currentIndex)) || (GoFromBelowNow && !GoFromBelow(currentIndex))) {
					return null;
				}
			}

			return this.PATH.filter((v, i) => this.INDEXES_FOR_DELETE_LIST.every(IFD => IFD.checkIndex(i)));;
		}

		function findIndexProblem() {

			for (var i = currentIndex; i < this.LENGTH - 1; i++) {

				if (this.getValueByIndex(i) != i + 1) {
					return i;
				}
			}
			return -1;
		}

		function findWay(from, to) {

			let axisesFrom = this.getAxisesByIndex(from),
				axisesTo = this.getAxisesByIndex(to),
				stepX = axisesFrom.x < axisesTo.x ? 1 : -1,
				res = [from],
				alt = to + this.N - 1;

			if (axisesTo.x == this.N - 1 && !(to == this.INDEX0 && to + this.N == from)) {

				to = alt;
				axisesTo.x--;
				GoFromBelowNow = true;
			}

			while (from != to) {

				if (from == alt && axisesFrom.x > 0 && axisesFrom.x < this.N - 1) {
					GoFromBelowNow = true;
					break;
				}

				if (axisesFrom.x != axisesTo.x) {
					res.push(from += stepX);
					axisesFrom.x += stepX;
				}

				if (from - this.N >= to) {
					res.push(from -= this.N);
				}

			}

			return res;
		}

		function going(way) {

			for (let i = 1; i < way.length; i++) {

				let awy0 = findAwy0(way[i], [way[i - 1]])

				if (awy0) going0(awy0);
				else return lastLines(currentIndex);

				this.replaseByindex(way[i - 1]);
			}

			return true;
		}

		function findAwy0(to, lockedUps, start?) {

			let from = this.INDEX0,
				axisesFrom = this.getAxisesByIndex(from),
				axisesTo = this.getAxisesByIndex(to),
				awy = [from];

			start = Number.isFinite(start) ? start : currentIndex;

			while (from != to) {

				let stepY = axisesFrom.y > axisesTo.y ? -this.N : this.N,
					stepX = axisesFrom.x > axisesTo.x ? -1 : 1;

				if (
					!checkTarget(from, from + stepX, { lockedUps } as any)
					&& !checkTarget(from, from + stepY, { lockedUps } as any)
				) {
					return false;
				}

				while (
					axisesFrom.y != axisesTo.y
					&& checkTarget(from, from + stepY, { start, lockedUps } as any)
				) {
					awy.push(from += stepY);
					axisesFrom = this.getAxisesByIndex(from);
				}

				while (
					axisesFrom.x != axisesTo.x
					&& checkTarget(from, from + stepX, { start, lockedUps } as any)
				) {
					awy.push(from += stepX)
					axisesFrom = this.getAxisesByIndex(from);
				}

				if (axisesFrom.y == axisesTo.y
					&& axisesFrom.x != axisesTo.x
					&& !checkTarget(from, from + stepX, { start, lockedUps } as any)
				) {
					let count = 0;
					count += downOrTop(false);
					count += leftOrRigth(true);
					if (count < 2) {
						return false;
					}
				} else if (
					axisesFrom.x == axisesTo.x
					&& axisesFrom.y != axisesTo.y
					&& !checkTarget(from, from + stepY, { start, lockedUps } as any)
				) {
					let count = 0;
					count += leftOrRigth(false);
					count += downOrTop(true);
					if (count < 2) {
						return false;
					}
				}

				if (
					axisesFrom.y != axisesTo.y
					&& axisesFrom.x != axisesTo.x
					&& !checkTarget(from, from + stepY, { lockedUps, start } as any)
					&& !checkTarget(from, from + stepX, { lockedUps, start } as any)
				) {

					for (let count = 0, interactions = 0, LOR, DOT; count < 2; interactions++) {
						if (!LOR) {
							count += LOR = downOrTop(count);
						}
						if (!DOT) {
							count += DOT = leftOrRigth(count);
						}
						if (!count || interactions == 2) {
							return false;
						}
					}
				}
			}

			for (let i = 2; i < awy.length;) {
				if (awy[i] == awy[i - 2]) {
					awy.splice(i - 2, 2);
					i = Math.max(2, --i);
				} else {
					i++;
				}
			}

			return awy;

			function downOrTop(checkDirection) {

				if (checkDirection) {

					let direction = axisesFrom.y > axisesTo.y ? 0 : 1,
						target = from + this.OFFSET[direction];

					if (checkTarget(from, target, { start, lockedUps, axis: "y" } as any)) {
						awy.push(from = target);
						axisesFrom = this.getAxisesByIndex(from);
						return 1;
					}

					return 0;
				}

				if (checkTarget(from, from + this.OFFSET[1], { start, lockedUps, axis: "y" } as any)) {
					awy.push(from += this.OFFSET[1]);
					axisesFrom = this.getAxisesByIndex(from);
					return 1;
				}

				if (checkTarget(from, from + this.OFFSET[0], { start, lockedUps, axis: "y" } as any)) {
					awy.push(from += this.OFFSET[0]);
					axisesFrom = this.getAxisesByIndex(from);
					return 1;
				}

				return 0;
			}

			function leftOrRigth(checkDirection) {

				if (checkDirection) {

					let direction = axisesFrom.x > axisesTo.x ? 2 : 3;

					if (checkTarget(from, from + this.OFFSET[direction], { start, lockedUps, axis: "x" } as any)) {
						awy.push(from += this.OFFSET[direction]);
						axisesFrom = this.getAxisesByIndex(from);
						return 1;
					}

					return 0;
				}

				if (checkTarget(from, from + this.OFFSET[3], { start, lockedUps, axis: "x" } as any)) {
					awy.push(from += this.OFFSET[3]);
					axisesFrom = this.getAxisesByIndex(from);
					return 1;
				}

				if (checkTarget(from, from + this.OFFSET[2], { start, lockedUps, axis: "x" } as any)) {
					awy.push(from += this.OFFSET[2]);
					axisesFrom = this.getAxisesByIndex(from);
					return 1;
				}

				return 0;

			}

			function checkTarget(from, to, { start, axis }) {

				let axisesFrom = this.getAxisesByIndex(from),
					stepAxis = (to - from) / Math.abs(to - from);

				return !lockedUps.includes(to)
					&& (!Number.isFinite(start) || to >= start)
					&& (!axis ||
						(
							axisesFrom[axis] + stepAxis >= 0
							&& axisesFrom[axis] + stepAxis < this.N
						)
					)
			}
		}

		function going0(awy) {
			for (let i = 1; i < awy.length; i++) {
				this.replaseByindex(awy[i]);
			}
		}

		function GoFromBelow(target) {

			GoFromBelowNow = false;

			let awy0 = findAwy0(target + this.N - 2, [target + this.N - 1]);

			if (awy0) going0(awy0);
			else return lastLines(target);

			for (let i of [0, 3, 1, 3, 0, 2, 2, 1]) {
				this.repalseByDirection(i);
			}

			return true;
		}

		function lastLines(index, beforeGarbeg?) {

			GoFromBelowNow = false;

			let profite, to, garbage, stop, direction,
				startLastLines = this.N * (this.N - 2),
				line = this.getAxisesByIndex(index).y,
				from = new getInfoByValue(index + 1, startLastLines),
				count = 1,
				before = beforeGarbeg || new getInfoByValue(getLinkedInBall(index, -1).index + 1, startLastLines),
				next = { index: null };


			while ((next = getLinkedInBall(next.index || from.index, 1)).index != before.index) {
				if ((next as any).value) {
					count++;
				}
			}
			profite = count % 2 + 1;
			if (profite == 2) {
				do {
					before = getLinkedInBall(before.index, 1);
				} while (!before.value);
				count++;
			}
			to = getLinkedInBall(before.index, 1);

			if (
				(
					to.y >= line
					|| to.x == this.N - 1
					|| !getLinkedInBall(to.index, -1).value
				)
				&& (
					to.value != from.value
					|| to.y != line
				)
			) {

				direction = setDirection();

				while (!(to.x == from.x && !to.value)) {
					this.replaseByindex(getLinkedInBall(this.INDEX0, direction).index);
					from = new getInfoByValue(from.value, startLastLines);
					before = new getInfoByValue(before.value, startLastLines);
					to = getLinkedInBall(before.index, 1);
				}

				this.replaseByindex(from.index);

				l: while (true) {

					if (profite == 2 && line == this.N - 2) {

						garbage = new getInfoByValue(before.value, startLastLines);

						if (this.getAxisesByIndex(index).x == this.N - 1 && to.x == this.N - 1) {
							let lockedUps = [];
							for (let i = startLastLines; i <= index; i++) {
								lockedUps.push(this.getIndexByValue(i + 1, startLastLines))
							}
							let awy0 = findAwy0(garbage.index, lockedUps, startLastLines)

							if (awy0) {
								going0(awy0);
								profite--;
							}

						} else if (garbage.value && garbage.x == this.getAxisesByIndex(this.INDEX0).x) {
							this.replaseByindex(garbage.index);
							let beforeGarbage = getLinkedInBall(this.INDEX0, -1);
							direction = beforeGarbage.index + 1 == beforeGarbage.value ? -1 : direction;
							profite--;
						}
					}

					this.replaseByindex(getLinkedInBall(this.INDEX0, -direction).index);

					stop = beforeGarbeg ?
						beforeGarbeg.value - 1
						: line == this.N - 2 || profite == 1 ?
							index
							: new getInfoByValue(getLinkedInBall(index, -1).index + 1, startLastLines).index;

					for (let i = startLastLines; i <= stop;) {
						if (this.getValueByIndex(i) != ++i) {
							continue l;
						}
					}
					break;
				}
			}

			if (!beforeGarbeg) {

				if (
					index == this.LENGTH - 3
					&& new getInfoByValue(this.LENGTH - 2, startLastLines).index > new getInfoByValue(this.LENGTH - 1, startLastLines).index
				) {
					return false;
				}

				if (line == this.N - 1 && index < this.LENGTH - 2 && profite == 2) {
					before = new getInfoByValue(before.value, startLastLines);
					return lastLines(before.value - 1, getLinkedInBall(before.index, 1));
				}
			}

			return true;

			function getLinkedInBall(index, some) {

				let axises, step, absSome;

				while (some) {

					absSome = Math.abs(some)
					axises = this.getAxisesByIndex(index);
					step = (axises.y == line ? 1 : -1) * (some / absSome);
					index += axises.x + step < this.N && axises.x + step >= 0 ? step : this.N * (axises.y == this.N - 2 ? 1 : -1);

					some -= some > 0 ? 1 : -1;
				}

				return new getInfoByIndex(index);
			}

			function setDirection() {
				let offtet = count / 2 - 1,
					options1 = (line == this.N - 2 ? startLastLines : startLastLines + this.N) + offtet,
					option2 = (line == this.N - 2 ? this.LENGTH - 1 : this.LENGTH - 1 - this.N) - offtet,
					countSteps = 0,
					nextStep = before.index;

				while (nextStep != options1 && nextStep != option2) {
					countSteps++;
					nextStep = getLinkedInBall(nextStep, 1).index;
				}

				return countSteps < this.N / 2 ? -1 : 1;

			}

		}

		function getInfoByValue(value, startSearch) {

			this.value = value;
			this.index = this.getIndexByValue(value, startSearch);

			let axises = this.getAxisesByIndex(this.index);

			this.x = axises.x;
			this.y = axises.y;
		}

		function getInfoByIndex(index) {

			let axises = this.getAxisesByIndex(index);

			this.value = this.getValueByIndex(index);
			this.index = index;
			this.x = axises.x;
			this.y = axises.y;
		}
	}

	private repalseByDirection(direction: number) {
		this.replaseByindex(this.INDEX0 + this.OFFSET[direction]);
	}

	private replaseByindex(index: number, notLog?: boolean) {

		let value = this.getValueByIndex(index);

		this.setValueByIndex(this.INDEX0, value);
		this.setValueByIndex(index, 0);

		this.OLDINDEX0 = this.INDEX0;
		this.INDEX0 = index;

		if (!notLog) {

			let hash0 = this.getHashByValue(0),
				hashValue = this.getHashByValue(value);

			this.HASH = this.HASH.split(hash0).map(h => h.replace(hashValue, hash0)).join(hashValue);
			this.PATH.push(index);

			this.COUNT_STEP++;

			if (this.ALL_HASH[this.HASH] >= 0) {
				new indexesForDelete(this.ALL_HASH[this.HASH], this.COUNT_STEP);
			} else {
				this.ALL_HASH[this.HASH] = this.COUNT_STEP;
			}
		}

		function indexesForDelete(start, end) {

			this.start = start;
			this.end = end;
			this.count = end - start;

			if (this.INDEXES_FOR_DELETE_LIST.every(ifd => ifd.checkOther(this))) {
				this.INDEXES_FOR_DELETE_LIST.push(this);
			}

			this.checkIndex = (i) => {
				return i < this.start - 1 || i > this.end - 2;
			};

			this.checkOther = (other) => {
				if (other.start <= this.end && other.count > this.count) {
					this.start = other.start;
					this.end = other.end;
					this.count = this.end - this.start;
					return false;
				}
			}
		}

	}

	private getOptions() {

		let indexex0 = this.getAxisesByIndex(this.INDEX0);
		let indexesI;

		return this.OFFSET.map(i => i + this.INDEX0)
			.filter(
				i =>
					i >= 0
					&& i < this.LENGTH
					&& ((indexesI = this.getAxisesByIndex(i)).x == indexex0.x || indexesI.y == indexex0.y)
					&& i != this.OLDINDEX0
			);
	}

	private setValueByIndex(index: number, value: number) {
		this.ARR[Math.floor(index / this.N)][index % this.N] = value;
	}

	private getHashByValue(value: number) {
		return String.fromCharCode(value);
	}

	private getHashByArr() {
		let hash = "";
		for (let i = 0; i < this.LENGTH; i++) {
			hash += this.getHashByValue(this.getValueByIndex(i));
		}
		return hash;
	}

	private getValueByIndex(index: number) {
		return this.ARR[Math.floor(index / this.N)][index % this.N];
	}

	private getAxisesByIndex(index: number) {
		return {
			y: Math.floor(index / this.N),
			x: index % this.N
		};
	}

	private getIndexByValue(value: number, start: number) {
		for (let i = start; i < this.LENGTH; i++) {
			if (this.getValueByIndex(i) == value) {
				return i;
			}
		}
	}

	constructor() { }


	getSolution(arr: number[][]): Observable<number[]> {
		const newArr = JSON.parse(JSON.stringify(arr))
		return of(JSON.parse(JSON.stringify(this.solution(newArr))));
	}
}
