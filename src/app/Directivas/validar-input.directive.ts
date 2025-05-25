import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[tipo-dato]'
})
export class ValidarInputDirective {

  /**
   * Recibe el tipo de dato a validar
   */
  @Input('tipo-dato') tipoDato: string;

  /**
   * Recibe por parametro la expresion regular,
   * necesita tipo-dato="parametro" [regExp]="expresionregular"
   */
  @Input('regExp') expresion: any;

  /**
   * Evento que actualiza el ngModel
   */
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter()

  /**
   * Expresiones regulares a validar
   */
  private patronSoloNumero = /[^0-9]/g;
  private patronAlfanumerico = /[^0-9A-Z a-zÑñáéíóúÁÉÍÓÚ]/g;
  private patronAlfanumericoGuion = /[^0-9A-Z a-zÑñáéíóúÁÉÍÓÚ-]/g;
  private patronAlfanumericoGuionBackSlash = /[^/ 0-9A-Z a-zÑñáéíóúÁÉÍÓÚ-]/g;
  private patronFormato24 = /[^0-9:]/g;
  private patronNumericoPunto = /[^0-9.]/g;
  private patronTexto = /[^A-Z a-zÑñáéíóúÁÉÍÓÚ]/g;
  private patronFecha = /[^0-9/]/g;
  private patronSoloLetras = /[^A-Z a-zÑñáéíóúÁÉÍÓÚ]/g;

  /**
   * Constructor
   * @param elRef referencia al elemento
   * @param renderer permite cambiar las propiedades del elRef
   */
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.expresion = null;
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

    switch (this.tipoDato) {
      case "numerico": valorFinal = (valorIn + '').replace(this.patronSoloNumero, ''); break;
      case "alfanumerico": valorFinal = (valorIn + '').replace(this.patronAlfanumerico, ''); break;
      case "fecha": valorFinal = (valorIn + '').replace(this.patronFecha, ''); break;
      case "alfanumericoGuion": valorFinal = (valorIn + '').replace(this.patronAlfanumericoGuion, ''); break;
      case "alfanumericoGuionBackSlash": valorFinal = (valorIn + '').replace(this.patronAlfanumericoGuionBackSlash, ''); break;
      case "formato24": valorFinal = (valorIn + '').replace(this.patronFormato24, ''); break;
      case "numericoPunto": valorFinal = (valorIn + '').replace(this.patronNumericoPunto, ''); break;
      case "texto": valorFinal = (valorIn + '').replace(this.patronTexto, ''); break;
      case "parametro": valorFinal = (valorIn + '').replace(this.expresion, ''); break;
      case "numericoPuntoDuo": valorFinal = this.validacionDecimalesEnteros(valorIn); break;
      case "soloAlfabeto": valorFinal = (valorIn + '').replace(this.patronSoloLetras, ''); break;

      default: valorFinal = valorIn; break;
    }

    return valorFinal;
  }

  validacionDecimalesEnteros(Dato: any) {
    let valorRespuesta: any = null;
    var regPrimera = /^[0-9]{1,2}$/g
    var regSegunda = /^[0-9]{1,2}[.]{1}$/g
    var regTercera = /^[0-9]{1,2}[.]{1}[0-9]{1,2}$/g

    if (regPrimera.test(Dato))
      valorRespuesta = Dato;
    else if (regSegunda.test(Dato))
      valorRespuesta = Dato;
    else if (regTercera.test(Dato))
      valorRespuesta = Dato;
    else
      valorRespuesta = Dato.substring(0, Dato.length - 1);
    return valorRespuesta;

  }

}
