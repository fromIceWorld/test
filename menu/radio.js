const innerChecedFill = '#1890ff',
    outerChecedFill = '#1890ff',
    innerNoChecedFill = '#00000000',
    outerNoChecedFill = '#564C4C';
let preOptions,
    shapes = [],
    bb,
    rect;

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
            rect = group.addShape('rect', {
                attrs: {
                    ...style,
                    x: -width / 2,
                    y: -15,
                    width: width + 10,
                    height: style.height,
                },
                draggable: true,
                name: 'radio-border',
            });
            return rect;
        },
        afterDraw(cfg, group) {
            const { config } = cfg,
                { options } = config.json;
            renderRadio(group, config.json, false);
            preOptions = options;
        },
        update(cfg, node) {
            const { json } = cfg.config,
                group = node.get('group'),
                { options } = json;
            renderRadio(group, json, true);
            preOptions = options;
        },
        afterUpdate(cfg, item) {},
    },
    'rect'
);
function renderRadio(group, json, destroy) {
    if (destroy) {
        shapes.forEach((shapoe) => {
            group.removeChild(shapoe);
        });
        shapes = [];
    }
    const { options } = json,
        boxWidth = computedWidth(options, group);
    let width =
        JSON.parse(options).reduce((preWidth, item, index) => {
            let text = group.addShape('text', {
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
                let circleInner = group.addShape('circle', {
                    attrs: {
                        x: preWidth,
                        y: 0,
                        r: 4,
                        fill: item.checked ? innerChecedFill : outerChecedFill,
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any value you want
                    name: item.label + '_inner-circle' + Math.random(),
                });
                shapes.push(circleInner);
            }
            let circleOuter = group.addShape('circle', {
                attrs: {
                    x: preWidth,
                    y: 0,
                    r: 7,
                    stroke: item.checked ? '#1890ff' : '#d9d9d9',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: item.label + '_outer-circle' + Math.random(),
            });
            shapes.push(text, circleOuter);
            return preWidth + 30 + measureText(item.label);
        }, 5 - 30) + 30;
    rect.attr({
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
class RADIO_CONFIG {
    json = {
        options: JSON.stringify([
            { label: 'A', value: 'A', checked: true },
            { label: 'B', value: 'B', checked: false },
        ]),
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
    };
    render(abstract, json) {
        const { html, classes, style } = abstract,
            options = JSON.parse(json.options),
            name = Math.random();
        return `${options
            .map((item) => {
                return `<input type = 'radio' 
                               id = "${item.value}" 
                               ${item.checked ? 'checked' : ''}
                               name="${name}" 
                               value = "${item.value}"/> 
                    <label for="${item.value}">${item.value}</label>`;
            })
            .join('\n')}`;
    }
}
configModule['RADIO_CONFIG'] = RADIO_CONFIG;
