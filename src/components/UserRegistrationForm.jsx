// src/components/UserRegistrationForm.jsx
import React, { useState } from 'react';

// Validadores com sanitização
const NameValidator = {
  nameRegex: /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]+$/,
  
  validate(name) {
    const errors = [];
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
    
    return { isValid: errors.length === 0, errors };
  },

  sanitize(input) {
    return input.replace(/[^a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]/g, '');
  },

  isValidChar(char) {
    return this.nameRegex.test(char) || char === '';
  }
};

const EmailValidator = {
  emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  
  validate(email) {
    const errors = [];
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
    
    return { isValid: errors.length === 0, errors };
  },

  sanitize(input) {
    return input.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]/g, '').toLowerCase();
  },

  isValidChar(char) {
    return /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]/.test(char);
  }
};

// UserValidator atualizado
const UserValidator = {
  validate: (user) => {
    const errors = [];
    
    // Validação de nome
    const nameValidation = NameValidator.validate(user.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
    
    // Validação de email
    const emailValidation = EmailValidator.validate(user.email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }
    
    // Validação de senha
    if (!user.password) {
      errors.push('Senha é obrigatória');
    } else if (user.password.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }
    
    // Confirmação de senha
    if (user.password !== user.confirmPassword) {
      errors.push('Senhas não coincidem');
    }
    
    return { isValid: errors.length === 0, errors };
  }
};

const UserService = class {
  async register(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Usuário cadastrado com sucesso! (modo teste)',
          data: { id: Date.now(), name: user.name, email: user.email }
        });
      }, 1500);
    });
  }
};

const NotificationService = class {
  showSuccess(msg) { 
    console.log('✅ SUCCESS:', msg); 
    alert('✅ ' + msg);
  }
  showError(msg) { 
    console.log('❌ ERROR:', msg); 
    alert('❌ ' + msg);
  }
};

const ValidatedFormField = ({ 
  label, 
  type, 
  validationType,
  value, 
  onChange, 
  placeholder, 
  icon, 
  rightIcon, 
  onRightIconClick, 
  error,
  hasBlurred,
  onBlur,
  onFocus
}) => {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    
    // Sanitiza baseado no tipo
    if (validationType === 'name') {
      inputValue = NameValidator.sanitize(inputValue);
    } else if (validationType === 'email') {
      inputValue = EmailValidator.sanitize(inputValue);
    }
    
    onChange(inputValue);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    const pastedText = e.clipboardData.getData('text');
    let sanitizedText = pastedText;
    
    if (validationType === 'name') {
      sanitizedText = NameValidator.sanitize(pastedText);
    } else if (validationType === 'email') {
      sanitizedText = EmailValidator.sanitize(pastedText);
    }
    
    const currentValue = value;
    const selectionStart = e.target.selectionStart || 0;
    const selectionEnd = e.target.selectionEnd || 0;
    
    const newValue = 
      currentValue.slice(0, selectionStart) + 
      sanitizedText + 
      currentValue.slice(selectionEnd);
    
    onChange(newValue);
  };

  const handleKeyDown = (e) => {
    const controlKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
      'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter'
    ];
    
    if (controlKeys.includes(e.key)) return;
    
    if (e.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return;
    
    if (e.key.length === 1) {
      let isValid = true;
      
      if (validationType === 'name') {
        isValid = NameValidator.isValidChar(e.key);
      } else if (validationType === 'email') {
        isValid = EmailValidator.isValidChar(e.key);
      }
      
      if (!isValid) {
        e.preventDefault();
      }
    }
  };

  const isValid = !error && hasBlurred && value.trim();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.5rem', 
        fontWeight: '500',
        color: '#374151',
        fontSize: '0.875rem'
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          onPaste={validationType ? handlePaste : undefined}
          onKeyDown={validationType ? handleKeyDown : undefined}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: error && hasBlurred ? '1px solid #ef4444' : 
                   isValid ? '1px solid #10b981' : '1px solid #d1d5db',
            borderRadius: '0.5rem',
            paddingLeft: icon ? '2.5rem' : '0.75rem',
            paddingRight: rightIcon ? '2.5rem' : '0.75rem',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: error && hasBlurred ? '0 0 0 2px rgba(239, 68, 68, 0.1)' : 
                      isValid ? '0 0 0 2px rgba(16, 185, 129, 0.1)' : 'none',
            backgroundColor: error && hasBlurred ? '#fef2f2' : 
                           isValid ? '#f0fdf4' : '#ffffff'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            if (onFocus) onFocus();
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error && hasBlurred ? '#ef4444' : 
                                        isValid ? '#10b981' : '#d1d5db';
            e.target.style.boxShadow = error && hasBlurred ? '0 0 0 2px rgba(239, 68, 68, 0.1)' : 
                                      isValid ? '0 0 0 2px rgba(16, 185, 129, 0.1)' : 'none';
            if (onBlur) onBlur();
          }}
        />
        {icon && (
          <div style={{ 
            position: 'absolute', 
            left: '0.75rem', 
            top: '50%', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            {icon}
          </div>
        )}
        {rightIcon && (
          <div 
            style={{ 
              position: 'absolute', 
              right: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && hasBlurred && (
        <p style={{ 
          color: '#dc2626', 
          fontSize: '0.875rem', 
          marginTop: '0.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          ❌ {error}
        </p>
      )}
      {isValid && (
        <p style={{ 
          color: '#059669', 
          fontSize: '0.875rem', 
          marginTop: '0.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          ✅ Campo válido
        </p>
      )}
    </div>
  );
};

export const UserRegistrationForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldBlurred, setFieldBlurred] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
    
    // Limpa erros gerais
    if (Array.isArray(errors) && errors.length > 0) {
      setErrors([]);
    }
    
    // Valida campo específico se já foi tocado
    if (fieldBlurred[field]) {
      validateField(field, value);
    }
  };

  const validateField = (field, value) => {
    let validation = { isValid: true, errors: [] };
    
    if (field === 'name') {
      validation = NameValidator.validate(value);
    } else if (field === 'email') {
      validation = EmailValidator.validate(value);
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? null : validation.errors[0]
    }));
  };

  const handleFieldBlur = (field) => {
    setFieldBlurred(prev => ({ ...prev, [field]: true }));
    validateField(field, user[field]);
  };

  const handleFieldFocus = (field) => {
    // Limpa erro específico do campo ao focar
    setFieldErrors(prev => ({ ...prev, [field]: null }));
  };
  
  const handleSubmit = async () => {
    try {
      console.log('Iniciando validação...');
      
      const validation = UserValidator.validate(user);
      console.log('Resultado da validação:', validation);
      
      if (!validation.isValid) {
        const errorList = Array.isArray(validation.errors) ? validation.errors : ['Erro de validação'];
        setErrors(errorList);
        
        // Marca todos os campos como tocados para mostrar erros
        setFieldBlurred({
          name: true,
          email: true,
          password: true,
          confirmPassword: true
        });
        
        return;
      }
      
      setIsLoading(true);
      setErrors([]);
      
      console.log('Iniciando cadastro...');
      const userService = new UserService();
      const notificationService = new NotificationService();
      
      const result = await userService.register(user);
      console.log('Resultado do cadastro:', result);
      
      if (result.success) {
        setIsSuccess(true);
        notificationService.showSuccess(result.message || 'Cadastro realizado!');
        setUser({ name: '', email: '', password: '', confirmPassword: '' });
        setFieldBlurred({});
        setFieldErrors({});
      } else {
        const errorList = Array.isArray(result.errors) ? result.errors : [result.message || 'Erro desconhecido'];
        setErrors(errorList);
        notificationService.showError(result.message || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro no handleSubmit:', error);
      setErrors(['Erro interno: ' + error.message]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro Realizado!</h2>
          <p className="text-gray-600 mb-4">Sua conta foi criada com sucesso.</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer novo cadastro
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Cadastro de Usuário
      </h2>
      
      <div>
        <ValidatedFormField
          label="Nome completo"
          type="text"
          validationType="name"
          value={user.name}
          onChange={(value) => updateUser('name', value)}
          onBlur={() => handleFieldBlur('name')}
          onFocus={() => handleFieldFocus('name')}
          placeholder="Digite seu nome completo"
          icon={<span>👤</span>}
          error={fieldErrors.name}
          hasBlurred={fieldBlurred.name}
        />
        
        <ValidatedFormField
          label="Email"
          type="email"
          validationType="email"
          value={user.email}
          onChange={(value) => updateUser('email', value)}
          onBlur={() => handleFieldBlur('email')}
          onFocus={() => handleFieldFocus('email')}
          placeholder="Digite seu email"
          icon={<span>📧</span>}
          error={fieldErrors.email}
          hasBlurred={fieldBlurred.email}
        />
        
        <ValidatedFormField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={(value) => updateUser('password', value)}
          placeholder="Digite sua senha"
          icon={<span>🔒</span>}
          rightIcon={<span>{showPassword ? '🙈' : '👁️'}</span>}
          onRightIconClick={() => setShowPassword(!showPassword)}
        />
        
        <ValidatedFormField
          label="Confirmar senha"
          type={showConfirmPassword ? 'text' : 'password'}
          value={user.confirmPassword}
          onChange={(value) => updateUser('confirmPassword', value)}
          placeholder="Confirme sua senha"
          icon={<span>🔒</span>}
          rightIcon={<span>{showConfirmPassword ? '🙈' : '👁️'}</span>}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        
        {Array.isArray(errors) && errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Corrija os seguintes erros:
            </h3>
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600 flex items-center mb-1">
                ❌ {error}
              </p>
            ))}
          </div>
        )}
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Cadastrando...
            </>
          ) : (
            'Cadastrar'
          )}
        </button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Já tem uma conta? <a href="#" className="text-blue-600 hover:underline">Faça login</a></p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-medium mb-2">🛡️ Proteções ativas:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Nome:</strong> Apenas letras, espaços e acentos (2-50 chars)</li>
          <li><strong>Email:</strong> Formato válido, caracteres inválidos removidos</li>
          <li><strong>Digitação:</strong> Caracteres inválidos são bloqueados</li>
          <li><strong>Colar:</strong> Texto inválido é automaticamente limpo</li>
        </ul>
      </div>
    </div>
  );
};