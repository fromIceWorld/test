interface Route {
    component?: any;
    path: string;
    pathRegExp?: RegExp;
    parent?: Route;
    loadChildren?: Function;
    children?: Route[];
}

export { Route };
