import { CheckDetectChange, Component, Inject, ViewChild } from 'my-world';

@Component({
    selector: `#root`,
    styles: ``,
    template: `
        <div class="menu">
            <div class="collapse">
                <div class="collapse-header" @click="changeCollapse($event)">> form</div>
                    <div *if="coll">
                        <div draggable="true" *forOf="collapses" >
                            <img
                                &src="item.img"
                                width="20px"
                                &id="item.id"
                                &type="item.type"
                                ></img>
                        </div>
                    </div>
            </div>
        </div>
        <div id="drawing-board" #drawing-board style="width: 1920px; height: 1080px"></div>
        <!-- 侧边配置栏 -->
        <div class="config-menu">
            <div class="close">
                <span>o</span>
            </div>
            <div class="tabs">
                <app-tab 
                    &config="config" 
                    @updateJSON="updateNode($event)" 
                    @changeLayout="changeNodeLayout($event)"
                    @editEvent="onEdit($event)">
                </app-tab>
            </div>
        </div>
    `,
})
class MyComponent {
    @ViewChild('drawing-board')
    board;
    dragTarget: EventTarget | null = null;
    data = {
        nodes: [
            {
                id: 'input',
                description: '单纯的输入框,只携带 placeholder',
                x: 250,
                type: 'input',
                ...INPUT_CONFIG,
                y: 150,
            },
            {
                id: 'text',
                description: '文字',
                x: 170,
                type: 'text',
                ...TEXT_CONFIG,
                y: 200,
            },
        ],
    };
    graph: any;
    focusNode: any = null;
    jsonOnEdit: boolean = false;
    coll: boolean = true;
    config = [];
    collapses = [
        {
            id: 'input',
            type: 'node',
            img: '../menu/input.svg',
        },
        {
            id: 'radio',
            type: 'node',
            img: '../menu/radio.svg',
        },
        {
            id: 'text',
            type: 'node',
            img: '../menu/text.svg',
        },
        {
            id: 'form',
            type: 'combo',
            img: '../menu/form.svg',
        },
        {
            id: 'combination',
            type: 'combo',
            img: '../menu/combination.svg',
        },
    ];
    constructor(@Inject(CheckDetectChange) private cd: CheckDetectChange) {}

    emit(e: EventTarget, value: any) {
        console.log(e, value, this);
    }
    onEdit(e) {
        let { detail } = e,
            { dom, value } = detail;
        console.log('编辑状态', value);
        this.jsonOnEdit = value;
    }
    changeNodeLayout(e) {
        console.log(e);
    }
    updateNode(e) {
        const model = this.focusNode._cfg.model,
            getWidth = model.getWidth,
            comboId = model.comboId,
            json = this.focusNode._cfg.model.json;
        let { detail } = e,
            { dom, value } = detail;
        console.log(dom, value);
        Object.assign(json, value);
        this.graph.updateItem(this.focusNode, {
            ...model,
        });
    }
    OnInit() {
        console.log('%cmyComponent: %cOnInit', 'color:green', 'color:blue');
        this.addGlobalEvent();
        this.initBoard();
    }
    changeCollapse(e) {
        this.coll = !this.coll;
        this.cd.detectChanges();
    }
    initBoard() {
        const width = this.board.scrollWidth,
            height = this.board.scrollHeight || 500,
            graph = new G6.Graph({
                container: 'drawing-board',
                width,
                height,
                // translate the graph to align the canvas's center, support by v3.5.1
                defaultNode: {
                    type: 'modelRect',
                },
                modes: {
                    default: ['drag-node', 'drag-combo'],
                },
                nodeStateStyles: {
                    focus: {
                        lineWidth: 1,
                        stroke: '#1890ff',
                    },
                },
                defaultCombo: {
                    type: 'rect', // Combo 类型
                    // ... 其他配置
                },
                plugins: [rightMenu],
            });
        this.graph = graph;
        graph.data(this.data);
        graph.render();
        this.graphAddEventListener();
    }
    OnInputChanges(changesObj: any) {
        console.log(
            '%cmyComponent: %cOnIputChanges',
            'color:green',
            'color:#ff6500',
            changesObj
        );
    }
    OnViewInit() {
        console.log('%cmyComponent: %cOnViewInit', 'color:green', 'color:blue');
    }
    OnUpdated() {
        console.log(
            '%cmyComponent: %OnUpdated',
            'color:green',
            'color:#ff6500'
        );
    }
    OnViewUpdated() {
        console.log(
            '%cmyComponent: %OnViewUpdated',
            'color:green',
            'color:#ff6500'
        );
    }
    focus(item) {
        this.graph.setItemState(item, 'focus', true);
    }
    unFocus(item) {
        if (!item) {
            return;
        }
        this.graph.setItemState(item, 'focus', false);
    }
    graphAddEventListener() {
        const graph = this.graph;
        graph.on('click', (evt) => {
            const { item } = evt;
            if (item !== this.focusNode) {
                if (this.focusNode) {
                    this.unFocus(this.focusNode);
                    this.focusNode = null;
                } else {
                    this.config = [];
                    this.cd.detectChanges();
                }
            }
        });
        graph.on('node:click', (evt) => {
            const { item, shape } = evt,
                model = item._cfg.model,
                getWidth = model.getWidth,
                comboId = model.comboId,
                json = item._cfg.model.json;
            console.log(model.comboId);
            this.unFocus(this.focusNode);
            this.focus(item); //focus当前节点
            this.focusNode = item;
            this.config = [model.json];
            this.cd.detectChanges();
        });
        graph.on('combo:click', (evt) => {
            console.log(evt);
        });
        graph.on('node:mouseenter', (evt) => {
            const { item } = evt;
            this.focus(item);
        });

        graph.on('node:mouseleave', (evt) => {
            const { item } = evt;
            if (this.focusNode !== item) {
                this.unFocus(item);
            }
        });
        graph.on('keydown', (evt: any) => {
            if (this.jsonOnEdit) {
                return;
            }
            const { item, keyCode } = evt;
            if (keyCode === 46) {
                //delete
                graph.removeItem(this.focusNode);
                this.focusNode = null;
            } else if (keyCode >= 37 && keyCode <= 40) {
                // 左上右下
                if (this.focusNode) {
                    let { x, y } = this.focusNode._cfg.model;
                    switch (keyCode) {
                        case 37:
                            x -= 10;
                            break;
                        case 38:
                            y -= 10;
                            break;
                        case 39:
                            x += 10;
                            break;
                        case 40:
                            y += 10;
                            break;
                    }
                    this.focusNode.updatePosition({
                        x,
                        y,
                    });
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            }
        });
    }
    addGlobalEvent() {
        const that = this;
        document.addEventListener('keydown', (event) => {});
        document.addEventListener(
            'dragstart',
            function (event) {
                that.dragTarget = event.target;
                that.dragTarget = event.target;
                // 使其半透明
                event.target.style.opacity = 0.5;
            },
            false
        );
        document.addEventListener(
            'dragend',
            function (event) {
                // 重置透明度
                event.target.style.opacity = '';
            },
            false
        );
        document.addEventListener(
            'drop',
            function (event) {
                if (event.target.tagName === 'CANVAS') {
                    let { offsetX, offsetY } = event,
                        { id } = that.dragTarget!,
                        targetX = offsetX,
                        targetY = offsetY,
                        targetType = that.dragTarget!.getAttribute('type');
                    // 阻止默认动作（如打开一些元素的链接）
                    event.preventDefault();
                    // 将拖动的元素到所选择的放置目标节点中
                    if (targetType === 'combo') {
                        that.graph.createCombo(
                            {
                                x: targetX,
                                y: targetY,
                                type: id,
                                id: String(Math.random()),
                                padding: [5, 5, 5, 5],
                                size: [260, 50],
                                label: id,
                                labelCfg: {
                                    refX: -1,
                                    refY: -11,
                                },
                                style: {},
                            },
                            []
                        );
                    } else if (targetType === 'node') {
                        that.graph.addItem('node', {
                            x: targetX,
                            y: targetY,
                            type: id,
                            ...window[id.toLocaleUpperCase() + '_CONFIG'],
                            id: String(Math.random()),
                        });
                    }
                }
            },
            false
        );
    }
    OnDestroy() {
        console.log('%cmyComponent: %cOnDestroy', 'color:green', 'color:red');
    }
}
export { MyComponent };
