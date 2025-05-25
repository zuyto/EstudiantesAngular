import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidarInputDirective } from './validar-input.directive';
import { ConvertirTextoDirective } from './convertir-texto.directive';
import { LongitudInputDirective } from './longitud-input.directive';



@NgModule({
  declarations: [
    ValidarInputDirective,
    ConvertirTextoDirective,
    LongitudInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidarInputDirective,
    ConvertirTextoDirective,
    LongitudInputDirective
  ]
})
export class DirectivasModule { }
