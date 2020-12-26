// options就是调用Ajax的时候传递的配置对象
// 每次调用$.get(),$.post(),$.ajax()的时候，
// 会先调用ajaxPrefilter函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})