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
            const { config } = cfg;
            group.addShape('text', {
                id: 'text',
                attrs: {
                    text: config.text,
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
            const { config } = cfg,
                group = item.getContainer();
            let text = group.findById('text');
            text.attr('text', config.text);
        },
    },
    'rect'
);
var TEXT_CONFIG = {
    text: '...',
};
