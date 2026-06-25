import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="rounded bg-red-600 px-4 py-2 font-bold text-white transition-colors hover:bg-red-700"
      {...props}
    >
      {children}
    </button>
  );
};
