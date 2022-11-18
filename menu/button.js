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
                { attributes, properties } = cfg.config.json,
                { name } = attributes;
            // 获取配置中的 Combo 内边距
            cfg.padding = [5, 5, 5, 5];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg),
                width = measureText(name, '14px');
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
            const { attributes, properties } = cfg.config.json,
                { name } = attributes;
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
            const { attributes, properties } = cfg.config.json,
                { name } = attributes,
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
class BUTTON_CONFIG extends NODE_CONFIG {
    json = {
        attributes: {
            name: '确定',
        },
        properties: {},
    };
    abstract = {
        html: {
            tagName: 'input',
            attributes: {
                type: 'button',
            },
        },
        classes: '',
        style: {},
        component: {
            input: [],
            output: ['click'],
        },
    };
    render() {
        const { attributes, properties } = this.json,
            { name } = attributes;
        let config = {
            html: `<input type="button" value="${name}"></input>`,
            js: ``,
        };
        return config;
    }
}
configModule['BUTTON_CONFIG'] = BUTTON_CONFIG;
