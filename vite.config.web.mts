import { defineConfig } from 'vite'
import path from 'path'
import tsconfig from 'vite-plugin-tsconfig'

// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["index.html"],
            name: "woby-power-tooltip",
            formats: [/*'cjs', '*/'es'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        outDir: './build',
        sourcemap: false,
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src', outputDir: './dist/types' })
        tsconfig({filename:'tsconfig.web.ts'})
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'woby/jsx-dev-runtime': 'woby',
            'woby/jsx-runtime': 'woby',
        },
    },
})



export default config
