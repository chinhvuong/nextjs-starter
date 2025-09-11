import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types';

// Base selectors
const selectBorrowState = (state: RootState) => state.borrow;

// Memoized selectors
export const selectBorrowPositions = createSelector(
  [selectBorrowState],
  (borrow) => borrow.positions
);

export const selectCurrentBorrowForm = createSelector(
  [selectBorrowState],
  (borrow) => borrow.currentForm
);

export const selectBorrowLoading = createSelector(
  [selectBorrowState],
  (borrow) => borrow.isLoading
);

export const selectBorrowError = createSelector(
  [selectBorrowState],
  (borrow) => borrow.error
);

export const selectSelectedBorrowPosition = createSelector(
  [selectBorrowState],
  (borrow) => borrow.selectedPosition
);

export const selectBorrowValidationErrors = createSelector(
  [selectBorrowState],
  (borrow) => borrow.validationErrors
);

export const selectBorrowWarnings = createSelector(
  [selectBorrowState],
  (borrow) => borrow.warnings
);

export const selectBorrowFormIsValid = createSelector(
  [selectBorrowValidationErrors],
  (errors) => errors.length === 0
);

export const selectBorrowPositionsCount = createSelector(
  [selectBorrowPositions],
  (positions) => positions.length
);

export const selectActiveBorrowPositions = createSelector(
  [selectBorrowPositions],
  (positions) => positions.filter(pos => parseFloat(pos.borrowedAmount) > 0)
);

export const selectTotalBorrowedValue = createSelector(
  [selectBorrowPositions],
  (positions) => positions.reduce((total, pos) => {
    // This would typically calculate USD value
    // For now, just return the count
    return total + parseFloat(pos.borrowedAmount);
  }, 0)
); 