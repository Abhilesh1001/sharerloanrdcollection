import React from 'react';

interface TextInputProps {
  value: Number;
  type?: Number|null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  css?: string;
}

const TextNumberInput: React.FC<TextInputProps> = ({ value, type, onChange, width, css}) => {
  return (
    <div className='flex'>
      <input
        type='text'
        className={`bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${css}`}
        onChange={onChange}
        required
        value={Number(value)}
      />
    </div>
  );
};

export default TextNumberInput;
