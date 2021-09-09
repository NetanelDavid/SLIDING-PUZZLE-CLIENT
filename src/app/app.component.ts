import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'sliding-puzzle';

  arr: number[][] = [];
  n: number = 3;
  offset: number[];
  index0: number;
  length: number;
  timer: any;
  isActive: boolean = false;
  speed: number = -1;
  spinner = false;

  constructor(private serevr: ServerService) {
    this.constArr();
  }

  constArr(n?: number) {

    if (this.isActive) {
      this.stop();
    }

    let arrLocal = localStorage.getItem('arr');

    if (arrLocal && !n) {

      this.arr = JSON.parse(arrLocal);
      this.constVariables();

    } else {

      this.spinner = true;
      this.serevr.getNewArray(this.n).subscribe(res => {
        this.arr = res.arr;
        this.constVariables();
        localStorage.setItem('arr', JSON.stringify(this.arr));
        this.spinner = false;
      })

    }
  }

  constVariables() {
    this.n = this.arr.length;
    this.length = Math.pow(this.n, 2);
    this.offset = [-this.n, this.n, -1, 1];
    this.index0 = this.search0();
  }

  search0(): number {
    for (let i = 0; i < this.length; i++) {
      if (!this.getValue(i)) {
        return i;
      }
    }
  }

  replase(index: number) {

    this.setValue(this.index0, this.getValue(index));
    this.setValue(index, 0);

    this.index0 = index;
  }

  click(index: number) {
    if (this.getOptions().includes(index)) {
      this.replase(index);
      localStorage.setItem('arr', JSON.stringify(this.arr));
    }
  }

  getOptions(): number[] {

    let indexex0 = this.getAxises(this.index0);
    let indexesI: number[];

    return this.offset.map(i => i + this.index0)
      .filter(
        i =>
          i >= 0
          && i < this.length
          && ((indexesI = this.getAxises(i))[0] == indexex0[0] || indexesI[1] == indexex0[1])
      );
  }

  getValue(index: number): number {
    return this.arr[Math.floor(index / this.n)][index % this.n];
  }

  setValue(index: number, value: number): void {
    this.arr[Math.floor(index / this.n)][index % this.n] = value;
  }

  getAxises(index: number): number[] {
    return [Math.floor(index / this.n), index % this.n];
  }

  stop(): void {
    this.isActive = false;
    clearInterval(this.timer)
    localStorage.setItem("arr", JSON.stringify(this.arr))
  }

  solvedAndStop() {

    if (this.isActive) {
      this.stop();
    } else {
      this.solved()
    }
  }

  solved(): void {
    this.spinner = true;
    this.serevr.getSolution(this.arr).pipe(finalize(() => this.spinner = false)).subscribe(
      res => {
        let i = 0;
        this.isActive = true;
        console.log(res.path.length);

        this.timer = setInterval(() => {

          if (i < res.path.length) {
            this.replase(res.path[i++]);
          } else {
            this.stop();
          }
        }, Math.abs(this.speed) * 250);

      }, () => {
        this.stop();
        setTimeout(() => {
          alert("Insoluble board!");
        }, 15)
      }
    )
  }

}