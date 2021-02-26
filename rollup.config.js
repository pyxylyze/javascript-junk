import strip from '@rollup/plugin-strip'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

// ─────────────────────────────────────────────────────────────────────────────

export default [
    {
        input: 'README.js',
        output: [{
            file: 'lib/junk.cjs.js',
            format: 'cjs'
        },
        {
            file: 'lib/junk.esm.js',
            format: 'es'
        },
        {
            file: 'lib/junk.umd.js',
            format: 'umd',
            name: 'junk'
        }
        ],
        plugins: [
            strip({
                functions: ['test']
            }),
            cleanup(),
            terser()
        ]
    }
]