
import {  useEffect, useState } from "react"

export const useMenu=()=>{

    const [hiddenmenu,setHiddenMenu] = useState('hidden')


    const handleClickMenu =()=>{
        setHiddenMenu(`${hiddenmenu==='hidden'?'null':'hidden'}`)
    }
    return {handleClickMenu,hiddenmenu,setHiddenMenu}
}