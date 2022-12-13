class FormGroup {
    constructor(controls) {
        for (let [key, config] of Object.entries(controls)) {
            this[key] = config;
            config['group'] = this;
        }
    }
    get(key) {
        const { value } = this[key];
        return value;
    }
    subs = [];
    subscribe(fn) {
        this.subs.push(fn);
    }
    change(key, value) {
        console.log(key, value);
        this.subs.forEach((fn) => {
            this[key].value = value;
            let valid = new RegExp(this[key].regexp).test(value);
            fn(key, value, valid);
        });
    }
}
class FORM_CONFIG extends COMBINATION_CONFIG {
    static index = 0;
    index;
    tagName;
    constructor() {
        super();
        this.tagName = `my-form-${FORM_CONFIG.index}`;
        this.index = FORM_CONFIG.index;
        FORM_CONFIG.index++;
    }
    json = {
        attributes: {
            formgroup: 'fg',
        },
        properties: {
            api: '/test/list',
        },
    };
    abstract = {
        html: {
            tagName: 'form',
            attributes: {},
        },
        classes: '',
        style: {
            display: 'flex',
        },
        component: {
            event: [
                {
                    label: 'submit',
                    value: 'submit',
                    children: [
                        { label: '200', value: '200' },
                        { label: '500', value: '500' },
                    ],
                },
                {
                    label: 'reset',
                    value: 'reset',
                    children: [],
                },
            ],
            methods: [
                {
                    label: 'submit',
                    value: 'submit',
                    children: [
                        { label: '200', value: '200' },
                        { label: '500', value: '500' },
                    ],
                },
                {
                    label: 'reset',
                    value: 'reset',
                    children: [],
                },
            ],
        },
    };
    // 返回combo节点渲染data
    render(combo) {
        const { attributes, properties } = this.json,
            tagName = this.tagName,
            { formgroup } = attributes,
            flexDirection = this.abstract.style['flex-direction'],
            { api } = properties;
        let config = {
            html: `<${tagName} formgroup="${formgroup}" style="display:flex;${
                flexDirection
                    ? flexDirection === 'row'
                        ? 'flex-direction:row'
                        : 'flex-direction:column'
                    : ''
            }">`,
            js: `class MyForm${this.index} extends MyForm{
                    constructor(){
                        super();
                        this.api = '${api}'
                    }
                 }
                 customElements.define('${tagName}',MyForm${this.index})
                 `,
        };
        const { nodes: nextNodes, combos: nextCombos } =
            this.getNextChildren(combo);
        let childConfig = [...nextNodes, ...nextCombos].map((next) =>
            next._cfg.model.config.render(next)
        );
        childConfig.forEach((child) => {
            const { html, js } = child;
            config.html += html;
            config.js += js;
        });
        config.html += `</${tagName}>`;
        return config;
    }
}
configModule['FORM_CONFIG'] = FORM_CONFIG;
G6.registerCombo(
    'form',
    {
        options: {
            style: {
                lineWidth: 1,
                fill: '#00000000',
                stroke: '#efefef',
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
        },
        drawShape: function drawShape(cfg, group) {
            const self = this;
            // 获取配置中的 Combo 内边距
            cfg.padding = [10, 10, 10, 10];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg);
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            const rect = group.addShape('rect', {
                attrs: {
                    ...style,
                    x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                    y:
                        -style.height / 2 -
                        (cfg.padding[0] - cfg.padding[2]) / 2,
                    // width: style.width,
                    // height: style.height,
                    width: 60,
                    height: 50,
                },
                draggable: true,
                name: 'combo-keyShape',
            });
            return rect;
        },
        // 定义新增的右侧圆的位置更新逻辑
        afterUpdate: function afterUpdate(cfg, combo) {
            const group = combo.get('group');
        },
    },
    'rect'
);
