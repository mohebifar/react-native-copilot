import sucrase from '@rollup/plugin-sucrase';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['jsx']
    })
  ]
};
