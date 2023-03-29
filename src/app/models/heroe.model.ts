
export class HeroeModel {

  id: String | undefined;
  nombre: String | undefined
  poder: String | undefined;
  vivo: Boolean;

  constructor() {
    this.vivo = true;
  }
}