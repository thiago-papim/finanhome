import React from 'react';
import PropTypes from 'prop-types';

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
                <button type="button" className="hover:text-white transition-colors">
                  Sobre nós
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-white transition-colors">
                  Segurança
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-white transition-colors">
                  Privacidade
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>0800 123 4567</li>
              <li>contato@finanhome.com.br</li>
              <li>Segunda a Sexta, 9h às 18h</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} FinanHome. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ: 00.000.000/0001-00 | Licenciado pelo Banco Central</p>
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
