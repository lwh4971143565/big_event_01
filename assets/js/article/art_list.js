$(function () {
    //时间优化
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr)
        let y = dt.getFullYear();
        let m = padZero(dt.geiMonth() + 1)
        let d = padZero(dt.getDate())


        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + "-" + hh + ":" + mm + ":" + ss
    }
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }

    // 封装函数
    let q = {
        pagenum: 1,  //是	int	页码值
        pagesize: 2,	//是	int	每页显示多少条数据
        cate_id: '', //否	string	文章分类的 Id
        state: '',  //否	string	文章的状态，可选值有：已发布、草稿
    }
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,

            success: (res) => {
                if (res.status) {
                    return layer.msg(res.message)
                }
                // console.log(res);

                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    //初始化分类
    let form = layui.foem;
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

    //筛选功能
    $('#form-search').on('submit', function (e) {
        //阻止默认
        e.preventDefault();
        let cate_id = $('[name=cate_id] ').val()
        q.cate_id = cate_id
        let state = $('[name=state] ').val()
        q.state = state
        initTable();
    })

    //分页
    let laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {


                //首次不执行
                if (!first) {
                    //do something
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    initTable();

                }
            }
        })
    }
    //删除
    let layer = layui.layer;
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id')
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function () {
            $.ajax({
                url: '/my/article/delete/' + Id,

                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('成功')
                    if ($('btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--

                    }
                    initTable()
                    layer.close(index)

                }
            })
        })
    })



})