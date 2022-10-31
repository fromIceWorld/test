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
    status = {
        hijack: false,
    };
    /**
     * 劫持 node/combo实例，内部携带层级关系
     *
     * @param {*} combo
     * @returns
     */
    markAsHijack(combo) {
        if (this.renderConfig.abductees.length) {
            return;
        }
        const { nodes, combos } = this.getNextChildren(combo);
        let q = [...nodes, ...combos];
        while (q.length) {
            const sub = q.shift();
            // node
            if (sub._cfg.type === 'node') {
                let { abstract, status } = sub._cfg.model.config;
                const { html } = abstract,
                    { tagName, attributes } = html;
                if (
                    !status.hijack &&
                    tagName === 'input' &&
                    attributes.type === 'text'
                ) {
                    // 记录 劫持的node
                    status.hijack = true;
                    this.renderConfig.abductees.push(sub._cfg.model.config);
                }
            } else if (sub._cfg.type === 'combo') {
                // 向下查找可劫持组件
                const { nodes: nextNodes, combos: nextCombos } =
                    this.getNextChildren(sub);
                q.push(...nextNodes, ...nextCombos);
            }
        }
    }
    // 返回combo节点渲染data
    render(combo) {
        if (this.renderConfig.config) {
            return this.renderConfig.config;
        }
        const formGroup = {},
            { json, abstract } = combo._cfg.model.config,
            { formData } = json;
        // 处理 劫持的 node
        this.renderConfig.abductees.forEach((config) => {
            const {
                    json: childJson,
                    abstract: childAbstract,
                    renderConfig,
                } = config,
                { html, classes, style } = childAbstract,
                { tagName, attributes } = html;
            let htmlString = ``;
            // 劫持 text 输入框
            if (attributes.type === 'text') {
                htmlString += `<${tagName} class="${classes}" placeholder='${childJson.placeholder}'`;
                for (let [key, value] of Object.entries(style)) {
                    htmlString += ` ${key}="${value}"`;
                }
                for (let [key, value] of Object.entries(attributes)) {
                    htmlString += ` ${key}="${value}"`;
                }
                // 添加劫持后的数据
                if (childJson.model) {
                    const model = childJson.model;
                    htmlString += ` [formcontrol]="${model}"`;
                    formGroup[model] = {
                        regexp: '',
                    };
                }
                // 闭合
                htmlString += `></input>`;
            } else if (attributes.type === 'radio') {
                const { options } = childJson;
                htmlString = `${JSON.parse(options)
                    .map((item) => {
                        return `<input type='radio' 
                                           id="${item.value}" 
                                           ${item.checked ? 'checked' : ''}
                                           name="first" 
                                           value="${item.value}"></input> 
                                <label for="${item.value}">${item.label}</label>
                                `;
                    })
                    .join('')}`;
            }
            renderConfig.config = {
                html: htmlString,
                data: {},
                hooks: {},
            };
        });
        let config = {
            html: `<div>`,
            data: {
                [formData]: formGroup,
            },
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
