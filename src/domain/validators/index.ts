// src/domain/validators/index.ts
import { IValidationResult, IUser } from '../interfaces';

// NameValidator - NOVO!
export class NameValidator {
  private static readonly nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]+$/;
  
  static validate(name: string): IValidationResult {
    const errors: string[] = [];
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      errors.push('Nome é obrigatório');
    } else {
      if (trimmedName.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
      }
      if (trimmedName.length > 50) {
        errors.push('Nome deve ter no máximo 50 caracteres');
      }
      if (!this.nameRegex.test(trimmedName)) {
        errors.push('Nome deve conter apenas letras, espaços e caracteres válidos');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Método para sanitizar input em tempo real
  static sanitize(input: string): string {
    return input.replace(/[^a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]/g, '');
  }
  
  // Verifica se um caractere é válido
  static isValidChar(char: string): boolean {
    return this.nameRegex.test(char) || char === '';
  }
}

// EmailValidator - ATUALIZADO com sanitização
export class EmailValidator {
  private static readonly emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  static validate(email: string): boolean {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return false;
    if (trimmedEmail.length > 254) return false; // RFC 5321
    return this.emailRegex.test(trimmedEmail);
  }
  
  // Novo: Validação com retorno detalhado
  static validateDetailed(email: string): IValidationResult {
    const errors: string[] = [];
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      errors.push('Email é obrigatório');
    } else {
      if (trimmedEmail.length > 254) {
        errors.push('Email muito longo');
      }
      if (!this.emailRegex.test(trimmedEmail.toLowerCase())) {
        errors.push('Digite um email válido');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Método para sanitizar email
  static sanitize(input: string): string {
    return input.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]/g, '').toLowerCase();
  }
  
  // Verifica se um caractere é válido para email
  static isValidChar(char: string): boolean {
    return /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]/.test(char);
  }
}

// PasswordValidator - Mantido igual
export class PasswordValidator {
  static validate(password: string): IValidationResult {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra minúscula');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Senha deve conter pelo menos um número');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// UserValidator - ATUALIZADO para usar os novos validadores
export class UserValidator {
  static validate(user: IUser): IValidationResult {
    const errors: string[] = [];
    
    // Validação de nome usando o novo NameValidator
    const nameValidation = NameValidator.validate(user.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
    
    // Validação de email usando o EmailValidator atualizado
    const emailValidation = EmailValidator.validateDetailed(user.email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }
    
    // Validação de senha
    const passwordValidation = PasswordValidator.validate(user.password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }
    
    // Confirmação de senha
    if (user.password !== user.confirmPassword) {
      errors.push('Senhas não coincidem');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Hook personalizado para usar com os validadores (NOVO!)
export class InputSanitizer {
  static sanitizeName(input: string): string {
    return NameValidator.sanitize(input);
  }
  
  static sanitizeEmail(input: string): string {
    return EmailValidator.sanitize(input);
  }
  
  static isValidNameChar(char: string): boolean {
    return NameValidator.isValidChar(char);
  }
  
  static isValidEmailChar(char: string): boolean {
    return EmailValidator.isValidChar(char);
  }
}