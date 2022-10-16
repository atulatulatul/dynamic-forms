import { Switch } from "react-router-dom";
import AddCategory from "../pages/AddCategory";
import AddCategoryItem from "../pages/AddCategoryItem";
import Categories from "../pages/Categories";
import CategoryItem from "../pages/CategoryItem";
import EditCategory from "../pages/EditCategory";
import PageNotFound from "../pages/PageNotFound";
import RouteWithNavDrawer from "./RouteWithNavDrawer";

const Routes = () => {
  return (
    <Switch>
      <RouteWithNavDrawer exact path="/" component={Categories} />
      <RouteWithNavDrawer path="/category/create" component={AddCategory} />
      <RouteWithNavDrawer
        path="/category/:categoryId"
        component={EditCategory}
      />

      <RouteWithNavDrawer
        path="/item/:categoryId"
        component={CategoryItem}
        exact
      />

      <RouteWithNavDrawer
        path="/item/:categoryId/create"
        component={AddCategoryItem}
      />
      <PageNotFound />
    </Switch>
  );
};

export default Routes;
