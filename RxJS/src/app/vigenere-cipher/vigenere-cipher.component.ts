import { Component, OnInit } from '@angular/core';
import { combineLatestWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vigenere-cipher',
  templateUrl: './vigenere-cipher.component.html',
  styleUrl: './vigenere-cipher.component.css',
})
export class VigenereCipherComponent implements OnInit {
  plainTextSubject$ = new Subject<string>();
  keywordSubject$ = new Subject<string>();
  encryptedText = '';

  ngOnInit() {
    this.plainTextSubject$
      .pipe(combineLatestWith(this.keywordSubject$))
      .subscribe(([plainText, keyword]) => {
        this.encryptedText = this.vigenereCipher(plainText, keyword);
      });
  }
  vigenereCipher(plainText: string, keyword: string) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let encryptedText = '';
    while (keyword.length < plainText.length) {
      keyword += keyword;
    }

    keyword = keyword.slice(0, plainText.length);

    for (let j = 0; j < plainText.length; j++) {
      let tempCharPT = plainText.charAt(j);
      let tempIndexPT = alphabet.indexOf(tempCharPT);
      let tempCharKW = keyword.charAt(j);
      let tempIndexKW = alphabet.indexOf(tempCharKW);
      encryptedText += alphabet.charAt((tempIndexPT + tempIndexKW) % 26);
    }
    return encryptedText;
  }

  setPlainText(event: Event) {
    const plainText = (event.target as HTMLInputElement).value;
    this.plainTextSubject$.next(plainText);
  }

  setKeyword(event: Event) {
    const keyword = (event.target as HTMLInputElement).value;
    this.keywordSubject$.next(keyword);
  }
}
