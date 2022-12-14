import { CheckDetectChange, Component, Inject, Input, ViewChild } from 'mark5';
@Component({
    selector: `app-diagram`,
    template: `
        <!-- 页面图 -->
        <div
            id="relationship"
            #relationship
            style="width: 1920px; height: 1080px;border:1px solid #615b5b49"
        ></div>
        <!-- 连线图 -->
        <div id=""></div>
        <!-- 连线弹窗 事件 -->
        <f-dialog
            style="width:400px"
            title="对话框"
            &display="diaDisplay"
            @OnCancel="cancel($event)"
        >
            <div>
                <span class="label">input:</span>
                <f-select %="inputSelect">
                    <f-option *forOf="config.inputOptions" &value="item">
                        {{ item }}
                    </f-option>
                </f-select>
            </div>
            <div>
                <span class="label">output:</span>
                <f-select %="outputSelect">
                    <f-option *forOf="config.outputOptions" &value="item">
                        {{ item }}
                    </f-option>
                </f-select>
            </div>
            <f-button @click="createEdge($event)">确认</f-button>
        </f-dialog>
    `,
    styles: `
     .label{
        display: inline-block;
        font-size: 16px;
        width: 62px
     }`,
})
export class Diagram {
    @Input('eventNodes')
    eventNodes = [];
    @ViewChild('relationship')
    ship;
    graph;
    focusEdge;
    focusNode;
    inputSelect = '';
    outputSelect = '';
    config = {
        inputOptions: [],
        outputOptions: [],
    };
    diaDisplay: boolean = false;
    newEdge;
    data = {};
    constructor(@Inject(CheckDetectChange) private cd: CheckDetectChange) {}
    OnInit() {
        this.initChart();
    }
    OnInputChanges(e) {
        let eventNodes = e.get('eventNodes'),
            { currentValue, value } = eventNodes;
        if (value !== currentValue) {
            this.graph.data({
                nodes: [...value],
            });
            this.graph.render();
        }
        console.log(e);
    }
    initChart() {
        const width = this.ship.scrollWidth,
            height = this.ship.scrollHeight || 500,
            graph = (this.graph = new G6.Graph({
                container: 'relationship',
                width,
                height,
                linkCenter: true,
                modes: {
                    default: [
                        { type: 'create-edge', key: 'shift' },
                        'drag-node',
                    ],
                },
                defaultEdge: {
                    type: 'quadratic',
                    style: {
                        stroke: '#F6BD16',
                        lineWidth: 2,
                    },
                },
            }));
        this.addEvent();
        graph.data(this.data);
        graph.render();
    }
    createEdge(e) {
        this.newEdge.update({
            ...this.newEdge._cfg.model,
            label: this.inputSelect,
        });
        this.diaDisplay = false;
        this.cd.detectChanges();
        console.log(this.diaDisplay);
    }
    cancel(e) {
        this.graph.removeItem(this.newEdge);
        this.newEdge = null;
    }
    addEvent() {
        const graph = this.graph;
        graph.on('edge:click', (evt) => {
            this.focusEdge = evt.item;
            // 一些操作
        });
        graph.on('node:click', (evt) => {
            this.focusNode = evt.item;
            const { component = {} } = evt.item._cfg.model.config,
                { input: inputOptions = [], output: outputOptions = [] } =
                    component;
            this.config = {
                inputOptions,
                outputOptions,
            };
            // 一些操作
        });
        graph.on('keydown', (evt: any) => {
            const { item, keyCode } = evt;
            if (keyCode === 46) {
                //delete
                graph.removeItem(this.focusEdge);
                this.focusEdge = null;
            }
        });
        // 创建边之前
        graph.on('aftercreateedge', (e) => {
            const newEdge = e.edge,
                edges = graph.save().edges;
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
}
