$(function () {
    // 点击去注册账号的链接
    $("#link_reg").on('click', function () {
        $(".loginBox").hide();
        $(".regBox").show();
    })
    // 点击去登录的账号链接
    $("#link_login").on('click', function () {
        $(".regBox").hide();
        $(".loginBox").show();
    })
    // 从layui中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify（）函数自定义校验规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            // 通过形参拿到的时确认密码框中的值
            // 还需要拿到密码框中的值进行比较
            var pass = $(".regBox [name=password]").val();
            if (pass !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起Ajax的post请求
        var data = {
            username: $('#form_reg [name=uesrname]').val(),
            password: $('#form_reg [name=password]').val(),
        };
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录！');
                // 模拟人的点击行为，让注册成功后自动跳转到登录页面
                $('#link_login').click();
            }
        )
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        // 发起post请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    // console.log(res);
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                // 将登录成功得到的 token 字符串，保存到localStorage中
                // console.log(res.token);
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})