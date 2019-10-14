export class GraficaData {
  private opciones: number[] = [1, 2, 3, 4];
  private valores: number[] = [0, 0, 0, 0];

  constructor () {}

  getDataGrafica () {
    return [
      {
        data: this.valores,
        label: 'Encuesta'
      }
    ]
  }

  incrementarValor(opcion: number, valor: number) {
     for (let i in this.opciones) {
       if (this.opciones[i] === opcion) {
         this.valores[i] += valor;
       }
     }
     return this.getDataGrafica();
  } 
}
