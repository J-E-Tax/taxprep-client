import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaxReturn {
    taxReturnId: number;
    userId: number;
    totalIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    totalFederalTax: number;
    taxRefundOrDue: number;
    marginalTaxRate?: number;
}

interface TaxReturnSummary {
    totalIncome: number;
    totalDeductions: number;
    totalTaxableIncome: number;
    totalFederalTax: number;
    totalTaxRefundOrOwed: number;
    marginalTaxRate?: number;
}

interface TaxReturnState {
    taxReturns: { [key: number]: TaxReturn };
    taxReturnSummary: TaxReturnSummary | null;
}

const initialState: TaxReturnState = {
    taxReturns: {},
    taxReturnSummary: null
};

export const taxReturnSlice = createSlice({
    name: 'taxReturn',
    initialState,
    reducers: {
        setTaxReturns: (state, action: PayloadAction<{ [key: number]: TaxReturn }>) => {
            state.taxReturns = action.payload;
            console.log('state.taxReturns:', state.taxReturns);
        },
        calculateTaxReturnSummary: (state) => {
            let totalIncome = 0;
            let totalDeductions = 0;
            let totalTaxableIncome = 0;
            let totalFederalTax = 0;
            let totalTaxRefundOrOwed = 0;
            let marginalTaxRate = 0;

            let taxReturns = Array.isArray(state.taxReturns) ? state.taxReturns : [state.taxReturns]; // This is to Convert to array if not already

            for (const taxReturn of taxReturns) {
                totalIncome += taxReturn.totalIncome;
                totalDeductions += taxReturn.totalDeductions;
                totalTaxableIncome += taxReturn.taxableIncome;
                totalFederalTax += taxReturn.totalFederalTax;
                totalTaxRefundOrOwed += taxReturn.taxRefundOrDue;
            }
            marginalTaxRate = calculateMarginalTaxRate(totalTaxableIncome);

            state.taxReturnSummary = {
                totalIncome,
                totalDeductions,
                totalTaxableIncome,
                totalFederalTax,
                totalTaxRefundOrOwed,
                marginalTaxRate
            };
        }
    }
});

const calculateMarginalTaxRate = (taxableIncome: number) => {
    const TAX_BRACKETS = [11600, 47150, 100525, 191950, 243725, 609350];
    const TAX_RATES = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];

    for (let i = 0; i < TAX_BRACKETS.length; i++) {
        if (taxableIncome <= TAX_BRACKETS[i]) { // So if the taxable income is less than the current bracket
            return TAX_RATES[i] * 100; // Return the tax rate for that bracket
        }
    }
    // If the taxable income is above the highest bracket, return the highest tax rate
    return TAX_RATES[TAX_RATES.length - 1] * 100;
}

export const { setTaxReturns, calculateTaxReturnSummary } = taxReturnSlice.actions;

export const selectTaxReturns = (state: { taxReturn: TaxReturnState }) => state.taxReturn.taxReturns;

export const selectTaxReturnSummary = (state: { taxReturn: TaxReturnState }) => {
    return state.taxReturn.taxReturnSummary;
}

export default taxReturnSlice.reducer;
