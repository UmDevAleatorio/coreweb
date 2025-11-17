export class Email {
  private constructor(readonly value: string) {}

  static create(email: string): Email {
    if (!this.validate(email)) {
      throw new Error('Formato de e-mail inválido.');
    }
    return new Email(email);
  }

  private static validate(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}