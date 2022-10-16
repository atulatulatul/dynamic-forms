import { find, findIndex } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CategoryForm,
  CategoryItemForm,
  CategoryItemFormField,
} from "../lib/Category";

const getCategoryById = ({
  categoryFormId,
  categoryForms,
}: {
  categoryFormId: string;
  categoryForms: CategoryForm[];
}) =>
  findIndex(
    categoryForms,
    (categoryForm) => categoryForm.id === categoryFormId
  );

export interface DynamicFormContextProps {
  categoryForms: CategoryForm[];
  addCategoryForm: (newlyAddeddCategoryForm: CategoryForm) => void;
  deleteCategoryForm: (categoryFormId: string) => void;
  getCategoryForm: (categoryFormId: string) => CategoryForm | undefined;
  editCategoryForm: (
    categoryFormId: string,
    updatedCategoryForm: CategoryForm
  ) => void;
  addCategoryItem: (
    categoryFormId: string,
    CategoryItemForm: CategoryItemForm
  ) => void;
  editCategoryItem: ({
    categoryFormId,
    categoryItemId,
    formFields,
  }: {
    categoryFormId: string;
    categoryItemId: string;
    formFields: CategoryItemFormField;
  }) => void;
  deleteCategoryItem: ({
    categoryFormId,
    categoryItemFormId,
  }: {
    categoryFormId: string;
    categoryItemFormId: string;
  }) => void;
}

const dynamicFormInitialState = {
  categoryForms: [],
  addCategoryForm: () => {},
  deleteCategoryForm: () => {},
  getCategoryForm: () => ({} as CategoryForm | undefined),
  editCategoryForm: () => {},
  addCategoryItem: () => {},
  editCategoryItem: () => {},
  deleteCategoryItem: () => {},
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

    const elementIndexToDelete = getCategoryById({
      categoryFormId,
      categoryForms,
    });

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
    const categoryFormIndexToUpdate = getCategoryById({
      categoryFormId,
      categoryForms,
    });

    if (categoryFormIndexToUpdate >= 0) {
      const catForm = [...categoryForms];
      catForm[categoryFormIndexToUpdate] = updatedCategoryForm;
      setCategoryForms([...catForm]);
    }
  };

  const addCategoryItem = (
    categoryFormId: string,
    categoryItemForm: CategoryItemForm
  ) => {
    const categoryFormIndex = getCategoryById({
      categoryFormId,
      categoryForms,
    });

    if (categoryFormIndex >= 0) {
      const catForm = [...categoryForms];
      catForm[categoryFormIndex].items.push(categoryItemForm);
      setCategoryForms([...catForm]);
    }
  };

  const editCategoryItem = ({
    categoryFormId,
    categoryItemId,
    formFields,
  }: {
    categoryFormId: string;
    categoryItemId: string;
    formFields: CategoryItemFormField;
  }) => {
    const categoryFormIndex = getCategoryById({
      categoryFormId,
      categoryForms,
    });

    const categoryItemIndexToEdit = findIndex(
      categoryForms[categoryFormIndex].items,
      (categoryItem) => categoryItem.id === categoryItemId
    );

    if (categoryItemIndexToEdit >= 0) {
      const catForm = [...categoryForms];
      catForm[categoryFormIndex].items[categoryItemIndexToEdit].formFields = {
        ...formFields,
      };
      setCategoryForms([...catForm]);
    }
  };

  const deleteCategoryItem = ({
    categoryFormId,
    categoryItemFormId,
  }: {
    categoryFormId: string;
    categoryItemFormId: string;
  }) => {
    const categoryFormIndex = getCategoryById({
      categoryFormId,
      categoryForms,
    });

    const categoryItemIndexToDelete = findIndex(
      categoryForms[categoryFormIndex].items,
      (categoryItem) => categoryItem.id === categoryItemFormId
    );

    if (categoryItemIndexToDelete >= 0) {
      const catForm = [...categoryForms];
      catForm[categoryFormIndex].items.splice(categoryItemIndexToDelete, 1);
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
        addCategoryItem,
        editCategoryItem,
        deleteCategoryItem,
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
