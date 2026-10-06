import { defineConfig, PluginOption } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const isWatch = process.argv.includes('--watch')
const isDevMode = process.argv.includes('--mode') && process.argv[process.argv.indexOf('--mode') + 1] === 'dev'
const isDevCommand = process.argv.includes('dev') || isDevMode
const isWeb = process.argv.includes('--mode') && process.argv[process.argv.indexOf('--mode') + 1] === 'web'

// Configuration for library build (with external dependencies)
const libConfig = {
    build: {
        minify: false,
        emptyOutDir: false,  // Preserve .d.ts files from tsc
        watch: isWatch ? { exclude: ['dist/**', 'node_modules/**'] } : null,
        lib: {
            entry: ['./src/index.tsx'],
            name: '@woby/tooltip',
            formats: ['cjs', 'es', 'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby', /^@woby\/(.*)/],
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
        tailwindcss() as PluginOption,
    ],
    resolve: {
        alias: {
            'woby/jsx-dev-runtime': isDevCommand ? path.resolve('../woby/src/jsx/runtime') : 'woby',
            'woby/jsx-runtime': isDevCommand ? path.resolve('../woby/src/jsx/runtime') : 'woby',
            'woby': isDevCommand ? path.resolve('../woby/src') : 'woby',
            '@woby/styled': isDevCommand ? path.resolve('../styled/src') : '@woby/styled',
            '@woby/use': isDevCommand ? path.resolve('../use/src') : '@woby/use',
        },
    },
    cacheDir: false,  // Disable .vite/ cache
}

// Configuration for web development (without external dependencies)
const webConfig = {
    build: {
        minify: false,
        outDir: './build',
        sourcemap: false,
    },
    esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'woby',
    },
    plugins: [
        tailwindcss() as PluginOption,
    ],
    resolve: {
        alias: {
            'woby/jsx-dev-runtime': path.resolve('../woby/src/jsx/runtime'),
            'woby/jsx-runtime': path.resolve('../woby/src/jsx/runtime'),
            'woby': path.resolve('../woby/src'),
            '@woby/styled': path.resolve('../styled/src'),
            '@woby/use': path.resolve('../use/src'),
        },
    },
    optimizeDeps: {
        exclude: ['woby'],
    },
    server: {
        port: 5173,
        host: true,
        fs: {
            allow: ['..', '../..', '../../..'],
        },
    },
    root: '.',
    cacheDir: false,  // Disable .vite/ cache
}

// Export the appropriate configuration based on the environment
const config = defineConfig((env) => {
    if (isWeb) {
        // Web build environment - for building web app
        return webConfig
    } else if (env.command === 'build') {
        // Library build environment - with external dependencies
        return libConfig
    } else {
        // Web development environment - without external dependencies
        return webConfig
    }
})

export default config