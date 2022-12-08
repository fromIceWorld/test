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
                { attributes } = config.json,
                { placeholder } = attributes;
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
                { attributes, properties } = json,
                { placeholder } = attributes,
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
class INPUT_CONFIG extends NODE_CONFIG {
    static index = 0;
    index;
    tagName;
    constructor() {
        super();
        this.tagName = `my-input-${INPUT_CONFIG.index}`;
        this.index = INPUT_CONFIG.index;
        INPUT_CONFIG.index++;
    }
    json = {
        attributes: {
            placeholder: '请输入姓名',
            formcontrol: 'name',
        },
        properties: {
            value: '',
            updateOn: 'change',
            regexp: '^[1-9]{1,10}$',
        },
    };
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
            event: ['validate', 'change', 'clear', 'blur'],
            methods: [],
        },
    };
    // 返回node节点渲染data，和 base config
    render() {
        const index = this.index,
            tagName = this.tagName,
            { attributes, properties } = this.json,
            { placeholder, formcontrol } = attributes,
            { value, updateOn, regexp } = properties;
        let config = {
            html: `<input 
                        is=${tagName}"
                        type="text"
                        placeholder="${placeholder}"
                        formcontrol="${formcontrol}"
                   ></input>`,
            js: `class MyInput${index} extends MyInput{
                constructor(){
                    super();
                    this.value = '${value}';
                    this.regexp = '${regexp}';
                    this.updateOn = '${updateOn}';
                }
            };
            customElements.define('${tagName}',MyInput${this.index},{ extends: 'input' })
            `,
        };
        return config;
    }
}
configModule['INPUT_CONFIG'] = INPUT_CONFIG;
