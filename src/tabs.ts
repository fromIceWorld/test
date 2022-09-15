import { Component, EventEmitter, Input, Output } from 'my-world';
@Component({
    selector: `app-tab`,
    template: `
    <p>数据：</p>
        <div *forOf="Object.entries(config[0] ||[])">
            <span>{{item[0]}} : </span>
            <span contenteditable @blur="emitUpdate($event,item[0])" @focus="onEdit($event)">{{item[1]}}</span>
        </div>
        <p>布局：</p>
        <span class="label">flex-direction:</span>
        <div class="layout" @click="changeFlex($event)">
            <img width="15px" src="../menu/Justify_flex-start+row.svg" layout="row"></img>
            <img width="15px" layout="col" src='data:image/svg+xml;utf8,<svg t="1662707400560" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18488" width="200" height="200"><path d="M0 96h1024v64H0V96z m160 512h704v320H160V608zM160 224h704v320H160V224z" p-id="18489"></path></svg>'></img>
        </div>
       
        <span class="label">justify-content:</span>
        <div class="layout" @click="changeFlex($event)">
            <img width="15px" src="../menu/Justify_space-between+row.svg" ></img>
            <img width="15px" src="../menu/Justify_center+row.svg"></img>
            <img width="15px" src="../menu/Direction_row.svg"></img>
            <img width="15px" src="../menu/Justify_flex-end+row.svg"></img>
            <img width="15px" src="../menu/Direction_row-reverse.svg"></img>
        </div>
    `,
    styles: '',
})
class TabComponent {
    @Output('updateJSON') updateJSON = new EventEmitter('updateJSON');
    @Output('editEvent') editEvent = new EventEmitter('editEvent');
    @Output('changeLayout') changeLayout = new EventEmitter('changeLayout');
    @Input('config') config = [];
    tabsConfig = [{}];
    editContent = '';
    constructor() {}
    OnInputChanges(changesObj: any) {}
    changeFlex(e) {
        if (e.target.tagName === 'IMG') {
            let layout = e.target.getAttribute('layout');
            this.changeLayout.emit({
                layout,
            });
        }
    }
    emitUpdate(e, key) {
        this.editEvent.emit(false);
        let target = e.target,
            content = this.getContent(target);
        console.log(e, key, content);
        this.updateJSON.emit({
            json: {
                [key]: content,
            },
            config: {
                currerntLength: measureText(content, '14px'),
                previousLength: measureText(this.editContent, '14px'),
            },
        });
    }
    onEdit(e) {
        this.editContent = this.getContent(e.target);
        this.editEvent.emit(true);
    }
    /**
     *
     * @param target 输入框
     * @returns 输入框内容
     */
    getContent(target: Element) {
        return Array.from(target.childNodes)
            .map((text) => text.nodeValue)
            .join('');
    }
    OnInit() {
        console.log('%ctab: %cOnIinit', 'color:#bf7313', 'color:blue');
    }
    OnViewInit() {
        console.log('%ctab: %cOnViewInit', 'color:#bf7313', 'color:blue');
    }
    OnUpdated() {
        console.log('%ctab: %OnUpdated', 'color:#bf7313', 'color:#ff6500');
    }
    OnViewUpdated() {
        console.log('%ctab: %OnViewUpdated', 'color:#bf7313', 'color:#ff6500');
    }
    OnDestroy() {
        console.log('%ctab: %cOnDestroy', 'color:#bf7313', 'color:red');
    }
    emitValue() {
        // console.log(this.injectorCompiler);
        // this.emitBuild?.emit(this.injectorCompiler);
    }
}
export { TabComponent };
