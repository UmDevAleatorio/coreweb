export class Password {
  private constructor(readonly value: string) {}

  static create(pass: string): Password {
    this.validate(pass);
    return new Password(pass);
  }

  private static validate(pass: string): boolean {
    if (pass.length < 8) {
      throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(pass)) {
      throw new Error("A senha deve ter pelo menos uma letra maiúscula.");
    }
    if (!/[a-z]/.test(pass)) {
      throw new Error("A senha deve ter pelo menos uma letra minúscula.");
    }
    if (!/[0-9]/.test(pass)) {
      throw new Error("A senha deve ter pelo menos um número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      throw new Error("A senha deve conter pelo menos um caractere especial.");
    }
    return true;
  }
}