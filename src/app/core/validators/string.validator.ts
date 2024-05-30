import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const stringRegex = /^[A-Za-z\s]+$/;  // Regex para solo letras y espacios
    if (value && !stringRegex.test(value)) {
      return { invalidString: true };
    }
    return null;
  };
}
