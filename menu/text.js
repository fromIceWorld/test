// 计算节点新的X节点
function computedX(x, previousLength, currentLength) {
    let diff = currentLength - previousLength;
    console.log(x, diff);
    return x;
}
let rectText;
G6.registerNode(
    'text',
    {
        options: {
            myName: 'text',
            size: [200, 30],
            style: {
                fill: '#00000000',
            },
        },
        draw(cfg, group) {
            const self = this,
                text = cfg.json.text;
            // 获取配置中的 Combo 内边距
            cfg.padding = [5, 5, 5, 5];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg),
                width = measureText(text, '14px');
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            rectText = group.addShape('rect', {
                attrs: {
                    ...style,
                    width: width + 10,
                    x: -(width + 10) / 2,
                    height: style.height,
                },
                draggable: true,
                name: 'text-border',
            });
            return rectText;
        },
        afterDraw(cfg, group) {
            const { json } = cfg,
                { text } = json,
                width = measureText(text, '14px');
            group.addShape('text', {
                id: 'text',
                attrs: {
                    text: text,
                    x: -(width + 10) / 2 + 5,
                    y: 2,
                    fontSize: 14,
                    textAlign: 'start',
                    textBaseline: 'middle',
                    fill: '#000000d9',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'text-shape',
            });
        },
        update(cfg, node) {
            const { text } = cfg.json,
                textLength = measureText(text, '14px'),
                group = node.getContainer();
            let textShape = group.findById('text');
            textShape.attr('text', text);
            rectText.attr({
                width: textLength + 10,
            });
        },
        afterUpdate(cfg, item) {
            // const { json } = cfg,
            //     { text } = json,
            //     group = item.getContainer();
            // let textShape = group.findById('text');
            // textShape.attr('text', text);
        },
    },
    'rect'
);
var TEXT_CONFIG = {
    json: {
        text: '姓名',
    },
};
