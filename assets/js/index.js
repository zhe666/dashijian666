$(function () {
    // 页面加载完毕后调用getUserInfo 函数 获取头像和个人信息
    // my开头的请求路径需要token验证才可以访问成功
    // 请求头中需要携带  Authorization:
    getUserInfo()

    function getUserInfo() { //获取用户的基本信息
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败")
                }
                // 调用  renderAvatar 渲染用户的头像
                renderAvatar(res.data)
                
            }
        });
    }
    // 如果请求成功。根据服务器返回的数据来渲染页面
    // 定义 renderAvatar 函数 接收服务器返回的用户数据
    // 获取用户的昵称
    // 设置欢迎的文本，找到关键元素进行设置
    // 按需渲染用户和头像，如果用户有头像，那么就直接设置图片头像，如果没有设置文本头像
    function renderAvatar(user) {
        var name = user.nickname || user.username
        // 设置欢迎的文本
        $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
        if (user.user_pic !== null) { // 如果上传的头像不为空值
            // 渲染图片头像
            $(".layui-nav-img").attr("src", user.user_pic).show()
            $(".text-avatar").hide()

        } else {
            // 渲染文本头像
            $(".layui-nav-img").hide()
            var first = name[0].toUpperCasee()
            $(".text-avatar").html(first).show()
        }

    }
    var  layer=layui.layer  //获取提示模块
    // 实现退出功能
    $("#tuichu").on("click",function(){
        // 用户点击后弹出提示框，并且移除本地缓存的token值，并且跳转到登录页面
        layer.confirm("确定退出登录？",{icon:3,title:"提示"},function(index){
            localStorage.removeItem("token")  //移除
            // 重新跳转到登录页面
            location.href="/login.html"
            // 关闭提示框
            layer.close(index)
        })

    })
})