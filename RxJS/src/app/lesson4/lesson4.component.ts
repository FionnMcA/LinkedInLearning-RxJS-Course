import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

interface Weather {
  day: string;
  temperature: number;
}

@Component({
  selector: 'app-lesson4',
  templateUrl: './lesson4.component.html',
  styleUrl: './lesson4.component.css',
})
export class Lesson4Component {
  inputTemperature = 0;
  weatherOutput: Weather | undefined;
  weatherSubject$ = new Subject<Weather>();

  selectedDay = 'Monday';

  weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  ngOnInit() {
    this.weatherSubject$
      .pipe(
        map((weather) => {
          return {
            temperature: Math.ceil(weather.temperature),
            day: weather.day,
          };
        })
      )
      .subscribe((weather) => {
        this.weatherOutput = weather;
      });
  }

  setTemperature() {
    this.weatherSubject$.next({
      temperature: this.inputTemperature,
      day: this.selectedDay,
    });
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = Number(input);
  }
}
