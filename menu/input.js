G6.registerNode(
    'input',
    {
        options: {
            myName: 'Input',
            size: [202, 32],
            style: {
                fill: '#00000000',
            },
        },
        afterDraw(cfg, group) {
            const { config } = cfg,
                { placeholder } = config.json;
            cfg.padding = [0, 0, 0, 0];
            group.addShape('text', {
                id: 'text',
                attrs: {
                    text: placeholder,
                    x: -95,
                    y: 1,
                    fontSize: 14,
                    textAlign: 'left',
                    textBaseline: 'middle',
                    fill: '#000000d9',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'text-shape',
            });
            group.addShape('rect', {
                attrs: {
                    x: -100,
                    y: -15,
                    width: 200,
                    height: 30,
                    stroke: '#d9d9d9',
                    radius: [2, 2],
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'rect-shape',
            });
        },
        update(cfg, node) {
            console.log('input update', cfg);
            const { json } = cfg.config,
                { placeholder } = json,
                group = node.getContainer();
            let textShape = group.findById('text');
            textShape.attr('text', placeholder);
        },
        afterUpdate(cfg, item) {
            // const { config } = cfg,
            //     group = item.getContainer();
            // let text = group.findById('text');
            // text.attr('text', config.placeholder);
        },
    },
    'rect'
);
class INPUT_CONFIG {
    json = { placeholder: '请输入', model: '' };
    abstract = {
        html: {
            tagName: 'input',
            attributes: {
                type: 'text',
            },
        },
        classes: '',
        style: {},
        component: {
            input: ['value'],
            output: ['change', 'blur'],
        },
    };
    render(node) {
        const { html, classes, style } = this.abstract,
            { tagName, attributes } = html,
            json = this.json;
        let data = {
            html: `<${tagName} 
                        type="${attributes.type}"
                        placeholder="${json.placeholder}"
                        ${json.model ? '%="' + json.model + '"' : ''}
                   ></${tagName}>`,
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
        return data;
    }
}
configModule['INPUT_CONFIG'] = INPUT_CONFIG;
