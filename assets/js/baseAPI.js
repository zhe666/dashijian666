var baseUrl = "http://api-breakingnews-web.itheima.net" //开发环境

$(function () {
    // 在`ajaxPrefilter`中统一拼接请求的根路径
    // 调用 `$.ajaxPrefilter()` 函数 里面传递一个回调函数,回调函数里面有一个形成options,这个行程里面就包含了这一次请求的相关信息
    $.ajaxPrefilter(function (options) {
        // 在发起真正的ajax请求之前,统一拼接请求的根路径
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url      


    })
})