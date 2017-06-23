module.exports = {
 entry: '.src/scripts/index.ts',
 module: {
   rules: [
     {
       test: /\.ts?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     }
   ]
 },
 output: {
   filename: 'bundle.js',
   path: __dirname
 }
};
