import { formsModule, Module } from 'mark5';
import { ButtonModule, DialogModule, SelectModule } from 'mark5-ui';
import { ChilComponent } from './childComponent';
import { IronComponent } from './components/iron';
import { SpiderComponent } from './components/spider';
import { Spider2Component } from './components/spider2';
import { demoComponent } from './demo';
import { Diagram } from './diagram';
import { firstDirective } from './firstDirective';
import { forof } from './forOf';
import { bIf } from './if';
import { MyComponent } from './myComponent';
import { RouterModule } from './routerModule/index';
import { Router } from './routerModule/router';
import { TabComponent } from './tabs';
import { TestComponent } from './test';
const routes = [
    {
        path: 'iron',
        component: IronComponent,
        children: [
            {
                path: 'mark5',
                component: TestComponent,
            },
        ],
    },
    {
        path: 'spider',
        component: SpiderComponent,
        children: [
            {
                path: ':userId',
                component: Spider2Component,
            },
        ],
    },
];
@Module({
    declarations: [
        MyComponent,
        ChilComponent,
        demoComponent,
        firstDirective,
        forof,
        bIf,
        TestComponent,
        IronComponent,
        SpiderComponent,
        Spider2Component,
        TabComponent,
        Diagram,
    ],
    providers: [{ provide: Router, useClass: Router, deps: [] }],
    imports: [
        RouterModule.forRoot(routes),
        formsModule,
        ButtonModule,
        SelectModule,
        DialogModule,
    ],
    exports: [],
    routes: [
        {
            path: 'iron',
            component: IronComponent,
            children: [
                {
                    path: 'mark5',
                    component: TestComponent,
                },
            ],
        },
        {
            path: 'spider',
            component: SpiderComponent,
            children: [
                {
                    path: ':userId',
                    component: Spider2Component,
                },
            ],
        },
    ],
    bootstrap: [MyComponent],
})
class AppModule {}
export { AppModule };
