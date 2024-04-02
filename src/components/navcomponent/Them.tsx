'use client'
import React, { useEffect, useState, memo } from 'react'

const Them = () => {

    const [theme, setTheme] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme') || 'light';
            return storedTheme;
        }
        return 'light'; 
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
        
            localStorage.setItem('theme', theme || 'light');
            document.querySelector('html')?.setAttribute('data-theme', theme || 'light');
        }
    }, [theme]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       
        setTheme(e.target.value)

    }

  return (
    <select className='rounded bg-base-100  p-1 mr-2 w-44' value={theme === null ? '' : theme} onChange={handleChange} name="theme">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="aqua">Aqua</option>
    <option value="cupcake">Cupcake</option>
    <option value="retro">Retro</option>
    <option value="bumblebee">Bumblebee</option>
    <option value="emerald">Emerald</option>
    <option value="corporate">Corporate</option>
    <option value="synthwave">Synthwave</option>
    <option value="cyberpunk">Cyberpunk</option>
    <option value="valentine">Valentine</option>
    <option value="lofi">Lofi</option>
    <option value="garden">Garden</option>
    <option value="forest">Forest</option>
    <option value="halloween">Halloween</option>
    <option value="pastel">Pastel</option>
    <option value="fantasy">Fantasy</option>
    <option value="wireframe">wireframe</option>
    <option value="black">black</option>
    <option value="luxury">luxury</option>
    <option value="dracula">dracula</option>
    <option value="cmyk">cmyk</option>
    <option value="autumn">autumn</option>
    <option value="lemonade">lemonade</option>
    <option value="night">night</option>
    <option value="winter">winter</option>
    <option value="dim">dim</option>
    <option value="sunset">sunset</option>
</select>
  )
}

export default memo(Them)