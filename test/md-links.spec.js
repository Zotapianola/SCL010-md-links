const mdLinks = require('../src/md-links.js');

describe('El módulo mdLinks debe poder importarse', () => {
  it('La constante debería estar definida ', () => {
    expect(mdLinks).toBeDefined();   
});
  it('Debería corresponder a una función', () => {
    expect(typeof mdLinks).toBe('function');    
  });
});

describe('La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las propiedades "href", "text" y "file" ', ()=> {
  // it('mdLinks retorna una promesa', () => {
  //   expect(typeof mdLinks).toBe('object');    
  // });
});