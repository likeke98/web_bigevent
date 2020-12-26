// options就是调用Ajax的时候传递的配置对象
// 每次调用$.get(),$.post(),$.ajax()的时候，
// 会先调用ajaxPrefilter函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options);
    // 在发起真正的Ajax请求之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            // 如果没有判断，将所有的ajax都会加这个请求头
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    // 不论请求是否成功，最终都会调用complete回调函数
    options.complete = function (res) {
        // console.log('执行了complete函数');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制情况token
            localStorage.removeItem('token');
            // 强制跳转到登录页
            location.href = '/login.html';
        }
    }
})