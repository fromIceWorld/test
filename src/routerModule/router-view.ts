import { Component, Inject, TemplateView, TViewFns, TViewIndex } from 'mark5';

import { Router } from './router';

const routeConfig = '$$_Route_Config';
let routeDeep = 0;
@Component({
    selector: 'router-view',
    template: '',
    styles: '',
    providers: [],
})
class RouterView {
    parentTView: TemplateView;
    tView?: TemplateView;
    native: Element;
    deep: number = routeDeep++;
    constructor(@Inject(Router) private router: Router) {
        router.subscribe(this);
        this.parentTView = TViewFns.currentTView();
        let currentLView = this.parentTView[TViewIndex.LView]!;
        this.native = currentLView[currentLView.length - 1];
        console.log('所在的TView', this.parentTView);
        console.log('附着的native', this.native);
        console.log('router:', this.deep, this.native);
        this.install();
    }
    install() {
        console.log('router-view监听到hash更改');
        console.log('获取hashs', this.router.getHash());
        let oldRoute = this.router.preRouteTree[this.deep],
            newRoute = this.router.currentRouteTree[this.deep];
        console.log('新旧route', this.deep, newRoute, oldRoute);
        if (newRoute) {
            this.tView = new TemplateView(
                newRoute.component,
                undefined,
                this.native
            );
            this.tView.install();
        }
    }
    checkMatch() {
        console.log('router-view监听到hash更改');
        console.log('获取hashs', this.router.getHash());
        let oldRoute = this.router.preRouteTree[this.deep],
            newRoute = this.router.currentRouteTree[this.deep];
        console.log('新旧route', this.deep, newRoute, oldRoute);
        if (oldRoute !== newRoute) {
            if (oldRoute) {
                this.tView.destroyed();
                this.tView = null;
            }
            if (newRoute) {
                this.tView = new TemplateView(
                    newRoute.component,
                    undefined,
                    this.native
                );
                this.tView.install();
            }
        }
    }
    destroyRoute() {
        this.tView.destroyed();
    }
    OnDestroy() {
        routeDeep--;
        this.router.unsubscribe(this);
    }
}
export { RouterView };
