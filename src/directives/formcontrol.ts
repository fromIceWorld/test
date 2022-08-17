import { Directive, Input } from 'my-world';
@Directive({
    selector: '[formControl]',
})
class formControlDirective {
    @Input('formControl')
    formControl: any;
    name = '第二个指令';
    constructor() {
        console.log('实例formControl');
    }

    OnBind(native: Element) {
        console.log(
            '%cformControlDirective: %cOnBind',
            'color:#2c5dc1',
            'color:#ff6500',
            native
        );
        this.native = window['inputNative'] = native;
    }
    OnInit(native: Element, Tnode: elementNode) {
        console.log(
            '%cformControlDirective: %cOnInit',
            'color: #2c5dc1',
            'color: blue',
            native,
            Tnode
        );
        console.log(this.formControl);
    }
    OnInputChanges(changesObj: any) {
        console.log(
            '%cformControlDirective: %cOnInputChanges',
            'color:#2c5dc1',
            'color:#ff6500',
            changesObj
        );
    }
    OnViewInit(tView: TemplateView) {
        console.log(
            '%cformControlDirective: %cOnViewInit',
            'color:#2c5dc1',
            'color:#ff6500',
            tView
        );
        this.native.focus();
    }
    OnViewUpdated(tView: TemplateView) {
        console.log(
            '%cformControlDirective: %cOnViewUpdated',
            'color:#2c5dc1',
            'color:#ff6500',
            tView
        );
        console.log(document.querySelector('input'));
    }
    OnDestroy() {
        console.log('%cmyComponent: %cOnDestroy', 'color:green', 'color:red');
    }
}
export { formControlDirective };
