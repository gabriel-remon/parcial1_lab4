import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function edadValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const givenDate = new Date(control.value);
  const today = new Date();

  // Obtener los años, meses y días de las dos fechas
  const givenYear = givenDate.getFullYear();
  const givenMonth = givenDate.getMonth();
  const givenDay = givenDate.getDate();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Calcular la diferencia en años
  let ageDifference = currentYear - givenYear;

  // Ajustar si la fecha actual es antes de la fecha dada en el mismo año
  if (currentMonth < givenMonth || (currentMonth === givenMonth && currentDay < givenDay)) {
    ageDifference--;
  }

    if (ageDifference !== null && ageDifference !== undefined && ageDifference < minAge) {
      return { minAge: true };
    }
    return null;
  };
}
