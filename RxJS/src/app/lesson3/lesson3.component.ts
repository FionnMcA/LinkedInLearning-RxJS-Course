import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson3',
  templateUrl: './lesson3.component.html',
  styleUrl: './lesson3.component.css',
})
export class Lesson3Component implements OnInit {
  temperatureDataList: number[] = [];
  inputTemperature = 0;
  temperatureSubject$ = new ReplaySubject<number>();
  replaySubscription: Subscription | undefined;

  ngOnInit() {}

  setTemperature() {
    const temperature = this.inputTemperature;
    this.temperatureSubject$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  addSubscription() {
    if (this.replaySubscription) {
      return;
    }
    this.temperatureDataList = [];
    this.replaySubscription = this.temperatureSubject$.subscribe(
      (temperature) => {
        this.temperatureDataList.push(temperature);
      }
    );
  }

  removeSubscription() {
    this.temperatureDataList = [];
    this.replaySubscription?.unsubscribe();
    this.replaySubscription = undefined;
  }
}
