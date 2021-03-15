$(function () {



    getUserInfo()


    //退出功能
let  layer =layui.layer
$('#btnLogout').on('click',function(){
    layer.confirm('是否确认退出?',{icon:3,title:'提示'},function(index){
        localStorage.removeItem('token');
        location.href="/login.html";
        layer.close(index);
    })
})

})


function getUserInfo() {


    $.ajax({

        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: (res) => {

            // console.log(res);
            if (res.status !== 0) {
                return layui.layur.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}


function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp ' + name)
    if(user.user_pic !==null){

        $('.layui-nav-img').show().attr("src",user.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())
    }
}