import { Component } from '@angular/core';
import { Subject, from } from 'rxjs';
import { exhaustMap, delay, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-lesson9',
  templateUrl: './lesson9.component.html',
  styleUrl: './lesson9.component.css',
})
export class Lesson9Component {
  temperatureSubject$ = new Subject<number[]>();
  temperatureDataList: number[] = [];
  inputTemperature = 0;
  displayTemperatureText = '';
  callCount = 0;
  attemptedCallCount = 0;

  ngOnInit() {
    this.temperatureSubject$
      .pipe(
        exhaustMap((temperatureDataList) => {
          return from(temperatureDataList).pipe(delay(1000), toArray());
        })
      )
      .subscribe((temperatureDataList) => {
        this.temperatureDataList = temperatureDataList;
        this.callCount++;
      });
  }

  getWeather() {
    this.attemptedCallCount = this.attemptedCallCount + 1;
    const temperatureDataList = [51, 73, 64, 21];
    this.temperatureSubject$.next(temperatureDataList);
  }
}
