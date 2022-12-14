const innerChecedFill = '#1890ff',
    outerChecedFill = '#1890ff',
    innerNoChecedFill = '#00000000',
    outerNoChecedFill = '#564C4C';

G6.registerNode(
    'radio',
    {
        options: {
            style: {
                fill: '#00000000',
            },
        },
        draw: function (cfg, group) {
            const self = this,
                options = cfg.config.json.options;
            // 获取配置中的 Combo 内边距
            cfg.padding = [0, 0, 0, 0];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg),
                width = computedWidth(options);
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            return group.addShape('rect', {
                attrs: {
                    ...style,
                    x: -width / 2,
                    y: -15,
                    width: width + 10,
                    height: style.height,
                    name: 'radio-border',
                },
                draggable: true,
                name: 'radio-border',
            });
        },
        afterDraw(cfg, group) {
            const { config } = cfg,
                { options } = config.json;
            renderRadio(group, config.json, false);
        },
        update(cfg, node) {
            const { json } = cfg.config,
                group = node.get('group'),
                { options } = json;
            renderRadio(group, json, true);
        },
        afterUpdate(cfg, item) {},
    },
    'rect'
);
function renderRadio(group, json, destroy) {
    if (destroy) {
        let willDel = group.findAll(function (item) {
            return item.attr('name') !== 'radio-border';
        });
        willDel.forEach((item) => group.removeChild(item));
    }
    const { options } = json,
        boxWidth = computedWidth(options, group);
    JSON.parse(options).reduce((preWidth, item, index) => {
        group.addShape('text', {
            id: item.value,
            attrs: {
                x: 15 + preWidth,
                y: 2,
                text: item.label,
                fontSize: 14,
                textAlign: 'left',
                textBaseline: 'middle',
                fill: '#000000d9',
            },
            name: item.label + '_label' + Math.random(),
        });
        if (item.checked) {
            group.addShape('circle', {
                attrs: {
                    x: preWidth,
                    y: 0,
                    r: 4,
                    fill: item.checked ? innerChecedFill : outerChecedFill,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: item.label + '_inner-circle' + Math.random(),
            });
        }
        group.addShape('circle', {
            attrs: {
                x: preWidth,
                y: 0,
                r: 7,
                stroke: item.checked ? '#1890ff' : '#d9d9d9',
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: item.label + '_outer-circle' + Math.random(),
        });
        return preWidth + 30 + measureText(item.label);
    }, 5 - 30) + 30;
    const box = group.find(function (item) {
        console.log(item);
        return item.attr('name') === 'radio-border';
    });
    box.attr({
        width: boxWidth,
        height: 30,
    });
}
function computedWidth(optionsString) {
    let width = JSON.parse(optionsString).reduce((preWidth, item, index) => {
        return preWidth + 30 + measureText(item.label);
    }, 0);
    return width;
}
class RADIO_CONFIG extends NODE_CONFIG {
    json = {
        options: JSON.stringify([
            { label: '男', value: '男', checked: true },
            { label: '女', value: '女', checked: false },
        ]),
        model: 'sex',
    };
    abstract = {
        html: {
            tagName: 'input',
            attributes: {
                type: 'radio',
            },
        },
        classes: '',
        style: {},
        component: {
            input: ['options'],
            output: ['change'],
        },
    };
    renderConfig = {
        abductees: [],
        config: null,
    };
    status = {
        hijack: false,
    };
    render(node) {
        if (this.renderConfig.config) {
            return this.renderConfig.config;
        }
        const base = node._cfg.model.config,
            { html, classes, style } = this.abstract,
            json = this.json,
            options = JSON.parse(json.options),
            name = Math.random();
        let config = {
            html: `${options
                .map((item) => {
                    return `<input type='radio' 
                                       id="${item.value}" 
                                       ${item.checked ? 'checked' : ''}
                                       name="${name}" 
                                       value="${item.value}"> 
                            <label for="${item.value}">${item.label}</label>
                            `;
                })
                .join('\n')}`,
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
        this.renderConfig.config = config;
        return config;
    }
}
configModule['RADIO_CONFIG'] = RADIO_CONFIG;
