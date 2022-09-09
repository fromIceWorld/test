import { Route } from './Enums/route';
import { RouterModule } from './index';

class Router {
    routes: Route[] = [];
    currentRouteTree: Route[] = [];
    preRouteTree: Route[] = [];
    oldHash: string = '';
    newHash: string = '';
    parems: any = {};
    subscribers: Array<any> = [];
    constructor() {
        this.routes = RouterModule.routes;
        this.listenHashChange();
    }
    listenHashChange() {
        this.newHash = location.hash.substring(1);
        this.currentRouteTree = this.match(this.routes);
        let router = this;
        window.addEventListener(
            'hashchange',
            function ($e) {
                let newHash = (router.newHash = location.hash.substring(1));
                console.log(
                    `The hash has changed! from ${router.oldHash} to ${newHash}`
                );
                const newRoutes = router.match(router.routes);
                router.preRouteTree = router.currentRouteTree;
                router.currentRouteTree = newRoutes;
                let i = 0,
                    j = 0;
                while (newRoutes[i] || router.preRouteTree[j]) {
                    if (newRoutes[i] && router.preRouteTree[j]) {
                        if (newRoutes[i] === router.preRouteTree[j]) {
                            i++;
                            j++;
                        } else {
                            router.subscribers.splice(i + 1, 1);
                            router.subscribers[i].checkMatch();
                            break;
                        }
                    } else if (newRoutes[i]) {
                        router.subscribers.splice(i + 1, 1);
                        router.subscribers[i].install();
                        break;
                    } else if (router.preRouteTree[j]) {
                        router.subscribers.splice(i + 1, 1);
                        router.subscribers[i].destroyRoute();
                        break;
                    }
                }
            },
            false
        );
    }
    match(routes: Route[]) {
        let matchRoute: Route[] = [],
            childMatchRoute;
        for (let route of routes) {
            const { pathRegExp, children } = route,
                matchResult = this.newHash.match(pathRegExp!);
            if (matchResult) {
                const [matchString] = matchResult;
                if (matchString == this.newHash) {
                    matchRoute.push(route);
                    break;
                } else {
                    childMatchRoute = this.match(children || []);
                    if (childMatchRoute.length) {
                        matchRoute = [route, ...childMatchRoute];
                        break;
                    }
                }
            }
        }
        return matchRoute;
    }
    getHash() {
        return this.oldHash;
    }
    subscribe(com) {
        this.subscribers.push(com);
    }
    unsubscribe(com) {
        this.subscribers = this.subscribers.filter((view) => view !== com);
    }
    static forRoot(routes: Route[]) {
        routes.forEach((route) => {
            this.addRegExp(route, '/', null);
        });
        this.routes = routes;
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
export { Router };
