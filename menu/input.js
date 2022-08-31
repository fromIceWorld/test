G6.registerNode(
    'input',
    {
        options: {
            myName: 'Input',
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
                    text: config.placeholder,
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
            group.addShape('rect', {
                attrs: {
                    x: -100,
                    y: -15,
                    width: 200,
                    height: 30,
                    stroke: '#d9d9d9',
                    radius: [2, 4],
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'rect-shape',
            });
        },
    },
    'rect'
);
var INPUT_CONFIG = {
    placeholder: '请输入',
};
