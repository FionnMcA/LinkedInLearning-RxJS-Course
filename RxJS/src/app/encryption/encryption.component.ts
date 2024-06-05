import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css'],
})
export class EncryptionComponent implements OnInit {
  plainTextSubject$ = new Subject<string>();
  encryptedTextSubject$ = new Subject<string>();
  inputNumberSubject$ = new Subject<number>();
  inputDecryptNumberSubject$ = new Subject<number>();
  decipheredText = '';
  encipheredText = '';

  ngOnInit() {
    this.plainTextSubject$
      .pipe(combineLatestWith(this.inputNumberSubject$))
      .subscribe(([plaintext, shift]) => {
        this.encipheredText = this.ceasarCipher(plaintext, shift);
      });

    this.encryptedTextSubject$
      .pipe(combineLatestWith(this.inputDecryptNumberSubject$))
      .subscribe(([encryptedText, shift]) => {
        this.decipheredText = this.ceasarDecipher(encryptedText, shift);
      });
  }

  inputPlaintext(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.plainTextSubject$.next(input);
    console.log(`Plaintext input: ${input}`);
  }

  inputEncryptedText(event: Event) {
    const encryptedInput = (event.target as HTMLInputElement).value;
    this.encryptedTextSubject$.next(encryptedInput);
  }

  inputDecryptNumber(event: Event) {
    const inputDecrypt = (event.target as HTMLInputElement).value;
    const inputDecryptNumber = parseInt(inputDecrypt);
    this.inputDecryptNumberSubject$.next(inputDecryptNumber);
  }
  inputNumber(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const number = parseInt(input, 10);
    this.inputNumberSubject$.next(number);
    console.log(`Number input: ${number}`);
  }

  ceasarDecipher(text: string, shift: number) {
    return this.ceasarCipher(text, -shift);
  }

  ceasarCipher(text: string, shift: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
      let tempChar = text.charAt(i);
      if (shift < 0) {
        shift += 26;
      }
      let tempIndex = alphabet.indexOf(tempChar);
      let newChar = alphabet.charAt((shift + tempIndex) % 26);
      encryptedText += newChar;
    }
    return encryptedText;
  }
}
