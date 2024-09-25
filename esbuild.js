const esbuild = require('esbuild');

const entryPoints = ['src/util.ts','src/structures.ts'];

esbuild.build({
  entryPoints,
  bundle: true,
  outdir: 'dist/esm',
  sourcemap: false,
  minify: true,
  platform: 'node',
  format: 'esm',
  target: 'node20', 
  keepNames: true,
  external: ["discord.js"],
  treeShaking: true, 
  loader: {
    '.json': 'copy',
  },
  logLevel: 'silent',
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints,
  bundle: true,
  outdir: 'dist/cjs',
  sourcemap: false,
  minify: true,
  platform: 'node',
  format: 'cjs',
  target: 'node20',
  keepNames: true,
  external: ["discord.js"],
  loader: {
    '.json': 'copy',
  },
}).catch(() => process.exit(1));
