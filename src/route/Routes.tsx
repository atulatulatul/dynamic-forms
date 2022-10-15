import { Switch } from "react-router-dom";
import AddCategory from "../pages/AddCategory";
import PageNotFound from "../pages/PageNotFound";
import RouteWithNavDrawer from "./RouteWithNavDrawer";

const Routes = () => {
  return (
    <Switch>
      <RouteWithNavDrawer exact path="/" component={AddCategory} />
      <RouteWithNavDrawer path="/category/create" component={AddCategory} />
      <RouteWithNavDrawer path="/categories" component={AddCategory} />
      <PageNotFound />
    </Switch>
  );
};

export default Routes;
