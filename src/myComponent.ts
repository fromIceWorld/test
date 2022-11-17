import { CheckDetectChange, Component, Inject, ViewChild } from 'mark5';

@Component({
    selector: `#root`,
    styles: ``,
    template: `
        <div class="menu">
            <f-button type="link">
                <img title="保存数据" class="btn" src='../menu/save.svg' width="20px" @click="cacheData($event)"></img>
            </f-button>
            <f-button type="link">
                <img title="恢复数据" class="btn" src='../menu/recovery.svg' width="20px" @click="recoverData($event)"></img>
            </f-button>
            <f-button type="link">
                <img title="清除画布" class="btn" src='../menu/clear.svg' width="20px" @click="clearGraph($event)"></img>
            </f-button>
            <f-button type="link">
                <img title="导出数据" class="btn" src='../menu/export.svg' width="20px" @click="exportData($event)"></img>
            </f-button>
            <img
                title="切换视图"
                &src=" tabView == 'design-view' ? '../menu/view.svg' : '../menu/relation.svg' "
                width="20px"
                @click="changeView($event)"
            ></img>
            <div class="collapse">
                <div class="collapse-header" @click="changeCollapse($event)">> form</div>
                    <div *if="coll">
                        <div draggable="true" *forOf="collapses" >
                            <img
                                &title="item.title"
                                &src="item.img"
                                width="20px"
                                &id="item.id"
                                &type="item.type"
                                ></img>
                        </div>
                    </div>
            </div>
        </div>
        
        <div id="drawing-board" style="position:relative">
            <!-- scaleX -->
            <div id="scaleX" #scaleX style="position: absolute;"></div>
            <!-- scaleY -->
            <div id="scaleY" #scaleY style="position: absolute;"></div>
            <!-- 页面图 -->
            <div  id= "design-view" #design-view style="width: 1920px; height: 1080px;margin: 22px 0 0 22px "
                &style="{display:tabView == 'design-view' ? 'block' : 'none'}"></div>
             <!-- 逻辑图 -->
            <div id="relation-ship" #relation-ship style="width: 1920px; height: 1080px"
            &style="{display:tabView == 'relation-ship' ? 'block' : 'none'}"></div>
        </div>
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
         <!-- 连线弹窗 事件 -->
         <f-dialog
            style="width:400px"
            title="对话框"
            &display="diaDisplay"
            @OnCancel="cancel($event)"
        >
            <div>
                <span class="label">source:</span>
                <f-select %="sourceSelect">
                    <f-option *forOf="sourceList" &value="item">
                        {{ item }}
                    </f-option>
                </f-select>
            </div>
            <div>
                <span class="label">target:</span>
                <f-select %="targetSelect">
                    <f-option *forOf="targetList" &value="item">
                        {{ item }}
                    </f-option>
                </f-select>
            </div>
            <f-button @click="createEdge($event)">确认</f-button>
        </f-dialog>
        <h1>测试区</h1>
        <test></test>
    `,
})
class MyComponent {
    @ViewChild('design-view')
    board;
    @ViewChild('relation-ship')
    relationship;
    @ViewChild('scaleX')
    scaleX;
    @ViewChild('scaleY')
    scaleY;
    tabView: string = 'design-view';
    dragTarget: EventTarget | null = null;
    data = {
        nodes: [],
        combos: [],
    };
    scaleXdata = {
        nodes: [{ id: '1', type: 'scaleX', x: 0, y: 0 }],
    };
    scaleYdata = {
        nodes: [{ id: '2', type: 'scaleY', x: 0, y: 0 }],
    };
    eventNodes = [];
    graph: any;
    relationshipGraph: any;
    focusNode: any = null;
    focusCombo: any = null;
    jsonOnEdit: boolean = false;
    coll: boolean = true;
    config = [];
    sourceList = [];
    targetList = [];
    collapses = [
        {
            id: 'input',
            type: 'node',
            title: '输入框',
            img: '../menu/input.svg',
        },
        {
            id: 'radio',
            type: 'node',
            title: '单选框',
            img: '../menu/radio.svg',
        },
        {
            id: 'text',
            type: 'node',
            title: '文本',
            img: '../menu/text.svg',
        },
        {
            id: 'form',
            type: 'combo',
            title: 'form',
            img: '../menu/form.svg',
        },
        {
            id: 'input_box',
            type: 'combo',
            title: '布局容器',
            img: '../menu/input-box.svg',
        },
        {
            id: 'button',
            type: 'node',
            title: '按钮',
            img: '../menu/button.svg',
        },
        {
            id: 'combination-form',
            type: 'node',
            title: 'form组合',
            img: '../menu/combination-form.svg',
        },
    ];
    newEdge;
    sourceSelect;
    targetSelect;
    diaDisplay: boolean = false;
    constructor(@Inject(CheckDetectChange) private cd: CheckDetectChange) {}
    renderScale() {
        const width = 1920,
            height = 20,
            scaleXgraph = new G6.Graph({
                container: 'scaleX',
                width: 1942,
                height: 22,
                // translate the graph to align the canvas's center, support by v3.5.1
                defaultNode: {
                    type: 'modelRect',
                },
            }),
            scaleYgraph = new G6.Graph({
                container: 'scaleY',
                width: 22,
                height: 1102,
                // translate the graph to align the canvas's center, support by v3.5.1
                defaultNode: {
                    type: 'modelRect',
                },
            });
        scaleXgraph.read(this.scaleXdata);
        scaleYgraph.read(this.scaleYdata);
    }
    changeView(e) {
        if (this.tabView === 'design-view') {
            this.tabView = 'relation-ship';
        } else {
            this.tabView = 'design-view';
        }
        this.cd.detectChanges();
    }
    cancel(e) {
        this.relationshipGraph.removeItem(this.newEdge);
        this.newEdge = null;
    }
    cacheData() {
        console.log(this.relationshipGraph.getEdges());
        let cache = {
            view: {
                nodes: this.graph.getNodes().map((node) => {
                    return {
                        ...node._cfg.model,
                    };
                }),
                combos: this.graph.getCombos().map((combo) => {
                    return {
                        ...combo._cfg.model,
                    };
                }),
            },
            relation: {
                nodes: this.relationshipGraph.getNodes().map((node) => {
                    return {
                        ...node._cfg.model,
                    };
                }),
                combos: this.relationshipGraph.getCombos().map((combo) => {
                    return {
                        ...combo._cfg.model,
                    };
                }),
                edges: this.relationshipGraph.getEdges().map((edge) => {
                    const { id, label, source, target, type } = edge._cfg.model;
                    return {
                        id,
                        label,
                        source,
                        target,
                        type,
                    };
                }),
            },
        };
        localStorage.setItem('graphData', JSON.stringify(cache));
    }
    recoverData() {
        let cache = localStorage.getItem('graphData');
        if (cache) {
            let { view, relation } = JSON.parse(cache);
            this.graph.read(view);
            // 渲染连线图
            this.relationshipGraph.read(relation);
        }
    }
    clearGraph() {
        this.graph.read({});
    }
    exportData() {
        const nodes = this.graph.getNodes(),
            combos = this.graph.getCombos();
        console.log(nodes, combos);
        let topNodes = nodes.filter((node) => !node._cfg.model.comboId);
        let topCombos = combos.filter((combo) => !combo._cfg.model.parentId);
        console.log(topNodes, topCombos);
        // 标记 组件间的劫持关系
        topCombos.forEach((combo) => {
            combo._cfg.model.config.markAsHijack(combo);
        });
        // 输出组件 template， data， js
        const renderConfig = [...topNodes, ...topCombos].map((item) =>
            item._cfg.model.config.render(item)
        );
        window['renderConfig'] = renderConfig;
        console.log(renderConfig);
    }
    exportCombo(combo) {
        let s = '',
            { config } = combo._cfg.model,
            { abstract } = config,
            { html, style } = abstract,
            { nodes, combos } = combo.getChildren();
        s += `<${html.tagName} style="${Object.entries(style)
            .map(([key, value]) => {
                return key + ':' + value;
            })
            .join(';')}">`;
        nodes.forEach((node) => {
            const { config } = node._cfg.model,
                { json, abstract } = config;
            s += config.render(abstract, json);
        });
        combos.forEach((item) => {
            s += this.exportCombo(item);
        });
        s += `</${html.tagName}>`;
        return s;
    }
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
        // bboxCanvasCache储存的是旧的数据，更新后节点的中心点在model中，而且center不变
        let { detail } = e,
            { value } = detail;
        if (this.focusCombo) {
            const { nodes, combos } = this.focusCombo.getChildren(),
                { minX, minY } = this.focusCombo._cfg.bbox,
                elements = nodes.concat(combos);
            if (value.layout == 'row') {
                // 修改combo layout json
                this.focusCombo._cfg.model.config.abstract.style[
                    'flex-direction'
                ] = 'row';
                console.log(this.focusCombo._cfg.model);
                elements.reduce((pre, element) => {
                    const { bboxCanvasCache, model, type } = element._cfg,
                        { x } = model,
                        { width, centerY, minX, minY: minYY } = bboxCanvasCache;
                    if (type == 'combo') {
                        this.updateComboPosition(
                            element,
                            x - minX + pre,
                            minY + centerY - minYY
                        );
                        // 更改comco layout 配置
                        return pre + width;
                    } else {
                        element.updatePosition({
                            x: x - minX + pre,
                            y: minY + centerY - minYY,
                        });
                        return pre + width;
                    }
                }, minX);
            } else {
                // 修改combo layout json
                this.focusCombo._cfg.model.config.abstract.style[
                    'flex-direction'
                ] = 'column';
                elements.reduce((pre: number, element) => {
                    const { bboxCanvasCache, model, type } = element._cfg,
                        { x } = model,
                        {
                            width,
                            height,
                            centerY,
                            minY: minYY,
                            minX: minXX,
                        } = bboxCanvasCache;
                    if (type == 'combo') {
                        this.updateComboPosition(
                            element,
                            minX + x - minXX,
                            pre + centerY - minYY
                        );
                        return pre + height;
                    } else {
                        element.updatePosition({
                            x: minX + x - minXX,
                            y: pre + centerY - minYY,
                        });
                        return pre + height;
                    }
                }, minY);
            }
            this.graph.updateCombos();
        }
    }
    // combo 是自适应子节点的，updatePosition时，无法直接操作，需要更改子node
    updateComboPosition(combo: any, targetX: number, targetY: number) {
        const { bboxCanvasCache, model, type } = combo._cfg,
            { minX, minY } = bboxCanvasCache,
            { x: xx, y: yy } = model,
            { nodes, combos } = combo.getChildren();
        if (!nodes.length && !combos.length) {
            combo.updatePosition({
                x: targetX,
                y: targetY,
            });
            return;
        }
        nodes.concat(combos).forEach((item: any) => {
            const { type, model } = item._cfg,
                { x, y, minX: minXX, minY: minYY } = model;
            if (type == 'node') {
                item.updatePosition({
                    x: targetX + x - xx,
                    y: targetY + y - yy,
                });
            } else if (type == 'combo') {
                this.updateComboPosition(
                    item,
                    targetX + x - xx,
                    targetY + y - yy
                );
            }
        });
    }
    updateNode(e) {
        let target = this.focusCombo ? 'focusCombo' : 'focusNode';
        const model = this[target]._cfg.model,
            config = model.config,
            json = model.config.json;
        let { dom, value } = e.detail,
            { json: newJson } = value;
        Object.assign(json, newJson);
        console.log(config);
        // 节点需要更新 view
        if (this.focusNode) {
            // 更新图
            let relationTarget = this.relationshipGraph.findById(model.id);
            if (this.focusNode) {
                this.graph.updateItem(this.focusNode, {
                    ...this.focusNode._cfg.model,
                    config,
                });
                // 节点更新数据后，config变成一个普通的对象，丢失了class 的 原型链
                this.graph.findById(model.id)._cfg.model.config = config;
            }
            if (relationTarget) {
                this.relationshipGraph.updateItem(relationTarget, {
                    ...relationTarget._cfg.model,
                    config,
                });
                this.relationshipGraph.findById(model.id)._cfg.model.config =
                    config;
            }
            this.graph.updateCombos();
        }
    }
    OnInit() {
        console.log('%cmyComponent: %cOnInit', 'color:green', 'color:blue');
        this.addGlobalEvent();
        this.initBoard();
        this.initRelationShip();
        this.renderScale();
    }
    changeCollapse(e) {
        this.coll = !this.coll;
        this.cd.detectChanges();
    }
    initRelationShip() {
        const snapLine = new G6.SnapLine();
        const width = 1920,
            height = 1080,
            graph = new G6.Graph({
                container: this.relationship,
                width,
                height,
                defaultNode: {
                    type: 'rect',
                    size: [80, 30],
                },
                modes: {
                    default: [
                        'drag-node',
                        { type: 'create-edge', key: 'shift' },
                    ],
                },
                defaultEdge: {
                    type: 'quadratic',
                    style: {
                        stroke: '#F6BD16',
                        lineWidth: 2,
                        endArrow: true,
                    },
                },
                plugins: [snapLine],
            });
        this.relationshipGraph = graph;
        graph.read(this.data);
        this.relationshipGraphAddEvent();
    }
    initBoard() {
        const snapLine = new G6.SnapLine();
        const width = 1920,
            height = 1080,
            graph = new G6.Graph({
                container: 'design-view',
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
                        stroke: '#1085cac9',
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                        shadowColor: '#74b8e196',
                        radius: [2, 2],
                    },
                },
                defaultCombo: {
                    type: 'rect', // Combo 类型
                    size: [40, 30],
                    padding: [8, 8, 8, 8],
                    style: {
                        lineWidth: 1,
                        fill: '#00000000',
                        lineDash: [5],
                    },
                    labelCfg: {
                        refX: 1,
                        refY: 1,
                        style: {
                            // fontWeight: 600,
                            fill: '#e31366',
                            fontSize: 10,
                        },
                    },
                    // ... 其他配置
                },
                plugins: [rightMenu, snapLine],
            });
        this.graph = graph;
        graph.read(this.data);
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
    createEdge(e) {
        this.newEdge.update({
            ...this.newEdge._cfg.model,
            label: `${this.sourceSelect}->${this.targetSelect}`,
        });
        this.diaDisplay = false;
        this.cd.detectChanges();
        console.log(this.diaDisplay);
    }
    relationshipGraphAddEvent() {
        const graph = this.relationshipGraph;
        // 创建边之前
        graph.on('aftercreateedge', (e) => {
            const newEdge = e.edge,
                { sourceNode, targetNode } = newEdge._cfg,
                { output: sourceOutput } =
                    sourceNode._cfg.model.config.abstract.component,
                { output: targetOutput } =
                    targetNode._cfg.model.config.abstract.component,
                edges = graph.save().edges;

            this.sourceList = sourceOutput;
            this.targetList = targetOutput;
            G6.Util.processParallelEdges(edges);
            graph.getEdges().forEach((edge, i) => {
                graph.updateItem(edge, {
                    curveOffset: edges[i].curveOffset,
                    curvePosition: edges[i].curvePosition,
                });
            });
            this.newEdge = newEdge;
            this.diaDisplay = true;
            this.cd.detectChanges();
        });
    }
    graphAddEventListener() {
        const graph = this.graph;
        window['graph'] = graph;
        graph.on('click', (evt) => {
            const { item } = evt;
            this.focusCombo = item;
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
            this.focusCombo = null;
            const { item } = evt,
                json = item._cfg.model.config.json;
            console.log(item);
            this.unFocus(this.focusNode);
            this.focus(item); //focus当前节点
            this.focusNode = item;
            this.config = [json];
            this.cd.detectChanges();
        });
        graph.on('combo:click', (evt) => {
            let { nodes, combos } = evt.item.getChildren();
            this.eventNodes = [];
            [].concat(nodes, combos).map((item) => {
                this.eventNodes.push({ ...item._cfg.model });
            });
            console.log(this.eventNodes);
            // 展示combo  json 数据
            const { item } = evt,
                json = item._cfg.model.config.json;
            this.config = [json];
            this.cd.detectChanges();
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
                graph.removeItem(this.focusCombo);
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
                    const nodeSetting = new configModule[
                            id.toLocaleUpperCase() + '_CONFIG'
                        ](),
                        componentConfig = nodeSetting.abstract.component;
                    let config = {
                        x: targetX,
                        y: targetY,
                        id: String(Math.random()),
                        type: id,
                        config: nodeSetting,
                    };
                    if (targetType === 'combo') {
                        Object.assign(config, {
                            label: id,
                        });
                        that.graph.createCombo({ ...config }, []);
                    } else if (targetType === 'node') {
                        that.graph.addItem('node', {
                            ...config,
                        });
                    }
                    if (componentConfig && componentConfig.output.length) {
                        that.relationshipGraph.addItem('node', {
                            ...config,
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
