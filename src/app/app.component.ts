import { Component } from "@angular/core";
import { finalize } from "rxjs/operators";
import { ResolverService } from "./resolver.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

type Coordinates = {
	y: number;
	x: number;
}
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	standalone: true,
	imports: [CommonModule, FormsModule, MatProgressSpinnerModule]
})

export class AppComponent {

	title = "sliding-puzzle";

	public puzzleNumbers: number[][] = [];
	public puzzleSize = 3;
	public isSolutionRunning = false;
	public showSpinner = false;
	public solutionSpeed = -1;

	private flatIndex0: number;
	private length: number;
	private intervalId: any;

	constructor(private resolver: ResolverService) {
		this.initPuzzleNumbers();
	}

	public solvedOrStopSolution() {
		if (this.isSolutionRunning) {
			return this.stopSolution();
		}
		this.solved();
	}

	public initPuzzleNumbers(puzzleSize?: number) {

		if (this.isSolutionRunning) {
			this.stopSolution();
		}

		let puzzleNumbersFromLocalStore = localStorage.getItem("puzzleNumbers");
		if (puzzleNumbersFromLocalStore && !puzzleSize) {
			this.puzzleNumbers = JSON.parse(puzzleNumbersFromLocalStore);
			this.initVariables();
		} else {
			this.showSpinner = true;
			this.resolver.getNewArray(this.puzzleSize).subscribe((res) => {
				this.puzzleNumbers = JSON.parse(JSON.stringify(res));
				this.showSpinner = false;
				this.initVariables();
				this.saveArrayInLocalStore();
			})

		}
	}

	public onClickCell(flatIndex: number) {
		if (this.getReplaceOptions().includes(flatIndex)) {
			this.replace0WithFlatIndex(flatIndex);
			this.saveArrayInLocalStore()
		}
	}

	private initVariables() {
		this.puzzleSize = this.puzzleNumbers.length;
		this.length = Math.pow(this.puzzleSize, 2);
		this.flatIndex0 = this.getFlatIndex0();
	}

	private getFlatIndex0(): number {
		for (let i = 0; i < this.length; i++) {
			if (0 === this.getPuzzleNumberByFlatIndex(i)) {
				return i;
			}
		}
	}

	private replace0WithFlatIndex(flatIndex: number) {
		this.setPuzzleNumber(this.flatIndex0, this.getPuzzleNumberByFlatIndex(flatIndex));
		this.setPuzzleNumber(flatIndex, 0);
		this.flatIndex0 = flatIndex;
	}

	private getReplaceOptions(): number[] {

		let { x: x0, y: y0 } = this.getCoordinatesForFlatIndex(this.flatIndex0);

		return [-this.puzzleSize, this.puzzleSize, -1, 1].map(gep => gep + this.flatIndex0)
			.filter((flatIndexOption) => {
				const { y: flatIndexOptionY, x: flatIndexOptionX } = this.getCoordinatesForFlatIndex(flatIndexOption);
				return flatIndexOption >= 0
					&& flatIndexOption < this.length
					&& (flatIndexOptionY === y0 || flatIndexOptionX === x0)
			});
	}

	private getPuzzleNumberByFlatIndex(flatIndex: number): number {
		const { y, x } = this.getCoordinatesForFlatIndex(flatIndex);
		return this.puzzleNumbers[y][x];
	}

	private setPuzzleNumber(flatIndex: number, value: number): void {
		const { y, x } = this.getCoordinatesForFlatIndex(flatIndex);
		this.puzzleNumbers[y][x] = value;
	}

	private getCoordinatesForFlatIndex(flatIndex: number): Coordinates {
		return {
			y: Math.floor(flatIndex / this.puzzleSize),
			x: flatIndex % this.puzzleSize,
		}
	}

	private stopSolution(): void {
		this.isSolutionRunning = false;
		clearInterval(this.intervalId)
		this.saveArrayInLocalStore();
	}

	private saveArrayInLocalStore() {
		localStorage.setItem("puzzleNumbers", JSON.stringify(this.puzzleNumbers));
	}

	private solved(): void {
		this.showSpinner = true;
		this.resolver.getSolution(this.puzzleNumbers).pipe(finalize(() => this.showSpinner = false)).subscribe((res) => {
			console.log(`Number of solution steps: ${res.length}`);
			this.isSolutionRunning = true;

			let i = 0;
			this.intervalId = setInterval(() => {
				if (i < res.length) {
					this.replace0WithFlatIndex(res[i++]);
				} else {
					this.stopSolution();
				}
			}, Math.abs(this.solutionSpeed) * 250);

		}, () => {
			this.stopSolution();
			setTimeout(() => {
				alert("Insoluble board!");
			}, 15)
		});
	}

}