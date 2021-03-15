$(function () {

    //j校验

    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1 ~6位"
            }
        }
    })

//用户渲染
let layer =layui.layer;
initUserInfo();
function initUserInfo (){
    $.ajax({
   method:'GET',
    url: '/my/userinfo',       
   
    success: (res) => {
    //  console.log(res);

     if (res.status !==0) {
         return layer.msg(res.message)
     }
     form.val('formUserInfo',res.data)
    }
    })





}


//重置按钮
$('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo();

})

//修改用户信息
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
    type: 'POST',
    url: '/my/userinfo',       
    data:$(this).serialize(),
    success: (res) => {
     console.log(res);
     if (res.status!==0) {
         return layer.msg('用户信息修改失败')
         
     }
     layer.msg('恭喜您,信息修改成功')
     window.parent.getUserInfo()
    }
    })
})


})