/*
* Jquery Mobile Routes
*/

var webService = "/backend/index.php/";
var expresion_email = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i; 
var seconds = 10;
var time = null;
var directory_profile = 'media/profile_users/';
var directory_biography = 'media/biography_users/';

var router = new $.mobile.Router({
    "#home": {handler: "home", events: "s" },
    "#register": {handler: "register", events: "s" },
    "#terms": {handler: "terms", events: "s" },
    "#dashboard": {handler: "dashboard", events: "s" },
    "#dashboard_admin": {handler: "dashboard_admin", events: "s" },
    "#friends": {handler: "friends", events: "s" },
    "#race": {handler: "race", events: "s" },
    "#start_race": {handler: "start_race", events: "s" },
    "#duel": {handler: "duel", events: "s" },
    "#duel_users": {handler: "duel_users", events: "s" },
    "#search_duel": {handler: "search_duel", events: "s" },
    "#win_duel": {handler: "win_duel", events: "s" },
    "#test": {handler: "test", events: "s" },
    "#start_test": {handler: "start_test", events: "s" },
    "#specialty": {handler: "specialty", events: "s" },
    "#start_specialty": {handler: "start_specialty", events: "s" },
    "#litigation": {handler: "litigation", events: "s" },
    "#start_litigation": {handler: "start_litigation", events: "s" },
    "#profile": {handler: "profile", events: "s" },
},{
    home: function(type,match,ui){
        validate_login();
        
        clean_login();
        
        hide_nav_button();
        
        // Button Login
        $('.btn_login').unbind('click').click(function(e){
            e.preventDefault();
            evt_login();
        });
        
        // Text 
        $('#email,#password').unbind('keyup').keyup(function(e){
            if(e.keyCode == 13)
                evt_login();
        });
        
        var first_view = localStorage.getItem('first_view');
        
        if(first_view == null){
            // Welcome Message
            message('welcome');
            localStorage.setItem('first_view',true);
        }
    },
    register: function(type,match,ui){
        clean_register();
        
        hide_nav_button();
        
        // Button Register 
        $('.btn_register').unbind('click').click(function(e){
          e.preventDefault();
          evt_register();
        });
      
        // Text
        $('#email_r,#password_r,#password_c').unbind('keyup').keyup(function(e){
            if(e.keyCode == 13)
                evt_register();
        });
    },
    terms: function(type,match,ui){
        hide_nav_button();
    },
    dashboard: function(type,match,ui){
        
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        // Params
        var params = router.getParams(match[1]); 
        
        if(params == null){
            var log = localStorage.getItem('log');
            
            if(log != 'true'){
                $.mobile.changePage('#home',{role: 'page',transition: 'slide'});
            }
        }else{
            var $id = params.user;
        }
        
        if($id == null || $id == undefined || $id == ""){
            $.mobile.changePage('#home',{role: 'page',transition: 'slide'})
        }else{
            localStorage.setItem('log','true');
            localStorage.setItem('id_user',$id);
            
            panel_data($id);
        }
        
        // Events for buttons
        $('.games button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role:'page',transition:'flip'});
        });
    },
    dashboard_admin: function(type,match,ui){
        
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        // Params
        var params = router.getParams(match[1]); 
        
        if(params == null){
            var log = localStorage.getItem('log');
            
            if(log != 'true'){
                $.mobile.changePage('#home',{role: 'page',transition: 'slide'});
            }
        }else{
            var $id = params.user;
        }
        
        if($id == null || $id == undefined || $id == ""){
            $.mobile.changePage('#home',{role: 'page',transition: 'slide'})
        }else{
            localStorage.setItem('log','true');
            localStorage.setItem('id_user',$id);
            
            panel_data($id);
        }
        
        // Events for buttons
        $('.games button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role:'page',transition:'flip'});
        });
    },
    friends: function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        var $id = localStorage.getItem('id_user');
        
        panel_data($id);
        
        $('.content_friends').empty();
        
        // Ajax for all users
        $.ajax({
            url     : webService + "users",
            type    : 'POST',
            data    : null,
            success : function(response){
                var data = JSON.parse(response);
                
                data.forEach(function(i,o){
                    i.index = o;
                    $(".content_friends").append(tmpl("each_user", i));
                });
            }
        });
    },
    race: function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            $.mobile.changePage('#start_race',{role: 'page',transition: 'turn'});
        });
    },
    start_race : function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
    },
    duel: function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            $.mobile.changePage('#search_duel',{role: 'page',transition: 'turn'});
        });
    },
    duel_users: function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
    },
    search_duel: function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.duel_link a').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('href');
            seconds = 10;
            $('.panel_notification').css('transform','translatey(-100px)');
            $('.panel_notification .time span').text('( 10 seg )');
            $('.panel_notification').fadeIn(100,function(){
                $(this).css('transform','translatey(0)');
                time = setInterval(function(){
                    seconds--;
                    $('.panel_notification .time span').text('( '+seconds+' seg )');
                    
                    if(seconds == 0){
                        clearInterval(time);
                        $.mobile.changePage(url,{role:'page',transition: 'slide'});
                        $('.panel_notification').fadeOut(500);
                        seconds = 10;
                    }
                },1000);
            });
        });
    },
    win_duel : function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
    },
    test :function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            $.mobile.changePage('#start_test',{role: 'page',transition: 'turn'});
        });
    },
    start_test :function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
    },
    specialty :function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            $.mobile.changePage('#start_specialty',{role: 'page',transition: 'turn'});
        });
    },
    start_specialty :function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
    },
    litigation :function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            $.mobile.changePage('#start_litigation',{role: 'page',transition: 'turn'});
        });
    },
    start_litigation :function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
    },
    profile : function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        var $id = localStorage.getItem('id_user');
        
        panel_data($id);
        
        var form_image = $('#form_image');
        var form_image_biography = $('#form_image_biography');
        var current_name = "";
        var current_username = "";
        
        setTimeout(function(){
            current_name = $('.content_profile .data_user span.name').text();
            current_username = $('.content_profile .data_user span.username').text();
        },800);
        
        form_image.submit(function(e){
            e.preventDefault();
            var image_user = $('#image_user')[0].files[0];
            
            var oData = new FormData($(this)[0]);
            oData.append('image_user',image_user);
            oData.append('id_user',$id);
            
            $.ajax({
                url: webService + "image_user",
                type: 'POST',
                data: oData,
                processData: false,
                contentType : false,
                success: function(response){
                    var data = JSON.parse(response);
                    
                    if(data.status == "OK"){
                        message(data.message);
                        panel_data($id);
                    }else{
                        message(data.message);
                    }
                }
            });
        });
        
        form_image_biography.submit(function(e){
            e.preventDefault();
            var image_user = $('#image_biography_user')[0].files[0];
            
            var oData = new FormData($(this)[0]);
            oData.append('image_user_biography',image_user);
            oData.append('id_user',$id);
            
            $.ajax({
                url: webService + "image_user_biography",
                type: 'POST',
                data: oData,
                processData: false,
                contentType : false,
                success: function(response){
                    var data = JSON.parse(response);
                    
                    if(data.status == "OK"){
                        message(data.message);
                        panel_data($id);
                    }else{
                        message(data.message);
                    }
                }
            });
        });
        
        $('#image_user').change(function(){
           form_image.submit();
        });
        
        $('#image_biography_user').change(function(){
           form_image_biography.submit();
        });
        
        $('#btn_change_password').unbind('click').click(function(){
            evt_change_password();
        });
        
        $('#current_password,#new_password,#confirm_password').unbind('keyup').keyup(function(e){
            if(e.keyCode == 13)
                evt_change_password();
        });
        
        $('.content_profile .data_user span.name').blur(function(){
           var name = $(this).text();
           
          if(name == current_name){
              return;
          }else if(name == ""){
              message('El nombre no puede estar vacio');
              $('.content_profile .data_user span.name').focus();
              panel_data(localStorage.getItem('id_user'));
          }else if(!isNaN(name)){
              message('El nombre no puede contener números');
              $('.content_profile .data_user span.name').focus();
              panel_data(localStorage.getItem('id_user'));
          }else if(name.length > 50){
              message('El nombre no puede contener mas de 50 caracteres');
              $('.content_profile .data_user span.name').focus();
              panel_data(localStorage.getItem('id_user'));
          }else{
              loader('Verificando Nombre');
              $.ajax({
                  url       : webService + 'change_name_user',
                  type      : 'POST',
                  data      : {
                      id    : localStorage.getItem('id_user'),
                      name  : name
                  },
                  success   : function(response){
                    $('.loader').fadeOut(500);
                    var data = JSON.parse(response);
                      
                    if(data.status == 'OK'){
                        $('.loader').fadeOut(500);
                        setTimeout(function(){
                            message(data.message);
                            panel_data(localStorage.getItem('id_user'));
                            current_name = $('.content_profile .data_user span.name').text();
                        },800);
                    }else{
                        $('.loader').fadeOut(500);
                        setTimeout(function(){
                            message(data.message);
                        },800);
                    }
                  }
              });
          }
        });
        
        $('.content_profile .data_user span.username').keyup(function(e){
            var username = $(this).text();
            if(username == current_username){
                $('.content_profile .data_user span.username').removeClass('success error');
                return;
            }else if(username.length < 6){
                $('.content_profile .data_user span.username').removeClass('success error');
                return;
            }else{
                evt_verify_username(username);
            }
           
            if(e.keyCode == 13){
                if(username == current_username){
                    $('.content_profile .data_user span.username').removeClass('success error');
                    return;
                }else if(username.length < 6){
                    message('El nombre de usuario debe tener mas de 6 caracteres');
                    $('.content_profile .data_user span.username').focus().removeClass('success error');
                    return;
                }else{
                    loader('Verificando Nombre');
                    evt_change_username(username);
                }
            }
        });
        
        $('.content_profile .data_user span.username').blur(function(e){
           var username = $(this).text();
            if(username == current_username){
                $('.content_profile .data_user span.username').removeClass('success error');
                return;
            }else if(username.length < 6){
                message('El nombre de usuario debe tener mas de 6 caracteres');
                $('.content_profile .data_user span.username').focus().removeClass('success error');
                return;
            }else{
                loader('Verificando Nombre');
                evt_change_username(username);
            }
        });
    },
},{ 
  defaultHandler: function(type, ui, page) {
    console.log("Default handler called due to unknown route");
    console.log(type);
    console.log(ui);
    console.log(page);
  },
  defaultHandlerEvents: "s",
  defaultArgsRe: true
});

// Message to the toast Materialize
function message(param){
    if(param === "welcome"){
        Materialize.toast('<div><h3><em>!Welcome To Jurizquiz Game!</em></h3><div><div><p>Click in the button <b>"Acceder"</b> to enter the game</p></div><div><p>Or click on the button <b>"Register"</b> to enjoy the game of questions.</p></div>',2800);
    }else if(param == "null fields"){
        Materialize.toast('<div class="error"><h2>¡No Pueden Haber Campos Vaciós!</h2></div>',2800);
    }else if(param == "user isn\'t exist"){
        Materialize.toast('<div class="no-register"><h4>¡Accesos Incorrectos, Verifique Nuevamente!</h4></div>',2800);
    }else{
        Materialize.toast('<div><h3><em>'+param+'</em></h3></div>',2800);
    }
}

// Text for loader
function loader(msg){
    $('.loader').fadeIn(500).find('.message').text(msg);
}

// Event to validate login
function validate_login(){
    var log = localStorage.getItem('log');
    var id_user = localStorage.getItem('id_user');
    
    if(log == 'true'){
        var id = encodeURIComponent(id_user);
        $.mobile.changePage('#dashboard?user='+id,{role: 'page',transition: 'fade'});
    }
}

// Event to login
function evt_login(){
    var $email = $('#email').val();
    var $password = $('#password').val();
    
    if($email === ""){
        message('¡ El email no puede estar vacio !');
        $('#email').focus();
    }/*else if(!expresion_email.test($email)){
        message('¡ El email no es valido !');
        $('#email').focus();
    }*/else if($password === ""){
        message('¡ La contraseña no puede estar vacia !');
        $('#password').focus();
    }else{
        loader('Validando...');
        $.ajax({
            type: "POST",
            url: webService+"validate_login",
            data: {
                email   : $email,
                pwd     : $password
            },success:function(response){
                var data = JSON.parse(response);
                
                if(data.status == "OK"){
                    $('.loader').fadeOut(1500);
                    setTimeout(function(){
                        Materialize.toast('<div class="success"><h4>¡'+data.message+'!</h4></div>',1500);
                        clean_login();
                    },1000);
                    setTimeout(function(){
                        var role = data.role;
                        localStorage.setItem('role_user',data.role);
                        var url = role == 'admin' ? '#dashboard_admin?user=' + data.id_user : '#dashboard?user=' + data.id_user;
                        $.mobile.changePage(url,{role: 'page',transition:"flip"});
                        
                    },2500);
                }else{
                    $('.loader').fadeOut(1000);
                    setTimeout(function(){
                        message('user isn\'t exist');
                    },1200);
                }
            }
        });
    }
}

// Event to logout
function evt_logout(){
    $('.btn_logout').unbind('click').click(function(){
        $('.button-collapse').sideNav('hide');
        loader('Cerrando Sesión');
        setTimeout(function(){
            localStorage.removeItem('log');
            localStorage.removeItem('id_user');
            localStorage.removeItem('role_user');
            $.mobile.changePage('#home',{role: 'page',transition: 'flow'});
            $('.loader').fadeOut(1800);
        },1200);
    });
}

// Clean form login
function clean_login(){
    $('#email').removeClass('validate').val('');
    $('#password').removeClass('validate').val('');
}

// Event to register
function evt_register(){
    var $email = $('#email_r').val();
    var $password = $('#password_r').val();
    var $password_confirmation = $('#password_c').val();
    
    if($email === ""){
      message('¡ El campo del correo eléctronico no puede estar vacio !');
      $('#email_r').focus();
    }else if(!expresion_email.test($email)){
      message('¡ El correo eléctronico no es correcto !');
      $('#email_r').focus();
    }else if($password === ""){
      message('¡ El campo de la contraseña no puede estar vacia !');
      $('#password_r').focus();
    }else if($password_confirmation === ""){
      message('¡ El campo de confirmar contraseña no puede estar vacio !');
      $('#password_c').focus();
    }else if($password.length < 6){
      message('¡ El campo de la contraseña no puede tener menos de 6 digitos !');
      $('#password_r').focus();
    }else if($password !== $password_confirmation){
      message('¡ Las contraseñas no coinciden !');
      $('#password_r').focus();
    }else{
      loader('Registrando...');
      $.ajax({
            type: "POST",
            url: webService+"register_user",
            data: {
                email       : $email,
                password    : $password
            },success:function(response){
                var data = JSON.parse(response);
                
                if(data.status == "OK"){
                    $('.loader').fadeOut(1500);
                    setTimeout(function(){
                        Materialize.toast('<div class="success"><h4>¡'+data.message+'!</h4></div>',2000);
                        clean_register();
                    },1000);
                    setTimeout(function(){
                        $.mobile.changePage('#home',{role: 'page',transition:"slide"});
                    },2800);
                }else{
                    $('.loader').fadeOut(1000);
                    setTimeout(function(){
                        message('<div class="success"><h4>¡'+data.message+'!</h4></div>');
                    },1200);
                }
            }
        });
    }
}

// Clean form register
function clean_register(){
    $('#email_r').removeClass('validate').val('');
    $('#password_r').removeClass('validate').val('');
    $('#password_c').removeClass('validate').val('');
}

// Hide nav buttin
function hide_nav_button(){
    $('.nav').hide();;
}

// Show nav buttin
function show_nav_button(){
    $('.nav').fadeIn(1500);
    
    $('.nav_button .nav a').click(function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        
        if(url == "#dashboard"){
            var role = localStorage.getItem('role_user');
            var id = localStorage.getItem('id_user')
            
            var link = role == 'admin' ? '#dashboard_admin?user=' + id : '#dashboard?user=' + id;
            $.mobile.changePage(link,{role: 'page',transition:"flip"});
        }else if(url != "#"){
            $.mobile.changePage(url,{role:'page',transition: 'pop'});
        }
    });
}

// Show Nav-Menu
function nav_menu(){
    var window_width = window.innerWidth;
    
    var first_view_dashboard = localStorage.getItem('first_view_dashboard');
        
    if(first_view_dashboard == null){
        if(window_width >= 480){
            $('.button_collapse').sideNav({
              menuWidth: 352, // Default is 240
              edge: 'left', // Choose the horizontal origin
              closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
          );
        }else if(window_width < 479){
            $('.button_collapse').sideNav({
              menuWidth: 305, // Default is 240
              edge: 'left', // Choose the horizontal origin
              closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
          );
        }
        localStorage.setItem('first_view_dashboard',true);
    }else{
        if(window_width >= 480){
            $('.button_collapse').sideNav({
              menuWidth: 352, // Default is 240
              edge: 'left', // Choose the horizontal origin
              closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
          );
        }else if(window_width < 479){
            $('.button_collapse').sideNav({
              menuWidth: 305, // Default is 240
              edge: 'left', // Choose the horizontal origin
              closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
          );
        }
    }
}

// Panel Data user
function panel_data($id){
    
    // Ajax for all data user
    $.ajax({
        type    : 'POST',
        url     : webService+'user_data',
        data    : {
            id  : $id
        },
        success : function(response){
            var data = JSON.parse(response);
            
            $('.points em').text(data.points);
            $('.data_user .name').text(data.name);
            $('.data_user .email').text(data.email);
            $('.data_user .username').text(data.username);
            $('.information_user .image_user img').attr('src', directory_profile + data.image);
            $('.panel_header').css('background-image','url('+directory_biography+data.image_b+')');
            $('.panel .icon_level img,.panel .current_level img,.status .icon_level img').attr('src','img/level'+data.level+'.png');
            $('.panel .current_level span').text('Nivel '+data.level);
            $('.panel .next_level span').text('Nivel '+(parseInt(data.level) + 1));
            $('.panel .next_level img').attr('src','img/level'+(parseInt(data.level) + 1)+'.png');
        }   
    });
    
    // Ajax for friends
    $.ajax({
        type    : 'POST',
        url     : webService+'users',
        data    : null,
        success : function(response){
            var data = JSON.parse(response);
            
            var list_users = $('.friends ul');
            list_users.empty();
            
            for (var i = 0; i < data.length; i++) {
                if(i < 3){
                    list_users.append('<li>'+data[i].name+' '+data[0].points+'</li>');
                }
            }
        }
    });
}

// Event to change the password
function evt_change_password(){
    var $current_password = $('#current_password').val();
    var $new_password = $('#new_password').val();
    var $confirm_password = $('#confirm_password').val();
    
    if($current_password == ""){
        message('La contraseña actual no puede estar vacía');
        $('#current_password').focus();
    }else if($new_password == ""){
        message('La contraseña nueva no puede estar vacía');
        $('#new_password').focus();
    }else if($confirm_password == ""){
        message('La confirmación de la contraseña no puede estar vacía');
        $('#confirm_password').focus();
    }else if($new_password.length < 6){
        message('La contraseña nueva no puede tener menos de 6 caracteres');
        $('#new_password').focus();
    }else if($new_password !== $confirm_password){
        message('¡Las contraseñas no son iguales!');
    }else{
        loader('Cambiando Contraseña');
        
        $.ajax({
            url     : webService + 'change_password',
            type    : 'POST',
            data    : {
                id          : localStorage.getItem('id_user'),
                c_password  : $current_password,
                password    : $new_password,
            },
            success : function(response){
                var data = JSON.parse(response);
                
                if(data.status == 'OK'){
                    $('.loader').fadeOut(500);
                    setTimeout(function(){
                        message(data.message);
                        clean_change_password();
                    },800);
                }else{
                    $('.loader').fadeOut(500);
                    setTimeout(function(){
                        message(data.message);
                    },800);
                }
            }
        });
    }
}

// Clean form change password
function clean_change_password(){
    $('#current_password').val("");
    $('#new_password').val("");
    $('#confirm_password').val("");
}

// Event to change username
function evt_change_username(username){
    if(username == ""){
      message('El nombre no puede estar vacio');
      $('.content_profile .data_user span.username').focus();
    }else if(username.length > 15){
      message('El nombre de usuario no puede contener mas de 15 caracteres');
      $('.content_profile .data_user span.username').focus();
    }else{
      $.ajax({
          url       : webService + 'change_username_user',
          type      : 'POST',
          data      : {
              id        : localStorage.getItem('id_user'),
              username  : username
          },
          success   : function(response){
            $('.loader').fadeOut(500);
            var data = JSON.parse(response);
              
            if(data.status == 'OK'){
                setTimeout(function(){
                    message(data.message);
                    panel_data(localStorage.getItem('id_user'));
                    $('.content_profile .data_user span.username').removeClass('success error');
                },800);
            }else{
                setTimeout(function(){
                    message(data.message);
                    $('.content_profile .data_user span.username').focus().removeClass('success error');
                },800);
            }
          }
      });
    }
}

// Event to verify username
function evt_verify_username(username){
    if(username.length > 15){
      message('El nombre de usuario no puede contener mas de 15 caracteres');
      $('.content_profile .data_user span.username').focus();
    }else{
      $.ajax({
          url       : webService + 'verify_username_user',
          type      : 'POST',
          data      : {
              username  : username
          },
          success   : function(response){
            var data = JSON.parse(response);
            if(data.status == 'OK'){
                $('.content_profile .data_user span.username').addClass('success').removeClass('error');
            }else{
                $('.content_profile .data_user span.username').addClass('error').removeClass('success') ;
            }
          }
      });
    }
}

// Render Template
(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();