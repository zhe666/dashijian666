var baseUrl = "http://api-breakingnews-web.itheima.net" //开发环境

$(function () {
    // 在`ajaxPrefilter`中统一拼接请求的根路径
    // 调用 `$.ajaxPrefilter()` 函数 里面传递一个回调函数,回调函数里面有一个形成options,这个行程里面就包含了这一次请求的相关信息
    $.ajaxPrefilter(function (options) {
        console.log(options + "这个optiosn");
        // 在发起真正的ajax请求之前,统一拼接请求的根路径
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url

        // 在我们调用 `$.ajax()` 后，并且在请求服务器之前调用的过滤器，那么我们能统一设置根路径，那么我们就可以去统一设置请求头
        // 判断url是否携带/my/  如果携带那么就设置options.headers
        if (options.url.indexOf("/my/") !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 控制用户的访问权限,用户如果没有登录,是否能够允许用户访问后台主页?肯定是不能的,所以我们能需要进行权限的校验,可以利用请求后服务器返回的状态来决定
        // 在调用有权限接口的时候,指定complete回调函数,这个回调函数不管成功还是失败都会调用
        // 在回调里面判断服务器返回的状态是否等于1,并且错误的信息是"身份认证失败",如果成立,那么就强制用户跳转到登录页
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败")
                // 强制清空token
                console.log(location);
                localStorage.removeItem("token")
            // 强制跳转到登录页面
            console.log(location);
            location.href = "/login.html"
        }

    })
})