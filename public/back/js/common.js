$(function(){
  // 二级列表切换
  $('.category').click(function(){
    $('.child').stop().slideToggle();
  })
  // 菜单功能
  $('.icon_menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  })
  // 退出功能
  $('.icon_logout').click(function(){
    $('#lt_modal').modal('show');
  })
  // 模态框退出实现
  $('.logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
  // 登录拦截实现
  // 字符串-1未出现过
  if(location.href.indexOf('login.html')===-1){
    $.ajax({
       type:'get',
       url:"/employee/checkRootLogin",
       dataType:"json",
       success:function(info){
         console.log(info);
         if(info.success){
            console.log('已登录');
         }
         if(info.error === 400){
            location.href = "login.html";
         }
       }
    })
  }
  // 进度条实现
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },10000)
  })
  
})
