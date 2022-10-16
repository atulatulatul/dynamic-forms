import { find, findIndex } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CategoryForm } from "../lib/Category";

export interface DynamicFormContextProps {
  categoryForms: CategoryForm[];
  addCategoryForm: (newlyAddeddCategoryForm: CategoryForm) => void;
  deleteCategoryForm: (categoryFormId: string) => void;
  getCategoryForm: (categoryFormId: string) => CategoryForm | undefined;
  editCategoryForm: (
    categoryFormId: string,
    updatedCategoryForm: CategoryForm
  ) => void;
}

const dynamicFormInitialState = {
  categoryForms: [],
  addCategoryForm: () => {},
  deleteCategoryForm: () => {},
  getCategoryForm: () => ({} as CategoryForm | undefined),
  editCategoryForm: () => {},
};

const DynamicFormContext = createContext<DynamicFormContextProps>(
  dynamicFormInitialState
);

const DynamicFormProvider = ({ children }: { children: React.ReactNode }) => {
  const categoryInfo = localStorage.getItem("categoryInfo");
  const [categoryForms, setCategoryForms] = useState<CategoryForm[]>(
    categoryInfo ? JSON.parse(categoryInfo) : []
  );

  const addCategoryForm = (newlyAddeddCategoryForm: CategoryForm) => {
    setCategoryForms((prevForms) => [...prevForms, newlyAddeddCategoryForm]);
  };

  const deleteCategoryForm = (categoryFormId: string) => {
    const catForms = [...categoryForms];

    const elementIndexToDelete = findIndex(
      catForms,
      (catForm) => catForm.id === categoryFormId
    );

    if (elementIndexToDelete >= 0) {
      catForms.splice(elementIndexToDelete, 1);
      setCategoryForms([...catForms]);
    }
  };

  const getCategoryForm = (categoryFormId: string) => {
    return find(
      categoryForms,
      (categoryForm) => categoryForm.id === categoryFormId
    );
  };

  const editCategoryForm = (
    categoryFormId: string,
    updatedCategoryForm: CategoryForm
  ) => {
    const categoryFormIndexToUpdate = findIndex(
      categoryForms,
      (categoryForm) => categoryForm.id === categoryFormId
    );

    if (categoryFormIndexToUpdate >= 0) {
      const catForm = [...categoryForms];
      catForm[categoryFormIndexToUpdate] = updatedCategoryForm;
      setCategoryForms([...catForm]);
    }
  };

  useEffect(() => {
    localStorage.setItem("categoryInfo", JSON.stringify(categoryForms));
  }, [categoryForms]);

  return (
    <DynamicFormContext.Provider
      value={{
        categoryForms,
        addCategoryForm,
        deleteCategoryForm,
        getCategoryForm,
        editCategoryForm,
      }}
    >
      {children}
    </DynamicFormContext.Provider>
  );
};

export const useDynamicFormContext = () => {
  const context = useContext(DynamicFormContext);
  if (!context) {
    throw new Error(
      "useDynamicFormContext needs to be used within DynamicFormProvider"
    );
  }

  return context;
};

export default DynamicFormProvider;
