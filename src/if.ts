import { Directive, Input } from 'mark5';
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
