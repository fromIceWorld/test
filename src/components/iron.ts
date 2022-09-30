import { Component } from 'mark5';
@Component({
    selector: `iron`,
    styles: ``,
    template: `<div>钢铁侠</div>
        <router-view></router-view>`,
    providers: [],
})
class IronComponent {
    constructor() {}
    OnDestroy() {
        console.log('钢铁侠 销毁！');
    }
}
export { IronComponent };
