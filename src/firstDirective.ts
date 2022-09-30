import { Directive, elementNode, Input, TemplateView } from 'mark5';
@Directive({
    selector: '[data-angular]',
})
class firstDirective {
    @Input('name')
    arr: any;
    name = '第一个指令';
    constructor() {
        console.log('实例化指令');
    }
    OnBind(host: Element) {
        console.log(
            '%cfirstDirective: %cOnBind',
            'color: #2c5dc1',
            'color: blue',
            host
        );
    }
    OnInit(host: Element, Tnode: elementNode) {
        console.log(
            '%cfirstDirective: %cOnInit',
            'color: #2c5dc1',
            'color: blue',
            host,
            Tnode
        );
    }
    OnInputChanges(changeObj) {
        console.log(
            '%cfirstDirective: %cOnInit',
            'color: #2c5dc1',
            'color: blue',
            changeObj
        );
    }
    OnViewInit(tView: TemplateView) {
        console.log(
            '%cfirstDirective: %cOnViewInit',
            'color:#2c5dc1',
            'color:#ff6500',
            tView
        );
    }
    OnViewUpdated(tView: TemplateView) {
        console.log(
            '%cfirstDirective: %cOnViewUpdated',
            'color:#2c5dc1',
            'color:#ff6500',
            tView
        );
    }
    OnDestroy() {
        console.log('%cmyComponent: %cOnDestroy', 'color:green', 'color:red');
    }
}
export { firstDirective };
