import React from 'react'


interface ButtonProps {
    label : string,
    onClick? : () => void,
    clsaatype? :string
    disable?:string
    buttomType? : string 
    css?:string
}

const PrBurron = (props:ButtonProps) => {
  return (
    <button className="btn btn-info mx-2 btn-sm dark:btn-neutral" type={`${props.buttomType==='submit' ?'submit' :'button' }`} onClick={props.onClick} >{props.label}</button>
  )
}

export default PrBurron