import React from 'react';
import logo from '../imagens/Logo.png';
import AnimatedGrid from './MagicUI/AnimatedGrid';

export default function HeaderSimulacao() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-600/50 backdrop-blur-xl shadow-lg shadow-slate-900/50 border-b border-slate-800/50 w-full max-w-full">
      <AnimatedGrid opacity="low" className="opacity-5" />
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <img className="h-24 w-24 object-contain" src={logo} alt="FinanHome" />
          <div className="text-sm text-slate-400">
            Financiamento Imobiliário & Empréstimo com Garantia
          </div>
        </div>
      </div>
    </header>
  );
}
