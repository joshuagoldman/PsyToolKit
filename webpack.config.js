// Note this only includes basic configuration for development mode.
// For a more comprehensive configuration check:
// https://github.com/fable-compiler/webpack-config-template

var path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/client/View.fs.js",
    output: {
        path: path.join(__dirname, "./public"),
        filename: "bundle.js",
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        port: 8080,
		proxy: {
		  '/api/*': {
			target: 'http://localhost:8085',
			changeOrigin: true
		  },
		  '/SignalR': {
            target: 'http://localhost:8086',
            ws: true
		  }
		},
		
    },
    module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				include : path.join(__dirname, 'app'),
				loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
		    }
		]
    }
}
