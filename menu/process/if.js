class IF_CONFIG extends COMBINATION_CONFIG {
    static index = 0;
    index;
    tagName;
    constructor() {
        super();
        this.tagName = `my-if-${IF_CONFIG.index}`;
        this.index = IF_CONFIG.index;
        IF_CONFIG.index++;
    }
    json = {};
    abstract = {
        html: {
            tagName: 'my-if',
            attributes: {},
        },
        classes: '',
        style: {
            display: 'flex',
        },
        component: {
            event: [],
            methods: ['setBoolean'],
        },
    };
    render(combo) {
        let flexDirection = this.abstract.style['flex-direction'],
            config = {
                html: `<${this.tagName} style="display:flex;${
                    flexDirection
                        ? flexDirection === 'row'
                            ? 'flex-direction:row'
                            : 'flex-direction:column'
                        : ''
                }">`,
                js: `class MyIf${this.index} extends MyIf{
                constructor(){
                    super();
                }
            }
            customElements.define('my-if-${this.index}', MyIf${this.index})
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
        config.html += `</${this.tagName}>`;
        return config;
    }
}
configModule['IF_CONFIG'] = IF_CONFIG;

G6.registerCombo(
    'if',
    {
        options: {
            style: {
                lineWidth: 1,
                fill: '#00000000',
                stroke: '#bfb9b9b3',
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
