import { FormControl } from "@angular/forms";

export class DataFormValidator {
    
    static validacaoCep(control: FormControl) {
        const cep = control.value;
        if(cep){
            const validaCep = /^[0-9]{8}$/;
            return validaCep.test(cep) ? null : {cepInvalido: true};
        }
        return null
    }
}