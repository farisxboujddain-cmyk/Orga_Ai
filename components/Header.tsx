
import React from 'react';
import { AxiomtechIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
      <AxiomtechIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
        Axiomtech AI Assistant
      </h1>
    </header>
  );
};

export default Header;
