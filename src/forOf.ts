import { Input, ViewContainer } from 'my-world';

class forof {
    @Input('forOf')
    arr: Array<any>;
    @Input('item')
    item: string = 'item';
    @Input('index')
    index: string = 'index';
    static selector = 'forOf';
    constructor(private container: ViewContainer) {}
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
