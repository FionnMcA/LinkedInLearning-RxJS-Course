import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

interface Weather {
  day: string;
  temperature: number;
}

@Component({
  selector: 'app-lesson6',
  templateUrl: './lesson6.component.html',
  styleUrl: './lesson6.component.css',
})
export class Lesson6Component implements OnDestroy, OnInit {
  displayWeather: Weather[] = [];
  weatherSubject$ = new Subject<Weather>();
  destroySubject$ = new Subject<void>();

  private weatherData = [
    {
      day: 'Monday',
      temperature: 61,
    },
    {
      day: 'Tuesday',
      temperature: 72,
    },
    {
      day: 'Wednesday',
      temperature: 76,
    },
    {
      day: 'Thursday',
      temperature: 49,
    },
    {
      day: 'Friday',
      temperature: 53,
    },
    {
      day: 'Saturday',
      temperature: 62,
    },
    {
      day: 'Sunday',
      temperature: 77,
    },
  ];

  ngOnInit() {
    this.weatherSubject$
      .pipe(
        takeUntil(this.destroySubject$),
        filter((weather) => {
          return weather.temperature > 70;
        })
      )
      .subscribe((weather) => {
        this.displayWeather.push(weather);
      });

    for (const weather of this.weatherData) {
      this.weatherSubject$.next(weather);
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    console.log('Component is Destroyed');
  }
}
