$(function () {

    //初始化分类
    let form = layui.form;
    let layer = layui.layer;
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            //dataType:json ,jsonp 请求JS文件 
            success: (res) => {
                //  console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)

                }
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    initEditor()

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
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })

    $('#coverFile').change(function (e) {
        var file = e.target.files[0]
        if (file == undefined) {
            return;
        }

        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    let state = '已发布';
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        //阻止默认
        e.preventDefault();
        let fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob);
                // 得到文件对象后，进行后续的操作
                publishArticle(fd);

            });
    })
    //封装添加文章方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            //dataType:json ,jsonp 请求JS文件
            contentType: false,
            processData: false,
            success: (res) => {
                //  console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('成功')
                setTimeout(function () {
                    window.parent.document.querySelector("#art_list").click();
                }, 1000);
            }
        })

    }

})