import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Footer({ onSimulate }) {
  return (
    <footer id="contato" className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FinanHome</h3>
            <p className="text-slate-400 text-sm">
              Financiamento imobiliário e empréstimo com garantia de imóvel. Seu patrimônio
              trabalhando para você.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onSimulate}
                  className="hover:text-white transition-colors"
                >
                  Financiamento Imobiliário
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSimulate}
                  className="hover:text-white transition-colors"
                >
                  Empréstimo com Garantia
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSimulate}
                  className="hover:text-white transition-colors"
                >
                  Simulação
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/sobre-nos" className="hover:text-white transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/seguranca" className="hover:text-white transition-colors">
                  Segurança
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-white transition-colors">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>0800 123 4567</li>
              <li>contato@finanhomecred.com.br</li>
              <li>Segunda a Sexta, 9h às 18h</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} FinanHome. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ: 57.412.735/0001-40 | Licenciado pelo Banco Central</p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  onSimulate: PropTypes.func,
};

Footer.defaultProps = {
  onSimulate: () => {},
};

export default Footer;
