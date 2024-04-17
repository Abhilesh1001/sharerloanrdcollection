import { format } from 'date-fns'
import React from 'react'
const AllPersonDetails = (props:any) => {
    const {address,email,name,pan_no,person_id,phone_no,time,usersf,adharcard} =  props.prodataitem
    
  return (
    <div className='row'>
        <div className="col-sm-6">
            <label htmlFor="name" className='form-label block'>Customer ID :{person_id} </label>
            <label htmlFor="name" className='form-label block'>Name : {name}</label>
            <label htmlFor="name" className='form-label block'>Email: {email}</label>
            <label htmlFor="name" className='form-label block'>Pan No :{pan_no} </label>
            <label htmlFor="name" className='form-label block'>Addhar No :{adharcard} </label>
            <label htmlFor="name" className='form-label block'>Phone No :{phone_no} </label>
            <label htmlFor="name" className='form-label block'>Date :{usersf!==null && format(time,'dd-MM-yyyy')} </label>
            <label htmlFor="name" className='form-label block'>Created By :{usersf} </label>
        </div>
        <div className="col-sm-6">
        <label htmlFor="name" className='form-label block'>Address</label>
        <label htmlFor="name" className='form-label text-wrap'>{address}</label>
        </div>

    </div>
  )
}

export default AllPersonDetails