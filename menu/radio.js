const innerChecedFill = '#1890ff',
    outerChecedFill = '#1890ff',
    innerNoChecedFill = '#00000000',
    outerNoChecedFill = '#564C4C';
let preOptions;

G6.registerNode(
    'radio',
    {
        options: {
            myName: 'Input',
            size: [120, 40],
            style: {
                fill: '#00000000',
            },
        },
        afterDraw(cfg, group) {
            console.log(cfg, group);
            const { json, getWidth } = cfg,
                { options } = json;
            renderRadio(group, json, getWidth);
            preOptions = options;
        },
        afterUpdate(cfg, item) {},
    },
    'rect'
);
function renderRadio(group, json, getWidth) {
    const { options } = json,
        [width, height] = getWidth();
    JSON.parse(options).reduce((preWidth, item, index) => {
        group.addShape('text', {
            id: item.value,
            attrs: {
                x: 30 + index * 30 + preWidth - width / 2,
                y: 2,
                text: item.label,
                fontSize: 14,
                textAlign: 'left',
                textBaseline: 'middle',
                fill: '#000000d9',
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: item.label,
        });
        if (item.checked) {
            group.addShape('circle', {
                attrs: {
                    x: 15 + index * 30 + preWidth - width / 2,
                    y: 0,
                    r: 4,
                    fill: item.checked ? innerChecedFill : outerChecedFill,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: item.label + 'inner-circle',
            });
        }
        group.addShape('circle', {
            attrs: {
                x: 15 + index * 30 + preWidth - width / 2,
                y: 0,
                r: 7,
                stroke: item.checked ? '#1890ff' : '#d9d9d9',
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: item.label + 'outer-circle',
        });
        return preWidth + measureText(item.label);
    }, 0);
}
var RADIO_CONFIG = {
    json: {
        options: JSON.stringify([
            { label: 'A', value: 'A', checked: true },
            { label: 'B', value: 'B' },
        ]),
    },
    getWidth() {
        let options = JSON.parse(RADIO_CONFIG.json.options),
            textString = options.map((option) => option.label).join('');
        let width = measureText(textString);

        return [width + options.length * 20 + 20, 40];
    },
};
