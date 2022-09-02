G6.registerNode(
    'text',
    {
        options: {
            myName: 'text',
            size: [210, 40],
            style: {
                fill: '#00000000',
            },
        },
        afterDraw(cfg, group) {
            const { json } = cfg,
                { text } = json;
            group.addShape('text', {
                id: 'text',
                attrs: {
                    text: text,
                    x: -95,
                    y: 2,
                    fontSize: 14,
                    textAlign: 'left',
                    textBaseline: 'middle',
                    fill: '#000000d9',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'text-shape',
            });
        },
        afterUpdate(cfg, item) {
            const { json } = cfg,
                { text } = json,
                group = item.getContainer();
            let textShape = group.findById('text');
            textShape.attr('text', text);
        },
    },
    'rect'
);
var TEXT_CONFIG = {
    json: {
        text: '...',
    },
    getWidth() {
        return {
            x: 100,
            y: 100,
        };
    },
};
