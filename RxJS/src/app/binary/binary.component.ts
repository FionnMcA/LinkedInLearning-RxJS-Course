import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

interface Conversion {
  original: number;
  convertTo: string;
}

@Component({
  selector: 'app-binary',
  templateUrl: './binary.component.html',
  styleUrls: ['./binary.component.css'],
})
export class BinaryComponent implements OnInit {
  inputNumberSubject$ = new Subject<number>();
  convertSubject$ = new Subject<Conversion>();
  binaryNumber: number;
  displayNumber: string;
  inputNumber: number;

  selectedBase = 'Binary';
  bases = ['Binary', 'Octal', 'Hexadecimal'];

  ngOnInit() {
    this.convertSubject$.subscribe((conversion) => {
      this.displayNumber = this.decimalToBinary(conversion.original);
      console.log(
        `convertTo: ${conversion.convertTo}, original number: ${conversion.original}`
      );
    });
  }

  enteredNumber(event: Event) {
    this.inputNumber = parseInt((event.target as HTMLInputElement).value);
    this.inputNumberSubject$.next(this.inputNumber);
  }

  convert() {
    this.convertSubject$.next({
      original: this.inputNumber,
      convertTo: this.selectedBase,
    });
  }

  decimalToBinary(decimal: number): string {
    if (decimal === 0) {
      return '0';
    }

    let binary = '';
    while (decimal > 0) {
      binary = (decimal % 2).toString() + binary;
      decimal = Math.floor(decimal / 2);
    }

    return binary;
  }
}
