import { Directive, Input } from 'my-world';
@Directive({
    selector: '[if]',
})
class bIf {
    @Input('if')
    arr: any;
    name = 'if指令';
    constructor() {}
    OnInputChanges(changesObj: any): Array<any> {
        return this.arr ? [{ arr: this.arr }] : [];
    }
}
export { bIf };
