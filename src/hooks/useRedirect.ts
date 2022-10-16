import { useHistory } from "react-router-dom";

type ParamTypes = string | number;

// To make the mapped method accept n number of arguments
type GetRedirectURLMethod = (...args: ParamTypes[]) => string;

type GetRedirectURLMethodName =
  | "createCategory"
  | "categoryListing"
  | "editCategory"
  | "createItem";

// Maps method in case there exists some dynamic route to be added here
export const RedirectLocation: Record<
  GetRedirectURLMethodName,
  GetRedirectURLMethod
> = {
  createCategory: () => "/category/create",
  createItem: (categoryId) => `/item/${categoryId}/create`,
  editCategory: (categoryId) => `/category/${categoryId}`,
  categoryListing: () => "/",
};

const useRedirect = () => {
  const history = useHistory();

  function redirect(to: string) {
    history.push(to);
  }

  return { redirect };
};

export default useRedirect;
