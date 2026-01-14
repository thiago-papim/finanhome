import React from 'react';
import logo from '../imagens/finanhome-logo.svg';

export default function HeaderSimulacao() {
  return (
    <header className="flex justify-center bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
      <div className="flex justify-between items-center w-full px-6 py-4">
        <img className="w-28 h-28 object-contain" src={logo} alt="logo-finanhome" />
      </div>
    </header>
  );
}
