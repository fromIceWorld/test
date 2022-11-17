import { Component } from 'mark5';
@Component({
    selector: `test`,
    styles: ``,
    template: `<form &formgroup="fg">
                    <div><span>姓名</span>
                        <input class="" placeholder='请输入姓名' type="text" &formcontrol="fg.name"></input>
                    </div>
                    <div><span>性别</span>
                        <input type='radio' 
                            id="男" 
                            checked
                            name="0.46958756611977837" 
                            value="男"> </input>
                        <label for="男">男</label>
                        <input type='radio' 
                            id="女" 
                            name="0.46958756611977837" 
                            value="女"> </input>
                        <label for="女">女</label>
                    </div>
                </form>
                {{fg.get('name')}}
                `,
    providers: [],
})
class TestComponent {
    fg = new FormGroup({
        name: { name: 'name', value: '', regexp: '^[1-9]{1,10}$' },
    });
    constructor() {}
    OnDestroy() {
        console.log('钢铁侠 test实验室 销毁！');
    }
}
export { TestComponent };
