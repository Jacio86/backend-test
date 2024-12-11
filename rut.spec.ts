import { describe, test, expect } from "@jest/globals"
import {contarCoincidenciasEnCadena} from "../backend-test/src/app/cadenas"
import {validarRUT} from "../backend-test/src/app/rut"

describe('contarCoincidenciasEnCadena', () => {
    it('debería contar correctamente las coincidencias de una subcadena en una cadena', () => {
        expect(contarCoincidenciasEnCadena('abcabcabc', 'abc')).toBe(3);
    });

    it('debería devolver 0 si la subcadena no está presente en la cadena', () => {
        expect(contarCoincidenciasEnCadena('abcdef', 'xyz')).toBe(0);
    });

    it('debería manejar cadenas vacías correctamente', () => {
        expect(contarCoincidenciasEnCadena('', 'abc')).toBe(0);
        expect(contarCoincidenciasEnCadena('abc', '')).toBe(0);
    });

    it('debería manejar subcadenas más largas que la cadena principal', () => {
        expect(contarCoincidenciasEnCadena('abc', 'abcdef')).toBe(0);
    });

    it('debería contar coincidencias solapadas', () => {
        expect(contarCoincidenciasEnCadena('aaa', 'aa')).toBe(2);
    });
});

describe('validarRUT', () => {
    it('debería validar un RUT correcto con dígito verificador 7', () => {
      // Asegúrate de que el RUT que usas sea válido según la implementación actual.
      // Cambiar el RUT a un valor válido
      expect(validarRUT('17.862.326-5')).toBe(true);  
    });
  
    it('debería devolver false para un RUT con dígito verificador incorrecto', () => {
      expect(validarRUT('20.123.456-8')).toBe(false); // RUT con dígito verificador incorrecto
    });
  
    it('debería devolver false para un RUT vacío', () => {
      expect(validarRUT('')).toBe(false);
    });
  
    it('debería devolver false para un RUT con caracteres no numéricos', () => {
      expect(validarRUT('20.123.ABC-7')).toBe(false); 
    });
  });