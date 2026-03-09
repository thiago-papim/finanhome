/**
 * Utilitários matemáticos para simulação de parcelas
 */

export function annualToMonthlyRate(effAnnualRate) {
  if (effAnnualRate <= -1) throw new Error('Taxa anual inválida');
  return (1 + effAnnualRate) ** (1 / 12) - 1;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}

export function yearsBetween(birthDateISO, refDate) {
  const b = new Date(birthDateISO);
  if (Number.isNaN(b.getTime())) throw new Error('Data de nascimento inválida');

  let years = refDate.getFullYear() - b.getFullYear();
  const m = refDate.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && refDate.getDate() < b.getDate())) years -= 1;

  const lastBirthday = new Date(refDate.getFullYear(), b.getMonth(), b.getDate());
  if (refDate < lastBirthday) lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);

  const nextBirthday = new Date(lastBirthday);
  nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);

  const frac =
    (refDate.getTime() - lastBirthday.getTime()) /
    Math.max(1, nextBirthday.getTime() - lastBirthday.getTime());

  return years + frac;
}

/**
 * IRR mensal (TIR) por busca binária
 */
export function irrMonthly(cashflows, guessMin = -0.999, guessMax = 5) {
  if (cashflows.length < 2) throw new Error('Cashflows insuficientes');
  if (cashflows[0] >= 0) throw new Error('CF0 deve ser negativo (liberação)');

  const npv = (r) => {
    let s = 0;
    for (let t = 0; t < cashflows.length; t += 1) {
      s += cashflows[t] / (1 + r) ** t;
    }
    return s;
  };

  let lo = guessMin;
  let hi = guessMax;
  let fLo = npv(lo);
  let fHi = npv(hi);
  let tries = 0;
  while (fLo * fHi > 0 && tries < 40) {
    hi *= 1.5;
    fHi = npv(hi);
    tries += 1;
  }
  if (fLo * fHi > 0) return Number.NaN;

  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid);
    if (Math.abs(fMid) < 1e-8) return mid;
    if (fLo * fMid <= 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return (lo + hi) / 2;
}

export function irrAnnualFromMonthly(rm) {
  if (!Number.isFinite(rm)) return Number.NaN;
  return (1 + rm) ** 12 - 1;
}
