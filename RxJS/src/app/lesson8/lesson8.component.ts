import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { combineLatest, combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'app-lesson8',
  templateUrl: './lesson8.component.html',
  styleUrl: './lesson8.component.css',
})
export class Lesson8Component implements OnInit {
  temperatureSubject$ = new Subject<number>();
  feelsLikeSubject$ = new Subject<number>();
  temperatureDataList: number[] = [];
  inputTemperature = 0;
  inputFeelsLikeTemperature = 0;
  displayText = '';

  ngOnInit() {
    this.temperatureSubject$
      .pipe(combineLatestWith(this.feelsLikeSubject$))
      .subscribe(([temperature, feelsLikeTemperature]) => {
        this.displayText = `It's ${temperature}F, but it feels like ${feelsLikeTemperature}`;
      });
  }

  setTemperature() {
    this.temperatureSubject$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  setFeelsLike() {
    this.feelsLikeSubject$.next(this.inputFeelsLikeTemperature);
  }

  setInputFeelsLike(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputFeelsLikeTemperature = parseInt(input);
  }
}
