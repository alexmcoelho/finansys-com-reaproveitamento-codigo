import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
  <p class='text-danger'>
    {{errorMessage}}
  </p>
`,
styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

@Input('form-control') formControl: FormControl;

//@Output()
//public exibirPainelFilho: EventEmitter<string> = new EventEmitter<string>()

constructor() { }

ngOnInit() {
}

public get errorMessage () : string | null {  
  return this.errorMessages();
}

private errorMessages(): string | null  {
  if (this.showMessageErro() )  // so tem essa validação por causa do campo data que é do primNG
    return this.getErrorMessage();
  else
    return null; 
}

private showMessageErro(): boolean {
  return (this.formControl.invalid && this.formControl.touched);
}

private getErrorMessage(): string | null {
  if (this.formControl.errors.required) {
    return 'Dado Obrigatório';

  } else if (this.formControl.errors.minlength) {
    const requiredLength = this.formControl.errors.minlength.requiredLength;
    return `Deve possuir no minimo ${requiredLength}  caracteres`;

  } else if (this.formControl.errors.maxlength) {
    const requiredLength = this.formControl.errors.maxlength.requiredLength;
    return `Deve possuir no máximo ${requiredLength}  caracteres`;

  } else if (this.formControl.errors.email) {
    return 'Formato de e-mail inválido';
  }
  else if (this.formControl.errors.cepInvalido) {
    return 'CEP inválido';
  }
}


}