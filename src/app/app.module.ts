import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { MaterialImportsModule } from './core/material-imports.module';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialImportsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

enableProdMode();
