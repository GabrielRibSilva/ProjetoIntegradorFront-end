// src/components/forms/ValidatedInput.tsx
import React, { useState, useEffect } from 'react';
import { NameValidator, EmailValidator, InputSanitizer } from '../../domain/validators';

interface ValidatedInputProps {
  type: 'name' | 'email';
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = ''
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const validateField = (inputValue: string) => {
    let validation;
    
    if (type === 'name') {
      validation = NameValidator.validate(inputValue);
    } else {
      validation = EmailValidator.validateDetailed(inputValue);
    }
    
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Sanitiza o input em tempo real
    if (type === 'name') {
      inputValue = InputSanitizer.sanitizeName(inputValue);
    } else {
      inputValue = InputSanitizer.sanitizeEmail(inputValue);
    }
    
    onChange(inputValue);
    
    // Valida apenas se o campo já foi "tocado"
    if (hasBlurred) {
      validateField(inputValue);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    // Pega o texto da área de transferência
    const pastedText = e.clipboardData.getData('text');
    
    // Sanitiza o texto colado
    let sanitizedText;
    if (type === 'name') {
      sanitizedText = InputSanitizer.sanitizeName(pastedText);
    } else {
      sanitizedText = InputSanitizer.sanitizeEmail(pastedText);
    }
    
    // Combina o valor atual com o texto sanitizado
    const currentValue = value;
    const selectionStart = e.currentTarget.selectionStart || 0;
    const selectionEnd = e.currentTarget.selectionEnd || 0;
    
    const newValue = 
      currentValue.slice(0, selectionStart) + 
      sanitizedText + 
      currentValue.slice(selectionEnd);
    
    onChange(newValue);
    
    // Valida o novo valor se necessário
    if (hasBlurred) {
      validateField(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite teclas de controle
    const controlKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
      'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter'
    ];
    
    if (controlKeys.includes(e.key)) {
      return;
    }
    
    // Permite atalhos Ctrl
    if (e.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) {
      return;
    }
    
    // Testa se o caractere é válido
    if (e.key.length === 1) {
      let isValid = false;
      
      if (type === 'name') {
        isValid = InputSanitizer.isValidNameChar(e.key);
      } else {
        isValid = InputSanitizer.isValidEmailChar(e.key);
      }
      
      if (!isValid) {
        e.preventDefault();
      }
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setHasBlurred(true);
    validateField(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!hasBlurred) {
      setErrors([]);
    }
  };

  // Define as classes CSS baseadas no estado
  const hasErrors = errors.length > 0 && hasBlurred;
  const isValid = errors.length === 0 && hasBlurred && value.trim();
  
  const inputClasses = `
    w-full px-4 py-3 border rounded-lg transition-all duration-200 
    ${hasErrors ? 'border-red-500 bg-red-50' : ''}
    ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
    ${isValid ? 'border-green-500 bg-green-50' : ''}
    focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
    ${className}
  `.trim();

  return (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type === 'email' ? 'email' : 'text'}
        value={value}
        onChange={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={inputClasses}
        autoComplete={type === 'email' ? 'email' : 'name'}
      />
      
      {/* Mostra erros */}
      {hasErrors && (
        <div className="mt-1 space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600 flex items-center">
              <span className="mr-1">⚠️</span>
              {error}
            </p>
          ))}
        </div>
      )}
      
      {/* Mostra sucesso */}
      {isValid && (
        <p className="mt-1 text-sm text-green-600 flex items-center">
          <span className="mr-1">✅</span>
          Campo válido
        </p>
      )}
    </div>
  );
};