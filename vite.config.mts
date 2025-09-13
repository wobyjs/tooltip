import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.tsx"],
            name: 'woby',
            formats: [/*'cjs', '*/'es'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby', 'woby/jsx-runtime', '@woby/styled', '@woby/use', '@woby/styled', '@woby/use'],
            output: {
                globals: {
                    'woby': 'woby',
                    'woby/jsx-runtime': 'woby/jsx-runtime',
                    '@woby/styled': '@woby/styled',
                    '@woby/use': '@woby/use',
                }
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src/lib', outputDir: './dist/types' })
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'woby': isDev ? path.resolve(__dirname, '../woby/src') : 'woby',
            '@woby/styled': isDev ? path.resolve(__dirname, '../styled/src') : '@woby/styled',
            '@woby/use': isDev ? path.resolve(__dirname, '../use/src') : '@woby/use',
        },
    },
})



export default config
