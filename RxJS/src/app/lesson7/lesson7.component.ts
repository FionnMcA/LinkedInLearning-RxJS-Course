import { Component } from '@angular/core';
import { Observable, last, from } from 'rxjs';

@Component({
  selector: 'app-lesson7',
  templateUrl: './lesson7.component.html',
  styleUrl: './lesson7.component.css',
})
export class Lesson7Component {
  temperatureSubject$ = new Observable<number>();
  temperatureDataList: number[] = [];
  temperatureInputList: number[] = [];
  inputTemperature = 0;

  setTemperature() {
    const temperature = this.inputTemperature;
    this.temperatureInputList.push(temperature);
  }

  displayValues() {
    this.temperatureSubject$ = from(this.temperatureInputList);
    this.temperatureSubject$.pipe(last()).subscribe((temperature) => {
      this.temperatureDataList.push(temperature);
    });
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }
}
