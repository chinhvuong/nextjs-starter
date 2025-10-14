import { z } from 'zod';

export const borrowFormSchema = z.object({
  collateralToken: z.object({
    symbol: z.string(),
    name: z.string(),
    address: z.string(),
    decimals: z.number(),
    logoURI: z.string().optional(),
    price: z.number().optional(),
  }).nullable().refine((val) => val !== null, {
    message: 'Collateral token is required',
  }),
  
  collateralAmount: z.string()
    .min(1, 'Collateral amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Collateral amount must be a positive number',
    }),
  
  borrowToken: z.object({
    symbol: z.string(),
    name: z.string(),
    address: z.string(),
    decimals: z.number(),
    logoURI: z.string().optional(),
    price: z.number().optional(),
  }).nullable().refine((val) => val !== null, {
    message: 'Borrow token is required',
  }),
  
  borrowAmount: z.string()
    .min(1, 'Borrow amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Borrow amount must be a positive number',
    }),
  
  interestRateMode: z.enum(['stable', 'variable'], {
    message: 'Interest rate mode is required',
  }),
});

export type BorrowFormData = z.infer<typeof borrowFormSchema>;

