function transform(str) {
    while (str.length < 4) {
        str += ' ';
    }
    return str;
}
G6.registerNode(
    'scaleY',
    {
        options: {
            myName: 'text',
            size: [200, 15],
            style: {
                fill: '#000000d9',
            },
        },
        draw(cfg, group) {
            group.addShape('rect', {
                attrs: {
                    width: 24,
                    fill: 'black',
                    height: 1080,
                },
                draggable: true,
                name: 'text-border',
            });
            for (let i = 0; i < 1920; i++) {
                if (i % 10 === 0) {
                    group.addShape('text', {
                        attrs: {
                            text: '—',
                            y: i + 22,
                            x: 12,
                            fontSize: 10,
                            textAlign: 'left',
                            textBaseline: 'middle',
                            fill: '#8f9cb8',
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any value you want
                        name: 'scale-shape',
                    });
                }

                if (i % 100 === 0) {
                    group.addShape('text', {
                        attrs: {
                            text: i % 20 === 0 ? '—' : '',
                            y: i + 22,
                            x: 2,
                            fontSize: 10,
                            textAlign: 'left',
                            textBaseline: 'middle',
                            fill: '#8f9cb8',
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any value you want
                        name: 'scale-shape',
                    });
                    let num = group.addShape('text', {
                        attrs: {
                            text: transform(String(i)),
                            y: 2,
                            x: 0,
                            fontSize: 10,
                            textAlign: 'left',
                            textBaseline: 'middle',
                            fill: 'white',
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any value you want
                    });
                    G6.Util.rotate(num, -Math.PI / 2.01);
                    G6.Util.move(num, {
                        x: 0,
                        y: i - 4,
                    });
                }
            }
            // G6.Util.rotate(group, Math.PI / 2.1);
            return group;
        },
        setState() {},
    },
    'rect'
);