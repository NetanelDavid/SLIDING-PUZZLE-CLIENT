(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\SLIDING-PUZZLE-CLIENT\src\main.ts */"zUnb");


/***/ }),

/***/ "7b+H":
/*!***********************************!*\
  !*** ./src/app/server.service.ts ***!
  \***********************************/
/*! exports provided: ServerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerService", function() { return ServerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _oldService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oldService */ "Rvjj");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");





class ServerService {
    constructor(client) {
        this.client = client;
    }
    getNewArray(size) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(Object(_oldService__WEBPACK_IMPORTED_MODULE_2__["newArray"])(size));
    }
    getSolution(arr) {
        const newArr = JSON.parse(JSON.stringify(arr));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(JSON.parse(JSON.stringify(Object(_oldService__WEBPACK_IMPORTED_MODULE_2__["solution"])(newArr))));
    }
}
ServerService.ɵfac = function ServerService_Factory(t) { return new (t || ServerService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); };
ServerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ServerService, factory: ServerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Rvjj":
/*!*******************************!*\
  !*** ./src/app/oldService.ts ***!
  \*******************************/
/*! exports provided: newArray, solution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newArray", function() { return newArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "solution", function() { return solution; });
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
function newArray(n) {
    n = +n;
    ARR = Array(n).fill(null).map(() => Array(n).fill(null));
    contVariablesForArr(ARR);
    for (let i = 0; i < LENGTH; i++) {
        setValueByIndex(i, i != LENGTH - 1 ? i + 1 : 0);
    }
    for (let i = 0; i < LENGTH * 1000; i++) {
        let options = getOptions();
        let random = Math.floor(Math.random() * (options.length));
        replaseByindex(options[random], true);
    }
    return ARR;
}
function solution(arr) {
    contVariablesForArr(arr);
    var currentIndex = 0, GoFromBelowNow;
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
        return PATH.filter((v, i) => INDEXES_FOR_DELETE_LIST.every(IFD => IFD.checkIndex(i)));
        ;
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
        let axisesFrom = getAxisesByIndex(from), axisesTo = getAxisesByIndex(to), stepX = axisesFrom.x < axisesTo.x ? 1 : -1, res = [from], alt = to + N - 1;
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
            let awy0 = findAwy0(way[i], [way[i - 1]]);
            if (awy0)
                going0(awy0);
            else
                return lastLines(currentIndex);
            replaseByindex(way[i - 1]);
        }
        return true;
    }
    function findAwy0(to, lockedUps, start) {
        let from = INDEX0, axisesFrom = getAxisesByIndex(from), axisesTo = getAxisesByIndex(to), awy = [from];
        start = Number.isFinite(start) ? start : currentIndex;
        while (from != to) {
            let stepY = axisesFrom.y > axisesTo.y ? -N : N, stepX = axisesFrom.x > axisesTo.x ? -1 : 1;
            if (!checkTarget(from, from + stepX, { lockedUps })
                && !checkTarget(from, from + stepY, { lockedUps })) {
                return false;
            }
            while (axisesFrom.y != axisesTo.y
                && checkTarget(from, from + stepY, { start, lockedUps })) {
                awy.push(from += stepY);
                axisesFrom = getAxisesByIndex(from);
            }
            while (axisesFrom.x != axisesTo.x
                && checkTarget(from, from + stepX, { start, lockedUps })) {
                awy.push(from += stepX);
                axisesFrom = getAxisesByIndex(from);
            }
            if (axisesFrom.y == axisesTo.y
                && axisesFrom.x != axisesTo.x
                && !checkTarget(from, from + stepX, { start, lockedUps })) {
                let count = 0;
                count += downOrTop(false);
                count += leftOrRigth(true);
                if (count < 2) {
                    return false;
                }
            }
            else if (axisesFrom.x == axisesTo.x
                && axisesFrom.y != axisesTo.y
                && !checkTarget(from, from + stepY, { start, lockedUps })) {
                let count = 0;
                count += leftOrRigth(false);
                count += downOrTop(true);
                if (count < 2) {
                    return false;
                }
            }
            if (axisesFrom.y != axisesTo.y
                && axisesFrom.x != axisesTo.x
                && !checkTarget(from, from + stepY, { lockedUps, start })
                && !checkTarget(from, from + stepX, { lockedUps, start })) {
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
            }
            else {
                i++;
            }
        }
        return awy;
        function downOrTop(checkDirection) {
            if (checkDirection) {
                let direction = axisesFrom.y > axisesTo.y ? 0 : 1, target = from + OFFSET[direction];
                if (checkTarget(from, target, { start, lockedUps, axis: "y" })) {
                    awy.push(from = target);
                    axisesFrom = getAxisesByIndex(from);
                    return 1;
                }
                return 0;
            }
            if (checkTarget(from, from + OFFSET[1], { start, lockedUps, axis: "y" })) {
                awy.push(from += OFFSET[1]);
                axisesFrom = getAxisesByIndex(from);
                return 1;
            }
            if (checkTarget(from, from + OFFSET[0], { start, lockedUps, axis: "y" })) {
                awy.push(from += OFFSET[0]);
                axisesFrom = getAxisesByIndex(from);
                return 1;
            }
            return 0;
        }
        function leftOrRigth(checkDirection) {
            if (checkDirection) {
                let direction = axisesFrom.x > axisesTo.x ? 2 : 3;
                if (checkTarget(from, from + OFFSET[direction], { start, lockedUps, axis: "x" })) {
                    awy.push(from += OFFSET[direction]);
                    axisesFrom = getAxisesByIndex(from);
                    return 1;
                }
                return 0;
            }
            if (checkTarget(from, from + OFFSET[3], { start, lockedUps, axis: "x" })) {
                awy.push(from += OFFSET[3]);
                axisesFrom = getAxisesByIndex(from);
                return 1;
            }
            if (checkTarget(from, from + OFFSET[2], { start, lockedUps, axis: "x" })) {
                awy.push(from += OFFSET[2]);
                axisesFrom = getAxisesByIndex(from);
                return 1;
            }
            return 0;
        }
        function checkTarget(from, to, { start, axis }) {
            let axisesFrom = getAxisesByIndex(from), stepAxis = (to - from) / Math.abs(to - from);
            return !lockedUps.includes(to)
                && (!Number.isFinite(start) || to >= start)
                && (!axis ||
                    (axisesFrom[axis] + stepAxis >= 0
                        && axisesFrom[axis] + stepAxis < N));
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
        if (awy0)
            going0(awy0);
        else
            return lastLines(target);
        for (let i of [0, 3, 1, 3, 0, 2, 2, 1]) {
            repalseByDirection(i);
        }
        return true;
    }
    function lastLines(index, beforeGarbeg) {
        GoFromBelowNow = false;
        let profite, to, garbage, stop, direction, startLastLines = N * (N - 2), line = getAxisesByIndex(index).y, from = new getInfoByValue(index + 1, startLastLines), count = 1, before = beforeGarbeg || new getInfoByValue(getLinkedInBall(index, -1).index + 1, startLastLines), next = { index: null };
        while ((next = getLinkedInBall(next.index || from.index, 1)).index != before.index) {
            if (next.value) {
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
        if ((to.y >= line
            || to.x == N - 1
            || !getLinkedInBall(to.index, -1).value)
            && (to.value != from.value
                || to.y != line)) {
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
                            lockedUps.push(getIndexByValue(i + 1, startLastLines));
                        }
                        let awy0 = findAwy0(garbage.index, lockedUps, startLastLines);
                        if (awy0) {
                            going0(awy0);
                            profite--;
                        }
                    }
                    else if (garbage.value && garbage.x == getAxisesByIndex(INDEX0).x) {
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
            if (index == LENGTH - 3
                && new getInfoByValue(LENGTH - 2, startLastLines).index > new getInfoByValue(LENGTH - 1, startLastLines).index) {
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
                absSome = Math.abs(some);
                axises = getAxisesByIndex(index);
                step = (axises.y == line ? 1 : -1) * (some / absSome);
                index += axises.x + step < N && axises.x + step >= 0 ? step : N * (axises.y == N - 2 ? 1 : -1);
                some -= some > 0 ? 1 : -1;
            }
            return new getInfoByIndex(index);
        }
        function setDirection() {
            let offtet = count / 2 - 1, options1 = (line == N - 2 ? startLastLines : startLastLines + N) + offtet, option2 = (line == N - 2 ? LENGTH - 1 : LENGTH - 1 - N) - offtet, countSteps = 0, nextStep = before.index;
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
function replaseByindex(index, notLog) {
    let value = getValueByIndex(index);
    setValueByIndex(INDEX0, value);
    setValueByIndex(index, 0);
    OLDINDEX0 = INDEX0;
    INDEX0 = index;
    if (!notLog) {
        let hash0 = getHashByValue(0), hashValue = getHashByValue(value);
        HASH = HASH.split(hash0).map(h => h.replace(hashValue, hash0)).join(hashValue);
        PATH.push(index);
        COUNT_STEP++;
        if (ALL_HASH[HASH] >= 0) {
            new indexesForDelete(ALL_HASH[HASH], COUNT_STEP);
        }
        else {
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
        };
    }
}
function getOptions() {
    let indexex0 = getAxisesByIndex(INDEX0);
    let indexesI;
    return OFFSET.map(i => i + INDEX0)
        .filter(i => i >= 0
        && i < LENGTH
        && ((indexesI = getAxisesByIndex(i)).x == indexex0.x || indexesI.y == indexex0.y)
        && i != OLDINDEX0);
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


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server.service */ "7b+H");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");







function AppComponent_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", i_r4 - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r3, " ");
} }
function AppComponent_mat_progress_spinner_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-spinner", 15);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("diameter", 100);
} }
function AppComponent_tr_16_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_tr_16_td_1_Template_td_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const j_r9 = ctx.index; const i_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.onClickCell(i_r6 * ctx_r10.puzzleSize + j_r9); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", 0 === num_r8 ? "zero" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", num_r8 || "", " ");
} }
function AppComponent_tr_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent_tr_16_td_1_Template, 2, 2, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ar_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ar_r5);
} }
const _c0 = function () { return ["choose a solution speed", "faster", "medium", "slowly"]; };
class AppComponent {
    constructor(server) {
        this.server = server;
        this.title = "sliding-puzzle";
        this.puzzleNumbers = [];
        this.puzzleSize = 3;
        this.isSolutionRunning = false;
        this.showSpinner = false;
        this.solutionSpeed = -1;
        this.initPuzzleNumbers();
    }
    solvedOrStopSolution() {
        if (this.isSolutionRunning) {
            return this.stopSolution();
        }
        this.solved();
    }
    initPuzzleNumbers(puzzleSize) {
        if (this.isSolutionRunning) {
            this.stopSolution();
        }
        let puzzleNumbersFromLocalStore = localStorage.getItem("puzzleNumbers");
        if (puzzleNumbersFromLocalStore && !puzzleSize) {
            this.puzzleNumbers = JSON.parse(puzzleNumbersFromLocalStore);
            this.initVariables();
        }
        else {
            this.showSpinner = true;
            this.server.getNewArray(this.puzzleSize).subscribe((res) => {
                this.puzzleNumbers = JSON.parse(JSON.stringify(res));
                this.showSpinner = false;
                this.initVariables();
                this.saveArrayInLocalStore();
            });
        }
    }
    onClickCell(flatIndex) {
        if (this.getReplaceOptions().includes(flatIndex)) {
            this.replace0WithFlatIndex(flatIndex);
            this.saveArrayInLocalStore();
        }
    }
    initVariables() {
        this.puzzleSize = this.puzzleNumbers.length;
        this.length = Math.pow(this.puzzleSize, 2);
        this.flatIndex0 = this.getFlatIndex0();
    }
    getFlatIndex0() {
        for (let i = 0; i < this.length; i++) {
            if (0 === this.getPuzzleNumberByFlatIndex(i)) {
                return i;
            }
        }
    }
    replace0WithFlatIndex(flatIndex) {
        this.setPuzzleNumber(this.flatIndex0, this.getPuzzleNumberByFlatIndex(flatIndex));
        this.setPuzzleNumber(flatIndex, 0);
        this.flatIndex0 = flatIndex;
    }
    getReplaceOptions() {
        let { x: x0, y: y0 } = this.getCoordinatesForFlatIndex(this.flatIndex0);
        return [-this.puzzleSize, this.puzzleSize, -1, 1].map(gep => gep + this.flatIndex0)
            .filter((flatIndexOption) => {
            const { y: flatIndexOptionY, x: flatIndexOptionX } = this.getCoordinatesForFlatIndex(flatIndexOption);
            return flatIndexOption >= 0
                && flatIndexOption < this.length
                && (flatIndexOptionY === y0 || flatIndexOptionX === x0);
        });
    }
    getPuzzleNumberByFlatIndex(flatIndex) {
        const { y, x } = this.getCoordinatesForFlatIndex(flatIndex);
        return this.puzzleNumbers[y][x];
    }
    setPuzzleNumber(flatIndex, value) {
        const { y, x } = this.getCoordinatesForFlatIndex(flatIndex);
        this.puzzleNumbers[y][x] = value;
    }
    getCoordinatesForFlatIndex(flatIndex) {
        return {
            y: Math.floor(flatIndex / this.puzzleSize),
            x: flatIndex % this.puzzleSize,
        };
    }
    stopSolution() {
        this.isSolutionRunning = false;
        clearInterval(this.intervalId);
        this.saveArrayInLocalStore();
    }
    saveArrayInLocalStore() {
        localStorage.setItem("puzzleNumbers", JSON.stringify(this.puzzleNumbers));
    }
    solved() {
        this.showSpinner = true;
        this.server.getSolution(this.puzzleNumbers).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => this.showSpinner = false)).subscribe((res) => {
            console.log(`Number of solution steps: ${res.length}`);
            this.isSolutionRunning = true;
            let i = 0;
            this.intervalId = setInterval(() => {
                if (i < res.length) {
                    this.replace0WithFlatIndex(res[i++]);
                }
                else {
                    this.stopSolution();
                }
            }, Math.abs(this.solutionSpeed) * 250);
        }, () => {
            this.stopSolution();
            setTimeout(() => {
                alert("Insoluble board!");
            }, 15);
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_server_service__WEBPACK_IMPORTED_MODULE_2__["ServerService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 17, vars: 9, consts: [[1, "row"], [1, "col-5", "ps-5", "my-3"], ["type", "number", "min", "3", "max", "40", 1, "inputs-width", "text-center", 3, "ngModel", "ngModelChange"], [1, "form-select", "mt-3", "inputs-width", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn-group", "inputs-width", "my-3"], [1, "btn", "btn-primary", "col-6", 3, "click"], [1, "btn", "col-6", 3, "ngClass", "click"], [1, "col-2", "d-flex", "justify-content-center", "pt-4"], ["mode", "indeterminate", "color", "accent", 3, "diameter", 4, "ngIf"], [1, "row", "justify-content-center", "mx-0"], [1, "game-board"], [1, "table", "table-bordered"], [4, "ngFor", "ngForOf"], [3, "value"], ["mode", "indeterminate", "color", "accent", 3, "diameter"], ["class", "align-middle text-center cell ", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "align-middle", "text-center", "cell", 3, "ngClass", "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_2_listener($event) { return ctx.puzzleSize = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_3_listener($event) { return ctx.solutionSpeed = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, AppComponent_option_4_Template, 2, 2, "option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_6_listener() { return ctx.initPuzzleNumbers(ctx.puzzleSize); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_8_listener() { return ctx.solvedOrStopSolution(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AppComponent_mat_progress_spinner_11_Template, 1, 1, "mat-progress-spinner", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "table", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, AppComponent_tr_16_Template, 2, 1, "tr", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.puzzleSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.solutionSpeed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.puzzleNumbers.length == ctx.puzzleSize ? "mix" : "update", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.isSolutionRunning ? "btn-danger" : "btn-success");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.isSolutionRunning ? "stop" : "solve", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSpinner);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.puzzleNumbers);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinner"]], styles: [".cell[_ngcontent-%COMP%] {\n  height: 90px;\n  width: 90px;\n}\n.cell.zero[_ngcontent-%COMP%] {\n  border: 5px;\n  background-color: #88b3da;\n}\n.cell[_ngcontent-%COMP%]:not(.zero) {\n  background-color: #537e49;\n  color: #803030;\n  font-size: 45px;\n}\n.game-board[_ngcontent-%COMP%] {\n  width: -webkit-max-content;\n  width: max-content;\n}\n.inputs-width[_ngcontent-%COMP%] {\n  width: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksWUFGTTtFQUdOLFdBSE07QUFHVjtBQUVJO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0FBQVI7QUFHSTtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFEUjtBQUtBO0VBQ0ksMEJBQUE7RUFBQSxrQkFBQTtBQUZKO0FBS0E7RUFDSSxVQUFBO0FBRkoiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJG1lYXN1cmU6IDkwcHg7XHJcbi5jZWxsIHtcclxuICAgIGhlaWdodDogJG1lYXN1cmU7XHJcbiAgICB3aWR0aDogJG1lYXN1cmU7XHJcblxyXG4gICAgJi56ZXJvIHtcclxuICAgICAgICBib3JkZXI6IDVweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTM2LCAxNzksIDIxOCk7XHJcbiAgICB9XHJcblxyXG4gICAgJjpub3QoLnplcm8pIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODMsIDEyNiwgNzMpO1xyXG4gICAgICAgIGNvbG9yOiByZ2IoMTI4LCA0OCwgNDgpO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogJG1lYXN1cmUgLyAyO1xyXG4gICAgfVxyXG59XHJcblxyXG4uZ2FtZS1ib2FyZCB7XHJcbiAgICB3aWR0aDogbWF4LWNvbnRlbnQ7XHJcbn1cclxuXHJcbi5pbnB1dHMtd2lkdGgge1xyXG4gICAgd2lkdGg6IDUwJTtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-root",
                templateUrl: "./app.component.html",
                styleUrls: ["./app.component.scss"]
            }]
    }], function () { return [{ type: _server_service__WEBPACK_IMPORTED_MODULE_2__["ServerService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");








class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map