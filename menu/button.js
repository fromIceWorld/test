let rectButton;
G6.registerNode(
    'button',
    {
        options: {
            myName: 'text',
            size: [200, 30],
            style: {
                fill: '#1085cac9',
                radius: [3, 3],
            },
        },
        draw(cfg, group) {
            const self = this,
                text = cfg.config.json.name;
            // 获取配置中的 Combo 内边距
            cfg.padding = [5, 5, 5, 5];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg),
                width = measureText(text, '14px');
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            return group.addShape('rect', {
                attrs: {
                    ...style,
                    width: width + 30,
                    x: -(width + 30) / 2,
                    height: style.height,
                },
                draggable: true,
                name: 'text-border',
            });
        },
        afterDraw(cfg, group) {
            const { config } = cfg,
                { name } = config.json;
            width = measureText(name, '14px');
            group.addShape('text', {
                id: 'text',
                attrs: {
                    text: name,
                    x: -(width + 30) / 2 + 15,
                    y: 2,
                    fontSize: 14,
                    textAlign: 'start',
                    textBaseline: 'middle',
                    fill: '#ffffff',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'text-shape',
            });
        },
        update(cfg, node) {
            const { name } = cfg.config.json,
                textLength = measureText(name, '14px'),
                group = node.getContainer();
            let textShape, box;
            group.find((item) => {
                if (item.get('name') === 'text-shape') {
                    textShape = item;
                }
                if (item.get('name') === 'text-border') {
                    box = item;
                }
            });
            textShape.attr('text', name);
            box.attr({
                width: textLength + 30,
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

// 独属于每一个节点的render函数，在G6中会被抹除，通过原型保存
class BUTTON_CONFIG {
    json = {
        name: '姓名',
    };
    abstract = {
        html: {
            tagName: 'input',
            attributes: {},
        },
        classes: '',
        style: {},
        component: {
            input: [],
            output: ['click'],
        },
    };
    render(abstract, json) {
        const { html, classes, style, event } = abstract;
        return `<${html.tagName} type="button" value="${json.name}"></${html.tagName}>`;
    }
}
configModule['BUTTON_CONFIG'] = BUTTON_CONFIG;
