import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts', // Your entry point
  output: {
    file: 'dist/index.js', // Output file
    format: 'esm', // ES module format
  },
  plugins: [
    resolve(), // Resolves node_modules
    typescript(), // TypeScript support
    terser(), // Minify the bundle
    visualizer({ filename: 'dist/bundle-analysis.html' }), // Bundle size analysis
  ]
};