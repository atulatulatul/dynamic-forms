import { Switch } from "react-router-dom";
import AddCategory from "../pages/AddCategory";
import AddCategoryItem from "../pages/AddCategoryItem";
import Categories from "../pages/Categories";
import CategoryItem from "../pages/CategoryItem";
import CategoryItems from "../pages/CategoryItems";
import EditCategory from "../pages/EditCategory";
import EditCategoryItem from "../pages/EditCategoryItem";
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
        exact
      />

      <RouteWithNavDrawer path="/items" component={CategoryItems} exact />

      <RouteWithNavDrawer
        path="/item/:categoryId"
        component={CategoryItem}
        exact
      />

      <RouteWithNavDrawer
        path="/item/:categoryId/create"
        component={AddCategoryItem}
        exact
      />

      <RouteWithNavDrawer
        path="/item/:categoryId/edit/:categoryItemId"
        component={EditCategoryItem}
        exact
      />
      <PageNotFound />
    </Switch>
  );
};

export default Routes;
