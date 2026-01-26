import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  HomeIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ScaleIcon,
  DocumentTextIcon,
  KeyIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';
import Header from '../components/Header';
import AnimatedGradient from '../components/MagicUI/AnimatedGradient';
import ShinyButton from '../components/MagicUI/ShinyButton';
import HoverCard from '../components/MagicUI/HoverCard';
import AnimatedBorder from '../components/MagicUI/AnimatedBorder';
import Spotlight from '../components/MagicUI/Spotlight';
import TextReveal from '../components/MagicUI/TextReveal';
import BentoGrid from '../components/MagicUI/BentoGrid';
import AnimatedGrid from '../components/MagicUI/AnimatedGrid';
import AnimatedLines from '../components/MagicUI/AnimatedLines';
import SectionDivider from '../components/MagicUI/SectionDivider';
import MetricsBar from '../components/MagicUI/MetricsBar';

export default function Home() {
  const history = useHistory();
  const [simulationValue, setSimulationValue] = useState(500000);

  const handleSimulate = () => {
    history.push('/simulador');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden w-full max-w-full">
      <Header />
      {/* Hero Section */}
      <section id="inicio" className="relative">
        <AnimatedGradient className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <AnimatedGrid opacity="high" />
          <AnimatedLines direction="horizontal" />
          <Spotlight intensity="high" className="absolute inset-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
            <TextReveal delay={0}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Crédito inteligente com a segurança do seu imóvel
              </h1>
            </TextReveal>

            <TextReveal delay={200}>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Taxas menores, prazos longos e liberação rápida. Seu patrimônio trabalhando para
                você com total segurança jurídica.
              </p>
            </TextReveal>

            <TextReveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <ShinyButton onClick={handleSimulate} variant="primary">
                  Simular agora
                </ShinyButton>
                <ShinyButton onClick={handleSimulate} variant="secondary">
                  Ver quanto posso liberar
                </ShinyButton>
                <button
                  type="button"
                  onClick={handleSimulate}
                  className="px-6 py-4 text-lg font-semibold text-slate-300 border-2 border-slate-600 rounded-xl hover:border-slate-400 hover:text-white transition-all duration-300"
                >
                  Falar com especialista
                </button>
              </div>
            </TextReveal>

            {/* Floating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
              <HoverCard glowColor="blue" className="text-center">
                <HomeIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Até 80% do valor</h3>
                <p className="text-slate-400">do seu imóvel liberado</p>
              </HoverCard>
              <HoverCard glowColor="emerald" className="text-center">
                <ClockIcon className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Até 420 meses</h3>
                <p className="text-slate-400">de prazo para pagar</p>
              </HoverCard>
              <HoverCard glowColor="purple" className="text-center">
                <ShieldCheckIcon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">100% seguro</h3>
                <p className="text-slate-400">garantia jurídica total</p>
              </HoverCard>
            </div>
          </div>
        </AnimatedGradient>
      </section>

      {/* Métricas Bar */}
      <MetricsBar
        metrics={[
          { value: 'R$ 500M+', label: 'Valores financiados' },
          { value: '5.000+', label: 'Clientes atendidos' },
          { value: '48h', label: 'Tempo médio de análise' },
          { value: '24h', label: 'Liberação após aprovação' },
        ]}
      />

      {/* Seção: Como funciona */}
      <section id="como-funciona" className="py-32 bg-slate-900 relative overflow-hidden">
        <AnimatedGrid opacity="low" />
        <AnimatedLines direction="vertical" />
        <div className="max-w-7xl mx-auto px-6">
          <TextReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Como funciona o crédito com garantia de imóvel
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Processo simples, rápido e totalmente digital
              </p>
            </div>
          </TextReveal>

          <BentoGrid>
            {[
              {
                icon: <HomeIcon className="h-16 w-16 text-blue-400" />,
                step: '01',
                title: 'Avaliação do imóvel',
                description:
                  'Análise técnica e de mercado do seu imóvel para determinar o valor de garantia.',
              },
              {
                icon: <ChartBarIcon className="h-16 w-16 text-emerald-400" />,
                step: '02',
                title: 'Simulação personalizada',
                description:
                  'Cálculo preciso do valor que você pode liberar com base no seu imóvel e perfil.',
              },
              {
                icon: <DocumentCheckIcon className="h-16 w-16 text-purple-400" />,
                step: '03',
                title: 'Análise de crédito',
                description:
                  'Avaliação rápida e descomplicada da sua documentação e capacidade de pagamento.',
              },
              {
                icon: <BanknotesIcon className="h-16 w-16 text-cyan-400" />,
                step: '04',
                title: 'Liberação do valor',
                description: 'Após aprovação, o valor é liberado em até 24 horas na sua conta.',
              },
            ].map((item, index) => (
              <TextReveal key={item.step} delay={index * 100}>
                <HoverCard glowColor={index % 2 === 0 ? 'blue' : 'emerald'}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="flex-1 md:min-h-40">
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </HoverCard>
              </TextReveal>
            ))}
          </BentoGrid>

          {/* Blocos de apoio - Cards explicativos */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <TextReveal delay={400}>
              <HoverCard glowColor="blue" className="bg-slate-800/30">
                <div className="flex items-start gap-4">
                  <DocumentTextIcon className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Documentação simplificada</h4>
                    <p className="text-sm text-slate-400">
                      Apenas os documentos essenciais. Processo 100% digital e seguro.
                    </p>
                  </div>
                </div>
              </HoverCard>
            </TextReveal>
            <TextReveal delay={500}>
              <HoverCard glowColor="emerald" className="bg-slate-800/30">
                <div className="flex items-start gap-4">
                  <ClockIcon className="h-8 w-8 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Acompanhamento em tempo real</h4>
                    <p className="text-sm text-slate-400">
                      Acompanhe cada etapa do seu processo diretamente na plataforma.
                    </p>
                  </div>
                </div>
              </HoverCard>
            </TextReveal>
          </div>

          {/* CTA complementar */}
          <TextReveal delay={600}>
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={handleSimulate}
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold flex items-center gap-2 mx-auto"
              >
                Entenda melhor o processo
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </TextReveal>
        </div>
      </section>

      <SectionDivider />

      {/* Seção: Benefícios */}
      <section id="beneficios" className="py-32 bg-slate-950 relative">
        <AnimatedGrid opacity="low" />
        <Spotlight intensity="low" className="absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <TextReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Benefícios do financiamento</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Vantagens exclusivas para quem usa o imóvel como garantia
              </p>
            </div>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CurrencyDollarIcon className="h-12 w-12 text-emerald-400" />,
                title: 'Taxas de juros reduzidas',
                description:
                  'Até 50% menor que crédito pessoal tradicional, graças à garantia real.',
                glow: 'emerald',
              },
              {
                icon: <BanknotesIcon className="h-12 w-12 text-blue-400" />,
                title: 'Valores altos liberados',
                description:
                  'Libere até 80% do valor do seu imóvel, com valores a partir de R$ 50.000.',
                glow: 'blue',
              },
              {
                icon: <ClockIcon className="h-12 w-12 text-purple-400" />,
                title: 'Prazos longos',
                description: 'Até 420 meses para pagar, com parcelas que cabem no seu orçamento.',
                glow: 'purple',
              },
              {
                icon: <SparklesIcon className="h-12 w-12 text-cyan-400" />,
                title: 'Processo 100% digital',
                description:
                  'Tudo online, sem burocracia. Simule, envie documentos e assine digitalmente.',
                glow: 'blue',
              },
              {
                icon: <LockClosedIcon className="h-12 w-12 text-emerald-400" />,
                title: 'Segurança jurídica',
                description:
                  'Seu imóvel continua sendo seu. Apenas serve como garantia do empréstimo.',
                glow: 'emerald',
              },
              {
                icon: <ShieldCheckIcon className="h-12 w-12 text-blue-400" />,
                title: 'Aprovação rápida',
                description:
                  'Análise em até 48 horas e liberação do valor em até 24h após aprovação.',
                glow: 'blue',
              },
            ].map((benefit, index) => (
              <TextReveal key={benefit.title} delay={index * 100}>
                <AnimatedBorder>
                  <div className="flex flex-col items-start">
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </AnimatedBorder>
              </TextReveal>
            ))}
          </div>

          {/* Cards institucionais */}
          <div className="mt-20">
            <TextReveal>
              <h3 className="text-3xl font-bold text-center mb-12">
                Segurança e transparência em primeiro lugar
              </h3>
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <ScaleIcon className="h-10 w-10 text-emerald-400" />,
                  title: 'Segurança jurídica',
                  description: 'Processo regulado e totalmente seguro. Seu imóvel protegido.',
                },
                {
                  icon: <DocumentTextIcon className="h-10 w-10 text-blue-400" />,
                  title: 'Processo regulado',
                  description:
                    'Todas as operações seguem rigorosamente as normas do Banco Central.',
                },
                {
                  icon: <KeyIcon className="h-10 w-10 text-purple-400" />,
                  title: 'Patrimônio como garantia',
                  description: 'Seu imóvel continua sendo seu. Apenas serve como garantia.',
                },
                {
                  icon: <EyeIcon className="h-10 w-10 text-cyan-400" />,
                  title: 'Total transparência',
                  description: 'Todas as taxas e condições são informadas antes da contratação.',
                },
              ].map((card, index) => (
                <TextReveal key={card.title} delay={index * 100}>
                  <AnimatedBorder>
                    <div className="text-center p-6">
                      <div className="flex justify-center mb-4">{card.icon}</div>
                      <h4 className="font-bold mb-2">{card.title}</h4>
                      <p className="text-sm text-slate-400">{card.description}</p>
                    </div>
                  </AnimatedBorder>
                </TextReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Seção: Confiança e solidez */}
      <section
        id="confianca"
        className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
      >
        <AnimatedGrid opacity="medium" />
        <AnimatedLines direction="horizontal" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <TextReveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Crédito com garantia de imóvel
                </h2>
                <p className="text-2xl text-slate-300 mb-8">Seu patrimônio valorizado</p>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Na FinanHome, acreditamos que seu imóvel é mais que um bem: é patrimônio que pode
                  trabalhar para você. Oferecemos crédito com garantia real, onde a segurança
                  jurídica e a transparência são fundamentais.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Mais de R$ 500 milhões liberados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Mais de 5.000 clientes atendidos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Taxa de aprovação superior a 85%</span>
                  </div>
                </div>
              </div>
            </TextReveal>

            <TextReveal delay={200}>
              <div className="relative">
                <Spotlight intensity="medium" className="absolute inset-0 rounded-3xl" />
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 relative">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-2">R$ 500M+</div>
                      <div className="text-slate-400">Liberados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-emerald-400 mb-2">5.000+</div>
                      <div className="text-slate-400">Clientes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400 mb-2">85%+</div>
                      <div className="text-slate-400">Aprovação</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-cyan-400 mb-2">24h</div>
                      <div className="text-slate-400">Liberação</div>
                    </div>
                  </div>
                </div>
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Seção: Simulação visual */}
      <section id="simulacao" className="py-32 bg-slate-900 relative">
        <AnimatedGrid opacity="low" />
        <div className="max-w-5xl mx-auto px-6">
          <TextReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Simule seu crédito agora</h2>
              <p className="text-xl text-slate-400">
                Descubra quanto você pode liberar do seu imóvel
              </p>
            </div>
          </TextReveal>

          <TextReveal delay={200}>
            <AnimatedBorder>
              <div className="p-8">
                <div className="mb-8">
                  <label
                    htmlFor="property-value-slider"
                    className="block text-slate-300 mb-4 text-lg font-semibold"
                  >
                    Valor do seu imóvel
                    <input
                      id="property-value-slider"
                      type="range"
                      min="50000"
                      max="10000000"
                      step="50000"
                      value={simulationValue}
                      onChange={(e) => setSimulationValue(Number(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-4"
                    />
                  </label>
                  <div className="relative">
                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                      <span>R$ 50.000</span>
                      <span>R$ 10.000.000</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="text-slate-400 text-sm mb-2">Valor do imóvel</div>
                    <div className="text-3xl font-bold text-white">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 0,
                      }).format(simulationValue)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6">
                    <div className="text-blue-100 text-sm mb-2">Valor liberado (80%)</div>
                    <div className="text-3xl font-bold text-white">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 0,
                      }).format(simulationValue * 0.8)}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="text-slate-400 text-sm mb-2">Prazo máximo</div>
                    <div className="text-3xl font-bold text-white">420 meses</div>
                  </div>
                </div>

                <ShinyButton onClick={handleSimulate} variant="primary" className="w-full">
                  Simular crédito completo
                  <ArrowRightIcon className="h-5 w-5 ml-2 inline" />
                </ShinyButton>
              </div>
            </AnimatedBorder>
          </TextReveal>

          {/* Mini highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <TextReveal delay={300}>
              <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-blue-400 mb-2">Sem entrada</div>
                <div className="text-sm text-slate-400">Não é necessário dar entrada</div>
              </div>
            </TextReveal>
            <TextReveal delay={400}>
              <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-emerald-400 mb-2">Sem IOF</div>
                <div className="text-sm text-slate-400">Isento de IOF para pessoa física</div>
              </div>
            </TextReveal>
            <TextReveal delay={500}>
              <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-purple-400 mb-2">Sem anuidade</div>
                <div className="text-sm text-slate-400">Nenhuma taxa de manutenção</div>
              </div>
            </TextReveal>
          </div>

          {/* CTA complementar */}
          <TextReveal delay={600}>
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={handleSimulate}
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                Ver todas as condições e taxas
              </button>
            </div>
          </TextReveal>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        <AnimatedGrid opacity="medium" />
        <AnimatedLines direction="horizontal" />
        <Spotlight intensity="high" className="absolute inset-0" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <TextReveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Use seu imóvel para conquistar crédito com segurança
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Transforme seu patrimônio em oportunidade. Simule agora e descubra quanto você pode
              liberar.
            </p>
            <ShinyButton onClick={handleSimulate} variant="primary" className="text-2xl px-12 py-6">
              Começar simulação gratuita
            </ShinyButton>
          </TextReveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FinanHome</h3>
              <p className="text-slate-400 text-sm">
                Crédito inteligente com garantia de imóvel. Seu patrimônio trabalhando para você.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={handleSimulate}
                    className="hover:text-white transition-colors"
                  >
                    Financiamento
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleSimulate}
                    className="hover:text-white transition-colors"
                  >
                    Crédito com garantia
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleSimulate}
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
    </div>
  );
}
