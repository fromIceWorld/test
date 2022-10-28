class FORM_CONFIG extends COMBINATION_CONFIG {
    json = { formData: 'fg' };
    abstract = {
        html: {
            tagName: 'div',
            attributes: {},
        },
        classes: '',
        style: {
            display: 'flex',
            'flex-direction': 'row',
        },
        component: {
            input: ['value'],
            output: ['submit', 'reset'],
        },
    };
    renderConfig = {
        abductees: [],
        config: null,
    };
    /**
     * 劫持 node/combo实例，内部携带层级关系
     *
     * @param {*} combo
     * @returns
     */
    markAsHijack(combo) {
        const { nodes, combos } = this.getNextChildren(combo);
        let q = [...nodes, ...combos];
        while (q.length) {
            const sub = q.shift();
            // node
            if (sub instanceof NODE_CONFIG) {
                let { abstract, status } = sub;
                const { html } = abstract,
                    { tagName } = html;
                if (!status.hijack && tagName === 'input') {
                    // 记录 劫持的node
                    status.hijack = combo._cfg.model.config;
                    this.renderConfig.abductees.push(sub._cfg.model.config);
                } else if (sub instanceof COMBINATION_CONFIG) {
                    // 向下查找可劫持组件
                    const { nodes: nextNodes, combos: nextCombos } =
                        this.getNextChildren(sub);
                    q.push(...nextNodes, ...nextCombos);
                }
            }
        }
    }

    // 返回combo节点渲染data
    render(combo) {
        if (this.renderConfig.config) {
            return this.renderConfig.config;
        }
        let config = {
            html: `<div>`,
            data: {},
            hooks: {
                fns: [],
                OnInit: [],
                OnInputChanges: [],
                OnViewInit: [],
                OnViewUpdated: [],
                OnUpdated: [],
                OnViewUpdated: [],
            },
        };
        const { nodes: nextNodes, combos: nextCombos } =
            this.getNextChildren(combo);
        let childConfig = [...nextNodes, ...nextCombos].map((next) =>
            next._cfg.model.config.render(next)
        );
        childConfig.forEach((child) => {
            const { html, data, hooks } = child;
            config.html += html;
        });
        config.html += `</div>`;
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
