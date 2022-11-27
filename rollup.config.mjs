import babel from 'rollup-plugin-babel';

export default {
  input: 'rafThrottle.js',
  output: [
    {
      file: 'lib/rafThrottle.js',
      format: 'cjs',
    },
    {
      file: 'lib/rafThrottle.mjs',
      format: 'es',
    },
    {
      file: 'umd/rafThrottle.js',
      format: 'umd',
      name: 'rafThrottle',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
