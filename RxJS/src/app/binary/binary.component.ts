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
      switch (conversion.convertTo) {
        case 'Binary':
          this.displayNumber = this.decimalToBinary(conversion.original);
          break;
        case 'Octal':
          this.displayNumber = this.decimalToOctal(conversion.original);
          break;
        case 'Hexadecimal':
          this.displayNumber = this.decimalToHex(conversion.original);
          break;
      }
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

  decimalToOctal(decimal: number): string {
    if (decimal === 0) {
      return '0';
    }

    let octal = '';
    while (decimal > 0) {
      octal = (decimal % 8).toString() + octal;
      decimal = Math.floor(decimal / 8);
    }

    return octal;
  }

  decimalToHex(decimal: number): string {
    if (decimal === 0) {
      return '0';
    }

    const hexDigits = '0123456789ABCDEF';
    let hex = '';

    while (decimal > 0) {
      const remainder = decimal % 16;
      hex = hexDigits[remainder] + hex;
      decimal = Math.floor(decimal / 16);
    }

    return hex;
  }
}
