import { Component } from 'my-world';
@Component({
    selector: `spider`,
    styles: ``,
    template: `<div>蜘蛛侠</div>
        <router-view></router-view>`,
    providers: [],
})
class SpiderComponent {
    constructor() {}
    OnDestroy() {
        console.log('蜘蛛侠 销毁！');
    }
}
export { SpiderComponent };
