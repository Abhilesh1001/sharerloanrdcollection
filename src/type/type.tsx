
export interface datatype {
    line_no : null|number,
    po_line :null | number,
    pr_no: null|number,
    grn_no:null|number,
    material_no: null|number,
    material_name: string,
    material_unit: string,
    material_price: null|number,
    material_tax: null|number,
    total_tax :null |number,
    material_qty: null|number,
    material_text: string,
    total_amount: null|number,
}

export interface vendorType {
    s_no?: null|number,
    name: string,
    phone_no: number|null,
    vendor_name: string,
    address: string,
    gst: string,
    email: string,
}

export type StateProps = {
    counter : {
        baseurl : string,
        authToken:null|{
            refresh :string,
            access :string 
        },
        user :string,
        userId:number | null
        hidden : hiddenType
    }   
    
}
export type mainType = { TotalAmount: null|number, TotalWithtax: null|number, TotalTax:null|number }

export interface posliiceState {
    poslicer:CounterStatePo
  }

export interface podataType {
    po_no:null|number,
    time:string,
    item_pr:string,
    vendor_address:string,
    delivery_address:string,
    user:null|number
    maindata:string 
}

export const updataData = {
    pr_no: null,
    material_no: null,
    material_name: '',
    material_unit: '',
    material_price: null,
    material_quantity: null,
    material_tax: null,
    total_tax: null,
    material_qty: null,
    material_text: '',
    total_amount: null,
}


export interface datatypePr {
    line_no: null|number,
    po_no:null|number,
    pr_no:null|number,
    material_name: string,
    material_unit: string,
    material_no: number | null,
    material_price: number | null,
    material_qty: number|null,
    material_text: string,
    total_price: null | number 
}

export interface prsliiceState {
    prslicer:{
    datapr : datatypePr[],
    prmaindata : prmainData,
    hiddenalert?:string,
    newchang?:string,
}
    
  }

export interface statePropsMaterial{
    counter :{
        user:string,
        authToken :{
            access :string 
        },
        userId :number,
        baseurl : string
    }
}



export interface prmainData {
    pr_no : number|null,
    user : number|null,
    time :string,
    item_json : string
  }
  
  export interface CounterState {
    datapr : datatypePr[],
    prmaindata : prmainData,
    hiddenalert?:string,
    newchang?:string,
  }

  
  export interface CounterStatePo {
    deliveryadress:vendorType,
    vendoradress :vendorType,
    data : datatype[]
    podata :podataType
    selectedValue : string, 
    mainData :mainType,
    newPoNo:null|number
    poprview : null | number
    poview : boolean
    pochange :boolean,
    uppono:null|number
    orignalData:datatype[]
    totalQuantity:datatype[]
    hiddenalert :string
    newchang : string,
  }


export interface hiddenType {
    hiddenFundName:string,
    capitalDis : string,
    rdpername :string,
    rdColl : string,
    loanpername :string,
    loanColl : string,
    invoice:string,
    issuematerial : string
  }

  export interface assetType {
    asset_no?: null|number,
    time?: string,
    asset_name : string,
    usersf?: number | null
    amount_Debit :  number | null 
    debit_date : string 
     

  }
  
  export interface FixedDepositeType {
    fd_id?: null | number
    person_id?: null|number,
    person_name? : string,
    usersf?: null |  number,
    amount_Debit: null | number,
    amount_credit: null | number,
    start_date :string,
    closing_date: string,
    duration: null | number,
    interest_rate : null | number,
    is_active: boolean,
    person?:null|number,
    collection_date : string
  
  }
  export interface loanCollType {
    loan_collection_id?: null | number,
    loan_intrest: null | number,
    collection_date: string,
    amount_collected: null | number,
    remarks: string,
    usersf: null | number
  }

  export interface loanType {
    loan_id?: null | number,
    person: null | number,
    loan_amount: null | number,
    usersf: null | number,
    remarks: string,
    is_active: boolean,
    start_date: string,
    days: null | number,
    duration: null | number,
    closing_date: string,
    interest_rate: null | number,
  }

  export interface RDCollType {
    rd_collection_id?: null | number,
    rd_interest : null | number,
    collection_date: string,
    amount_collected: null | number,
    remarks: string,
    usersf: null | number
  }


  export interface RDIntType {
    rd_id?: null | number,
    person: null | number,
    usersf: null | number,
    start_date: string,
    closing_date: string,
    is_active: boolean,
    duration: string,
    interest_rate: string
  }


  export interface shareholderType {
    shf_id?: null | number,
    person: null | number,
    uusersf: null | number,
    amount_credit : null | number
    amount_Debit : null | number,
    collection_date : string,
    particulars : string,
    time? : string
  }

  export interface staffSalryType {
    sd_id?: null | number,
    person: null | number,
    usersf: null | number,
    amount_Debit : null | number
    collection_date : string,
    remarks : string,
    time? : string
  }

  
  