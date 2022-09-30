import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default {
    input: 'index.ts',
    output: {
        file: './dist/main.js',
        format: 'umd',
        name: 'block',
    },
    strict: false,
    external: ['mark5'],
    globals: {
        mark5: 'mark5',
    },
    plugins: [
        resolve(),
        typescript({
            downlevelIteration: true,
            experimentalDecorators: true,
        }),
    ],
};
