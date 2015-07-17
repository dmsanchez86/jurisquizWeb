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
    "#friends": {handler: "friends", events: "s" },
    "#race": {handler: "race", events: "s" },
    "#start_race": {handler: "start_race", events: "s" },
    "#duel": {handler: "duel", events: "s" },
    "#duel_users": {handler: "duel_users", events: "s" },
    "#search_duel": {handler: "search_duel", events: "s" },
    "#win_duel": {handler: "win_duel", events: "s" },
    "#profile": {handler: "profile", events: "s" },
},{
    home: function(type,match,ui){
        validate_login();
        
        clean_login();
        
        hide_nav_button();
        
        // Button Login
        $('.btn_login').unbind('click').click(function(){
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
            console.log(first_view);
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
            
            // Ajax for all data user
            $.ajax({
                type    : 'POST',
                url     : webService+'user_data',
                data    : {
                    id  : $id
                },
                success : function(response){
                    var data = JSON.parse(response);
                    
                    console.log(data);
                    
                    $('.points em').text(data.points);
                    $('.data_user .name').text(data.name);
                    $('.data_user .email').text(data.email);
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
                    
                    console.log(data);
                    
                    var list_users = $('.friends ul');
                    var data_users = {};
                    
                    list_users.empty();
                    
                    for (var i = 0; i < data.length; i++) {
                        if(i < 3){
                            list_users.append('<li>'+data[i].name+' '+data[0].points+'</li>');
                        }
                    }
                }
            });
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
    },
    race: function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            console.log(':)');
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
            console.log(':)');
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
    profile : function(type,match,ui){
        nav_menu();
        
        show_nav_button();
        
        evt_logout();
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
        Materialize.toast('<div><h3><em>!Welcome To Jurizquiz Game!</em></h3><div><div><p>Click in the button <b>"Acceder"</b> to enter the game</p></div><div><p>Or click on the button <b>"Register"</b> to enjoy the game of questions.</p></div>',2000);
    }else if(param == "null fields"){
        Materialize.toast('<div class="error"><h2>¡No Pueden Haber Campos Vaciós!</h2></div>',2000);
    }else if(param == "user isn\'t exist"){
        Materialize.toast('<div class="no-register"><h4>¡El usuario No Esta Registrado!</h4></div>',2000);
    }else{
        Materialize.toast('<div><h3><em>'+param+'</em></h3></div>',2000);
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
        $.mobile.changePage('#dashboard?user='+id_user,{role: 'page',transition: 'fade'})
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
                        $.mobile.changePage('#dashboard?user='+data.id_user,{role: 'page',transition:"flip"});
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
    
    $('.nav_button .nav a').on('click',function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        
        if(url != "#"){
            $.mobile.changePage(url,{role:'page',transition: 'pop'});
        }
    });
}

// Show Nav-Menu
function nav_menu(){
    var window_width = window.innerWidth;
    
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