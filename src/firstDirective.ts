import { Directive, elementNode, Input, TemplateView } from 'my-world';
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
    OnInit(host: Element, Tnode: elementNode) {
        console.log(
            '%cfirstDirective: %cOnInit',
            'color: #2c5dc1',
            'color: blue',
            host,
            Tnode
        );
    }
    OnHostInserted(parentNative: Element) {
        console.log(
            '%cfirstDirective: %cOninserted',
            'color:#2c5dc1',
            'color:#ff6500',
            parentNative
        );
    }
    OnHostInputChanges(changesObj: any) {
        console.log(
            '%cfirstDirective: %cOnInputChanges',
            'color:#2c5dc1',
            'color:#ff6500',
            changesObj
        );
    }
    OnViewUpdateed(tView: TemplateView) {
        console.log(
            '%cfirstDirective: %cOnViewUpdateed',
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
