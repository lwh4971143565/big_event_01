$(function () {
    let layer = layui.layer
    initArtCateList();

    //封装函数
    function initArtCateList() {
        $.ajax({

            url: '/my/article/cates',

            success: (res) => {

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-art-cate', { data: res.data })
                $('tbody').html(htmlStr)
            }
        })
    }
    let indexAdd = null


    // let layer=layui.layer;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });

    })

    //提交文章分类
    $('body').on('submit', '#form-add', function (e) {
        //阻止默认
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {

                if (res.status != 0) {
                    return layer.msg(res.message)

                }
                initArtCateList();
                layer.msg('添加成功')
                layer.close(indexAdd)
            }
        })
    })

    //编辑表单
    let indexEdit = null
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });

        let Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,

            success: (res) => {
                form.val("form-edit", res.data)
            }
        })
    })

    //修改 提交
    $('body').on('submit', '#form-edit', function (e) {
        //阻止默认
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg('更新成功');
                layer.close(indexEdit);
            }
        })
    })

    //删除
    $('tbody').on('click', '.btn-delete', function () {


        let Id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,

                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)

                    }
                    initArtCateList();
                    layer.msg('删除成功');
                    layer.close(index);
                }
            })
        })
    })


})