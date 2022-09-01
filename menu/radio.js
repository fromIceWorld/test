const innerChecedFill = '#1890ff',
    outerChecedFill = '#1890ff',
    innerNoChecedFill = '#00000000',
    outerNoChecedFill = '#564C4C';

G6.registerNode(
    'radio',
    {
        options: {
            myName: 'Input',
            size: [60, 40],
            style: {
                fill: '#00000000',
            },
        },
        afterDraw(cfg, group) {
            const { config } = cfg;
            group.addShape('text', {
                attrs: {
                    x: 2,
                    y: 2,
                    text: config.label,
                    fontSize: 14,
                    textAlign: 'left',
                    textBaseline: 'middle',
                    fill: '#000000d9',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'text-shape',
            });
            group.addShape('circle', {
                attrs: {
                    x: -10,
                    y: 0,
                    r: 4,
                    fill: config.checked ? innerChecedFill : outerChecedFill,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'circle-shape',
            });
            group.addShape('circle', {
                attrs: {
                    x: -10,
                    y: 0,
                    r: 7,
                    stroke: '#1890ff',
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'circle-out',
            });
        },
    },
    'rect'
);
var RADIO_CONFIG = {
    label: 'A',
    options: [],
    checked: true,
};
