import { Component, EventEmitter, Input, Output } from 'mark5';
@Component({
    selector: `app-demo`,
    template: `
        <h1>-------------------demoComponent-----------start-------------</h1>
        app-demo组件: {{ desc }}
        <div *forOf="arrs" item="item" index="index" *if="item >= 2">
            <span> {{ item }}: [app-demo]{{ desc }}, </span>
            从上级组件获取的值{{ childValue }}
        </div>
        <p *if="desc">app-child[child组件的 Value]:{{ childValue }}</p>
        <h1>-------------------demoComponent-----------end-------------</h1>
        {{ parentValue }}
    `,
    styles: '',
})
class demoComponent {
    @Input('value') childValue: string;
    @Input('childValue') parentValue: string;
    @Output('childEmit')
    arrs = [0, 1, 2, 3];
    emitBuild?: EventEmitter;
    desc = '[demo组件中的插值]';
    constructor() {}
    OnInputChanges(changesObj: any) {
        console.log(
            '%cdemoComponent: %cOnIputChanges',
            'color:#bf7313',
            'color:#ff6500',
            changesObj
        );
    }
    OnInit() {
        console.log(
            '%cdemoComponent: %cOnIinit',
            'color:#bf7313',
            'color:blue'
        );
    }
    OnSlotInit() {
        console.log(
            '%cdemoComponent: %cOnSlotInit',
            'color:#bf7313',
            'color:blue'
        );
    }
    OnSlotChecked() {
        console.log(
            '%cdemoComponent: %cOnSlotChecked',
            'color:#bf7313',
            'color:#ff6500'
        );
    }
    OnViewInit() {
        console.log(
            '%cdemoComponent: %cOnViewInit',
            'color:#bf7313',
            'color:blue'
        );
    }
    OnUpdated() {
        console.log(
            '%cdemoComponent: %OnUpdated',
            'color:#bf7313',
            'color:#ff6500'
        );
    }
    OnViewUpdated() {
        console.log(
            '%cdemoComponent: %OnViewUpdated',
            'color:#bf7313',
            'color:#ff6500'
        );
    }
    OnDestroy() {
        console.log(
            '%cdemoComponent: %cOnDestroy',
            'color:#bf7313',
            'color:red'
        );
    }
    emitValue() {
        console.log(this.injectorCompiler);
        this.emitBuild?.emit(this.injectorCompiler);
    }
}
export { demoComponent };
