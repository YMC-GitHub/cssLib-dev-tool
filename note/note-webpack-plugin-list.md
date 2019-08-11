




复制文件:CopyWebpackPlugin
注入版权:BannerPlugin
提取公共代码:CommonsChunkPlugin
定义编译变量:DefinePlugin->EnvironmentPlugin+DotenvPlugin


extract-text-webpack-plugin

文件指纹：hashed-module-ids-plugin
模块替换：hot-module-replacement-plugin
网页生成：html-webpack-plugin

压缩脚本：uglifyjs-webpack-plugin、terser-webpack-plugin

压缩样式：optimize-css-assets-webpack-plugin
提取样式：mini-css-extract-plugin

样式校验：
StylelintWebpackPlugin
离代码块：SplitChunksPlugin

自动加载模块：ProvidePlugin
限代码块大小：MinChunkSizePlugin
限代码块数量：LimitChunkCountPlugin

