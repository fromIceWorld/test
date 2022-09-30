import { Component, Input } from 'mark5';

@Component({
    selector: 'router-link',
    template: `<a &href="to" style="text-decoration: none;">
        <slot></slot>
    </a>`,
    styles: '',
    providers: [],
})
class RouterLink {
    @Input('to') to: any;
}
export { RouterLink };
