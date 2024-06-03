import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

interface Weather {
  city: string;
  temperature: number;
  humidity: number;
}
@Component({
  selector: 'app-lesson10',
  templateUrl: './lesson10.component.html',
  styleUrl: './lesson10.component.css',
})
export class Lesson10Component implements OnInit {
  citySubject$ = new Subject<string>();
  displayWeather: Weather[] = [];

  ngOnInit() {
    this.citySubject$
      .pipe(
        switchMap((city) => {
          return this.getWeather(city).pipe(delay(1000));
        })
      )
      .subscribe((weather) => {
        this.displayWeather.push(weather);
      });
  }

  submitCity(city: string) {
    this.citySubject$.next(city);
  }

  getWeather(city: string): Observable<Weather> {
    const weatherDataMap: { [key: string]: Weather } = {
      seattle: {
        city: 'Seattle',
        temperature: 73,
        humidity: 41,
      },
      'new york city': {
        city: 'New York City',
        temperature: 73,
        humidity: 41,
      },
      'los angeles': {
        city: 'Los Angeles',
        temperature: 73,
        humidity: 41,
      },
    };

    return of(weatherDataMap[city]);
  }
}
