import { Component, EventEmitter, Input, Output } from 'my-world';
@Component({
    selector: `app-child`,
    template: `
        <h1>-------------------ChildComponent------start------------------</h1>
        app-child组件: {{ desc }}
        <div
            *forOf="arr"
            item="item"
            index="index"
            style="width: 100px;
                    padding: 10px 15px;
                    border-radius: 6px;
                    background-color: #72d381"
            &style="{background:item.color}"
            @click="emitValue()"
        >
            按钮: {{ arr[index].desc }}
        </div>
        <app-demo
            &value="parentValue"
            *forOf="arr"
            item="item"
            index="index"
            &style="{color:item.color}"
            &childValue="chidComponentValue"
        ></app-demo>
        <p>my-component value:{{ parentValue }}</p>
        <slot name="slot1"></slot>
        <slot></slot>
        <h1>-------------------ChildComponent-------end-----------------</h1>
    `,
    styles: '',
})
class ChilComponent {
    @Input('value') parentValue?: string;
    @Output('childEmit') childEmit: any;
    arr = [
        { color: 'rgb(255 107 137)', desc: '第一个' },
        { color: 'rgb(123 122 78)', desc: '第二个' },
    ];
    emitBuild?: EventEmitter;
    desc = '[child组件中的插值]';
    chidComponentValue = 'children组件的值';
    constructor() {}
    OnInputChanges(changesObj: any) {
        console.log(
            '%cChilComponent: %cOnIputChanges',
            'color:#bf7313',
            'color:#ff6500',
            changesObj
        );
        this.chidComponentValue = 'children组件【更新】的值';
    }
    OnInit() {
        console.log(
            '%cChilComponent: %cOnIinit',
            'color:#bf7313',
            'color:blue'
        );
    }
    OnViewInit() {
        console.log(
            '%cChilComponent: %cOnViewInit',
            'color:#bf7313',
            'color:blue'
        );
    }
    OnUpdated() {
        console.log(
            '%cChilComponent: %OnUpdated',
            'color:#bf7313',
            'color:#ff6500'
        );
    }
    OnViewUpdated() {
        console.log(
            '%cChilComponent: %OnViewUpdated',
            'color:#bf7313',
            'color:#ff6500'
        );
    }
    OnDestroy() {
        console.log(
            '%cChilComponent: %cOnDestroy',
            'color:#bf7313',
            'color:red'
        );
    }
    emitValue() {
        // console.log(this.injectorCompiler);
        // this.emitBuild?.emit(this.injectorCompiler);
    }
}
export { ChilComponent };
