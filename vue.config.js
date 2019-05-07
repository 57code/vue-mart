// node代码
module.exports = {
    publicPath: '/kcart',
    configureWebpack: {
        devServer: {
            before(app) {
                // app是express 实例
                app.get('/goods', (req, res) => {
                    res.json([
                        {id:1, text:'abc'},
                        {id:2, text:'abc'},
                    ])
                })
            }
        }
    }
}