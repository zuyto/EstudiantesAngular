import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[tipo-dato]'
})
export class ConvertirTextoDirective {

  /**
  * Recibe el valor de texto a convertir
  */
 @Input('texto-convertir') textoConvert: string;

 /**
 * Evento que actualiza el ngModel
 */
 @Output() ngModelChange: EventEmitter<any> = new EventEmitter()
 /**
* Constructor
* @param elRef referencia al elemento
* @param renderer permite cambiar las propiedades del elRef
*/

 constructor(private elRef: ElementRef, private renderer: Renderer2) {
   this.textoConvert = null;
 }

 /**
  * Evento ejecutado al Presionar una tecla
  * @param elemento
  */
 @HostListener('keyup', ['$event.target']) onKeyUp(elemento) {
   elemento.value = this.getValorValidado(elemento.value);
   this.ngModelChange.emit(elemento.value);
 }

 /**
  * Evento ejecutado al quitar foco del elemento
  * @param elemento
  */
 @HostListener('blur', ['$event.target']) onBlur(elemento) {
   elemento.value = this.getValorValidado(elemento.value);
   this.ngModelChange.emit(elemento.value);
 }
 /**
* Validar el valor ingresado contra la expresion regular
* @param valorIn Valor digitado en el elemento
*/
 getValorValidado(valorIn: any) {
   let valorFinal: any = null;

   switch (this.textoConvert) {
     case "mayus": valorFinal = (valorIn + '').toUpperCase(); break;
     default: valorFinal = valorIn; break;
   }

   return valorFinal;
 }

}
