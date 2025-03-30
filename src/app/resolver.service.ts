import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


/**
 * @top = 0 
 * @down = 1
 * @left = 2
 * @right = 3
 */

var N, LENGTH, ARR, OFFSET, INDEX0, OLDINDEX0, HASH, PATH, COUNT_STEP, ALL_HASH, INDEXES_FOR_DELETE_LIST;

function contVariablesForArr(arr) {
	ARR = arr;
	N = ARR.length;
	LENGTH = N * N;
	OFFSET = [-N, N, -1, 1];
	INDEX0 = (INDEX0 = getIndexByValue(0, 0)) >= 0 ? INDEX0 : LENGTH - 1;
}

export function newArray(n) {
	n = +n;
	ARR = Array(n).fill(null).map(() => Array(n).fill(null));

	contVariablesForArr(ARR);

	for (let i = 0; i < LENGTH; i++) {
		setValueByIndex(i, i != LENGTH - 1 ? i + 1 : 0);
	}


	for (let i = 0; i < LENGTH * 1000; i++) {

		let options = getOptions();
		let random = Math.floor(Math.random() * (options.length));
		replaseByindex(options[random], true)
	}

	return ARR;
}

export function solution(arr) {

	contVariablesForArr(arr);

	var currentIndex = 0,
		GoFromBelowNow;

	INDEXES_FOR_DELETE_LIST = [];
	ALL_HASH = {};
	COUNT_STEP = 0;
	PATH = [];
	HASH = getHashByArr();
	ALL_HASH[HASH] = COUNT_STEP++;

	return solved();

	function solved() {

		while ((currentIndex = findIndexProblem()) != -1) {

			if (!going(findWay(getIndexByValue(currentIndex + 1, currentIndex), currentIndex)) || (GoFromBelowNow && !GoFromBelow(currentIndex))) {
				return null;
			}
		}

		return PATH.filter((v, i) => INDEXES_FOR_DELETE_LIST.every(IFD => IFD.checkIndex(i)));;
	}

	function findIndexProblem() {

		for (var i = currentIndex; i < LENGTH - 1; i++) {

			if (getValueByIndex(i) != i + 1) {
				return i;
			}
		}
		return -1;
	}

	function findWay(from, to) {

		let axisesFrom = getAxisesByIndex(from),
			axisesTo = getAxisesByIndex(to),
			stepX = axisesFrom.x < axisesTo.x ? 1 : -1,
			res = [from],
			alt = to + N - 1;

		if (axisesTo.x == N - 1 && !(to == INDEX0 && to + N == from)) {

			to = alt;
			axisesTo.x--;
			GoFromBelowNow = true;
		}

		while (from != to) {

			if (from == alt && axisesFrom.x > 0 && axisesFrom.x < N - 1) {
				GoFromBelowNow = true;
				break;
			}

			if (axisesFrom.x != axisesTo.x) {
				res.push(from += stepX);
				axisesFrom.x += stepX;
			}

			if (from - N >= to) {
				res.push(from -= N);
			}

		}

		return res;
	}

	function going(way) {

		for (let i = 1; i < way.length; i++) {

			let awy0 = findAwy0(way[i], [way[i - 1]])

			if (awy0) going0(awy0);
			else return lastLines(currentIndex);

			replaseByindex(way[i - 1]);
		}

		return true;
	}

	function findAwy0(to, lockedUps, start?) {

		let from = INDEX0,
			axisesFrom = getAxisesByIndex(from),
			axisesTo = getAxisesByIndex(to),
			awy = [from];

		start = Number.isFinite(start) ? start : currentIndex;

		while (from != to) {

			let stepY = axisesFrom.y > axisesTo.y ? -N : N,
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
				axisesFrom = getAxisesByIndex(from);
			}

			while (
				axisesFrom.x != axisesTo.x
				&& checkTarget(from, from + stepX, { start, lockedUps } as any)
			) {
				awy.push(from += stepX)
				axisesFrom = getAxisesByIndex(from);
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
					target = from + OFFSET[direction];

				if (checkTarget(from, target, { start, lockedUps, axis: "y" } as any)) {
					awy.push(from = target);
					axisesFrom = getAxisesByIndex(from);
					return 1;
				}

				return 0;
			}

			if (checkTarget(from, from + OFFSET[1], { start, lockedUps, axis: "y" } as any)) {
				awy.push(from += OFFSET[1]);
				axisesFrom = getAxisesByIndex(from);
				return 1;
			}

			if (checkTarget(from, from + OFFSET[0], { start, lockedUps, axis: "y" } as any)) {
				awy.push(from += OFFSET[0]);
				axisesFrom = getAxisesByIndex(from);
				return 1;
			}

			return 0;
		}

		function leftOrRigth(checkDirection) {

			if (checkDirection) {

				let direction = axisesFrom.x > axisesTo.x ? 2 : 3;

				if (checkTarget(from, from + OFFSET[direction], { start, lockedUps, axis: "x" } as any)) {
					awy.push(from += OFFSET[direction]);
					axisesFrom = getAxisesByIndex(from);
					return 1;
				}

				return 0;
			}

			if (checkTarget(from, from + OFFSET[3], { start, lockedUps, axis: "x" } as any)) {
				awy.push(from += OFFSET[3]);
				axisesFrom = getAxisesByIndex(from);
				return 1;
			}

			if (checkTarget(from, from + OFFSET[2], { start, lockedUps, axis: "x" } as any)) {
				awy.push(from += OFFSET[2]);
				axisesFrom = getAxisesByIndex(from);
				return 1;
			}

			return 0;

		}

		function checkTarget(from, to, { start, axis }) {

			let axisesFrom = getAxisesByIndex(from),
				stepAxis = (to - from) / Math.abs(to - from);

			return !lockedUps.includes(to)
				&& (!Number.isFinite(start) || to >= start)
				&& (!axis ||
					(
						axisesFrom[axis] + stepAxis >= 0
						&& axisesFrom[axis] + stepAxis < N
					)
				)
		}
	}

	function going0(awy) {
		for (let i = 1; i < awy.length; i++) {
			replaseByindex(awy[i]);
		}
	}

	function GoFromBelow(target) {

		GoFromBelowNow = false;

		let awy0 = findAwy0(target + N - 2, [target + N - 1]);

		if (awy0) going0(awy0);
		else return lastLines(target);

		for (let i of [0, 3, 1, 3, 0, 2, 2, 1]) {
			repalseByDirection(i);
		}

		return true;
	}

	function lastLines(index, beforeGarbeg?) {

		GoFromBelowNow = false;

		let profite, to, garbage, stop, direction,
			startLastLines = N * (N - 2),
			line = getAxisesByIndex(index).y,
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
				|| to.x == N - 1
				|| !getLinkedInBall(to.index, -1).value
			)
			&& (
				to.value != from.value
				|| to.y != line
			)
		) {

			direction = setDirection();

			while (!(to.x == from.x && !to.value)) {
				replaseByindex(getLinkedInBall(INDEX0, direction).index);
				from = new getInfoByValue(from.value, startLastLines);
				before = new getInfoByValue(before.value, startLastLines);
				to = getLinkedInBall(before.index, 1);
			}

			replaseByindex(from.index);

			l: while (true) {

				if (profite == 2 && line == N - 2) {

					garbage = new getInfoByValue(before.value, startLastLines);

					if (getAxisesByIndex(index).x == N - 1 && to.x == N - 1) {
						let lockedUps = [];
						for (let i = startLastLines; i <= index; i++) {
							lockedUps.push(getIndexByValue(i + 1, startLastLines))
						}
						let awy0 = findAwy0(garbage.index, lockedUps, startLastLines)

						if (awy0) {
							going0(awy0);
							profite--;
						}

					} else if (garbage.value && garbage.x == getAxisesByIndex(INDEX0).x) {
						replaseByindex(garbage.index);
						let beforeGarbage = getLinkedInBall(INDEX0, -1);
						direction = beforeGarbage.index + 1 == beforeGarbage.value ? -1 : direction;
						profite--;
					}
				}

				replaseByindex(getLinkedInBall(INDEX0, -direction).index);

				stop = beforeGarbeg ?
					beforeGarbeg.value - 1
					: line == N - 2 || profite == 1 ?
						index
						: new getInfoByValue(getLinkedInBall(index, -1).index + 1, startLastLines).index;

				for (let i = startLastLines; i <= stop;) {
					if (getValueByIndex(i) != ++i) {
						continue l;
					}
				}
				break;
			}
		}

		if (!beforeGarbeg) {

			if (
				index == LENGTH - 3
				&& new getInfoByValue(LENGTH - 2, startLastLines).index > new getInfoByValue(LENGTH - 1, startLastLines).index
			) {
				return false;
			}

			if (line == N - 1 && index < LENGTH - 2 && profite == 2) {
				before = new getInfoByValue(before.value, startLastLines);
				return lastLines(before.value - 1, getLinkedInBall(before.index, 1));
			}
		}

		return true;

		function getLinkedInBall(index, some) {

			let axises, step, absSome;

			while (some) {

				absSome = Math.abs(some)
				axises = getAxisesByIndex(index);
				step = (axises.y == line ? 1 : -1) * (some / absSome);
				index += axises.x + step < N && axises.x + step >= 0 ? step : N * (axises.y == N - 2 ? 1 : -1);

				some -= some > 0 ? 1 : -1;
			}

			return new getInfoByIndex(index);
		}

		function setDirection() {
			let offtet = count / 2 - 1,
				options1 = (line == N - 2 ? startLastLines : startLastLines + N) + offtet,
				option2 = (line == N - 2 ? LENGTH - 1 : LENGTH - 1 - N) - offtet,
				countSteps = 0,
				nextStep = before.index;

			while (nextStep != options1 && nextStep != option2) {
				countSteps++;
				nextStep = getLinkedInBall(nextStep, 1).index;
			}

			return countSteps < N / 2 ? -1 : 1;

		}

	}

	function getInfoByValue(value, startSearch) {

		this.value = value;
		this.index = getIndexByValue(value, startSearch);

		let axises = getAxisesByIndex(this.index);

		this.x = axises.x;
		this.y = axises.y;
	}

	function getInfoByIndex(index) {

		let axises = getAxisesByIndex(index);

		this.value = getValueByIndex(index);
		this.index = index;
		this.x = axises.x;
		this.y = axises.y;
	}
}

function repalseByDirection(direction) {
	replaseByindex(INDEX0 + OFFSET[direction]);
}

function replaseByindex(index, notLog?) {

	let value = getValueByIndex(index);

	setValueByIndex(INDEX0, value);
	setValueByIndex(index, 0);

	OLDINDEX0 = INDEX0;
	INDEX0 = index;

	if (!notLog) {

		let hash0 = getHashByValue(0),
			hashValue = getHashByValue(value);

		HASH = HASH.split(hash0).map(h => h.replace(hashValue, hash0)).join(hashValue);
		PATH.push(index);

		COUNT_STEP++;

		if (ALL_HASH[HASH] >= 0) {
			new indexesForDelete(ALL_HASH[HASH], COUNT_STEP);
		} else {
			ALL_HASH[HASH] = COUNT_STEP;
		}
	}

	function indexesForDelete(start, end) {

		this.start = start;
		this.end = end;
		this.count = end - start;

		if (INDEXES_FOR_DELETE_LIST.every(ifd => ifd.checkOther(this))) {
			INDEXES_FOR_DELETE_LIST.push(this);
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

function getOptions() {

	let indexex0 = getAxisesByIndex(INDEX0);
	let indexesI;

	return OFFSET.map(i => i + INDEX0)
		.filter(
			i =>
				i >= 0
				&& i < LENGTH
				&& ((indexesI = getAxisesByIndex(i)).x == indexex0.x || indexesI.y == indexex0.y)
				&& i != OLDINDEX0
		);
}

function setValueByIndex(index, value) {
	ARR[Math.floor(index / N)][index % N] = value;
}

function getHashByValue(value) {
	return String.fromCharCode(value);
}

function getHashByArr() {
	let hash = "";
	for (let i = 0; i < LENGTH; i++) {
		hash += getHashByValue(getValueByIndex(i));
	}
	return hash;
}

function getValueByIndex(index) {
	return ARR[Math.floor(index / N)][index % N];
}

function getAxisesByIndex(index) {
	return {
		y: Math.floor(index / N),
		x: index % N
	};
}

function getIndexByValue(value, start) {
	for (let i = start; i < LENGTH; i++) {
		if (getValueByIndex(i) == value) {
			return i;
		}
	}
}

@Injectable({
	providedIn: 'root'
})

export class ResolverService {

	constructor() { }

	getNewArray(size: number): Observable<number[][]> {
		return of(newArray(size));
	}

	getSolution(arr: number[][]): Observable<number[]> {
		const newArr = JSON.parse(JSON.stringify(arr))
		return of(JSON.parse(JSON.stringify(solution(newArr))));
	}
}

