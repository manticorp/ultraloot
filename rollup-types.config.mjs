import { dts } from 'rollup-plugin-dts';

export default {
  input: 'dist/types/index.d.ts',
  output: [
    { file: 'dist/ultraloot.d.mts', format: 'es' },
    { file: 'dist/ultraloot.d.cts', format: 'es' }
  ],
  plugins: [dts()]
};
