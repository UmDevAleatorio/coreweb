export class Price {
  private constructor(readonly value: number) {}

  static create(value: number): Price {
    if (!this.validate(value)) {
      throw new Error('O preço não pode ser negativo.');
    }
    return new Price(value);
  }

  get formatted(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.value);
  }

  private static validate(value: number): boolean {
    return value >= 0;
  }
}