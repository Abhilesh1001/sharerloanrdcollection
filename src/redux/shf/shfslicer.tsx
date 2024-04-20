'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {loanholderName, rdholderName} from '@/type/shareholder/shareholde'

export interface counterType{
    hide :string,
    rdNewData: rdholderName[],
    loanNewNameData: loanholderName[]

} 

const initialState: counterType = {
    hide :'hidden',
    rdNewData : [{name:'',email:'', pan_no:'',phone_no:''}],
    loanNewNameData: [{name:'',email:'', pan_no:'',phone_no:'',addhar:'',address:''}],
}


export const shfSlice = createSlice({
  name: 'prslicer',
  initialState,
  reducers: {
    getHideData : (state,action:PayloadAction<string>) =>{
        state.hide = action.payload
    },
    getRdDataName :(state,action:PayloadAction<rdholderName[]>)=>{
        state.rdNewData=action.payload
    },
    getLoanNameData : (state,action:PayloadAction<loanholderName[]>)=>{
        state.loanNewNameData = action.payload
    },
}
   
})

// Action creators are generated for each case reducer function
export const { getHideData,getRdDataName,getLoanNameData} = shfSlice.actions

export default shfSlice.reducer