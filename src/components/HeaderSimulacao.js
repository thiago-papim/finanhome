import React from 'react';
import logo from '../imagens/finanhome-logo.svg';

export default function HeaderSimulacao() {
  return (
    <header className="flex justify-center shadow-lg bg-white/80 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-6">
        <img className="w-28 h-28 object-contain" src={logo} alt="logo-finanhome" />
      </div>
    </header>
  );
}
