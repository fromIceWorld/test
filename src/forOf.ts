import { Directive, Input } from 'mark5';
@Directive({
    selector: '[forOf]',
})
class forof {
    @Input('forOf')
    arr: Array<any> = [];
    @Input('item')
    item: string = 'item';
    @Input('index')
    index: string = 'index';
    constructor() {}
    OnInputChanges(changesObj: any) {
        let views: Array<any> = [];
        if (!this.arr) {
            return views;
        }
        for (let i = 0; i < this.arr.length; i++) {
            views.push({
                [this.item]: this.arr[i],
                [this.index]: i,
            });
        }
        return views;
    }
}
export { forof };
