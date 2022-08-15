import { Input } from 'my-world';

class bIf {
    @Input('if')
    arr: any;
    name = 'if指令';
    static selector = 'if';
    constructor() {}
    OnInputChanges(changesObj: any): Array<any> {
        return this.arr ? [{ arr: this.arr }] : [];
    }
}
export { bIf };
