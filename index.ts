import { PlatformBrowserDynamic } from 'mark5';
import { AppModule } from './src/appModule';
let platform = PlatformBrowserDynamic();
platform.bootstrapModule(AppModule, document.getElementById('root')!);
