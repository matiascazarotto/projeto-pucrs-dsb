export class AssinaturaModel {
    codigo;
    codApp;
    codCli;
    inicioVigencia;
    fimVigencia;
  
    constructor(codigo, codApp, codCli, inicioVigencia, fimVigencia) {
      this.codigo = codigo;
      this.codApp = codApp;
      this.codCli = codCli;
      this.inicioVigencia = inicioVigencia;
      this.fimVigencia = fimVigencia;
    }
  }