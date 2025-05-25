import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input, textarea[longitud]'
})
export class LongitudInputDirective {

  /**
     * Recibe la longitud a validar
     */
    @Input('longitud') longitud: number;

    /**
     * Evento que actualiza el ngModel
     */
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter()

    /**
     * Constructor
     * @param elRef referencia al elemento
     * @param renderer permite cambiar las propiedades del elRef
     */
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    /**
     * Evento ejecutado al Presionar una tecla
     * @param elemento
     */
    @HostListener('keyup', ['$event.target']) onKeyUp(elemento) {
        let texto = elemento.value;
        elemento.value = texto.substring(0, this.longitud);
        this.ngModelChange.emit(elemento.value);
    }

    /**
     * Evento ejecutado al quitar foco del elemento
     * @param elemento
     */
    @HostListener('blur', ['$event.target']) onBlur(elemento) {
            let texto = elemento.value;
            elemento.value = texto.substring(0, this.longitud);
            this.ngModelChange.emit(elemento.value);
    }

}
