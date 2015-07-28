/*
* Jquery Mobile Routes
*/

var webService = "/backend/index.php/";
var expresion_email = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i; 
var seconds = 10;
var time = null;
var directory_profile = 'media/profile_users/';
var directory_biography = 'media/biography_users/';
var count = 4;

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
    "#questions": {handler: "questions", events: "s" },
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
        
        if(localStorage.getItem('log') == 'true'){
            $('.terms .container_btn a').hide();
            $('.terms .container_btn a').eq(2).show().unbind('click').click(function(){
                history.back();
            });
        }
        else{
            $('.terms .container_btn a').show();
            $('.terms .container_btn a').eq(2).hide();
        }
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
            $.mobile.changePage(url,{role:'page',transition:'fade'});
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
        
        $('.content_profile .data_user span.name').unbind('blur').blur(function(){
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
        
        $('.content_profile .data_user span.username').unbind('keyup').keyup(function(e){
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
    questions : function(type,match,ui){
        $('ul.tabs').tabs();
        
        $('select').material_select();
        
        $('#sortable').sortable();
        
        $('.forms_contents div').eq(0).addClass('active');
        
        $('button[data-url="#create_question"]').unbind('click').click(function(){
            var $id_mode_game = $('#mode_game').val();
            var $id_level_game = $('#level_mode').val();
            var $id_level_category = "";
            var $question = $('#question').val();
            var $type_question = $('#type_question').val();
            var $correct_answer = '';
            var $data_question = [];
            
            if($id_mode_game == ""){
                message('El campo de modo de pregunta no puede estar vacío');
                $('#mode_game').parent().find('input[type=text]').focus();
            }else if($id_level_game == ""){
                message('El campo del nivel de la pregunta no puede estar vacía');
                $('#level_mode').parent().find('input[type=text]').focus();
            }else if($question == ""){
                message('El campo de la pregunta no puede estar vacía');
                $('#question').focus();
            }else if($question.length < 12){
                message('El campo de la pregunta no puede tener menos de 12 caracteres');
                $('#question').focus();
            }else if($type_question == ""){
                message('El campo del tipo de pregunta no puede estar vacío');
                $('#type_question').parent().find('input[type=text]').focus();
            }else{
                if($id_level_game == 1 || $id_level_game == 2 || $id_level_game == 3){
                    $id_level_category = $('#category_level').val();
                }else{
                    $id_level_category = "";
                }
                if($type_question == 1){
                    for (var i = 0; i <  $('#sortable_choice li').length; i++) 
                        $data_question[i] =  $('#sortable_choice li').eq(i).find('span').text();
                }else if($type_question == 2){
                    if( $('input[name=yes_no]:checked').val() == 'yes')
                        $data_question[0] = 'si';
                    else
                        $data_question[0] = 'no';
                }else if($type_question == 3){
                    for (var i = 0; i <  $('#sortable li').length; i++)
                        $data_question[i] =  $('#sortable li').eq(i).find('span').text();
                }
                loader('Registrando Pregunta');
                $.ajax({
                    url         : webService + 'register_question',
                    type        : 'POST',
                    data        : {
                        id_level_game       : $id_level_game,
                        id_mode_game        : $id_mode_game,
                        id_level_category   : $id_level_category,
                        question            : $question,
                        type_question       : $type_question,
                        structure_question  : $type_question,
                        correct_answer      : split($data_question) 
                    },
                    success                 : function(res){
                        var data = JSON.parse(res);
                        
                        if(data.status == "OK"){
                            $('.loader').fadeOut(1500);
                            setTimeout(function(){
                                message(data.message);
                                $('button[data-url="#cancel_question"]').click();
                            },1000);
                        }else{
                            $('.loader').fadeOut(1000);
                            setTimeout(function(){
                                message(data.message);
                            },1200);
                        }
                    }
                });
            }
        });
        
        $('.tabs a').unbind('click').click(function(){
            var tab = $(this).attr('href');
            
            $('.forms_contents > div').removeClass('active');
            setTimeout(function(){ $(tab).addClass('active'); } , 500);
            
            if(tab == "#show_questions")
                evt_all_questions_show('all');
            else if(tab == "#update_question")
                evt_all_questions('actives');
                
            $('input[name="active_questions"]').unbind('change').change(function(){
                var filter = $('input[name="active_questions"]:checked').val();
                evt_all_questions_show(filter);
            });
        });
        
        $('#mode_game').unbind('change').change(function(){
            var id_mode_game = $(this).val();
            $('.level_mode').fadeOut(50);
            if(id_mode_game != ""){
                $.ajax({
                    url         : webService + 'levels_mode',
                    type        : 'POST',
                    data        : {
                        id      : id_mode_game
                    },
                    success     : function(response){
                        var data = JSON.parse(response);
                        
                        $("#level_mode").empty();
                        $("#level_mode").append('<option value="">Seleccione un nivel</options>');
                        $('.level_game').fadeIn(1000);
                        if(data.length==0){
                            $('#level_mode').html('No hay resultados para este modo');
                        }else{
                            data.forEach(function(i,o){
                                $("#level_mode").append(tmpl("levels_mode_template", i));
                            });
                            $('select').material_select();
                            $('#level_mode').unbind('change').change(function(){
                                var id_level_game = $(this).val();
                                if(id_level_game != ""){
                                    $.ajax({
                                        url         : webService + 'category_level',
                                        type        : 'POST',
                                        data        : {
                                            id      : id_level_game
                                        },
                                        success     : function(res){
                                            data = JSON.parse(res);
                                            
                                            $('#category_level').empty();
                                            $('.level_mode').fadeIn(1000);
                                            if(data.length==0){
                                                $('#category_level').html('<option>No hay resultados para este nivel</option>');
                                            }else{
                                                $('#category_level').append('<option value="">Seleccione una categoria</options>');
                                                data.forEach(function(i,o){
                                                    $("#category_level").append(tmpl("category_level_template", i));
                                                });
                                            }
                                            $('select').material_select();
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
        
        $('#modify_questions,#desactivate_questions').unbind('change').change(function(){
            var $id_question = $(this).val();
            
            $.ajax({
                url         : webService + 'data_question',
                type        : 'POST',
                data        : {
                    id      : $id_question
                },
                success     : function(res){
                    var data = JSON.parse(res);
                    var mode_game = "";
                    
                    if(data.id_mode_game == 1)
                        mode_game = "Carrera";
                    else if(data.id_mode_game == 2)
                        mode_game = "Examen";
                    else if(data.id_mode_game == 3)
                        mode_game = "Especialidad";
                    else if(data.id_mode_game == 4)
                        mode_game = "Litigio";
                    else if(data.id_mode_game == 5)
                        mode_game = "Duelo";
                }
            });
        });
        
        $('#type_question').unbind('change').change(function(){
            var type = $(this).val();
            count = 4;
            $('.structure > div').hide(50);
            $('#sortable').empty();
            $('#sortable_choice').empty();
            $('.structure .order_questions .input input').removeAttr('disabled').attr('placeholder','Ingrese las preguntas ('+(count)+')');
            $('.structure .order_questions .input i').css('z-index','1');
            $('.structure .multiple_choice .input input').removeAttr('disabled');
            $('.structure .multiple_choice .input i').css('z-index','1');
            
            if(type == 1)
                $('.structure .multiple_choice').fadeIn(1000);
            else if(type == 2)
                $('.structure .yes_no').fadeIn(1000);
            else if(type == 3)
                $('.structure .order_questions').fadeIn(1000);
            else
                $('.structure > div').hide(50);
        });
        
        $('.structure .multiple_choice .input i').unbind('click').click(function(){
            var question = $(this).parent().find('input').val();
            
            evt_append_question_choice(question);
        });
        
        $('.structure .multiple_choice .input input').unbind('keyup').keyup(function(e){
            var question = $(this).val();
            
            if(e.keyCode == 13)
                evt_append_question_choice(question);
        });
        
        $('.structure .order_questions .input i').unbind('click').click(function(){
            var question = $(this).parent().find('input').val();
            
            evt_append_question(question);
        });
        
        $('.structure .order_questions .input input').unbind('keyup').keyup(function(e){
            var question = $(this).val();
            
            if(e.keyCode == 13)
                evt_append_question(question);
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
        
        $('#btn_start').unbind('click').click(function(){
            var role = localStorage.getItem('role_user');
            
            if(role == 'admin')
                $.mobile.changePage('#dashboard_admin?user='+id,{role: 'page',transition: 'fade'});
            else
                $.mobile.changePage('#dashboard?user='+id,{role: 'page',transition: 'fade'});
        });
        
        $('#home .wrapper .container_btn').fadeIn(1000);
        $('#home .wrapper .container_register,#home .wrapper .container_login').hide(10);
    }else{
        $('#home .wrapper .container_btn').eq(0).hide(10);
        $('#home .wrapper .container_btn').eq(1).show(10);
        $('#home .wrapper .container_register,#home .wrapper .container_login').fadeIn(1000);
        $('#btn_start').unbind('click');
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

// Event to change name user
function evt_change_name(name){
    if(name == ""){
      message('El nombre no puede estar vacio');
      $('.content_profile .data_user span.name').focus();
    }else if(name.length > 50){
      message('El nombre de usuario no puede contener mas de 50 caracteres');
      $('.content_profile .data_user span.name').focus();
    }else{
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
                    setTimeout(function(){
                        message(data.message);
                        panel_data(localStorage.getItem('id_user'));
                        $('.content_profile .data_user span.name').removeClass('success error');
                    },800);
                }else{
                    setTimeout(function(){
                        message(data.message);
                        $('.content_profile .data_user span.name').focus().removeClass('success error');
                    },800);
                }
              }
          });
    }
}

// Event to change username
function evt_change_username(username){
    if(username == ""){
      message('El nombre no puede estar vacio');
      $('.content_profile .data_user span.username').focus();
    }else if(username.length > 50){
      message('El nombre de usuario no puede contener mas de 50 caracteres');
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
                    $('.content_profile .data_user span.username').removeClass('success error');
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
      $('.content_profile .data_user span.username').focus().removeClass('error success');
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

// Event to get all questions
function evt_all_questions(filter){
    $.ajax({
        url         : webService + 'all_questions/'+filter,
        type        : 'POST',
        data        : null,
        success     : function(res){
            var data = JSON.parse(res);
            
            $('#modify_questions,#desactivate_questions').empty();
            $('#modify_questions,#desactivate_questions').append('<option value="">Seleccione una pregunta</option>');
            
            data.forEach(function(i,o){
                i.mode_game = "";
            
                if(i.id_mode_game == 1)
                    i.mode_game = "Carrera";
                else if(i.id_mode_game == 2)
                    i.mode_game = "Examen";
                else if(i.id_mode_game == 3)
                    i.mode_game = "Especialidad";
                else if(i.id_mode_game == 4)
                    i.mode_game = "Litigio";
                else if(i.id_mode_game == 5)
                    i.mode_game = "Duelo";
                $("#modify_questions,#desactivate_questions").append(tmpl("all_questions_template", i));
            });
            
            $('select').material_select();   
        }
    });
}

// Event to get all questions
function evt_all_questions_show(filter){
    $(".content_question_show").empty();
    // debugger;
    $.ajax({
        url         : webService + 'all_questions/'+filter,
        type        : 'POST',
        data        : null,
        success     : function(res){
            var data = JSON.parse(res);
            data.forEach(function(i,o){
                i.mode_game = "";
                i.t_question = "";
            
                if(i.id_mode_game == 1)
                    i.mode_game = "Carrera";
                else if(i.id_mode_game == 2)
                    i.mode_game = "Examen";
                else if(i.id_mode_game == 3)
                    i.mode_game = "Especialidad";
                else if(i.id_mode_game == 4)
                    i.mode_game = "Litigio";
                else if(i.id_mode_game == 5)
                    i.mode_game = "Duelo";
                    
                if(i.type_question == 1)
                    i.t_question = "Selección múltiple";
                else if(i.type_question == 2)
                    i.t_question = "Si / No";
                else if(i.type_question == 3)
                    i.t_question = "Ordenamiento";
                    
                if(i.state == 'active')
                    i.state = 'Activa'
                else
                    i.state = "Inactiva";

                $(".content_question_show").append(tmpl("all_questions_show", i));
                
                $('.menu_question .desactivate').unbind('click').click(function(){
                    var id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    
                    evt_question('active',id);
                });
                $('.menu_question .activate').unbind('click').click(function(){
                    var id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    
                    evt_question('inactive',id);
                });
            });
        }
    });
}

// Event to append question on the ol
function evt_append_question(question){
    if(question == ""){
        message('Ingrese una pregunta que no este en blanco');
        $('.structure .order_questions .input input').focus();
    }else{
        var items = $('#sortable > li');
        $('#sortable').append('<li><span>' + question + '</span><i class="large material-icons">delete</i></li>');
        $('.structure .order_questions .input input').val('').focus().attr('placeholder','Ingrese las preguntas ('+(--count)+')');
        if(items.length == 3){
            $('.structure .order_questions .input input').attr('disabled','true');
            $('.structure .order_questions .input i').css('z-index','-1');
        }
        $('#sortable li i').unbind('click').click(function(e) {
            $(this).parent().remove();
            $('.structure .order_questions .input input').val('').focus().attr('placeholder','Ingrese las preguntas ('+(++count)+')');
            $('.structure .order_questions .input input').removeAttr('disabled');
            $('.structure .order_questions .input i').css('z-index','1');
        });
    }
}

// Event to append question_choice on the ol
function evt_append_question_choice(question){
    if(question == ""){
        message('Ingrese una pregunta que no este en blanco');
        $('.structure .multiple_choice .input input').focus();
    }else{
        var items = $('#sortable_choice > li');
        $('#sortable_choice').append('<li><span>' + question + '</span><i class="large material-icons">delete</i></li>');
        $('.structure .multiple_choice .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
        if(items.length == 1){
            $('.structure .multiple_choice .input input').attr('disabled','true');
            $('.structure .multiple_choice .input i').css('z-index','-1');
        }
        $('#sortable_choice li i').unbind('click').click(function(e) {
            $(this).parent().remove();
            $('.structure .multiple_choice .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
            $('.structure .multiple_choice .input input').removeAttr('disabled');
            $('.structure .multiple_choice .input i').css('z-index','1');
        });
    }
}

// Function for split array
function split(array){
    var string = "";
    for (var i = 0; i < array.length; i++) {
        if(i < array.length - 1)
            string += array[i] + ',';
        else
            string += array[i];
    }
    return string;
}

// Evt to activate or deactivate question
function evt_question(param, $id){
    
    if(param == "inactive")
        loader('Activando Pregunta');
    else
        loader('Desactivando Pregunta');
        
    // debugger;
    $.ajax({
        url         : webService + 'question/' + param,
        type        : 'POST',
        data        : {
            id      : $id
        },
        success     : function(res){
            var data = JSON.parse(res);
            $('.loader').fadeOut(500);
            setTimeout(function(){
                if(data.status == 'OK')
                    message(data.message);
                else
                    message(data.message);
                
                $('input[name="active_questions"]').removeAttr('checked');
                
                evt_all_questions_show(data.ref);
            },700);
        }
    });
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