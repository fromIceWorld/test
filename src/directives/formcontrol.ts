import { Directive, Input } from 'my-world';
@Directive({
    selector: '[fromControl]',
})
class fromControlDirective {
    @Input('fromControl')
    fromControl: any;
    name = '第二个指令';
    constructor() {
        console.log('实例fromControl');
    }
    OnInit(native: Element, Tnode: elementNode) {
        console.log(
            '%cfromControlDirective: %cOnInit',
            'color: #2c5dc1',
            'color: blue',
            native,
            Tnode
        );
        console.log(this.fromControl);
    }
    Oninserted(native: Element) {
        console.log(
            '%cfromControlDirective: %cOninserted',
            'color:#2c5dc1',
            'color:#ff6500',
            native
        );
    }
    OnInputChanges(changesObj: any) {
        console.log(
            '%cfromControlDirective: %cOnInputChanges',
            'color:#2c5dc1',
            'color:#ff6500',
            changesObj
        );
    }
    OnViewUpdateed(tView: TemplateView) {
        console.log(
            '%cfromControlDirective: %cOnViewUpdateed',
            'color:#2c5dc1',
            'color:#ff6500',
            tView
        );
    }
    OnDestroy() {
        console.log('%cmyComponent: %cOnDestroy', 'color:green', 'color:red');
    }
}
export { fromControlDirective };
