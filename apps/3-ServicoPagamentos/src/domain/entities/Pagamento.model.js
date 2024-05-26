export class PagamentoModel {
    codigo;
    codAss;
    valorPago;
    dataPagamento;
  
    constructor(codigo, codAss, valorPago, dia, mes, ano) {
      this.codigo = codigo;
      this.codAss = codAss;
      this.valorPago = valorPago;
      this.dataPagamento = new Date(ano, mes - 1, dia);
    }
  }