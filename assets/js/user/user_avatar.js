$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    // 为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        console.log(e);
        var filelist = e.target.files;
        // 获取用户选择的文件
        console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg('请选择照片')
        }
        // 拿到用户选择的文件
        var file = e.target.files[0];
        // 将文件转化为路径
        var ImgURL = URL.createObjectURL(file);
        // 初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', ImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        // 拿到用户裁剪之后的头像
        var dataURL = $image
            // 创建一个 Canvas 画布
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')
        // 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功');
                window.parent.getUserInfo();
            }
        })
    })
})