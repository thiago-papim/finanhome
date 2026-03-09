import React, { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  CalculatorIcon,
  UserIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import simulateMultiBank from '../lib/simulationEngine';

const MODALITY_MORTGAGE = 'MORTGAGE';
const MODALITY_HOME_EQUITY = 'HOME_EQUITY';

const MODALITY_CONFIG = {
  [MODALITY_MORTGAGE]: { maxLtv: 0.8, maxTermMonths: 420, label: 'Financiamento imobiliário' },
  [MODALITY_HOME_EQUITY]: { maxLtv: 0.6, maxTermMonths: 240, label: 'Home Equity' },
};

const DEFAULT_BANKS = [
  { id: 'santander', bankKey: 'santander', name: 'Santander', annualRatePct: 11.69 },
  { id: 'itau', bankKey: 'itau', name: 'Itaú', annualRatePct: 12.19 },
  { id: 'bradesco', bankKey: 'bradesco', name: 'Bradesco', annualRatePct: 12.3 },
  { id: 'caixa', bankKey: 'caixa', name: 'Caixa', annualRatePct: 11.87 },
];

/**
 * Extrai estado inicial do cliente a partir dos dados enviados pelo formulário de simulação.
 */
function getInitialCustomerFromSubmission(submissionData) {
  const defaultCustomer = {
    name: 'Cliente',
    modality: MODALITY_MORTGAGE,
    birthDate: '1990-01-01',
    income: 12000,
    propertyValue: 300000,
    loanAmount: 240000,
    term: 360,
  };

  if (!submissionData?.simulacao?.respostas) {
    return defaultCustomer;
  }

  const { respostas } = submissionData.simulacao;
  const tipoCredito = submissionData.simulacao.tipoCredito || 'financiamento';

  const modality = tipoCredito === 'home-equity' ? MODALITY_HOME_EQUITY : MODALITY_MORTGAGE;
  const propertyValue =
    Number(respostas['valor-imovel']) ||
    Number(respostas['valor-garantia']) ||
    defaultCustomer.propertyValue;
  const loanAmount = Number(respostas['valor-credito']) || Math.floor(propertyValue * 0.8);
  const prazoKey = tipoCredito === 'financiamento' ? 'prazo-financiamento' : 'prazo-emprestimo';
  const term = parseInt(respostas[prazoKey], 10) || defaultCustomer.term;

  const name = submissionData.dadosPessoais?.nome?.trim() || defaultCustomer.name;
  const config = MODALITY_CONFIG[modality];

  return {
    ...defaultCustomer,
    name,
    modality,
    propertyValue,
    loanAmount: Math.min(loanAmount, propertyValue * config.maxLtv),
    term: Math.min(term, config.maxTermMonths),
  };
}

const formatBRL = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(n);
};

const formatPercent = (value, decimals = 2) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)}%`;

export default function SimuladorParcelas() {
  const history = useHistory();
  const location = useLocation();
  const submissionData = location.state?.submissionData || location.state?.simulação;

  const [customer, setCustomer] = useState(() => getInitialCustomerFromSubmission(submissionData));
  const [showAmortization, setShowAmortization] = useState(null);

  const modalityConfig = MODALITY_CONFIG[customer.modality] || MODALITY_CONFIG[MODALITY_MORTGAGE];
  const { maxLtv } = modalityConfig;

  const simulationResults = useMemo(() => {
    const isMortgage = customer.modality === MODALITY_MORTGAGE;
    const customerInput = {
      fullName: customer.name,
      birthDateISO: customer.birthDate ? String(customer.birthDate) : '1990-01-01',
      monthlyIncome: customer.income || 12000,
    };
    const loanInput = {
      productType: isMortgage ? 'IMOVEL' : 'HOME_EQUITY',
      propertyValue: customer.propertyValue,
      loanAmount: customer.loanAmount,
      termMonthsRequested: customer.term,
    };
    const bankInputs = DEFAULT_BANKS.map((b) => ({
      bankKey: b.bankKey,
      effAnnualRatePct: b.annualRatePct ?? 0,
    }));

    try {
      const multi = simulateMultiBank(customerInput, loanInput, bankInputs, {
        schedulePreviewMonths: 120,
      });
      return multi.bankResults.map((r) => ({
        bankId: r.bankKey,
        bankName: r.bankLabel,
        modality: customer.modality,
        annualRatePct: r.effAnnualRatePct,
        firstPmt: r.firstInstallment,
        lastPmt: r.lastInstallment,
        totalPaid: r.totalPaid,
        totalInterest: r.totalInterest,
        cetAnnual: r.cetAnnualPct,
        commitment: Number.isFinite(r.installmentToIncomePct) ? r.installmentToIncomePct : 0,
        schedule: (r.schedulePreview || []).map((row) => ({
          month: row.month,
          amort: row.amortization,
          interest: row.interest,
          insurance: row.mip + row.dfi,
          totalPmt: row.installmentTotal,
        })),
      }));
    } catch (_) {
      return [];
    }
  }, [customer]);

  const setModality = (mod) => {
    const config = MODALITY_CONFIG[mod];
    setCustomer((prev) => {
      const term = Math.min(prev.term, config.maxTermMonths);
      const maxLoan = prev.propertyValue * config.maxLtv;
      const loanAmount = Math.min(prev.loanAmount, maxLoan);
      return { ...prev, modality: mod, term, loanAmount };
    });
  };

  const fillMaxLtv = () => {
    const value = Math.floor(customer.propertyValue * maxLtv);
    setCustomer((prev) => ({ ...prev, loanAmount: value }));
  };

  const parseBRL = (str) => {
    if (str == null || String(str).trim() === '') return 0;
    const digits = String(str).replace(/\D/g, '');
    return digits === '' ? 0 : parseInt(digits, 10) / 100;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => history.push('/simulador')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Voltar ao simulador</span>
            </button>
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <CalculatorIcon className="h-6 w-6" />
                <span className="font-bold tracking-widest uppercase text-xs">
                  Simulador de parcelas
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Compare{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  parcelas
                </span>{' '}
                por banco
              </h1>
              <p className="text-slate-400 mt-1 text-sm">
                Resultado com base nos dados da sua simulação. Você pode ajustar os valores ao lado.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-blue-400" />
                Dados da simulação
              </h2>
              <div className="space-y-4">
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Modalidade
                    <select
                      id="parcelas-modalidade"
                      value={customer.modality || MODALITY_MORTGAGE}
                      onChange={(e) => setModality(e.target.value)}
                      className="mt-1 block w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none transition-all text-white"
                    >
                      <option value={MODALITY_MORTGAGE}>
                        {MODALITY_CONFIG[MODALITY_MORTGAGE].label}
                      </option>
                      <option value={MODALITY_HOME_EQUITY}>
                        {MODALITY_CONFIG[MODALITY_HOME_EQUITY].label}
                      </option>
                    </select>
                  </label>
                </div>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Nome
                    <input
                      id="parcelas-nome"
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                      className="mt-1 block w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none text-white"
                    />
                  </label>
                </div>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Valor do imóvel
                    <input
                      id="parcelas-valor-imovel"
                      type="text"
                      inputMode="decimal"
                      value={formatBRL(customer.propertyValue)}
                      onChange={(e) =>
                        setCustomer((c) => ({
                          ...c,
                          propertyValue: parseBRL(e.target.value),
                        }))
                      }
                      className="mt-1 block w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none text-white"
                    />
                  </label>
                </div>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Valor financiado
                    <div className="flex gap-2 mt-1">
                      <input
                        id="parcelas-valor-financiado"
                        type="text"
                        inputMode="decimal"
                        value={formatBRL(customer.loanAmount)}
                        onChange={(e) =>
                          setCustomer((c) => ({
                            ...c,
                            loanAmount: parseBRL(e.target.value),
                          }))
                        }
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none text-white"
                      />
                      <button
                        type="button"
                        onClick={fillMaxLtv}
                        className="shrink-0 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                      >
                        {Math.round(maxLtv * 100)}%
                      </button>
                    </div>
                  </label>
                </div>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Prazo (meses)
                    <input
                      id="parcelas-prazo"
                      type="number"
                      min="1"
                      max={modalityConfig.maxTermMonths}
                      value={customer.term}
                      onChange={(e) =>
                        setCustomer((c) => ({
                          ...c,
                          term: Math.min(
                            modalityConfig.maxTermMonths,
                            Math.max(1, Number(e.target.value) || 120),
                          ),
                        }))
                      }
                      className="mt-1 block w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none text-white"
                    />
                  </label>
                </div>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                    Renda mensal
                    <input
                      id="parcelas-renda"
                      type="text"
                      inputMode="decimal"
                      value={formatBRL(customer.income)}
                      onChange={(e) =>
                        setCustomer((c) => ({
                          ...c,
                          income: parseBRL(e.target.value),
                        }))
                      }
                      className="mt-1 block w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 focus:border-blue-500 outline-none text-white"
                    />
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8 space-y-6">
            {simulationResults.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-700 border-dashed rounded-2xl p-12 text-center">
                <InformationCircleIcon className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-300 mb-2">Ajuste os valores</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Informe valor do imóvel e valor financiado válidos para ver a simulação por banco.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {simulationResults.map((result, idx) => (
                  <div
                    key={result.bankId}
                    className={`relative overflow-hidden bg-slate-900/40 border p-6 rounded-2xl transition-all ${
                      idx === 0 ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-slate-800'
                    }`}
                  >
                    {idx === 0 && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-[10px] font-black uppercase px-2 py-1 rounded-md">
                        Menor parcela
                      </div>
                    )}
                    <h3 className="text-xl font-black mb-1">{result.bankName}</h3>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                          result.modality === MODALITY_HOME_EQUITY
                            ? 'bg-amber-900/60 text-amber-200'
                            : 'bg-blue-900/60 text-blue-200'
                        }`}
                      >
                        {result.modality === MODALITY_HOME_EQUITY
                          ? 'Home Equity'
                          : 'Financ. imobiliário'}
                      </span>
                    </div>
                    <div className="mb-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-600/30">
                      <p className="text-[10px] text-emerald-300/90 font-black uppercase mb-1">
                        CET — Custo Efetivo Total (a.a.)
                      </p>
                      <p className="text-2xl font-black text-emerald-400">
                        {Number.isFinite(result.cetAnnual)
                          ? formatPercent(result.cetAnnual, 2)
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-y-5 mb-6">
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase mb-1">
                          Taxa anual
                        </p>
                        <p className="text-lg font-bold text-white">
                          {formatPercent(result.annualRatePct ?? 0)} a.a.
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase mb-1">
                          Parcela inicial
                        </p>
                        <p className="text-lg font-bold text-white">{formatBRL(result.firstPmt)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase mb-1">
                          Parcela final
                        </p>
                        <p className="text-lg font-bold text-white">{formatBRL(result.lastPmt)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase mb-1">
                          Comprometimento
                        </p>
                        <p
                          className={`text-sm font-bold ${
                            result.commitment > 30 ? 'text-red-400' : 'text-blue-400'
                          }`}
                        >
                          {formatPercent(result.commitment)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-800/50">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-bold uppercase">Total de juros</span>
                        <span className="font-bold text-red-400/80">
                          {formatBRL(result.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-slate-800/30">
                        <span className="text-slate-300 font-black uppercase">Total pago</span>
                        <span className="font-black text-white">{formatBRL(result.totalPaid)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setShowAmortization(
                          showAmortization === result.bankId ? null : result.bankId,
                        )
                      }
                      className="w-full mt-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      {showAmortization === result.bankId ? 'Fechar tabela' : 'Ver amortização'}
                      {showAmortization === result.bankId ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                    {showAmortization === result.bankId && result.schedule && (
                      <div className="mt-4 overflow-x-auto max-h-64 bg-slate-950/50 rounded-xl p-2">
                        <table className="w-full text-[10px] border-collapse">
                          <thead className="sticky top-0 bg-slate-900 border-b border-slate-800">
                            <tr>
                              <th className="p-2 text-left">Mês</th>
                              <th className="p-2 text-right">Amort.</th>
                              <th className="p-2 text-right">Juros</th>
                              <th className="p-2 text-right">Seguro</th>
                              <th className="p-2 text-right">Parcela</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.schedule.slice(0, 100).map((row) => (
                              <tr key={row.month} className="border-b border-slate-800/20">
                                <td className="p-2 text-slate-500">{row.month}</td>
                                <td className="p-2 text-right">{formatBRL(row.amort)}</td>
                                <td className="p-2 text-right text-red-400/60">
                                  {formatBRL(row.interest)}
                                </td>
                                <td className="p-2 text-right text-blue-400/60">
                                  {formatBRL(row.insurance)}
                                </td>
                                <td className="p-2 text-right font-bold text-white">
                                  {formatBRL(row.totalPmt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
