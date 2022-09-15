var rightMenu = new G6.Menu({
    offsetX: 6,
    offsetX: 10,
    itemTypes: ['node', 'combo'],
    getContent(e) {
        const outDiv = document.createElement('div');
        outDiv.style.width = '180px';

        const { type } = e.item._cfg;
        if (type == 'combo') {
            outDiv.innerHTML = `<ul>
                <p id="合并">合并</p>
                <p id="取消合并">取消合并</p>
                <p id="实例化组合">实例化组合</p>
                <p id="克隆">克隆</p>
            </ul>`;
        } else if (type == 'node') {
            outDiv.innerHTML = `<ul>
                <p id="克隆">克隆</p>
            </ul>`;
        }

        return outDiv;
    },
    handleMenuClick(target, item) {
        const { _cfg } = item,
            { type } = _cfg;
        console.log(item);

        if (type === 'combo') {
            if (target.id == '合并') {
                let { nodes, combos } = item.getChildren();
                nodes.forEach((node) => {
                    node.lock();
                });
            } else if (target.id == '取消合并') {
                let { nodes, combos } = item.getChildren();
                nodes.forEach((node) => {
                    node.unlock();
                });
            } else if (target.id == '克隆') {
                clone(item);
                console.log('克隆');
            }
        } else if (type === 'node') {
            clone(item);

            console.log(item);
        }
        // combo
        console.log(target, target.id, item);
    },
});

function clone(item) {
    const { model, type } = item._cfg;
    if (type === 'combo') {
        let { nodes, combos } = item.getChildren();
        let newCombo = graph.createCombo(
            {
                ...model,
                x: model.x + 20,
                y: model.y + 20,
                id: String(Math.random()),
            },
            [
                ...nodes.map((node) => clone(node)),
                ...combos.map((combo) => clone(combo)),
            ]
        );
    } else if (type === 'node') {
        console.log(model);
        const id = String(Math.random());
        const node = graph.addItem('node', {
            ...model,
            comboId: null,
            x: model.x + 20,
            y: model.y + 20,
            id,
        });
        return id;
    }
}
