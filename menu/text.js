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
            console.log(cfg);
            group.addShape('text', {
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
    },
    'rect'
);
var TEXT_CONFIG = {
    text: '...',
};
