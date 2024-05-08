import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface w2 {
        a : string,
        b : string,
        cname: string,
        cstreet : string,
        ccity : string,
        cstate : string,
        czip : string,
        d : string,
        e : string,
        fstreet : string,
        fcity : string,
        fstate : string,
        fzip : string,
        l1 : string,
        l2 : string,
        l3 : string,
        l4 : string,
        l5 : string,
        l6 : string,
        l7 : string,
        l8 : string,
        l9 : string,
        l10 : string,
        l11 : string,
        l12a : string,
        l12b : string,
        l12c : string,
        l12d : string,
        l13 : {
          StatEmp : string,
          Retirement_Plan : string,
          Third_Party_Sick_Pay : string
        },
        l14: string
} // l10 -> Line 10
// interface w2 {
//     a : "ssn",
//     b : "Employer Identification Number",
//     c : "Employer's name, address, and ZIP",
//     d : "control number",
//     e : "Employee's first and last name",
//     f : "Employee's address and ZIP code",
//     l1 : "Wages, Tips, Compensation",
//     l2 : "Federal income tax withheld",
//     l3 : "Social Security Wages",
//     l4 : "Social Security Tax Withheld",
//     l5 : "Medicare Wages and Tips",
//     l6 : "Medicare tax withheld",
//     l7 : "Social Security Tips",
//     l8 : "Allocated Tips",
//     l9 : "null",
//     l10 : "Dependent Care Benefits",
//     l11 : "Nonqualified Plans",
//     l12 : {
//       a : "Uncollected Social Security tax on tips",
//       b : "Uncollected Medicare tax on tips",
//       c : "Taxable cost of group-term life insurance over 50k",
//       d : "Elective deferrals to a section 401k cash or deferred arrangement"
//     },
//     l13 : {
//       StatEmp : "Check/Uncheck",
//       Retirement_Plan : "Check/Uncheck",
//       Third_Party_Sick_Pay : "Check/Uncheck"
//     },
//     l14: "Other"
// } // l10 -> Line 10

interface notW2 {

}
interface items {
  a: string,
  b: string,
  c: string,
  d: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface TaxFormInfoState{
    taxFormId : number,
    user: number,
    status : string,
    formType : string,
    formDetails : w2
}

const initialState: TaxFormInfoState = {
    taxFormId : 0,
    user: 1,
    status : "pending",
    formType : "null",
    formDetails : {
        a : "",
        b : "",
        cname: "",
        cstreet : "",
        ccity : "",
        cstate : "",
        czip : "",
        d : "",
        e : "",
        fstreet : "",
        fcity : "",
        fstate : "",
        fzip : "",
        l1 : "",
        l2 : "",
        l3 : "",
        l4 : "",
        l5 : "",
        l6 : "",
        l7 : "",
        l8 : "",
        l9 : "",
        l10 : "",
        l11 : "",
        l12a: "",
        l12b : "",
        l12c : "",
        l12d : "",
        l13 : {
          StatEmp : "",
          Retirement_Plan : "",
          Third_Party_Sick_Pay : ""
        },
        l14: ""
    }
};

export const taxformInfoSlice = createSlice({
    name: 'taxformInfo',
    initialState,
    reducers: {
        setTaxFormInfo: (state, action: PayloadAction<TaxFormInfoState>) => {
            return action.payload;
        },
        resetTaxFormInfo: () => initialState,
        
    }
});

export const { setTaxFormInfo, resetTaxFormInfo } = taxformInfoSlice.actions;

export default taxformInfoSlice.reducer;