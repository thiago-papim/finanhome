/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  TextField,
  Slider,
} from '@mui/material';

const initialSteps = [
  {
    label: 'Qual tipo de crédito você precisa?',
    description: 'Aqui você vai escolher entre as opções de crédito disponíveis.',
    opcoes: ['Financiamento', 'Empréstimo com Garantia de Imóvel'],
  },
];

const stepsFinanciamento = [
  {
    label: 'Financiamento para qual tipo de imóvel?',
    opcoes: ['Casa', 'Apartamento', 'Terreno', 'Comercial'],
  },
  {
    label: 'Para quando precisa?',
    opcoes: [
      'Utilizar imediatamente',
      'Para daqui a 1 mês',
      'Para daqui a 3 meses',
      'Acima de 3 meses',
    ],
  },
  {
    label: 'Qual Valor do imóvel?',
    slider: true,
  },
  {
    label: 'Qual Valor do crédito desejado?',
    slider: true,
    // LIMITADO A 80% DO VALOR DO IMÓVEL
  },
  {
    label: 'Já possui entrada?',
    input: true,
  }, // SIM OU NÃO
  {
    label: 'Qual melhor prazo para você?',
    opcoes: ['120 meses', '180 meses', '240 meses', '360 meses', '420 meses'],
  },
  {
    label: 'Pessoa Física ou Jurídica?',
    opcoes: ['Pessoa Física', 'Pessoa Jurídica'],
  },
  {
    label: 'Já tem algum imóvel em vista?',
    opcoes: ['Sim', 'Não'],
  },
];

const stepsHomeEquity = [
  {
    label: 'Qual a finalidade?',
    opcoes: ['Quitar dívidas', 'Investir', 'Capital de giro', 'Outros'],
  },
  {
    label: 'Qual tipo de garantia?',
    opcoes: ['Casa', 'Apartamento', 'Terreno', 'Comercial'],
  },
  {
    label: 'Para quando precisa?',
    opcoes: [
      'Utilizar imediatamente',
      'Para daqui a 1 mês',
      'Para daqui a 3 meses',
      'Acima de 3 meses',
    ],
  },
  {
    label: 'Qual Valor do imóvel em garantia?',
    slider: true,
  },
  {
    label: 'Qual Valor de crédito desejado?',
    // LIMITADO A 60% DO VALOR DA GARANTIA
    slider: true,
  },
  {
    label: 'Qual melhor prazo para você?',
    opcoes: ['60 meses', '120 meses', '180 meses', '240 meses'],
  },
  {
    label: 'Pessoa Física ou Jurídica?',
    opcoes: ['Pessoa Física', 'Pessoa Jurídica'],
  },
  {
    label: 'Está quitado?',
    opcoes: ['Sim', 'Não'],
  },
];

// iniciar whats automaticamente apos cadastro

export default function CustomStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [mainChoice, setMainChoice] = React.useState(null); // Financiamento ou Home Equity
  const [selections, setSelections] = React.useState({});

  const extendedSteps =
    mainChoice === 'Financiamento'
      ? [...initialSteps, ...stepsFinanciamento]
      : mainChoice === 'Empréstimo com Garantia de Imóvel'
        ? [...initialSteps, ...stepsHomeEquity]
        : initialSteps;

  const handleOptionSelect = (stepIndex, value) => {
    if (stepIndex === 0) {
      setMainChoice(value);
    }
    setSelections((prev) => ({
      ...prev,
      [stepIndex]: value,
    }));

    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, 200); // pequeno delay para feedback visual
  };

  const handleInputChange = (stepIndex, value) => {
    setSelections((prev) => ({
      ...prev,
      [stepIndex]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setMainChoice(null);
    setSelections({});
  };

  return (
    <Box sx={{ maxWidth: 400, width: '100%' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {extendedSteps.map((step, index) => {
          const selected = selections[index];
          const isInputStep = step.input;

          return (
            <Step key={step.label}>
              <StepLabel
                optional={
                  selections[index] ? (
                    <Typography variant="body2" color="primary">
                      {String(selections[index])}
                    </Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>{' '}
              <StepContent>
                {step.description && <Typography sx={{ mb: 2 }}>{step.description}</Typography>}

                <Box sx={{ mb: 2 }}>
                  {step.opcoes &&
                    step.opcoes.map((option) => (
                      <Button
                        key={option}
                        variant={selected === option ? 'contained' : 'outlined'}
                        onClick={() => handleOptionSelect(index, option)}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {option}
                      </Button>
                    ))}

                  {step.input && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Digite aqui"
                      value={selected || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  )}

                  {step.slider && (
                    <Box sx={{ px: 2, mt: 2 }}>
                      <Typography gutterBottom>
                        Valor selecionado: R${' '}
                        {Number(selections[index] || 0).toLocaleString('pt-BR')}
                      </Typography>
                      <Slider
                        value={selections[index] || 50000}
                        onChange={(_, newValue) => handleInputChange(index, newValue)}
                        onChangeCommitted={(_, newValue) => {
                          handleInputChange(index, newValue);
                          setTimeout(() => {
                            setActiveStep((prev) => prev + 1);
                          }, 200);
                        }}
                        min={50000}
                        max={2000000}
                        step={10000}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                      />
                    </Box>
                  )}
                </Box>

                <Box>
                  {isInputStep && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={!selected || selected.trim() === ''}
                    >
                      {index === extendedSteps.length - 1 ? 'Finalizar' : 'Continuar'}
                    </Button>
                  )}
                  <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Voltar
                  </Button>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === extendedSteps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6">Resumo das escolhas:</Typography>
          <ul>
            {extendedSteps.map((step, i) => (
              <li>
                {step.label}: <strong>{selections[i]}</strong>
              </li>
            ))}
          </ul>
          <Button onClick={handleReset} sx={{ mt: 2 }}>
            Reiniciar
          </Button>
        </Paper>
      )}
    </Box>
  );
}
