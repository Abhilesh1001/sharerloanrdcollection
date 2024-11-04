'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hiddenType } from '@/type/type';

export interface CounterState {
  baseurl:string|undefined,
  logindata :{},
  authToken: { refresh: string; access: string }| null,
  user : string,
  userId : number|null, 
  mainheader :string,
  hidden : hiddenType,  
  alerthidden : string
  is_admin : boolean,
  is_company_admin :boolean,
  companyId : null |number
} 

const baseurlfile = process.env.NEXT_PUBLIC_BASEURL;

const initialState: CounterState = {
  
  baseurl : baseurlfile,
  logindata : {},
  authToken : null,
  user : "",
  userId:null,
  mainheader: 'mainPage',
  hidden : {
    hiddenFundName:"hidden",
    capitalDis :'hidden',
    rdpername: 'hidden',
    rdColl : 'hidden',
    loanpername :'hidden',
    loanColl : 'hidden',
    invoice:'hidden',
    issuematerial : 'hidden'
  },
  alerthidden :'hidden',
  is_admin : false,
  is_company_admin : false,
  companyId : null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getLogindata: (state, action: PayloadAction<{}>) => {
      state.logindata = action.payload
    },
    getAuthToken : (state,action:PayloadAction<{ refresh: string; access: string }| null>)=>{3
        state.authToken = action.payload
    },
    getUser : (state,action:PayloadAction<string>) =>{
        state.user = action.payload
    },
    clearAuthToken : (state,action:PayloadAction<string>)=>{
        state.authToken=null 
    },
    clearUser :(state,action:PayloadAction<string>) =>{
        state.user =  action.payload
    },
    getUserId :(state,action:PayloadAction<number|null>) =>{
      state.userId = action.payload
    },
    clearUserId : (state,action:PayloadAction<number|null>) =>{
      state.userId = null 
    },
    getMainheader: (state,action:PayloadAction<string>)=>{
      localStorage.setItem('mainHeader',action.payload)
      state.mainheader = action.payload
    },
    getHidden : (state,action:PayloadAction<hiddenType>)=>{
      state.hidden =action.payload
    },
    getAdmin : (state,action:PayloadAction<boolean>)=>{
      state.is_admin = action.payload
    },
    getAdminCompany : (state,action:PayloadAction<boolean>)=>{
      state.is_company_admin = action.payload
    },
    getCompanyId :(state,action:PayloadAction<number|null>) =>{
      state.companyId = action.payload
    },

  },

})

// Action creators are generated for each case reducer function
export const { getLogindata,getAuthToken,getUser,clearAuthToken,clearUser,getUserId,clearUserId,getMainheader,getHidden,getAdmin,getAdminCompany,getCompanyId} = counterSlice.actions

export default counterSlice.reducer