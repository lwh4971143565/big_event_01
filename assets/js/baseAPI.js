//服务器地址优化
let baseURL = "http://api-breakingnews-web.itheima.net"

//ajax方法拼接url地址
$.ajaxPrefilter(function (options) {


    options.url = baseURL + options.url;


    //身份认证带/my/的路径重复使用
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || "" }
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },

        //登录拦截
        options.complete = function (res) {
            // console.log(res.responseJSON);
            let obj = res.responseJSON;
            if (obj.satatus == 1 && obj.message == "身份认证失败！") {

                //清空本地token
                localStorage.removeItem('token')
                //页面跳转
                location.href = '/login.html'
            }

        }
    }



})
