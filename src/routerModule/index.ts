import { Module } from 'my-world';
import { RouterLink } from './router-link';
import { RouterView } from './router-view';
@Module({
    declarations: [RouterView, RouterLink],
    exports: [RouterView],
})
class RouterModule {}
export { RouterModule };
