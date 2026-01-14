import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../imagens/finanhome-logo.svg';

const arrMenu = ['Início', 'Produtos', 'Sobre Nós', 'Seja Parceiro', 'Contato'];

export default function Header() {
  const history = useHistory();

  return (
    <header className="flex justify-center shadow-lg bg-white/80 backdrop-blur-md mt-5">
      <div className="flex justify-between items-center max-w-[1200px] w-full px-6">
        <img className="w-24 h-24 object-contain" src={logo} alt="logo-finanhome" />
        <nav className="flex gap-8 items-center">
          {arrMenu.map((e) => (
            <button
              key={e}
              className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200"
            >
              {e}
            </button>
          ))}
          <button
            onClick={() => history.push('/simulador')}
            className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300 h-10 px-5 rounded-md text-white font-semibold shadow-md"
          >
            Simule Seu Financiamento
          </button>
        </nav>
      </div>
    </header>
  );
}
