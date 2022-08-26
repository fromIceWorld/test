import { Module } from 'my-world';
import { Route } from './Enums/route';
import { RouterLink } from './router-link';
import { RouterView } from './router-view';
@Module({
    declarations: [RouterView, RouterLink],
    exports: [],
})
class RouterModule {
    static routes: Route[];
    static forRoot(routes: Route[]) {
        routes.forEach((route) => {
            this.addRegExp(route, '');
        });
        this.routes = routes;
        console.log(routes);
        return RouterModule;
    }
    static addRegExp(route: Route, pre: string, parent?: Route) {
        const { path, children } = route,
            pathRegString =
                pre + '/' + path.replace(/:([^/]+)/g, () => '([^/]+)');
        route.pathRegExp = new RegExp(pathRegString);
        route.parent = parent;
        children?.forEach((child) => {
            this.addRegExp(child, pathRegString, route);
        });
    }
}
export { RouterModule };
