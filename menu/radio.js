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
        drawShape: function drawShape(cfg, group) {
            const self = this;
            // 获取配置中的 Combo 内边距
            cfg.padding = [5, 5, 5, 5];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg);
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            rect = group.addShape('rect', {
                attrs: {
                    ...style,
                    x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                    y:
                        -style.height / 2 -
                        (cfg.padding[0] - cfg.padding[2]) / 2,
                    width: style.width,
                    height: style.height,
                },
                draggable: true,
                name: 'radio-border',
            });
            return rect;
        },
        afterDraw(cfg, group) {
            console.log(cfg, group);
            const { json } = cfg,
                { options } = json;
            renderRadio(group, json, false);
            preOptions = options;
        },
        update(cfg, node) {
            const { json } = cfg,
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
        // group.clear();
        shapes.forEach((shapoe) => {
            group.removeChild(shapoe);
        });
        shapes = [];
    }
    const { options } = json;
    let result = JSON.parse(options).reduce((preWidth, item, index) => {
        let text = group.addShape('text', {
            id: item.value,
            attrs: {
                x: 15 + preWidth,
                y: 12,
                text: item.label,
                fontSize: 14,
                textAlign: 'left',
                textBaseline: 'middle',
                fill: '#000000d9',
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: item.label + '_label',
        });
        if (item.checked) {
            let circleInner = group.addShape('circle', {
                attrs: {
                    x: preWidth,
                    y: 10,
                    r: 4,
                    fill: item.checked ? innerChecedFill : outerChecedFill,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: item.label + '_inner-circle',
            });
            shapes.push(circleInner);
        }
        let circleOuter = group.addShape('circle', {
            attrs: {
                x: preWidth,
                y: 10,
                r: 7,
                stroke: item.checked ? '#1890ff' : '#d9d9d9',
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: item.label + '_outer-circle',
        });
        shapes.push(text, circleOuter);
        return preWidth + 30 + measureText(item.label);
    }, 5);
    console.log(width, height, result);
    rect.attr({
        width: result,
        height: 40,
    });
}
var RADIO_CONFIG = {
    json: {
        options: JSON.stringify([
            { label: 'A', value: 'A', checked: true },
            { label: 'B', value: 'B' },
        ]),
    },
    getWidth(optionsString) {
        let options = JSON.parse(optionsString),
            textString = options.map((option) => option.label).join('');
        let textWidth = measureText(textString);
        return [textWidth + options.length * 20, 40];
    },
};
