import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BorrowState, BorrowPosition, UpdateBorrowFormPayload } from './types';

const initialState: BorrowState = {
  positions: [],
  currentForm: {
    collateralToken: null,
    borrowToken: null,
    collateralAmount: '',
    borrowAmount: '',
    interestRateMode: 'variable',
  },
  isLoading: false,
  error: null,
  selectedPosition: null,
  validationErrors: [],
  warnings: [],
};

const borrowSlice = createSlice({
  name: 'borrow',
  initialState,
  reducers: {
    // Form actions
    updateBorrowForm: (state, action: PayloadAction<UpdateBorrowFormPayload>) => {
      const { field, value } = action.payload;
      (state.currentForm as Record<string, unknown>)[field] = value;
    },

    resetBorrowForm: (state) => {
      state.currentForm = initialState.currentForm;
      state.validationErrors = [];
      state.warnings = [];
    },

    // Validation actions
    setValidationErrors: (state, action: PayloadAction<string[]>) => {
      state.validationErrors = action.payload;
    },

    setWarnings: (state, action: PayloadAction<string[]>) => {
      state.warnings = action.payload;
    },

    clearValidation: (state) => {
      state.validationErrors = [];
      state.warnings = [];
    },

    // Position actions
    setSelectedPosition: (state, action: PayloadAction<BorrowPosition | null>) => {
      state.selectedPosition = action.payload;
    },

    addBorrowPosition: (state, action: PayloadAction<BorrowPosition>) => {
      state.positions.push(action.payload);
    },

    updateBorrowPosition: (state, action: PayloadAction<BorrowPosition>) => {
      const index = state.positions.findIndex(pos => pos.id === action.payload.id);
      if (index !== -1) {
        state.positions[index] = action.payload;
      }
    },

    removeBorrowPosition: (state, action: PayloadAction<string>) => {
      state.positions = state.positions.filter(pos => pos.id !== action.payload);
    },

    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Bulk operations
    setBorrowPositions: (state, action: PayloadAction<BorrowPosition[]>) => {
      state.positions = action.payload;
    },

    // Form validation
    validateForm: (state) => {
      // This would typically call a validation service
      // For now, just clear previous validation
      state.validationErrors = [];
      state.warnings = [];
    },
  },
});

export const {
  updateBorrowForm,
  resetBorrowForm,
  setValidationErrors,
  setWarnings,
  clearValidation,
  setSelectedPosition,
  addBorrowPosition,
  updateBorrowPosition,
  removeBorrowPosition,
  setLoading,
  setError,
  clearError,
  setBorrowPositions,
  validateForm,
} = borrowSlice.actions;

export default borrowSlice.reducer; 