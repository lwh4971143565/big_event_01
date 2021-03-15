$(function () {


    //校验密码
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            //新密码与原密码不能一致
            if (value ==  $('[name=oldPwd]').val()) {
                return '新密码不能与原密码一致';
            }


        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'

            }
        }

    })

    //提交密码
    $('form').on('submit',function(e){
        //阻止默认
        e.preventDefault();
        $.ajax({
        method: 'post',
        url: '/my/updatepwd',       
        data: $(this).serialize(),
        
        success: (res) => {
        //  console.log($(this).serialize());
         if (res.status !==0) {
             return layui.layer.msg(res.message)
             
         }
         layui.layer.msg('密码修改成功!')
         $('form')[0].reset();
         

        }
        })
    })


})