import { PlatformBrowserDynamic } from 'my-world';
import { AppModule } from './src/appModule';
let platform = PlatformBrowserDynamic();
platform.bootstrapModule(AppModule, document.getElementById('root'));
