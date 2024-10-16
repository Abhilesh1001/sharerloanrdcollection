export interface shareholderName {
    Sh_id?: null|number,
    name: string,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
}
export interface rdholderName {
    rdp_id?: null|number,
    name: string,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
}


export interface MyData {
    data:{
        msg : string,
        data:{
            sh_id:null|number
        }
    },
    isPending :boolean,
    
}

export interface sharefund {
    sh_id : null | number,
    amount_credit :null|number,
    amount_debit : null|number,
    name: string,
    particulars:string
    collection_date : string,
    personid?: null | number 
}
export interface collData {
    user:null|number,
    person : null|number,
    amount_collected : null|number,
    collection_date : string
    remarks: string
    name : '',
}

export interface Entry {
    date: string;
    amount:number;
  }
  
  export interface Data {
    [rdHolderId: string]: Entry[];
  }
  
  export interface loanholderName {
    person_id?: null|number,
    name: string,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
    address : string,
    addhar : string
}

export interface loancollData {
    user:null|number,
    loan_person : null|number,
    amount_collected : null|number,
    remarks: string
    name : '',
}


export interface shareholderFund  {
    shf_id : null|number,
    name : string,
    totalInvested : null|number,
}

export type shfStateTypr = {
    shfSlice : {
        hide : string,
        rdNewData : rdholderName[]
        loanNewNameData:loanholderName[]
        csvFileRdcol : any
    }   
}


export type rdintresttype = {
    rd_intrest_id?:number|null
    name : string,
    holdetId : number |null,
    start_date : string,
    closing_date :string
    isactive:boolean,
    duration:null|number,
    intrestrate:null|number  
}

