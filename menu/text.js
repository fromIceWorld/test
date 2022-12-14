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
                text = cfg.config.json.text;
            // 获取配置中的 Combo 内边距
            cfg.padding = [5, 5, 5, 5];
            // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
            const style = self.getShapeStyle(cfg),
                width = measureText(text, '14px');
            // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
            return group.addShape('rect', {
                attrs: {
                    ...style,
                    width: width + 10,
                    x: -(width + 10) / 2,
                    height: style.height,
                },
                draggable: true,
                name: 'text-border',
            });
        },
        afterDraw(cfg, group) {
            const { config } = cfg,
                { text } = config.json;
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
            const { text } = cfg.config.json,
                textLength = measureText(text, '14px'),
                group = node.get('group');
            let textShape, box;
            group.find((item) => {
                if (item.get('name') === 'text-shape') {
                    textShape = item;
                }
                if (item.get('name') === 'text-border') {
                    box = item;
                }
            });
            textShape.attr('text', text);
            box.attr({
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

// 独属于每一个节点的render函数，在G6中会被抹除，通过原型保存
class TEXT_CONFIG extends NODE_CONFIG {
    json = {
        text: '姓名',
        model: '',
    };
    abstract = {
        html: {
            tagName: 'span',
            attributes: {},
        },
        classes: '',
        style: {},
        component: {
            input: [],
            output: [],
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
            json = this.json;
        let config = {
            html: `<${html.tagName}>${json.text}</${html.tagName}>`,
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
        return config;
    }
}
configModule['TEXT_CONFIG'] = TEXT_CONFIG;
