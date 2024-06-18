import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCategories } from '../API/CategoryAPI';
import { TCategory } from '../Types/Category';

interface CategoryContextProps {
  categories: TCategory[];
  refreshCategories: () => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<TCategory[]>([]);

  const refreshCategories = () => {
    fetchCategories()
      .then((response) => setCategories(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, refreshCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
