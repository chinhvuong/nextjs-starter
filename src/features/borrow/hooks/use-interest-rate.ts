import { useState, useEffect, useCallback } from 'react';
import { InterestRateInfo } from '../types';
import { BorrowService } from '../services/borrow-service';
import { Token } from '@/shared/types';

export const useInterestRate = (borrowToken: Token | null) => {
  const [interestRates, setInterestRates] = useState<InterestRateInfo>({
    stable: 0,
    variable: 0,
    utilizationRate: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch interest rates when borrow token changes
  useEffect(() => {
    if (!borrowToken) return;

    const fetchInterestRates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const rates = await BorrowService.getInterestRates(borrowToken);
        setInterestRates(rates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch interest rates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterestRates();
  }, [borrowToken]);

  const getInterestRate = useCallback((mode: 'stable' | 'variable') => {
    return mode === 'stable' ? interestRates.stable : interestRates.variable;
  }, [interestRates]);

  const getInterestRateColor = useCallback((rate: number) => {
    if (rate <= 2) return 'text-green-600';
    if (rate <= 5) return 'text-yellow-600';
    if (rate <= 10) return 'text-orange-600';
    return 'text-red-600';
  }, []);

  const getUtilizationColor = useCallback(() => {
    const { utilizationRate } = interestRates;
    if (utilizationRate <= 50) return 'text-green-600';
    if (utilizationRate <= 80) return 'text-yellow-600';
    if (utilizationRate <= 95) return 'text-orange-600';
    return 'text-red-600';
  }, [interestRates]);

  const getUtilizationStatus = useCallback(() => {
    const { utilizationRate } = interestRates;
    if (utilizationRate <= 50) return 'Low';
    if (utilizationRate <= 80) return 'Medium';
    if (utilizationRate <= 95) return 'High';
    return 'Critical';
  }, [interestRates]);

  const calculateInterestPayment = useCallback(
    (amount: number, mode: 'stable' | 'variable', timeInYears: number = 1) => {
      const rate = getInterestRate(mode);
      return (amount * rate * timeInYears) / 100;
    },
    [getInterestRate]
  );

  const calculateMonthlyPayment = useCallback(
    (amount: number, mode: 'stable' | 'variable') => {
      return calculateInterestPayment(amount, mode, 1 / 12);
    },
    [calculateInterestPayment]
  );

  return {
    interestRates,
    isLoading,
    error,
    getInterestRate,
    getInterestRateColor,
    getUtilizationColor,
    getUtilizationStatus,
    calculateInterestPayment,
    calculateMonthlyPayment,
  };
}; 