/**
 * Motor de simulação multibancos — não expõe coeficientes para UI
 */
import BANK_RULES from './bankRules';
import {
  annualToMonthlyRate,
  clamp,
  irrAnnualFromMonthly,
  irrMonthly,
  round2,
  yearsBetween,
} from './financeMath';

function ageFullYears(ageYears) {
  return Math.min(Math.floor(ageYears), 120);
}

function mipCoefForAge(rule, ageYears) {
  const age = ageFullYears(ageYears);
  for (let i = 0; i < rule.mipBands.length; i += 1) {
    if (age <= rule.mipBands[i].maxAge) return rule.mipBands[i].coef;
  }
  return rule.mipBands[rule.mipBands.length - 1].coef;
}

function dfiCoefForAge(rule, ageYears) {
  const age = ageFullYears(ageYears);
  for (let i = 0; i < rule.dfiBands.length; i += 1) {
    if (age <= rule.dfiBands[i].maxAge) return rule.dfiBands[i].coef;
  }
  return rule.dfiBands[rule.dfiBands.length - 1].coef;
}

function applyTermConstraints(rule, productType, ageNow, termMonthsRequested) {
  const notes = [];
  const maxTermByProduct =
    productType === 'HOME_EQUITY' ? rule.maxTermMonthsHomeEquity : rule.maxTermMonthsImovel;
  let term = clamp(Math.floor(termMonthsRequested), 1, maxTermByProduct);
  if (term !== termMonthsRequested) {
    notes.push(`Prazo ajustado para respeitar limite do produto (${maxTermByProduct} meses).`);
  }
  const maxAge = rule.maxAgeLimitYears;
  while (ageNow + term / 12 > maxAge && term > 1) {
    term -= 1;
  }
  if (term !== termMonthsRequested) {
    notes.push(
      'Prazo ajustado automaticamente para respeitar limite de idade (idade final <= 80).',
    );
  }
  return { termApplied: term, notes };
}

function validateLoan(loan) {
  const issues = [];
  if (loan.propertyValue <= 0) issues.push('Valor do imóvel inválido.');
  if (loan.loanAmount <= 0) issues.push('Valor do financiamento inválido.');
  if (loan.termMonthsRequested <= 0) issues.push('Prazo inválido.');
  const maxLtv = loan.productType === 'HOME_EQUITY' ? 0.6 : 0.8;
  if (loan.loanAmount > loan.propertyValue * maxLtv) {
    issues.push(`Valor financiado excede ${maxLtv * 100}% do valor do imóvel (LTV máximo).`);
  }
  return issues;
}

function simulateSACSchedule(args) {
  const { loanAmount, propertyValue, termMonths, monthlyRate, ageNow, rule } = args;
  const schedule = [];
  const amortization = loanAmount / termMonths;
  let balance = loanAmount;

  for (let m = 1; m <= termMonths; m += 1) {
    const ageYears = ageNow + (m - 1) / 12;
    const insuranceAge = rule.mipDfiFixedAtInitialAge ? ageNow : ageYears;
    const interest = balance * monthlyRate;
    const balanceAfter = Math.max(0, balance - amortization);
    const mipCoef = mipCoefForAge(rule, insuranceAge);
    const mip = (rule.mipOnClosingBalance ? balanceAfter : balance) * mipCoef;
    const dfiCoef = dfiCoefForAge(rule, insuranceAge);
    const dfi = propertyValue * dfiCoef;
    const taxaAdm = rule.taxaAdministracaoMensal ?? 0;
    const installmentTotal = amortization + interest + dfi + mip + taxaAdm;

    schedule.push({
      month: m,
      ageYears: round2(ageYears),
      balanceBefore: round2(balance),
      amortization: round2(amortization),
      interest: round2(interest),
      mip: round2(mip),
      dfi: round2(dfi),
      installmentTotal: round2(installmentTotal),
      balanceAfter: round2(balanceAfter),
    });
    balance = balanceAfter;
    if (balance <= 0) break;
  }
  return schedule;
}

/**
 * Simula múltiplos bancos e retorna resultados ordenados por menor parcela.
 * @param {Object} customer - { fullName, birthDateISO, monthlyIncome }
 * @param {Object} loan - { productType: 'IMOVEL'|'HOME_EQUITY', propertyValue, loanAmount, termMonthsRequested }
 * @param {Array} banks - [{ bankKey, effAnnualRatePct }]
 * @param {Object} options - { schedulePreviewMonths?, referenceDate? }
 */
function simulateMultiBank(customer, loan, banks, options = {}) {
  const validations = [];
  const schedulePreviewMonths = options.schedulePreviewMonths ?? 24;
  const referenceDate = options.referenceDate ?? new Date();

  validations.push(...validateLoan(loan));

  const ageNow = yearsBetween(customer.birthDateISO, referenceDate);
  const maxAgeToStart = 80.5;
  if (ageNow > maxAgeToStart) {
    validations.push('Idade atual excede limite permitido para contratação.');
  }

  const bankResults = [];

  for (let i = 0; i < banks.length; i += 1) {
    const b = banks[i];
    const rule = BANK_RULES[b.bankKey];
    if (rule) {
      const rateAnnual = (b.effAnnualRatePct || 0) / 100;
      const rateMonthly = annualToMonthlyRate(rateAnnual);
      let termRequested = loan.termMonthsRequested;
      const maxAgeEnd = rule.maxAgeLimitYears;
      while (ageNow + termRequested / 12 > maxAgeEnd && termRequested > 1) {
        termRequested -= 1;
      }
      if (termRequested !== loan.termMonthsRequested) {
        validations.push(
          `Prazo ajustado para respeitar limite de idade ao final (até ${maxAgeEnd} anos).`,
        );
      }

      const { termApplied, notes } = applyTermConstraints(
        rule,
        loan.productType,
        ageNow,
        termRequested,
      );
      validations.push(...notes);

      const schedule = simulateSACSchedule({
        loanAmount: loan.loanAmount,
        propertyValue: loan.propertyValue,
        termMonths: termApplied,
        monthlyRate: rateMonthly,
        ageNow,
        rule,
        referenceDate,
      });

      const firstInstallment = schedule.length ? schedule[0].installmentTotal : 0;
      const lastInstallment = schedule.length ? schedule[schedule.length - 1].installmentTotal : 0;

      let totalPaid = 0;
      let totalInterest = 0;
      for (let r = 0; r < schedule.length; r += 1) {
        totalPaid += schedule[r].installmentTotal;
        totalInterest += schedule[r].interest;
      }

      const custoFixo = rule.custoAberturaFixo ?? 0;
      const custoPct = rule.custoAberturaPct ?? 0;
      let valorLiberado =
        custoFixo > 0 ? loan.loanAmount - custoFixo : loan.loanAmount * (1 - custoPct / 100);
      if (rule.consideraParcelaZeroNoCET) {
        const dfiCoef0 = dfiCoefForAge(rule, ageNow);
        const mipCoef0 = mipCoefForAge(rule, ageNow);
        valorLiberado -= loan.propertyValue * dfiCoef0 + loan.loanAmount * mipCoef0;
      }
      const cashflows = [-valorLiberado, ...schedule.map((r) => r.installmentTotal)];
      const rm = irrMonthly(cashflows);
      const cetAnnual = irrAnnualFromMonthly(rm);

      const installmentToIncomePct =
        customer.monthlyIncome > 0 ? (firstInstallment / customer.monthlyIncome) * 100 : Number.NaN;

      bankResults.push({
        bankKey: rule.key,
        bankLabel: rule.label,
        termMonthsApplied: termApplied,
        effAnnualRatePct: b.effAnnualRatePct,
        effMonthlyRatePct: rateMonthly * 100,
        firstInstallment: round2(firstInstallment),
        lastInstallment: round2(lastInstallment),
        totalPaid: round2(totalPaid),
        totalInterest: round2(totalInterest),
        cetAnnualPct: Number.isFinite(cetAnnual) ? round2(cetAnnual * 100) : Number.NaN,
        installmentToIncomePct: Number.isFinite(installmentToIncomePct)
          ? round2(installmentToIncomePct)
          : Number.NaN,
        schedulePreview: schedule.slice(0, schedulePreviewMonths),
      });
    }
  }

  bankResults.sort((a, b) => a.firstInstallment - b.firstInstallment);
  return { customer, loan, validations, bankResults };
}

export default simulateMultiBank;
