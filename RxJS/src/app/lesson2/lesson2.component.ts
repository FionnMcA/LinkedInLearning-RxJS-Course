import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-lesson2',
  templateUrl: './lesson2.component.html',
  styleUrl: './lesson2.component.css',
})
export class Lesson2Component implements OnInit {
  inputTemp = 0;
  orginalTemp = 0;
  displayTemp = '';
  isCelsius = false;
  temperatureSubject$ = new Subject<number>();

  ngOnInit() {
    this.temperatureSubject$.subscribe((temperature) => {
      if (this.isCelsius) {
        this.displayTemp = temperature + 'C';
      } else {
        this.displayTemp = temperature + 'F';
      }
      this.inputTemp = temperature;
    });
  }

  setTemperature() {
    this.orginalTemp = this.inputTemp;
    this.isCelsius = false;
  }
  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemp = parseInt(input);
    this.isCelsius = false;
  }

  convertToCelsius() {
    this.isCelsius = true;
    const celsiusTemperature = ((this.inputTemp - 32) * 5) / 9;
    this.temperatureSubject$.next(celsiusTemperature);
  }

  convertToFahrenheit() {
    this.isCelsius = false;
    const fahrenheitTemperature = (this.inputTemp * 9) / 5 + 32;
    this.temperatureSubject$.next(fahrenheitTemperature);
  }
}
