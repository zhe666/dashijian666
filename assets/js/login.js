$(function () {

    // 点击去注册页面的时候跳转注册页面
    $("#link_reg").on("click", function () {
        $(".loginbox").hide()
        $(".regbox").show()
    })
    $("#link_login").on("click", function () {
        $(".loginbox").show()
        $(".regbox").hide()
    })
    // 自定义密码校验规则

    var form = layui.form   //引入表单form模块
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后在一次进行等于判断
            //如果判断失败,则return一个提示消息即可
            //注意空格
            let pwd = $('.regbox [name=password]').val()
            if (pwd !== value) {
                console.log(value);
                console.log(pwd);
                return "两次密码输入不一致"
            }

        }

    })
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        console.log("这是注册");
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('.regbox [name=username]').val(),
                password: $('.regbox [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if(res.status!==0){
                    return console.log(res.message);
                }
                else{
                    alert("注册成功");
                    $("#link_login").click()
                }
            }
        });
    })

    $("#form_log").on("submit", function (e) {
        e.preventDefault()
        console.log("这是登录");
        $.ajax({
            method:"post",
            url: "/api/login",
            data: "data",
            data:{
                username: $('.loginbox [name=username]').val(),
                password: $('.loginbox [name=password]').val()
            },
            success: function (res) {
                    console.log(res);
                    if(res.status!==0){
                        return console.log(res.message);
                    }
                    else{
                        // 把token值在本地存储中
                        localStorage.setItem("token",res.token)
                       alert("登录成功");
                    //    location.href="/index.html"// 跳转页面
                    }
            }
        });
    })
})