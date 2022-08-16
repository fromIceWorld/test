import { Directive, Input } from "my-world";
@Directive({
  selector: "[formControl]",
})
class formControlDirective {
  @Input("formControl")
  formControl: any;
  name = "第二个指令";
  constructor() {
    console.log("实例formControl");
  }
  OnInit(native: Element, Tnode: elementNode) {
    console.log(
      "%cformControlDirective: %cOnInit",
      "color: #2c5dc1",
      "color: blue",
      native,
      Tnode
    );
    console.log(this.formControl);
  }
  Oninserted(native: Element) {
    console.log(
      "%cformControlDirective: %cOninserted",
      "color:#2c5dc1",
      "color:#ff6500",
      native
    );
  }
  OnInputChanges(changesObj: any) {
    console.log(
      "%cformControlDirective: %cOnInputChanges",
      "color:#2c5dc1",
      "color:#ff6500",
      changesObj
    );
  }
  OnViewUpdateed(tView: TemplateView) {
    console.log(
      "%cformControlDirective: %cOnViewUpdateed",
      "color:#2c5dc1",
      "color:#ff6500",
      tView
    );
  }
  OnDestroy() {
    console.log("%cmyComponent: %cOnDestroy", "color:green", "color:red");
  }
}
export { formControlDirective };
