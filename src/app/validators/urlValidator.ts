import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(): (control: AbstractControl) => ValidationErrors | null {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)' +                  // protocolo
    '((([a-zA-Z0-9\\-._~%!$&\'()*+,;=]+)@)?' + // usuario (opcional)
    '((([a-zA-Z0-9\\-._~%]+)\\.)+[a-zA-Z]{2,}))' + // dominio
    '(\\:[0-9]{1,5})?' +                  // puerto (opcional)
    '(\\/[^\\s]*)?$',                     // ruta (opcional)
    'i'
  );

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || urlPattern.test(value)) {
      return null;
    }
    return { pattern: true };
  };
}
