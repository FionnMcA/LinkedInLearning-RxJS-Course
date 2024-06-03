import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SNOWMAN_IMAGE =
  'https://colormadehappy.com/wp-content/uploads/2022/11/Snowman-Drawing-5.jpg.webp';
const SUN_IMAGE =
  'https://science.nasa.gov/wp-content/uploads/2023/05/sun-cartoon-crop.png?w=4096&format=png&crop=1';

@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrl: './lesson1.component.css',
})
export class Lesson1Component implements OnInit {
  inputTemperature = 0;
  imageSrc = SUN_IMAGE;

  //its normal convention to add $ to subject names
  temperatureSubject$ = new BehaviorSubject<number>(72);

  ngOnInit() {
    // Subscribe to the temperatureSubject$ to update the image source based on the temperature
    this.temperatureSubject$.subscribe((temperature) => {
      if (temperature >= 50) {
        this.imageSrc = SUN_IMAGE;
      } else {
        this.imageSrc = SNOWMAN_IMAGE;
      }
    });
  }

  setTemperature() {
    this.temperatureSubject$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }
}
