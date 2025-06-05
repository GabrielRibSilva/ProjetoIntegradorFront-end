// src/App.jsx
import React from 'react';
import { UserRegistrationForm } from './components/UserRegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Sistema de Cadastro
        </h1>
        <p className="text-gray-600">
          Crie sua conta para começar
        </p>
      </div>
      
      {/* Formulário */}
      <UserRegistrationForm />
    </div>
  );
}

export default App;