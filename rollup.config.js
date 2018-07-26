// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import jsx from 'rollup-plugin-jsx';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    name: "ReactObservableStore",
    file: 'lib/index.js',
    format: 'umd',
    exports: 'named',
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    }
  },
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    commonjs({
        include: 'node_modules/**',
        ignoreGlobal: true
    }),
    jsx({ factory: 'React.createElement'}),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};