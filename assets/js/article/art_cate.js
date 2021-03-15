$(function () {
    let layer = layui.layer
    initArtCateList();

    //封装函数
    function initArtCateList() {
        $.ajax({
           
            url: '/my/article/cates',

            success: (res) => {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-art-cate', {data:res.data})
                $('tbody').html(htmlStr)
            }
        })
    }


    
})