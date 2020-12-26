$(function () {
    // 调用此函数获取用户基本信息
    getUserInfo();
    // 为退出按钮点击事件,实现退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        console.log(2);
        //提示用户是否真的退出
        layer.confirm('确定退出登录', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 情况本地存储中的token
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href = '/login.html';
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 在baseAPI中直接配置了
        // 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //  调用renderAvatar渲染用户的头像
            renderAvatar(res.data);
        },
        // // 不论请求是否成功，最终都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('执行了complete函数');
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制情况token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页
        //         location.href = '/login.html';
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 隐藏文本头像
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}