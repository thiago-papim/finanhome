import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Home/Footer';
import WhatsAppFloatButton from '../components/WhatsAppFloatButton';

export default function Privacidade() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <WhatsAppFloatButton />
      <Header />
      <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar ao início
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
        <p className="text-slate-400 text-sm mb-10">Última atualização: março de 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300">
          <section>
            <p className="leading-relaxed">
              Esta Política de Privacidade descreve como a FinanHome (“nós”, “nos” ou “nossa”)
              coleta, usa, armazena e protege as informações dos usuários (“você” ou “usuário”) em
              conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Dados que coletamos</h2>
            <p className="leading-relaxed mb-2">
              Podemos coletar os seguintes dados pessoais, conforme necessário para os serviços
              oferecidos:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nome completo, CPF e data de nascimento</li>
              <li>E-mail e telefone</li>
              <li>Endereço e informações do imóvel (quando aplicável)</li>
              <li>Dados de renda e informações financeiras necessárias à análise de crédito</li>
              <li>
                Dados de navegação e uso da plataforma (ex.: endereço IP, tipo de dispositivo)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Finalidade do tratamento</h2>
            <p className="leading-relaxed">
              Os dados são utilizados para: (i) viabilizar a simulação de crédito e o processo de
              análise junto às instituições financeiras parceiras; (ii) cumprir obrigações legais e
              regulatórias; (iii) melhorar nossos serviços e a experiência do usuário; (iv) enviar
              comunicações relacionadas ao serviço, quando autorizado; (v) garantir a segurança da
              plataforma e prevenir fraudes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Base legal</h2>
            <p className="leading-relaxed">
              O tratamento dos dados pessoais está fundamentado, conforme o caso, na execução de
              contrato ou de medidas pré-contratuais, no cumprimento de obrigação legal, no legítimo
              interesse ou no consentimento do titular, nos termos da LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Compartilhamento de dados</h2>
            <p className="leading-relaxed">
              Os dados podem ser compartilhados com instituições financeiras parceiras para análise
              e concessão de crédito, com prestadores de serviços que atuam em nosso nome (sob
              obrigação de confidencialidade) e com autoridades quando exigido por lei. Não vendemos
              dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Seus direitos</h2>
            <p className="leading-relaxed">
              Você tem direito a: confirmar a existência de tratamento; acessar seus dados; corrigir
              dados incompletos ou desatualizados; solicitar a anonimização, bloqueio ou eliminação
              de dados desnecessários ou tratados em desconformidade; revogar o consentimento; e
              solicitar a portabilidade dos dados. Para exercer esses direitos, entre em contato
              pelo e-mail contato@finanhomecred.com.br.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Retenção e segurança</h2>
            <p className="leading-relaxed">
              Mantemos os dados pelo tempo necessário para as finalidades descritas e para o
              cumprimento de obrigações legais. Adotamos medidas técnicas e organizacionais
              adequadas para proteger os dados contra acesso não autorizado, perda ou destruição.
              Para mais informações sobre segurança, consulte nossa página de{' '}
              <Link to="/seguranca" className="text-blue-400 hover:underline">
                Segurança
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Alterações</h2>
            <p className="leading-relaxed">
              Esta política pode ser atualizada periodicamente. Alterações relevantes serão
              comunicadas por meio da plataforma ou por e-mail. A data da última atualização consta
              no topo desta página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contato</h2>
            <p className="leading-relaxed">
              Para dúvidas ou solicitações relacionadas a esta política ou aos seus dados pessoais:
              contato@finanhomecred.com.br ou 0800 123 4567 (segunda a sexta, 9h às 18h).
            </p>
          </section>
        </div>
      </main>
      <Footer onSimulate={() => history.push('/simulador')} />
    </div>
  );
}
