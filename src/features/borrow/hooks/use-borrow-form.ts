import { useState, useCallback, useEffect } from 'react';
import { BorrowFormData, BorrowValidationResult } from '../types';
import { BorrowValidationService } from '../services/borrow-validation';
import { getCollateralTokens, getStablecoins } from '@/config/tokens';
import { Token } from '@/shared/types';

export const useBorrowForm = () => {
  const [formData, setFormData] = useState<BorrowFormData>({
    collateralToken: getCollateralTokens()[0] || null,
    borrowToken: getStablecoins()[0] || null,
    collateralAmount: '',
    borrowAmount: '',
    interestRateMode: 'variable',
  });

  const [validation, setValidation] = useState<BorrowValidationResult>({
    isValid: false,
    errors: [],
    warnings: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form whenever form data changes
  useEffect(() => {
    const result = BorrowValidationService.validateForm(formData);
    setValidation(result);
  }, [formData]);

  const updateCollateralToken = useCallback((token: Token | null) => {
    setFormData(prev => ({
      ...prev,
      collateralToken: token,
    }));
  }, []);

  const updateBorrowToken = useCallback((token: Token | null) => {
    setFormData(prev => ({
      ...prev,
      borrowToken: token,
    }));
  }, []);

  const updateCollateralAmount = useCallback((amount: string) => {
    setFormData(prev => ({
      ...prev,
      collateralAmount: amount,
    }));
  }, []);

  const updateBorrowAmount = useCallback((amount: string) => {
    setFormData(prev => ({
      ...prev,
      borrowAmount: amount,
    }));
  }, []);

  const updateInterestRateMode = useCallback((mode: 'stable' | 'variable') => {
    setFormData(prev => ({
      ...prev,
      interestRateMode: mode,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      collateralToken: getCollateralTokens()[0] || null,
      borrowToken: getStablecoins()[0] || null,
      collateralAmount: '',
      borrowAmount: '',
      interestRateMode: 'variable',
    });
    setValidation({
      isValid: false,
      errors: [],
      warnings: [],
    });
  }, []);

  const submitForm = useCallback(async () => {
    if (!validation.isValid) {
      return { success: false, error: 'Form validation failed' };
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically call the borrow service
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    } finally {
      setIsSubmitting(false);
    }
  }, [validation.isValid]);

  return {
    formData,
    validation,
    isSubmitting,
    updateCollateralToken,
    updateBorrowToken,
    updateCollateralAmount,
    updateBorrowAmount,
    updateInterestRateMode,
    resetForm,
    submitForm,
  };
}; 