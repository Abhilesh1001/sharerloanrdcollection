import React from 'react';

interface TextInputProps {
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  css?: string;
  name? : string;
  label? : string
}

const TextInputText: React.FC<TextInputProps> = ({ value, type, onChange, width, name, css,label}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={label} className='form-label dark:text-slate-50'>{label}</label>
      <input
        type={type === null ? 'text' : type}
        className={`bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-96 dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${css}`}
        onChange={onChange}
        required
        value={value}
        name={name}
      />
    </div>
  );
};

export default TextInputText;
