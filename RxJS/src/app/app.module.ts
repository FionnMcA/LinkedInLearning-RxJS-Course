import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { Lesson1Component } from './lesson1/lesson1.component';
import { HomeComponent } from './home/home.component';
import { Lesson2Component } from './lesson2/lesson2.component';
import { Lesson3Component } from './lesson3/lesson3.component';
import { Lesson4Component } from './lesson4/lesson4.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Lesson5Component } from './lesson5/lesson5.component';
import { Lesson6Component } from './lesson6/lesson6.component';
import { Lesson7Component } from './lesson7/lesson7.component';
import { Lesson8Component } from './lesson8/lesson8.component';
import { Lesson9Component } from './lesson9/lesson9.component';
import { Lesson10Component } from './lesson10/lesson10.component';
import { Lesson11Component } from './lesson11/lesson11.component';
import { EncryptionComponent } from './encryption/encryption.component';
import { VigenereCipherComponent } from './vigenere-cipher/vigenere-cipher.component';

@NgModule({
  declarations: [
    AppComponent,
    Lesson1Component,
    HomeComponent,
    Lesson2Component,
    Lesson3Component,
    Lesson4Component,
    Lesson5Component,
    Lesson6Component,
    Lesson7Component,
    Lesson8Component,
    Lesson9Component,
    Lesson10Component,
    Lesson11Component,
    EncryptionComponent,
    VigenereCipherComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
