import { AbstractControl, ValidatorFn } from '@angular/forms';

// Função de validação personalizada
export function emailPrefixValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    const regex = new RegExp('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$');
    const valid = regex.test(email);
    return valid ? null : { invalidPrefix: true };
  };
}
