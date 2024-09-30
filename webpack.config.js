module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [/node_modules\/@safe-global/, /node_modules\/@walletconnect/],
      },
    ],
  },
};
