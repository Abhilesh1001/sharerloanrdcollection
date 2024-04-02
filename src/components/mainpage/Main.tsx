import React, {memo } from 'react'
import ShareholderMenu from './ShareholderMenu'


const Main = () => {
   
    


  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-6">
                 <ShareholderMenu />
            </div>
        </div>
      
        
    </div>
  )
}

export default memo(Main)