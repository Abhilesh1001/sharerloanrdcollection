import React from 'react'

interface ButtonProps {
    label : string,
    onClick? : () => void,
    clsaatype? :string
    disable?:string
    css?:string
}

const ButtonSubmit = (props:ButtonProps) => {
  return (
    <button className={`btn btn-warning ${props.css} ml-2 mr-2`} type='submit' onClick={props.onClick} >{props.label}</button>
  )
}

export default ButtonSubmit