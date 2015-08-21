/*
* Jquery Mobile Routes
*/

var webService = "http://98.142.105.122/~jurisquiz/backend/index.php/";
var expresion_email = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i; 
var seconds = 10;
var time = null;
var directory_profile = 'media/profile_users/';
var directory_biography = 'media/biography_users/';
var count = 6;
var count_id = 6;
var count_timer = null;
var questions_duel = [];
var ids_questions_duel = [];
var correct_answers_user_duel = 0;
var params_url = {};
var corrects_questions = 0;
var cont = true;

var router = new $.mobile.Router({
    "#home": {handler: "home", events: "s" },
    "register.html": {handler: "register", events: "s" },
    "terms.html": {handler: "terms", events: "s" },
    "dashboard.html": {handler: "dashboard", events: "s" },
    "dashboard_admin.html": {handler: "dashboard_admin", events: "s" },
    "notifications.html": {handler: "notifications", events: "s" },
    "friends.html": {handler: "friends", events: "s" },
    "race.html": {handler: "race", events: "s" },
    "start_race.html": {handler: "start_race", events: "s" },
    "duel.html": {handler: "duel", events: "s" },
    "duel_users.html": {handler: "duel_users", events: "s" },
    "search_duel.html": {handler: "search_duel", events: "s" },
    "win_duel.html": {handler: "win_duel", events: "s" },
    "test.html": {handler: "test", events: "s" },
    "start_test.html": {handler: "start_test", events: "s" },
    "specialty.html": {handler: "specialty", events: "s" },
    "startGamespeciality.html": {handler: "startGamespeciality", events: "s" },
    "startGamelitigation.html": {handler: "startGamelitigation", events: "s" },
    "start_specialty.html": {handler: "start_specialty", events: "s" },
    "litigation.html": {handler: "litigation", events: "s" },
    "start_litigation.html": {handler: "start_litigation", events: "s" },
    "profile.html": {handler: "profile", events: "s" },
    "questions.html": {handler: "questions", events: "s" },
    "specialties.html": {handler: "specialties", events: "s" },
    "report_question.html": {handler: "report_question", events: "s" },
},{
    home: function(type,match,ui){
        validate_login();
        
        clean_login();
        
        hide_nav_button();
        
        remove_drag();
        
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
        
        remove_drag();
        
        $('select').material_select();
        
        // Button Register 
        $('.btn_register').unbind('click').click(function(e){
          e.preventDefault();
          evt_register();
        });
      
        $('button[data-role="back"]').unbind('click').click(function(){
            back();
        });
      
        // Text
        $('#email_r,#password_r,#password_c').unbind('keyup').keyup(function(e){
            if(e.keyCode == 13)
                evt_register();
        });
    },
    terms: function(type,match,ui){
        hide_nav_button();
        
        remove_drag();
        
        if(localStorage.getItem('log') == 'true'){
            $('.terms .container_btn a').hide();
            
            // button to back in terms
            $('.terms .container_btn a').eq(2).show().unbind('click').click(function(){
                back();
            });
        }
        else{
            $('.terms .container_btn a').show();
            $('.terms .container_btn a').eq(2).hide();
        }
    },
    dashboard: function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        // Params
        var params = router.getParams(match[1]); 
        
        if(params == null){
            var log = localStorage.getItem('log');
            
            if(log != 'true'){
                $.mobile.changePage('index.html#home',{role: 'page',transition: 'slide'});
            }
        }else{
            var $id = params.user;
        }
        
        if($id == null || $id == undefined || $id == ""){
            $.mobile.changePage('index.html#home',{role: 'page',transition: 'slide'})
        }else{
            localStorage.setItem('log','true');
            localStorage.setItem('id_user',$id);
            
            panel_data($id);
            
            evt_notifications();
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
        
        remove_drag();
        
        // Params
        var params = router.getParams(match[1]); 
        
        if(params == null){
            var log = localStorage.getItem('log');
            
            if(log != 'true'){
                $.mobile.changePage('index.html#home',{role: 'page',transition: 'slide'});
            }
        }else{
            var $id = params.user;
        }
        
        if($id == null || $id == undefined || $id == ""){
            $.mobile.changePage('index.html',{role: 'page',transition: 'slide'})
        }else{
            localStorage.setItem('log','true');
            localStorage.setItem('id_user',$id);
            
            panel_data($id);
            
            evt_notifications();
        }
        
        // Events for buttons
        $('.games button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role:'page',transition:'fade'});
        });
    },
    notifications: function(type,match,ui){
        remove_drag();
        
        // Button to accept duel
        $('.btns .accept').unbind('click').click(function(e){
            var id_duel = $(this).parent().parent().parent().parent().attr('id-duel');
            var id_notification = $(this).parent().parent().parent().parent().attr('id-notification');
            
            // ajax to accept duel
            $.ajax({
                url         : webService + 'accept_duel',
                type        : 'POST',
                data        : {
                    id                  : id_duel,
                    id_notification     : id_notification
                },
                success     : function(res){
                    var data = JSON.parse(res);
                    
                    if(data.status == 'OK'){
                        message(data.message);
                        loader('Cargando Duelo...');
                        
                        setTimeout(function(){ $.mobile.changePage('duel_users.html?id_duel=' + data.metadata.id + '&id_user_1=' + data.metadata.id_user_1 + '&id_user_2=' + data.metadata.id_user_2 + '&ref=accept' ,{role:'page',transition: 'flip'}); },2000);
                    }else{
                        message(data.message);
                    }
                }
            });
        });
        
        // Button to reject duel
        $('.btns .reject').unbind('click').click(function(e){
            var id_duel = $(this).parent().parent().parent().parent().attr('id-duel');
            var id_notification = $(this).parent().parent().parent().parent().attr('id-notification');
            
            // ajax for cancel duel
            $.ajax({
                url         : webService + 'cancel_duel',
                type        : 'POST',
                data        : {
                    id      : id_duel,
                    id_notification      : id_notification
                },
                success     : function(res){
                    var data = JSON.parse(res);
                    
                    if(data.status == 'OK'){
                        message(data.message);
                        back();
                    }else{
                        message(data.message);
                    }
                }
            });
            
        });
        
        // button to back last page
        $('.container_btn button').unbind('click').click(function(e){
            back();
        });
    }, 
    friends: function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        var $id = localStorage.getItem('id_user');
        
        panel_data($id);
        
        $('.content_friends').empty();
        
        // Ajax for all users
        $.ajax({
            url     : webService + "users/users",
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
        icon_mode_game('.race','race');
        
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        hide_timer();
        
        // Evt buttons to dashboard
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            loader('Cargando');
            
            $('.start_race .wrapper > div').hide(50);
            $('.start_race .levels_content').empty();
            
            var link = $(this).attr('data-url');
            $.mobile.changePage(link,{role: 'page',transition: 'pop'});
        });
    },
    start_race : function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        hide_nav_button();
        
        evt_logout();
        
        questions('.start_race', null);
        
        validate_questions();
        
        var params = router.getParams(match[1]);
        var $id_level_game = params.id;
        var $name_level = params.level;
        
        $('.start_race .levels_content .level').removeClass('active');
        
        // ajax to get categories of each level game
        $.ajax({
            url         : webService + 'categories_level',
            type        : 'POST',
            data        : {
                id      : $id_level_game
            },
            success     : function(res){
                var data = JSON.parse(res);
                
                data.forEach(function(i,o){
                    i.gender = localStorage.getItem('gender_user');
                    i.index = o;
                    $('.start_race .levels_content').append(tmpl('start_race_categories',i));
                });
                
                var obj = {
                    id  : localStorage.getItem('id_user')
                };
                
                evt_validate_mode_game(obj,$name_level,$id_level_game);
                
                $('.loader').fadeOut(1000);
            }
        });
    },
    duel: function(type,match,ui){
        icon_mode_game('.duel','duel');
        
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        // Event to start mode duel
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role: 'page',transition: 'fade'});
        });
    },
    search_duel: function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        hide_timer();
        
        // ajax to get all user less my user
        $.ajax({
            url         : webService + 'users/users_less_me',
            type        : 'POST',
            data        : {
                id      : localStorage.getItem('id_user')
            },
            success     : function(res){
                var data = JSON.parse(res);
                
                $('.search_duel .list_users').empty();
                
                data.forEach(function(i,o){
                    i.index = o;
                    $('.search_duel .list_users').append(tmpl('each_user_duel',i));
                });
                
                setTimeout(function() {
                    $('.search_duel .duel_link a').unbind('click').click(function(e){
                        e.preventDefault();
                        var url = $(this).attr('data-url');
                        
                        var id_friend = url.split('=')[1];
                        
                        loader('Retando colega...');
                        
                        // ajax to insert data duel and result duel
                        $.ajax({
                            url     : webService + 'duel',
                            type    : 'POST',
                            data    : {
                                id_user     : localStorage.getItem('id_user'),
                                id_friend   : id_friend
                            },
                            success : function(res){
                                $('.loader').fadeOut(500);
                                var response = JSON.parse(res);
                                
                                if(response.status == 'OK'){
                                    message(response.message);
                                    setTimeout(function(){ loader('Cargando Duelo...'); },2000);
                                    setTimeout(function(){ 
                                        $.mobile.changePage('duel_users.html?id_duel=' + response.data_duel.id + '&id_user_1=' + response.data_duel.id_user_1 + '&id_user_2=' + response.data_duel.id_user_2 ,{role:'page',transition: 'pop'}); 
                                    },2500);
                                }else{
                                    message(response.message);
                                }
                            }
                        });
                    });
                }, 300);
            }
        });
    },
    duel_users: function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        hide_nav_button();
        
        evt_logout();
        
        // Params
        var params = router.getParams(match[1]);
        
        if(params == null){
            var log = localStorage.getItem('log');
            
            if(log != 'true')
                $.mobile.changePage('index.html#home',{role: 'page',transition: 'slide'});
        }else{
            $('.loader').fadeOut(1000);
            var $id_duel = params.id_duel;
            var $id_user_1 = params.id_user_1;
            var $id_user_2 = params.id_user_2;
            var $ref = params.ref;
        }
        
        var $id_user = '';
        
        params_url = {
            id_duel     : $id_duel,
            id_user_1   : $id_user_1,
            id_user_2   : $id_user_2
        };
        
        if($ref == 'accept'){
            $id_user = $id_user_1;
            
            // ajax to get all data duel
            $.ajax({
                url     : webService + 'data_duel',
                type    : 'POST',
                data    : {
                    id_duel : $id_duel
                },
                success : function(res){
                    var data = JSON.parse(res);
                    
                    ids_questions_duel = data[0].duel_questions.split('/');
                    
                    questions('.duel_users',null);
                }
            });
        }else{
            $id_user = $id_user_2;
            
            questions('.duel_users',null);
            
            setTimeout(function(){
                var ids = [];
                for(var i = 0; i < questions_duel.length; i++)
                    ids[i] = questions_duel[i].id;
                    
                // Ajax to insert questions in database 
                $.ajax({
                    url         : webService + 'questions_duel',
                    type        : 'POST',
                    data        : {
                        id_duel     : $id_duel,
                        metadata    : ids.join('/')
                    },
                    success     : function(res){
                        var data = JSON.parse(res);
                        
                        if(data.status != 'OK')
                            message(data.message);
                    }
                });
            },500);
        }
        
        // ajax to get data user
        $.ajax({
            url     : webService + 'user_data_id',
            type    : 'POST',
            data    : {
                id  : $id_user
            },
            success : function(res){
                var data = JSON.parse(res);
                
                $('.opponent .image').find('img').attr('src','img/levels/level'+ data.level + data.gender +'.png');
                $('.opponent .image').find('span').text(data.name);
            }
        });
        
        setTimeout(function(){
            
            // Get all contents of questions
            $('.duel_users .content_start_game .content_question').addClass('duel_options');
            var content_questions = $('.duel_users .content_start_game .content_question');
            content_questions.eq(0).addClass('active').show();
            
            clearInterval(count_timer);
            
            setTimeout(function(){
                $('.duel_users .wrapper .content_start_game').show(50).css('transform','scale(1)');
                setTimeout(function(){
                    show_timer(15, '.duel_users');
                    $('.duel_users div[data-role="header"] .top_questions').css('opacity','1');
                },1000);
            },1000);
            
            // Click in the answers to validate which is correct
            $('.duel_users .content_question input[type=radio]').unbind('click').click(function(e){
                var type_question = $('.duel_users .content_question.active').attr('type-question');
                var answer_ = '';
                var correct_answer = '';
                
                if(type_question == 1){
                    answer_ = $('.duel_users .content_question.duel_options.active input[type=radio]:checked').val();
                    correct_answer = $('.duel_users .content_question.duel_options.active').attr('correct-answer');
                    
                    if(answer_ == correct_answer){
                        hide_timer();
                        ++corrects_questions;
                        ++correct_answers_user_duel;
                        evt_next_question_test('.duel_users',corrects_questions,params_url);
                    }else{
                        evt_next_question_test('.duel_users',corrects_questions,params_url);
                        message('La respuesta es incorrecta');
                    }
                }
            });
        },500);
    },
    win_duel : function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        nav_menu();
        
        hide_timer();
        
        // Event to start mode test
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role: 'page',transition: 'fade'});
        });
    },
    test :function(type,match,ui){
        icon_mode_game('.test','test');
        
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        hide_timer();
        
        // Event to start mode test
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role: 'page',transition: 'fade'});
        });
    },
    start_test :function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        hide_nav_button();
        
        evt_logout();
        var list;
        var arrayId = [];
        var $id_specialty=1;
        
        list= JSON.parse(listSpecialties('actives'));
        
        list.forEach(function(element,index){
            
            arrayId.push(element.id);
        });
        
        $id_specialty = arrayId[Math.floor(Math.random() * arrayId.length)];
        
        //lista de especialidades
        //$('.start_test .wrapper .content_start_game').show(50).css('transform','scale(1)');
        //$('button[data-url="start_mode_game"]').fadeIn(500);
        
        /*
        questions('.start_test',null);
        
        $('.start_test .wrapper > div,.start_test div[data-role="header"] .top_questions').hide(50);
        */
        $('.start_test .wrapper .content_start_game').show(50).css('transform','scale(1)');
        $('.start_test .wrapper .start').fadeIn(500);
        
        
        // Click to start to reply the questions mode race
        $('button[data-url="start_mode_game"]').unbind('click').click(function(){
            
           
            // Click in the answers to validate which is correct
                    
                loader('Cargando preguntas');
                
                $('.start_test div[data-role="header"] .top_questions').fadeIn(500);
                
                // ajax to find question by id
                $.ajax({
                    url     : webService + "find_question",
                    type    : 'POST',
                    data    : {
                        id_specialty    : $id_specialty
                    },
                    success : function(res){
                        var data = JSON.parse(res);
                        
                        hide_timer();
                        $('.start_test .wrapper .start').fadeOut(500);
                        questions('.start_test', data);
                        
                        $('.loader').fadeOut(1000);

                        var content_questions = $('.start_test .content_question');
                        var corrects_questions = 0;
                        var canPreguntas = $('.start_test .content_question').length;
                        var con= 0;
                        var respuestas= [];
                        var itemRespuesta = {};
        
                        $('.start_test .content_question').addClass('test_options');
                        content_questions.eq(0).addClass('active').fadeIn(500);
                        show_timer(15, '.start_test');
                        
                        $('.start_test .content_question.test_options input[type=radio]').unbind('click').click(function(e){
                            hide_timer();
                            var answer_ = $('.start_test .content_question.test_options.active input[type=radio]:checked').val();
                            var correct_answer = $('.start_test .content_question.test_options.active').attr('correct-answer');
                            
                            if(answer_ == correct_answer){
                                
                                itemRespuesta.pregunta = answer_;
                                itemRespuesta.respuesta= correct_answer;
                                itemRespuesta.correcta = true;
                                respuestas.push(JSON.stringify(itemRespuesta));
                                
                                message('La respuesta es correcta');
                                ++corrects_questions;
                                $(this).next().addClass('correct_answer');
                               
                            }else{
                                
                                itemRespuesta.pregunta = answer_;
                                itemRespuesta.respuesta= correct_answer;
                                itemRespuesta.correcta = false;
                                respuestas.push(JSON.stringify(itemRespuesta));
                                
                                var opciones = $('.start_test .content_question.test_options.active .answers_options .answer input');
                                //lista de respuestas
                                opciones.each(function(indice, elemento) {
                                   
                                   if ($(elemento).val() === correct_answer) {
                                       $(elemento).next().addClass('correct_answer');
                                   }
                                   
                                });
                                
                                message('La respuesta es incorrecta');
                                $(this).next().addClass('incorrect_answer');
                                
                                
                            }
                            
                            if(canPreguntas > con){
                                con++;
                                
                                setTimeout(function(){
                                     evt_next_question_test('.start_test',corrects_questions);
                                },3000);
                               
                            }
                            if(canPreguntas == con){
                                 hide_timer();
                                respuestas.forEach(function(index,element){
                               
                                    var compiled = tmpl("template_each_finalGame", JSON.parse(index));
                                    $("#start_test table tbody").append(compiled);
                                    
                                    setTimeout(function(){ $("#start_test table.resultado").fadeIn(1000); }, 1000);
                                });
                    
                            }
                            
                        });
                        
                    }
                });
                    
                
            
        });
    },
    specialty :function(type,match,ui){
        icon_mode_game('.specialty','specialty');
        
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role: 'page',transition: 'slide'});
        });
    },
    startGamespeciality :function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        hide_nav_button();
        
        evt_logout();
        
        var params = router.getParams(match[1]);
       
        $.ajax({
            url: webService + "find_question",
            type: 'POST',
            data: {
                id_specialty:params.id
            },
            success: function(response){
                var data = JSON.parse(response);
                var con = 0;
                var respuestas= [];
                var itemRespuesta = {};
                var questions = data.random();
                
                questions.forEach(function(i,o){
                    i.key = o; 
                    $('#content_startSpeciality').append(tmpl('structure_question',i));
                });
                    
                //cantidad de Preguntas
                var canPreguntas = $('#content_startSpeciality .content_question').length;
                $('.start_specialty div[data-role="header"] .top_questions .content_questions .rank').text((canPreguntas));
                
                $('#content_startSpeciality').show(50).css('transform','scale(1)');
                $('#content_startSpeciality .content_question').eq(con).addClass('active').fadeIn(500);
                
                $('#content_startSpeciality .content_question input[type="radio"]').unbind('click').click(function(e){
                    var respuesta = $(this).val();
                    
                    var type_question = $('#content_startSpeciality .content_question.active').attr('type-question');
                    var id_question = $('#content_startSpeciality .content_question.active').attr('id-question');
                    var question = $('#content_startSpeciality .content_question.active .question').text();
                    var correct_answer = $('#content_startSpeciality .content_question.active').attr('correct-answer');
                    
                    if(respuesta === correct_answer){
                        
                        itemRespuesta.pregunta = question;
                        itemRespuesta.respuesta= respuesta;
                        itemRespuesta.correcta = true;
                        
                        respuestas.push(JSON.stringify(itemRespuesta));
                       
                    }else{
                           
                        itemRespuesta.pregunta = question;
                        itemRespuesta.respuesta= respuesta;
                        itemRespuesta.correcta = false;
                        respuestas.push(JSON.stringify(itemRespuesta));
                    }
                    
                    $('#content_startSpeciality .content_question').removeClass('active').fadeOut(500);
                        
                    if(canPreguntas > con){
                        con++;
                        setTimeout(function(){
                           
                            $('#content_startSpeciality .content_question').eq(con).addClass('active').fadeIn(500);
                            $('.start_specialty div[data-role="header"] .top_questions .content_questions .number_questions').text((con));
                            
                        }, 1000);
                       
                    }
                    
                    if(canPreguntas == con){
                        respuestas.forEach(function(index,element){
                            
                            var compiled = tmpl("template_each_finalGame", JSON.parse(index));
                            $("#content_startSpeciality table tbody").append(compiled);
                            
                            setTimeout(function(){ $("#content_startSpeciality table.resultado").fadeIn(1000); }, 1000);
                        });
                        
                    }
                  

                });
                
            }
        });
        
        
    },
    start_specialty :function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        hide_nav_button();
        
        evt_logout();
        
        hide_timer();
        
        $.ajax({
            url: webService + "listNamespecialty",
            type: 'POST',
            data: {},
            processData: false,
            contentType : false,
            success: function(response){
                var data = JSON.parse(response);
                
                data.forEach(function(index,element){
                   var compiled = tmpl("template_each_specialty", index);
                   $(".listTematica").append(compiled);
                });
                
                $('.listTematica .container_btn button').unbind('click').click(function(e){
                    e.preventDefault();
                    var url = $(this).attr('data-url');
                    $.mobile.changePage(url, {role: 'page', transition: 'fade'});
                });
                
            }
        });
        
       
        
    },
    litigation :function(type,match,ui){
        icon_mode_game('.litigation','litigation');
        
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        hide_timer();
        
        // event to start game litigation
        $('.content_game button').unbind('click').click(function(e){
            e.preventDefault();
            var url = $(this).attr('data-url');
            $.mobile.changePage(url,{role: 'page',transition: 'turn'});
        });
    },
    start_litigation :function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        hide_nav_button();
        
        hide_timer();
        
        evt_logout();
        
         $.ajax({
            url: webService + "listLitigationCases",
            type: 'POST',
            data: {},
            processData: false,
            contentType : false,
            success: function(response){
                var data = JSON.parse(response);
                
                data.forEach(function(index,element){
                   var compiled = tmpl("template_each_litigationCase", index);
                   $("#listCases").append(compiled);
                    
                });
                
                $('#listCases .container_btn button').unbind('click').click(function(e){
                    e.preventDefault();
                    var url = $(this).attr('data-url');
                    $.mobile.changePage(url,{role: 'page',transition: 'fade'});
                });
                
            }
        });
    },
    startGamelitigation :function(type,match,ui){
        nav_menu();
        
        hide_timer();
        
        hide_nav_button();
        
        evt_logout();
        
        var params = router.getParams(match[1]);
        
        $.ajax({
            url: webService + "all_caseLitigation",
            type: 'POST',
            success: function(response){
                
                var data = JSON.parse(response);
                var con = 0;
                var respuestas= [];
                var itemRespuesta = {};
                var questions = data.random();
                
                questions.forEach(function(i,o){
                    i.key = o; 
                    $('#content_startLitigation').append(tmpl('structure_litigation',i));
                });
                
                var cantCases = $('#content_startLitigation .content_question ').length;
                var time= 10;
                var cases = [];
                
                $('#content_startLitigation .content_question').each(function (index) {
                    cases.push($(this).attr("id-case"));
                });
                
                setTimeout(function(){
                    //Caso de a cuerdo al id
                    $('#content_startLitigation').show(50).css('transform','scale(1)');
                    $('#content_startLitigation .content_question#case_'+ params.id).fadeIn(500);
                    
                    setTimeout(function(){
                        timerLitigation(10,'#content_startLitigation .content_question#case_',params.id,false);
                    },500);
                    
                },1000);
                
                $('#content_startLitigation .content_question .question .container_btn button').unbind('click').click(function(e){
                    e.preventDefault();
                    hide_timer();
                    
                    var idCase = $(this).attr('data-id');
                    var deleteItem;
                    $('#content_startLitigation .content_question#case_'+ idCase +' .litigio_titulo').fadeOut(500);
                    
                    if (cases.length != 0) {
                        //lista de casos
                        cases.forEach(function(value,index) {
                            
                            if (idCase === value) {
                                deleteItem = index;
                                //cases.random();
                            }
                            
                        });
                        
                        cases.splice(deleteItem,1);
                        
                        if (cases.length != 0) {
                            
                            setTimeout(function(){
                            idCase = cases[0];
                            //Caso de a cuerdo al id
                            $('#content_startLitigation .content_question#case_'+ idCase).fadeIn(500);
                            setTimeout(function(){
                                timerLitigation(10,'#content_startLitigation .content_question#case_',idCase,false);
                            },500);
                                
                            },1000);
                        }
                        
                
                    }
                    if (cases.length == 0) {
                    
                       hide_timer();

                        //mensaje fin casos
                        $("#content_startLitigation .volver").fadeIn(500);
                        
                    }
                
                    
                });
                
                $('#content_startLitigation .volver button').unbind('click').click(function(e){
                    e.preventDefault();
                    var url = $(this).attr('data-url');
                    $.mobile.changePage(url,{role: 'page',transition: 'turn'});
                });
                
                $('#content_startLitigation .content_question input[type="radio"]').unbind('click').click(function(e){
                    e.preventDefault();
                    hide_timer();
                    var respuestas= [];
                    var itemRespuesta = {};
                    var respuesta = $(this).val();
                    var idCase = $(this).attr('id-case');
                    var question = $('#content_startLitigation .content_question#case_'+ idCase+' .pregunta .question').text();
                    var correct_answer = $('#content_startLitigation .content_question#case_'+ idCase).attr('correct-answer');
                    
                    $('#content_startLitigation .content_question#case_'+ idCase).fadeOut(500);
                    
                    if(respuesta === correct_answer){
                        
                        itemRespuesta.pregunta = question;
                        itemRespuesta.respuesta= respuesta;
                        itemRespuesta.correcta = true;
                        
                        respuestas.push(JSON.stringify(itemRespuesta));
                        
                        respuestas.forEach(function(index,element){
                                
                            var compiled = tmpl("template_each_finalGame", JSON.parse(index));
                            
                            $("#content_startLitigation table tbody").append(compiled);
                    
                            setTimeout(function(){
                
                                $("#content_startLitigation table.resultado").fadeIn(1000);
                            
                            }, 1000);
                        
                        });
                        
                        var points = 1;
                        var id = localStorage.getItem('id_user');
                        
                        $.post( webService + "points_test", { id: id, points: points })
                        .done(function( data ) {
                            
                            data = JSON.parse(data);
                            
                            if(data.status === "OK")
                                message( data.metadata.name +' Puntos en total: '+ points);
                            else
                                message('Algo salio mal ="/');
                        });
                        
                   }else{
                       
                        itemRespuesta.pregunta = question;
                        itemRespuesta.respuesta= respuesta;
                        itemRespuesta.correcta = false;
                        respuestas.push(JSON.stringify(itemRespuesta));
                        
                        respuestas.forEach(function(index,element){    
                            var compiled = tmpl("template_each_finalGame", JSON.parse(index));
                            $("#content_startLitigation table tbody").append(compiled);
                        
                            setTimeout(function(){ $("#content_startLitigation table.resultado").fadeIn(1000); }, 1000);
                        });

                   }
                   
                });
                
            }
        });
         
    },
    profile : function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        hide_timer();
        
        if(localStorage.getItem('role_user') == 'admin')
            $('.profile .status').hide();
        
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
            
            // ajax to change image user
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
            
            // ajax to change image biography user
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
              loader('Cambiando Nombre');
              
              evt_change_name(name);
          }
        });
        
        $('.content_profile .data_user span.name').unbind('keyup').keyup(function(e){
            var name = $(this).text();
            
            if(name == current_username){
                $('.content_profile .data_user span.name').removeClass('success error');
                return;
            }else if(name.length < 6){
                $('.content_profile .data_user span.name').removeClass('success error');
                return;
            }
           
            if(e.keyCode == 13){
                if(name == current_username){
                    $('.content_profile .data_user span.name').removeClass('success error');
                    return;
                }else if(name.length < 6){
                    message('El nombre debe tener mas de 6 caracteres');
                    $('.content_profile .data_user span.name').focus().removeClass('success error');
                    return;
                }else{
                    loader('Cambiando Nombre');
                    evt_change_name(name);
                }
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
                loader('Verificando Username');
                evt_change_username(username);
            }
        });
    },
    questions : function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        var $id = localStorage.getItem('id_user');
        
        panel_data($id);
        
        $('ul.tabs').tabs();
        
        $('select').material_select();
        
        $('#sortable,#sortable_edit').sortable();
        
        $('.forms_contents div').eq(0).addClass('active');
        
        $.ajax({
            url     : webService + 'all_specialties/all',
            type    : 'POST',
            data    : null,
            success : function(res){
                var data = JSON.parse(res);
                
                $('#specialty_name,#specialty_name_edit').empty();
                $('#specialty_name,#specialty_name_edit').append('<option value="">Seleccione una especialidad para la pregunta</option>');
                
                data.forEach(function(i){
                    $('#specialty_name,#specialty_name_edit').append(tmpl('category_level_template',i));
                });
                
                $('select').material_select();
            }
        });
        
        reset_form_new_question();
        
        $('button[data-url="#create_question"]').unbind('click').click(function(){
            var $id_specialty = $('#specialty_name').val();
            var $question = $('#question').val();
            var $type_question = $('#type_question').val();
            var $correct_answer = [];
            var $options_question = [];
            var data = {};
            
            if($id_specialty == ""){
                message('Seleccione la especialidad!');
                $('#specialty_name').parent().find('input[type=text]').focus();
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
                if($type_question == 1){
                    var position = 0;
                    
                    for (var i = 0; i <  $('#sortable_choice li').length; i++) {
                        $options_question[i] =  $('#sortable_choice li').eq(i).find('span').text();
                        if($('#sortable_choice li').eq(i).find('.last').find('input[type=checkbox]:checked').val() != undefined){
                            $correct_answer[position] =  $('#sortable_choice li').eq(i).find('.last').find('input[type=checkbox]:checked').val();
                            position++;
                        }
                    }
                    
                    if($options_question.length < 4){
                        message('Las opciones deben tener como minimo 4');
                        $('.structure .multiple_choice .input input').focus();
                    }else{
                        
                        if($correct_answer.length == 0){
                            message('Necesita por lo menos escoger una respuesta');
                        }else{
                            data = {
                                id_specialty        : $id_specialty,
                                question            : $question,
                                type_question       : $type_question,
                                options_question    : $options_question.join("/"),
                                correct_answer      : $correct_answer.join("/")
                            };
                            
                            evt_insert_question(data);
                        }
                    }
                }else if($type_question == 2){
                    if( $('input[name=yes_no]:checked').val() == 'yes')
                        $correct_answer[0] = 'si';
                        
                    if($correct_answer.length == 0){
                        message('Seleccione alguna opcion');
                    }else{
                        data = {
                            id_specialty        : $id_specialty,
                            question            : $question,
                            type_question       : $type_question,
                            options_question    : "Si, No",
                            correct_answer      : $correct_answer.join("/")
                        };
                        
                        evt_insert_question(data);
                    }
                }else if($type_question == 3){
                    for (var i = 0; i <  $('#sortable li').length; i++){
                        $options_question[i] =  $('#sortable li').eq(i).find('span').text();
                        $correct_answer[i] =  $('#sortable li').eq(i).find('span').text();
                    }
                    
                    if($correct_answer.length < 4){
                        message('Las opciones deben tener como minimo 4');
                        $('.structure .order_question .input input').focus();
                    }else{
                        data = {
                            id_specialty        : $id_specialty,
                            question            : $question,
                            type_question       : $type_question,
                            options_question    : $options_question.join("/"),
                            correct_answer      : $correct_answer.join("/")
                        };
                        
                        evt_insert_question(data);
                    }
                }
            }
        });
        
        $('button[data-url="#modify_question"]').unbind('click').click(function(){
            var $id_question = $('#form_edit_question .id span').text();
            var $id_specialty = $('#specialty_name_edit').val();
            var $question = $('#question_edit').val();
            var $type_question = $('#type_question_edit').val();
            var $correct_answer = [];
            var $options_question = [];
            var data = {};
            
            if($id_specialty == ""){
                message('El campo seleccione la especialidad para la pregunta');
                $('#specialty_name_edit').parent().find('input[type=text]').focus();
            }else if($question == ""){
                message('El campo de la pregunta no puede estar vacía');
                $('#question_edit').focus();
            }else if($question.length < 12){
                message('El campo de la pregunta no puede tener menos de 12 caracteres');
                $('#question_edit').focus();
            }else if($type_question == ""){
                message('El campo del tipo de pregunta no puede estar vacío');
                $('#type_question_edit').parent().find('input[type=text]').focus();
            }else{
                if($type_question == 1){
                    var position = 0;
                    
                    for (var i = 0; i <  $('#sortable_choice_edit li').length; i++) {
                        $options_question[i] =  $('#sortable_choice_edit li').eq(i).find('span').text();
                        if($('#sortable_choice_edit li').eq(i).find('.last').find('input[type=checkbox]:checked').val() != undefined){
                            $correct_answer[position] =  $('#sortable_choice_edit li').eq(i).find('.last').find('input[type=checkbox]:checked').val();
                            position++;
                        }
                    }
                    
                    if($options_question.length < 4){
                        message('Las opciones deben tener como minimo 4');
                        $('.structure .multiple_choice_edit .input input').focus();
                    }else{
                        
                        if($correct_answer.length == 0){
                            message('Debe escoger almenos una respuesta correcta!');
                        }else{
                            data = {
                                id                  : $id_question,
                                id_specialty        : $id_specialty,
                                question            : $question,
                                type_question       : $type_question,
                                options_question    : $options_question.join("/"),
                                correct_answer      : $correct_answer.join("/")
                            };
                            
                            evt_update_question(data);
                        }
                    }
                }else if($type_question == 2){
                    $correct_answer[0] = $('input[name=yes_no_edit]:checked').val();
                        
                    if($correct_answer.length == 0){
                        message('Seleccione alguna opcion');
                    }else{
                        data = {
                            id                  : $id_question,
                            id_specialty        : $id_specialty,
                            question            : $question,
                            type_question       : $type_question,
                            options_question    : "Si, No",
                            correct_answer      : $correct_answer.join("/")
                        };
                        
                        evt_update_question(data);
                    }
                }else if($type_question == 3){
                    for (var i = 0; i <  $('#sortable_edit li').length; i++){
                        $options_question[i] =  $('#sortable_edit li').eq(i).find('span').text();
                        $correct_answer[i] =  $('#sortable_edit li').eq(i).find('span').text();
                    }
                    
                    if($correct_answer.length < 4){
                        message('Las opciones deben tener como minimo 4');
                        $('.structure .order_question_edit .input input').focus();
                    }else{
                        data = {
                            id                  : $id_question,
                            id_specialty        : $id_specialty,
                            question            : $question,
                            type_question       : $type_question,
                            options_question    : $options_question.join("/"),
                            correct_answer      : $correct_answer.join("/")
                        };
                        
                        evt_update_question(data);
                    }
                }
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
            else if(tab == "#new_question")
                reset_form_new_question();
                
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
        
        $('#type_question,#type_question_edit').unbind('change').change(function(){
            var type = $(this).val();
            
            reset_form_new_question();
            
            if(type == 1)
                $('.structure .multiple_choice').fadeIn(1000);
            else if(type == 2)
                $('.structure .yes_no').fadeIn(1000);
            else if(type == 3)
                $('.structure .order_questions').fadeIn(1000);
            else
                $('.structure > div').hide(50);
        });
        
        $('#type_question_edit').unbind('change').change(function(){
            var type = $(this).val();
            
            reset_form_new_question();
            
            if(type == 1)
                $('.structure .multiple_choice_edit').fadeIn(1000);
            else if(type == 2)
                $('.structure .yes_no_edit').fadeIn(1000);
            else if(type == 3)
                $('.structure .order_questions_edit').fadeIn(1000);
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
    specialties : function(type,match,ui){
        nav_menu();
        
        remove_drag();
        
        show_nav_button();
        
        evt_logout();
        
        var $id = localStorage.getItem('id_user');
        
        panel_data($id);
        
        $('ul.tabs').tabs();
        
        $('.forms_contents #new_specialty').addClass('active');
        
        $.ajax({
            url         : webService + 'all_games_mode',
            type        : 'POST',
            data        : {},
            success     : function(response){
                var data = JSON.parse(response);
                
                $('#mode_game_context,#mode_game_context_edit').empty();
                $('#mode_game_context,#mode_game_context_edit').append('<option value="">Selecione un modo de juego</option>');
                
                data.forEach(function(i){
                    $('#mode_game_context,#mode_game_context_edit').append(tmpl('levels_mode_template',i));
                });
                
                $('select').material_select();
                
                $('#mode_game_context').unbind('change').change( function(e){
                    var id_mode_game = $(this).val();
                    
                    $('.level_game,.level_game_edit').fadeOut(50);
                    if(id_mode_game != ""){
                        $.ajax({
                            url         : webService + 'levels_mode',
                            type        : 'POST',
                            data        : {
                                id      : id_mode_game
                            },
                            success     : function(response){
                                var data = JSON.parse(response);
                                
                                $("#level_game_context,#level_game_context_edit").empty();
                                $("#level_game_context,#level_game_context_edit").append('<option value="">Seleccione un nivel</options>');
                                
                                if(data.length==0){
                                    $('#level_game_context,#level_game_context_edit').html('No hay resultados para este modo');
                                }else{
                                    data.forEach(function(i,o){
                                        $("#level_game_context,#level_game_context_edit").append(tmpl("levels_mode_template", i));
                                        if(o <= 1)
                                            $('.level_game,.level_game_edit').fadeOut(50);
                                        else
                                            $('.level_game,.level_game_edit').fadeIn(50);
                                    });
                                    $('select').material_select();
                                }
                            }
                        });
                    }
                });
                
                $('#mode_game_context_edit').unbind('change').change( function(e){
                    var id_mode_game = $(this).val();
                    
                    $('.level_game_edit').fadeOut(50);
                    if(id_mode_game != ""){
                        $.ajax({
                            url         : webService + 'levels_mode',
                            type        : 'POST',
                            data        : {
                                id      : id_mode_game
                            },
                            success     : function(response){
                                var data = JSON.parse(response);
                                
                                $("#level_game_context_edit").empty();
                                $("#level_game_context_edit").append('<option value="">Seleccione un nivel</options>');
                                
                                if(data.length==0){
                                    $('#level_game_context_edit').html('No hay resultados para este modo');
                                }else{
                                    data.forEach(function(i,o){
                                        $("#level_game_context_edit").append(tmpl("levels_mode_template", i));
                                        if(o <= 1)
                                            $('.level_game_edit').fadeOut(50);
                                        else
                                            $('.level_game_edit').fadeIn(50);
                                    });
                                    $('select').material_select();
                                }
                            }
                        });
                    }
                });
            }
        });
        
        $('button[data-url="#create_specialty"]').unbind('click').click(function(){
            var $name_specialty = $('#name_specialty').val();
            var $mode_game = $('#mode_game_context').val();
            var $level_game = $("#level_game_context").val();
            
            if($name_specialty == ""){
                message('El campo de la especialidad no puede estar vacio');
                $('#name_specialty').focus();
            }else if($mode_game == ""){
                message('Escoja el modo de juego');
                $('#mode_game_context').parent().find('input[type=text]').focus();
            }else{
                if($mode_game == 1){
                    if($level_game == ""){
                        message('Escoja un nivel de juego');
                        $("#level_game_context").parent().find('input[type=text]').focus();
                    }
                }
                
                loader('Registrando Especialidad');
                $.ajax({
                    url         : webService + 'register_specialty',
                    type        : 'POST',
                    data        : {
                        id_game_mode    : $mode_game,
                        id_level_game   : $level_game,
                        name            : $name_specialty
                    },
                    success                 : function(res){
                        var data = JSON.parse(res);
                        
                        if(data.status == "OK"){
                            $('.loader').fadeOut(1500);
                            setTimeout(function(){
                                message(data.message);
                                $('button[data-url="#cancel_specialty"]').click();
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
        
        $('button[data-url="#modify_specialty"]').unbind('click').click(function(){
            var $id_specialty = $('#form_edit_specialty .id span').text();
            var $name_specialty = $('#name_specialty_edit').val();
            var $mode_game = $('#mode_game_context_edit').val();
            var $level_game = $("#level_game_context_edit").val();
            
            if($name_specialty == ""){
                message('El campo de la especialidad no puede estar vacio');
                $('#name_specialty_edit').focus();
            }else if($mode_game == ""){
                message('Escoja el modo de juego');
                $('#mode_game_context_edit').parent().find('input[type=text]').focus();
            }else{
                if($mode_game == 1){
                    if($level_game == ""){
                        message('Escoja un nivel de juego');
                        $("#level_game_context_edit").parent().find('input[type=text]').focus();
                    }
                }
                
                loader('Modificando Especialidad');
                $.ajax({
                    url         : webService + 'modify_specialty',
                    type        : 'POST',
                    data        : {
                        id              : $id_specialty,
                        id_game_mode    : $mode_game,
                        id_level_game   : $level_game,
                        name            : $name_specialty
                    },
                    success                 : function(res){
                        var data = JSON.parse(res);
                        
                        if(data.status == "OK"){
                            $('.loader').fadeOut(1500);
                            $('#edit_specialty').find('a').click();
                            evt_all_specialties_show('all');
                            setTimeout(function(){
                                message(data.message);
                                $('button[data-url="#cancel_specialty"]').click();
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
            
            if(tab == "#show_specialties")
                evt_all_specialties_show('all');
                
            $('input[name="active_specialties"]').unbind('change').change(function(){
                var filter = $('input[name="active_specialties"]:checked').val();
                evt_all_specialties_show(filter);
            });
        });
    },
    report_question : function(type,match,ui){
        hide_timer();
        
        // Params
        var params = router.getParams(match[1]); 
        
        console.log(params);
        
        // button to back last page
        $('.container_btn button.back').unbind('click').click(function(e){
            back();
        });
        
        $('.container_btn button.send').unbind('click').click(function(e){
            var $message = $('#error_message_question').val();
            var $id = $(this).attr('id-question');
            console.log($message);
            
            if($message == ''){
                message('No puedes mandar la solicitud vacía');
                $('#error_message_question').focus();
            }else{
                // ajax to insert report to question
                $.ajax({
                    url     : webService + 'report_question',
                    type    : 'POST',
                    data    : {
                        id      : $id,
                        message : $message
                    },
                    success : function(res){
                        var data = JSON.parse(res);
                        
                        if(data.status == 'OK'){
                            message(data.message);
                            $('#error_message_question').val('');
                            setTimeout(function(){ back(); },2500);
                        }else{
                            message(data.message);
                        }
                    }
                });
            }
        });
    }
},{ 
  defaultHandler: function(type, ui, page) {
    console.log("Default handler called due to unknown route");
    console.log(type);
    console.log(ui);
    console.log(page);
  },defaultHandlerEvents: "s",defaultArgsRe: true
});

//Lista de especialidades
function listSpecialties(filter){
    var data;
    data= $.ajax({
      method: "POST",
      async: false,
      url: webService + "all_specialties/"+filter,
      data: null,
    }).done(function(res){
        data = JSON.parse(res);
    });
    
    return data.responseText;
}

// Change the icon mode game depending the gender user
function icon_mode_game(page_referer,ref){
    $(page_referer + ' .content_game .icon_game img').attr('src','img/icons/'+ ref +localStorage.getItem('gender_user')+'.png').css('opacity','1');
}

// evt timer game mode litigation
function timerLitigation(time,page_referer,idCase,question){
    
    $('.question_time').fadeIn(1000).find('em').text(time+'s');
    var time_question = time;
    count_timer = setInterval(function(){
        time_question--;
        
        $('.question_time em').text(time_question+'s');
        //si es un caso
        if(time_question == 0 && question == false){
            
            $('.question_time').fadeOut(1000);
            
            setTimeout(function(){
                
                $(page_referer + idCase+ ' .litigio_titulo').fadeOut();
                $(page_referer + idCase + ' .pregunta').fadeIn(500);
                
            setTimeout(function(){
                
                timerLitigation(10,page_referer,idCase,true);},500);
                
            },500);
            clearInterval(count_timer);
            
        }
        //si es una pregunta
        if(time_question == 0 && question == true){
            $('.question_time').fadeOut(1000);
            $(page_referer + idCase + ' .pregunta').fadeOut();
            //aqui va la respuesta correcta si el usuario no respondio
            respuestaFinaltempPregunta(idCase);
            clearInterval(count_timer);
            
        }
    },1000);
    
}

function respuestaFinaltempPregunta(idCase){
    var respuestas = [];
    var question = $('#content_startLitigation .content_question#case_'+ idCase+' .pregunta .question').text();
    var correct_answer = $('#content_startLitigation .content_question#case_'+ idCase).attr('correct-answer');
    var itemRespuesta = {};
    itemRespuesta.pregunta = question;
    itemRespuesta.respuesta= correct_answer;
    itemRespuesta.correcta = true;
    
    respuestas.push(JSON.stringify(itemRespuesta));
    
    respuestas.forEach(function(index,element){

    var compiled = tmpl("template_each_finalGame", JSON.parse(index));
    
    $("#content_startLitigation table tbody").append(compiled);
        $("#content_startLitigation table.resultado").fadeIn(1000);
    });
}

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

// Event validate login
function validate_login(){
    var log = localStorage.getItem('log');
    var id_user = localStorage.getItem('id_user');
    
    if(log == 'true'){
        var id = id_user;
        
        // Click in the button start questions
        $('#btn_start').unbind('click').click(function(){
            var role = localStorage.getItem('role_user');
            
            // Validate role for change page
            if(role == 'admin')
                $.mobile.changePage('dashboard_admin.html?user='+id,{role: 'page',transition: 'fade'});
            else
                $.mobile.changePage('dashboard.html?user='+id,{role: 'page',transition: 'fade'});
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

// Event login
function evt_login(){
    var $email = $('#email').val();
    var $password = $('#password').val();
    
    if($email === ""){
        message('¡ El email no puede estar vacio !');
        $('#email').focus();
    }else if($password === ""){
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
                        localStorage.setItem('gender_user',data.gender);
                        var url = role == 'admin' ? 'dashboard_admin.html?user=' + data.id_user : 'dashboard.html?user=' + data.id_user;
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

// Event logout
function evt_logout(){
    // button to out application
    $('.btn_logout').unbind('click').click(function(){
        $('.button-collapse').sideNav('hide');
        loader('Cerrando Sesión');
        
        // delete all local storages
        localStorage.removeItem('log');
        localStorage.removeItem('id_user');
        localStorage.removeItem('role_user');
        localStorage.removeItem('gender_user');
        localStorage.removeItem('first_view_dashboard');
        
        setTimeout(function(){
            $.mobile.changePage('index.html#home',{role: 'page',transition: 'flow'});
            $('.loader').fadeOut(1000);
        },500);
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
    var $gender = $('#gender_user').val();
    
    // Validate fields
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
    }else if($gender == null){
        message('Seleccione un genero');
        $('input[value="Seleccione un genero"]').focus();
    }else{
      loader('Registrando...');
      
        //   ajax to register new user
        $.ajax({
            url     : webService + "register_user",
            type    : "POST",
            data    : {
                email       : $email,
                password    : $password,
                gender      : $gender
            },
            success : function(response){
                var data = JSON.parse(response);
                
                if(data.status == "OK"){
                    $('.loader').fadeOut(1500);
                    setTimeout(function(){
                        Materialize.toast('<div class="success"><h4>¡'+data.message+'!</h4></div>',2000);
                        clean_register();
                    },1000);
                    setTimeout(function(){
                        $.mobile.changePage('index.html#home',{role: 'page',transition:"slide"});
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

// Hide nav button
function hide_nav_button(){
    $('.nav').hide(); // Hide nav buttons right
}

// Show nav buttin
function show_nav_button(){
    $('.nav').fadeIn(500);
    
    // Click in buttons nav right
    $('.nav_button .nav a').unbind('click').click(function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        
        // when is dashboard
        if(url == "#dashboard"){
            var role = localStorage.getItem('role_user');
            var id = localStorage.getItem('id_user');
            var link = ( role == 'admin' ) ? 'dashboard_admin.html?user=' + id : 'dashboard.html?user=' + id;
            
            $.mobile.changePage(link,{role: 'page',transition:"flip"});
        }else if(url == "#notifications"){
            var hash = window.location.hash;
            var items = hash.split('&').length;
            
            if(items > 1){
                return;
            }else{
                $.mobile.changePage('notifications.html',{role: 'dialog',transition:"slidedown"});
            
                // ajax to get all notifications for user
                $.ajax({
                    url         : webService + 'notifications',
                    type        : 'POST',
                    data        : {
                        id      : localStorage.getItem('id_user')
                    },
                    success     : function(res){
                        var data = JSON.parse(res);
                        
                        $('.notifications .content_notifications').empty().fadeOut(50);
                        
                        // if empty notifications
                        if(data.length == 0){
                            setTimeout(function(){ message('¡ No tienes notificaciones !'); },200);
                        }else{
                            data.forEach(function(i,o){
                                i.index = o;
                                $('.notifications .content_notifications').append(tmpl('template_notification',i));
                            });
                        }
                        
                        setTimeout(function(){ $('.notifications .content_notifications').show(300); },300);
                    }
                });
            }
            
        }else if(url != "#"){
            $.mobile.changePage(url,{role:'page',transition: 'pop'});
        }else if(url == "#"){
            $(this).parent().toggleClass('active');
        }
    });
}

// Show Nav-Menu
function nav_menu(){
    // Nav menu event instanced
    $('.button_collapse').sideNav({
      menuWidth: 305,
      edge: 'left', 
      closeOnClick: true 
    });
}

// Panel Data user
function panel_data($id){
    
    // Ajax for all data user
    $.ajax({
        url     : webService + 'user_data',
        type    : 'POST',
        data    : {
            id  : $id
        },
        success : function(response){
            var data = JSON.parse(response);
            
            // when role is admin hide panels punctuation
            if(localStorage.getItem('role_user') == 'admin'){
                $('.panel .panel_content article').eq(0).hide(50);
                $('.panel .panel_content .levels,.profile .panel_content .levels').hide(50);
            }else{
                $('.panel .panel_content article').eq(0).show(50);
                $('.panel .panel_content .levels,.profile .panel_content .levels').show(50);
            }
            
            $('.points em').text(data.points);
            $('.data_user .name').text(data.name);
            $('.data_user .email').text(data.email);
            $('.data_user .username').text(data.username);
            $('.information_user .image_user img').attr('src', directory_profile + data.image);
            $('.panel_header').css('background-image','url('+directory_biography+data.image_b+')');
            $('.panel .icon_level img,.panel .current_level img,.profile .current_level img,.status .icon_level img').attr('src','img/levels/level'+data.level+data.gender+'.png');
            $('.panel .current_level span,.profile .current_level span').text('Nivel '+data.level);
            $('.panel .next_level span,.profile .next_level span').text('Nivel '+(parseInt(data.level) + 1));
            $('.panel .next_level img,.profile .next_level img').attr('src','img/levels/level'+(parseInt(data.level) + 1)+data.gender+'.png');
        }   
    });
    
    // Ajax for friends
    $.ajax({
        url     : webService + 'users/users',
        type    : 'POST',
        data    : null,
        success : function(response){
            var data = JSON.parse(response);
            
            var list_users = $('.friends ul');
            list_users.empty();
            
            for (var i = 0; i < data.length; i++) {
                if(i < 3)
                    list_users.append('<li>'+data[i].name+' '+data[i].points+'</li>');
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
        
        // ajax to change password user
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
      message('El nombre de usuario no puede estar vacio');
      $('.content_profile .data_user span.username').focus();
    }else if(username.length > 50){
      message('El nombre de usuario no puede contener mas de 50 caracteres');
      $('.content_profile .data_user span.username').focus();
    }else{
        // ajax to change username 
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
        // ajax to verified username 
        $.ajax({
            url       : webService + 'verify_username_user',
            type      : 'POST',
            data      : {
                username  : username
            },
            success   : function(response){
                var data = JSON.parse(response);
                
                if(data.status == 'OK')
                    $('.content_profile .data_user span.username').addClass('success').removeClass('error');
                else
                    $('.content_profile .data_user span.username').addClass('error').removeClass('success') ;
            }
      });
    }
}

// Event to get all questions
function evt_all_questions(filter){
    // ajax to get all question by filter
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
    
    // ajax to get all questions by filter
    $.ajax({
        url         : webService + 'all_questions/'+filter,
        type        : 'POST',
        data        : null,
        success     : function(res){
            var data = JSON.parse(res);
            
            data.forEach(function(i,o){
                i.t_question = "";
                
                if(i.type_question == 1)
                    i.t_question = "Selección múltiple";
                else if(i.type_question == 2)
                    i.t_question = "Si / No";
                else if(i.type_question == 3)
                    i.t_question = "Ordenamiento";
                    
                if(i.state == 'active')
                    i.state = 'Activa';
                else
                    i.state = "Inactiva";

                $(".content_question_show").append(tmpl("all_questions_show", i));
                
                // click to filter questions for inactives
                $('.menu_question .desactivate').unbind('click').click(function(){
                    var id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    
                    evt_question('active',id);
                });
                
                // Click to filter questions for actives
                $('.menu_question .activate').unbind('click').click(function(){
                    var id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    
                    evt_question('inactive',id);
                });
                
                // Click to edit question
                $('.menu_question .edit').unbind('click').click(function(){
                    var $id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    
                    $('#form_edit_question .structure > div').hide(50);
                    
                    // ajax to get data question
                    $.ajax({
                        url     : webService + 'data_question',
                        type    : 'POST',
                        data    : {
                            id  : $id
                        },
                        success : function(res){
                            var data = JSON.parse(res);
                            
                            var options_specialty = $('#specialty_name_edit option');
                            var options_type_answers = $('#type_question_edit option');
                            var options_yes_no = $('input[name="yes_no_edit"]');
                            
                            options_yes_no.removeAttr('checked');
                            
                            $('#sortable_choice_edit,#sortable_edit').empty();
                            
                            for(var i = 0; i < options_specialty.length; i++){
                                if(data.id_specialty == options_specialty[i].value)
                                    options_specialty[i].setAttribute('selected','selected');
                            }
                            
                            for(var k = 0; k < options_yes_no.length; k++){
                                if(data.correct_answer == options_yes_no[k].value)
                                    options_yes_no[k].setAttribute('checked','checked');
                            }
                            
                            for(var j = 0; j < options_type_answers.length; j++){
                                if(data.type_question == options_type_answers[j].value){
                                    options_type_answers[j].setAttribute('selected','selected');
                                    $('#form_edit_question .structure > div').eq(j - 1).fadeIn(1000);
                                }
                            }
                            
                            var options_question = data.options_question.split('/');
                            var correct_answer_edit = data.correct_answer.split('/');
                            var correct_question = 0;
                            
                            if(data.type_question == 1){
                                options_question.forEach(function(i,o){
                                    if(i == correct_answer_edit[correct_question]){
                                        $('#sortable_choice_edit').append('<li><span>' + i + '</span><span class="last"><p><input type="checkbox" checked="checked" class="filled-in" id="correct'+ o +'" value="'+i+'"/><label for="correct'+ o +'"></label></p></span><i class="large material-icons">delete</i></li>');
                                        correct_question++;
                                    }else{
                                        $('#sortable_choice_edit').append('<li><span>' + i + '</span><span class="last"><p><input type="checkbox" class="filled-in" id="correct'+ o +'" value="'+i+'"/><label for="correct'+ o +'"></label></p></span><i class="large material-icons">delete</i></li>');
                                    }
                                });
                                
                            }else if(data.type_question == 3){
                                options_question.forEach(function(i,o){
                                    $('#sortable_edit').append('<li><span>' + i + '</span><i class="large material-icons">delete</i></li>');
                                });
                            }
                            
                            $('.structure .multiple_choice_edit .input i').unbind('click').click(function(){
                                var question = $(this).parent().find('input').val();
                                
                                evt_append_question_choice_edit(question);
                            });
                            
                            $('.structure .multiple_choice_edit .input input').unbind('keyup').keyup(function(e){
                                var question = $(this).val();
                                
                                if(e.keyCode == 13)
                                    evt_append_question_choice_edit(question);
                            });
                            
                            $('.structure .order_questions_edit .input i').unbind('click').click(function(){
                                var question = $(this).parent().find('input').val();
                                
                                evt_append_question_edit(question);
                            });
                            
                            $('.structure .order_questions_edit .input input').unbind('keyup').keyup(function(e){
                                var question = $(this).val();
                                
                                if(e.keyCode == 13)
                                    evt_append_question_edit(question);
                            });
                            
                            $('#form_edit_question .id span').empty().text(data.id);
                            $('#question_edit').empty().text(data.question);
                            
                            $('#sortable_choice_edit li i').unbind('click').click(function(e) {
                                $(this).parent().remove();
                                $('.structure .multiple_choice_edit .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
                                $('.structure .multiple_choice_edit .input input').removeAttr('disabled');
                                $('.structure .multiple_choice_edit .input i').css('z-index','1');
                                count_id++;
                            });
                            
                            $('#sortable_edit li i').unbind('click').click(function(e) {
                                $(this).parent().remove();
                                $('.structure .order_questions_edit .input input').val('').focus().attr('placeholder','Ingrese las preguntas ('+(++count)+')');
                                $('.structure .order_questions_edit .input input').removeAttr('disabled');
                                $('.structure .order_questions_edit .input i').css('z-index','1');
                            });
                            
                            $('select').material_select();
                        }
                    });
                    
                    $('a[href="#edit_question"]').click();
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
    }else if(question.length < 5){
        message('La pregunta no puede ser tan corta!!');
        $('.structure .order_question .input input').focus();
    }else{
        var items = $('#sortable > li');
        
        $('#sortable').append('<li><span>' + question + '</span><i class="large material-icons">delete</i></li>');
        $('.structure .order_questions .input input').val('').focus().attr('placeholder','Ingrese las preguntas');
        
        --count;
        if(items.length == 5){
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

// Event to append question edit on the ol
function evt_append_question_edit(question){
    if(question == ""){
        message('Ingrese una pregunta que no este en blanco');
        $('.structure .order_questions_edit .input input').focus();
    }else if(question.length < 5){
        message('La pregunta no puede ser tan corta!!');
        $('.structure .order_question_edit .input input').focus();
    }else{
        var items = $('#sortable_edit > li');
        $('#sortable_edit').append('<li><span>' + question + '</span><i class="large material-icons">delete</i></li>');
        $('.structure .order_questions_edit .input input').val('').focus().attr('placeholder','Ingrese las preguntas;');
        --count;
        if(items.length == 5){
            $('.structure .order_questions_edit .input input').attr('disabled','true');
            $('.structure .order_questions_edit .input i').css('z-index','-1');
        }
        $('#sortable_edit li i').unbind('click').click(function(e) {
            $(this).parent().remove();
            $('.structure .order_questions_edit .input input').val('').focus().attr('placeholder','Ingrese las preguntas ('+(++count)+')');
            $('.structure .order_questions_edit .input input').removeAttr('disabled');
            $('.structure .order_questions_edit .input i').css('z-index','1');
        });
    }
}

// Event to insert a question
function evt_insert_question(obj){
    loader('Registrando Pregunta');
    
    // ajax to insert new question
    $.ajax({
        url         : webService + 'register_question',
        type        : 'POST',
        data        : obj,
        success                 : function(res){
            var data = JSON.parse(res);
            
            if(data.status == "OK"){
                $('.loader').fadeOut(1500);
                setTimeout(function(){
                    message(data.message);
                    reset_form_new_question();
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

// Event to update question
function evt_update_question(obj){
    loader('Modificando Pregunta');
    
    // ajax to update question
    $.ajax({
        url         : webService + 'modify_question',
        type        : 'POST',
        data        : obj,
        success     : function(res){
            var data = JSON.parse(res);
            
            if(data.status == "OK"){
                $('.loader').fadeOut(1500);
                $('#edit_question').find('a').click();
                
                evt_all_questions_show('all');
                
                setTimeout(function(){
                    message(data.message);
                    reset_form_new_question();
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

// Event to append question_choice on the ol
function evt_append_question_choice(question){
    if(question == ""){
        message('Ingrese una pregunta que no este en blanco');
        $('.structure .multiple_choice .input input').focus();
    }else if(question.length < 5){
        message('La pregunta no puede ser tan corta!!');
        $('.structure .multiple_choice .input input').focus();
    }else{
        var items = $('#sortable_choice > li');
        var current = count_id;
        
        $('#sortable_choice').append('<li><span>' + question + '</span><span class="last"><p><input type="checkbox" class="filled-in" id="correct'+ current +'" value="'+question+'"/><label for="correct'+ current +'"></label></p></span><i class="large material-icons">delete</i></li>');
        $('.structure .multiple_choice .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
        
        if(items.length == 5){
            $('.structure .multiple_choice .input input').attr('disabled','true');
            $('.structure .multiple_choice .input i').css('z-index','-1');
        }
        
        count_id--;
        
        $('#sortable_choice li i').unbind('click').click(function(e) {
            $(this).parent().remove();
            $('.structure .multiple_choice .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
            $('.structure .multiple_choice .input input').removeAttr('disabled');
            $('.structure .multiple_choice .input i').css('z-index','1');
            count_id++;
        });
    }
}

// Event to append question_choice_edit on the ol
function evt_append_question_choice_edit(question){
    if(question == ""){
        message('Ingrese una pregunta que no este en blanco');
        $('.structure .multiple_choice_edit .input input').focus();
    }else if(question.length < 5){
        message('La pregunta no puede ser tan corta!!');
        $('.structure .multiple_choice_edit .input input').focus();
    }else{
        var items = $('#sortable_choice_edit > li');
        var current = count_id;
        
        $('#sortable_choice_edit').append('<li><span>' + question + '</span><span class="last"><p><input type="checkbox" class="filled-in" id="correct'+ current +'" value="'+question+'"/><label for="correct'+ current +'"></label></p></span><i class="large material-icons">delete</i></li>');
        $('.structure .multiple_choice_edit .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
        
        if(items.length == 5){
            $('.structure .multiple_choice_edit .input input').attr('disabled','true');
            $('.structure .multiple_choice_edit .input i').css('z-index','-1');
        }
        
        count_id--;
        
        $('#sortable_choice_edit li i').unbind('click').click(function(e) {
            $(this).parent().remove();
            $('.structure .multiple_choice_edit .input input').val('').focus().attr('placeholder','Ingrese las preguntas:');
            $('.structure .multiple_choice_edit .input input').removeAttr('disabled');
            $('.structure .multiple_choice_edit .input i').css('z-index','1');
            count_id++;
        });
    }
}

// Evt to activate or deactivate question
function evt_question(param, $id){
    
    if(param == "inactive")
        loader('Activando Pregunta');
    else
        loader('Desactivando Pregunta');
      
    // ajax to change state question  
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

// Evt to reset form new question
function reset_form_new_question(){
    count = 6;
    count_id = 6;
    $('.structure > div').hide(50);
    $('#sortable').empty();
    $('#sortable_choice').empty();
    $('.structure .order_questions .input input').removeAttr('disabled').attr('placeholder','Ingrese las preguntas ('+(count)+')');
    $('.structure .order_questions .input i').css('z-index','1');
    $('.structure .multiple_choice .input input').removeAttr('disabled');
    $('.structure .multiple_choice .input i').css('z-index','1');
}

// Event to get all specialties
function evt_all_specialties_show(filter){
    $(".content_specialty_show").empty();
    
    $.ajax({
        url         : webService + 'all_specialties/'+filter,
        type        : 'POST',
        data        : null,
        success     : function(res){
            var data = JSON.parse(res);
            data.forEach(function(i,o){
                    
                i.mode_game = "";
                i.level_game = "";
                
                if(i.id_game_mode == 1) 
                    i.mode_game = "Carrera";
                else if(i.id_game_mode == 2) 
                    i.mode_game = "Examen";
                else if(i.id_game_mode == 3) 
                    i.mode_game = "Especialidad";
                else if(i.id_game_mode == 4) 
                    i.mode_game = "Litigio";
                else if(i.id_game_mode == 5) 
                    i.mode_game = "Duelo";
                    
                if(i.id_level_game == 1)
                    i.level_game = "Ejecutiva";
                else if(i.id_level_game == 2)
                    i.level_game = "Legislativa";
                else if(i.id_level_game == 3)
                    i.level_game = "Judicial";
                else
                    i.level_game = "N/A";
                    
                    
                if(i.state == 'active')
                    i.state = 'Activa';
                else
                    i.state = "Inactiva";

                $(".content_specialty_show").append(tmpl("all_specialties_show", i));
                
                $('.menu_specialty .desactivate').unbind('click').click(function(){
                    var id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    evt_specialty('active',id);
                });
                $('.menu_specialty .activate').unbind('click').click(function(){
                    var id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    evt_specialty('inactive',id);
                });
                
                $('.menu_specialty .edit').unbind('click').click(function(){
                    var $id = $(this).parent().parent().parent().find('.id').text().split(': ')[1];
                    
                    $('#form_edit_specialty .structure > div').hide(50);
                    
                    $.ajax({
                        url     : webService + 'data_specialty',
                        type    : 'POST',
                        data    : {
                            id  : $id
                        },
                        success : function(res){
                            var data = JSON.parse(res);
                            
                            $('#form_edit_specialty .id span').empty().text(data.id);
                            $('#name_specialty_edit').empty().text(data.name);
                            
                            var options_mode_game = $('#mode_game_context_edit option');
                            
                            for(var i = 0; i < options_mode_game.length; i++){
                                if(data.id_game_mode == options_mode_game[i].value)
                                    $(options_mode_game).eq(i).attr('selected','selected').change();
                            }
                        
                            if(data.id_game_mode == 1)
                                $('.level_game_edit').fadeIn(500);
                            else
                                $('.level_game_edit').fadeOut(500);
                            
                            $('select').material_select();
                        }
                    });
                    
                    $('a[href="#edit_specialty"]').click();
                });
            });
        }
    });
}

// Evt to activate or deactivate question
function evt_specialty(param, $id){
    
    if(param == "inactive")
        loader('Activando Especialidad');
    else
        loader('Desactivando Especialidad');
        
    $.ajax({
        url         : webService + 'specialty/' + param,
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
                
                $('input[name="active_specialties"]').removeAttr('checked');
                
                evt_all_questions_show(data.ref);
            },700);
        }
    });
}

// Evt to get all questions any category
function questions(page_referer,array){
    if(array==null){
        // Ajax to get all questions with state active
        $.ajax({
            url         : webService + 'all_questions/actives',
            type        : 'POST',
            data        : null,
            success     : function(res){
                var data = JSON.parse(res);
                
                $(page_referer + ' .content_start_game').empty();
                
                var questions = data.random();
                
                if(page_referer == '.duel_users' && ids_questions_duel.length != 0){
                    var count = 0;
                    
                    for (var i = 0; i < questions.length; i++) {
                        if(ids_questions_duel[count] == questions[i].id){
                            count++;
                            questions[i].key = i;
                            questions_duel[i] = questions[i];
                            $(page_referer + ' .content_start_game').append(tmpl('structure_question',questions[i]));
                            i = 0;
                            if(count > 8)
                                break;
                        }
                    }
                }else if(page_referer == '.duel_users'){
                    questions.forEach(function(i,o){
                        if(o < 9){
                            i.key = o;
                            questions_duel[o] = i;
                            $(page_referer + ' .content_start_game').append(tmpl('structure_question',i));
                        }
                    });
                }else{
                    questions.forEach(function(i,o){
                        i.key = o;
                        $(page_referer + ' .content_start_game').append(tmpl('structure_question',i));
                    });
                }
            }
        });
    }else{
        $(page_referer + ' .content_start_game').empty();
        
        var questions = array.random();
        
        questions.forEach(function(i,o){
            i.key = o;
            $(page_referer + ' .content_start_game').append(tmpl('structure_question',i));
        });
    }
}

// Evt to validate questions
function validate_questions(){
    setTimeout(function(){
        
        var questions = $('.start_race .content_start_game .content_question');
        var ids_questions = [];
        
        for(var i = 0; i < questions.length; i++)
            ids_questions[i] = questions.eq(i).attr('id-question');
        
        // ajax to get questions before reply
        $.ajax({
            url         : webService + 'answers/' + localStorage.getItem('id_user'),
            type        : 'POST',
            data        : null,
            success     : function(res){
                var data = JSON.parse(res);
                var n = 0;
                var limit = data.length;
                
                for(var j = 0; j < ids_questions.length; j++){
                    if(data[n].id_question == ids_questions[j]){
                        n++;
                        questions.eq(j).remove();
                        j = 0;
                        if(n>=limit)
                            break;
                    }
                }
            }
        });
    },500);
}

// Funtion to validate mode game
function evt_validate_mode_game(data,name_level,id_game){
    // Ajax to validate current level game user
    $.ajax({
        url         : webService + 'validate_level',
        type        : 'POST',
        data        : data,
        success     : function(res){
            $('.start_race .wrapper > div').hide(50);
            
            data = JSON.parse(res);
            
            var top_questions = 0;
            
            evt_current_level(data,id_game);
            
            top_questions = $('.start_race .levels_content .level.active .number_questions .rank').last().text();
            
            var id_level_category = $('.start_race .levels_content .level.active').last().attr('id-level-category');
            
            if(data[id_game  -1].correct_answers < top_questions){
                $('.start_race .wrapper .complete_level,.start_race .wrapper .content_start_game').hide(50);
                
                $('.start_race .wrapper .start').fadeIn(500);
                
                // button click to start to reply the questions mode race
                $('button[data-url="start_mode_game"]').unbind('click').click(function(){
                    loader('Cargando...');
                    
                    cont = true;
                    
                    // Get all contents of questions
                    var content_questions = $('.start_race .content_start_game .content_question');
                    var count_questions = 0;
                    var points = 0;
                    
                    $.post(webService + 'points/' + localStorage.getItem('id_user'),{}, function(data){
                        points = parseInt(JSON.parse(data).points);
                    });
                    
                    // Hide the content of this button
                    $(this).parent().parent().fadeOut(500);
                    
                    // Add class active at the first element question
                    content_questions.eq(0).addClass('active').show().parent().attr('question',(++count_questions));
                    
                    clearInterval(count_timer); // Clear timer
                    
                    // Show the content to start game
                    setTimeout(function(){
                        $('.loader').hide(1000);
                        $('.start_race .wrapper .content_start_game').show(50).css('transform','scale(1)');
                        setTimeout(function(){ show_timer(20, '.start_race'); }, 1000);
                    },1000);
                    
                    // Click in the answers to validate which is correct
                    $('.start_race .content_question input[type=radio],.start_race .wrapper .content_start_game .content_question .sortable_answer + .container_btn button').unbind('click').click(function(){
                        var type_question = $('.start_race .content_question.active').attr('type-question');
                        var $id_question = $('.start_race .content_question.active').attr('id-question');
                        var answer = '';
                        var correct_answer = '';
                        var current_question = parseInt($('.start_race .levels_content .level.active .bottom .number_questions .correct_answers').last().attr('correct-answers'));
                        
                        if(type_question == 1){
                            
                            answer = $('.start_race .content_question.active input[type=radio]:checked').val();
                            correct_answer = $('.start_race .content_question.active').attr('correct-answer');
                            
                            // if the question is correct
                            if(answer == correct_answer){
                                question_correct('.start_race');
                                
                                setTimeout(function(){
                                    if(cont){
                                        $('.start_race .question_result').fadeOut(300).css({'opacity':'0'});
                                        
                                        var info = {}; 
                                        // debugger;
                                        if(current_question + 1 < top_questions){
                                            info = {
                                                id_user         : localStorage.getItem('id_user'),
                                                id_question     : $id_question,
                                                id_level_game   : id_game,
                                                number          : (current_question + 1),
                                                points          : (++points)
                                            };
                                        }else{
                                            info = {
                                                id_user             : localStorage.getItem('id_user'),
                                                id_question         : $id_question,
                                                id_level_game       : id_game,
                                                id_level_category   : parseInt(id_level_category),
                                                number              : (current_question + 1),
                                                points              : (++points)
                                            };
                                        }
                                        
                                        // ajax to update current points and level mode race
                                        $.ajax({
                                            url     : webService + "correct_answers",
                                            type    : 'POST',
                                            data    : info,
                                            success : function(res){
                                                var data = JSON.parse(res);
                                                var actives = $('.level.active').length;
                                                var obj = [];
                                                
                                                obj[0] = data.metadata;
                                                
                                                if(current_question + 1 == data.metadata.correct_answers || actives < 3){
                                                    evt_current_level(obj);
                                                    
                                                    $('.start_race .levels_content .level .bottom .number_questions .correct_answers').last().attr('correct-answers',(++current_question)).addClass('active');
                                                    
                                                    panel_data(data.id_user);
                                                    
                                                    evt_next_question('.start_race');
                                                    
                                                    setTimeout(function(){
                                                        $('.start_race .levels_content .level .bottom .number_questions .correct_answers').last().text((current_question)).removeClass('active');
                                                    },1300);
                                                    
                                                    if(data.metadata.correct_answers == 0){
                                                        
                                                        current_question = 0;
                                                        $('.level.active .bottom .number_questions .correct_answers').last().attr('correct-answers',data.metadata.correct_answers);
                                                        $('.level.active .bottom .number_questions .correct_answers').last().text(data.metadata.correct_answers);
                                                    }
                                                }else{
                                                    
                                                    $('.start_race .content_start_game').hide();
                                                    hide_timer();
                                                    $('.question_time').hide();
                                                    evt_current_level(obj);
                                                    
                                                    message('¡Completaste Este Nivel!');
                                                    $('.start_race .wrapper .complete_level').fadeIn(1000);
                                                    $('.start_race .wrapper .complete_level,.start_race .wrapper .no_complete_level').unbind('click').click(function(){
                                                        back();
                                                    });
                                                }
                                            }
                                        });
                                    }else{
                                        // message('Reportaste una pregunta vuelve atras...');
                                    }
                                },2500);
                            }else{
                                message('La respuesta es incorrecta!');
                                evt_next_question('.start_race');
                            }
                        }
                        
                        // If the next question is type 3 
                        if($('.start_race .content_question.active').next().attr('type-question') == 3 )
                           $('.sortable_answer').sortable();
                    });
                });
            }else{
                top_questions = $('#start_race').find('.levels_content').find('.level.active').find('.number_questions').text();
                $('.start_race .wrapper > div').hide(10);
                
                $('.start_race .wrapper .complete_level').fadeIn(1000);
                    
                // Click in message complete or no complete level
                $('.start_race .wrapper .complete_level,.start_race .wrapper .no_complete_level').unbind('click').click(function(){
                    back();
                });
            }
        }
    });
}

// Event when the question is correct
function question_correct(page_referer){
    debugger;
    var id_question = $('.start_race .content_question.active').attr('id-question');
    
    $('.start_race .content_question.active').hide();
    
    setTimeout(function(){ $('.start_race .question_result').css({'display':'block','opacity':'1'}); },500);
    
    $('.start_race .question_result .report_question').unbind('click').click(function(){
        setTimeout(function(){ $('.container_btn button.send').attr('id-question',id_question); },500);
        $.mobile.changePage('report_question.html',{role:'dialog',transition: 'pop'});
        hide_timer();
    });
}

// Event to paint the current level
function evt_current_level(data,id){
    for(var i = 0; i < data.length; i++){
        if(data[i].id_level_game == 1){
            if(data[i].id_level_category == 1){
                $('.start_race .levels_content .level.mayor').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else if(data[i].id_level_category == 2){
                $('.start_race .levels_content .level.mayor').addClass('active').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
                $('.start_race .levels_content .level.governor').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else if(data[i].id_level_category == 3){
                $('.start_race .levels_content .level.mayor,.start_race .levels_content .level.governor').addClass('active').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
                $('.start_race .levels_content .level.president').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else{
                $('.start_race .levels_content .level.mayor,.start_race .levels_content .level.governor,.start_race .levels_content .level.president').addClass('active complete').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
            }
        }else if(data[i].id_level_game == 2){
            if(data[i].id_level_category == 1){
                $('.start_race .levels_content .level.councilor').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else if(data[i].id_level_category == 2){
                $('.start_race .levels_content .level.councilor').addClass('active').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
                $('.start_race .levels_content .level.deputy').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else if(data[i].id_level_category == 3){
                $('.start_race .levels_content .level.councilor,.start_race .levels_content .level.deputy').addClass('active').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
                $('.start_race .levels_content .level.congressman').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else{
                $('.start_race .levels_content .level.councilor,.start_race .levels_content .level.deputy,.start_race .levels_content .level.congressman').addClass('active complete').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
            }
        }else if(data[i].id_level_game == 3){
            if(data[i].id_level_category == 1){
                $('.start_race .levels_content .level.municipaljudge').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else if(data[i].id_level_category == 2){
                $('.start_race .levels_content .level.municipaljudge').addClass('active').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
                $('.start_race .levels_content .level.circuitjudge').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else if(data[i].id_level_category == 3){
                $('.start_race .levels_content .level.municipaljudge,.start_race .levels_content .level.circuitjudge').addClass('active').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
                $('.start_race .levels_content .level.magistrate').addClass('active').find('.number_questions').find('.correct_answers').text(data[i].correct_answers).attr('correct-answers',data[i].correct_answers);
            }else{
                $('.start_race .levels_content .level.municipaljudge,.start_race .levels_content .level.circuitjudge,.start_race .levels_content .level.magistrate').addClass('active complete').find('.bottom').find('.number_questions').find('.correct_answers').text('20');
            }
        }
    }
}

// Evt to next question
function evt_next_question(page_referer){
    var current_content = $(page_referer + ' .content_question.active');
    var next_content = $(page_referer + ' .content_question.active').next();
    var time_question = 0;
    
    hide_timer();
    
    if(page_referer == ".start_test")
        time_question = 15;
    else if(page_referer == '.start_race')
        time_question = 20;
    
    $('.question_time').hide(500);
    
    if($(page_referer + ' .content_question.active').next().length == 0 && page_referer == '.start_race'){
        var count_questions = 0;
        
        current_content.hide();
        
        questions(page_referer,null);
        
        validate_questions();
        
        setTimeout(function(){
            $(page_referer + ' .content_start_game .content_question').eq(0).addClass('active').show().parent().attr('question', (++count_questions ));
            setTimeout(function(){ show_timer( time_question, page_referer ); },500);
        },500);
    }else{
        current_content.hide(500);
        setTimeout(function(){
            current_content.remove();
            next_content.addClass('active').fadeIn(500);
            setTimeout(function(){ show_timer( time_question, page_referer ); },500);
        },1000);
    }
}

// Evt to next question mode test
function evt_next_question_test(page_referer,correct_questions,params){
    var current_content = $(page_referer + ' .content_question.active');
    var next_content = $(page_referer + ' .content_question.active').next();
    var time_question = 15;
    var params_ = params;
    var count_questions = 0;
    
    hide_timer();
    
    $('.question_time').hide(50);
    
    if($(page_referer + ' .content_question.active').next().length == 0){
        
        current_content.hide();
        
        questions(page_referer,[]);
        
        validate_questions();
        
        setTimeout(function(){
            $(page_referer + ' .content_start_game .content_question').eq(0).addClass('active').show().parent().attr('question',(++count_questions));
            setTimeout(function(){ show_timer( time_question, page_referer ); },500);
        },500);
    }else{
        current_content.hide(500);
        
        var number_question = $(page_referer + ' .content_start_game').attr('question');
        var top_question = parseInt($(page_referer + ' div[data-role="header"] .top_questions .content_questions .rank').text());
        
        setTimeout(function(){
            
            if($(page_referer + ' div[data-role="header"] .top_questions').css('display') != 'none')
                $(page_referer + ' .content_start_game').attr('question',(++number_question));
            
            if(number_question == top_question + 1){
                hide_timer();
                current_content.hide(50);
                
                $(page_referer + ' .wrapper > div').hide();
                $(page_referer + ' div[data-role="header"] .top_questions').hide();
                $(page_referer + ' .wrapper .complete_questions span').text(correct_questions);
                $(page_referer + ' .wrapper .complete_questions').fadeIn(1000);
                
                if(page_referer == '.duel_users' && ids_questions_duel.length > 0){
                    
                    if(correct_questions == 8)
                        setTimeout(function(){ message('Respondiste todas las preguntas correctamente, ¡Felicidades!'); },700);
                        
                    params_.correct_answers = correct_questions;
                    
                    // Ajax for insert data duel after end this duel
                    $.ajax({
                        url         : webService + 'update_duel',
                        type        : 'POST',
                        data        : params_,
                        success     : function(res){
                            var data = JSON.parse(res);
                            
                            if(data.status != 'OK'){
                                message(data.message);
                            }else{
                                message(data.message);
                                setTimeout(function(){ back(); },10000);
                            }
                        }
                    });
                    
                }else if(page_referer == '.duel_users'){
                    
                    if(correct_questions == 8)
                        setTimeout(function(){ message('Respondiste todas las preguntas correctamente, ¡Felicidades!'); },700);
                        
                    params_.correct_answers = correct_questions;
                    params_.ref = 'first';
                    
                    // Ajax for insert data duel after end this duel
                    $.ajax({
                        url         : webService + 'update_duel',
                        type        : 'POST',
                        data        : params_,
                        success     : function(res){
                            var data = JSON.parse(res);
                            
                            if(data.status != 'OK'){
                                message(data.message);
                            }else{
                                setTimeout(function(){ back(); },10000);
                            }
                        }
                    });
                    
                }else{
                    
                    if(correct_questions == 10)
                        setTimeout(function(){ message('Respondiste todas las preguntas correctamente, ¡Felicidades!'); },700);
                        
                    // ajax to update points mode test
                    $.ajax({
                        url         : webService + 'points_test',
                        type        : 'POST',
                        data        : {
                            id      : localStorage.getItem('id_user'),
                            points  : parseInt(correct_questions)
                        },
                        success     : function(res){
                            var data = JSON.parse(res);
                            
                            if(data.status == "OK")
                                message('Puntos en total: '+ ( parseInt(data.metadata.points) + correct_questions ));
                            else
                                message('Algo salio mal ="/');
                        }
                    });
                }
                
                $(page_referer + ' .wrapper .complete_questions').unbind('click').click(function(){
                    back();
                });
            }else{
                $(page_referer + ' div[data-role="header"] .top_questions .content_questions .number_questions').text((number_question));
                current_content.remove();
                next_content.addClass('active').fadeIn(500);
                setTimeout(function(){ show_timer( time_question,page_referer); },500);
            }
        },1000);
    }
}

// Evt to show question time
function show_timer(time,page_referer){
    // var time_question = time;
    clearInterval(count_timer);
    
    if(cont){
        $('.question_time').fadeIn(1000).find('em').text(time+'s');
        
        count_timer = setInterval(function(){
            time--;
            
            $('.question_time em').text(time+'s');
            
            if(time <= 0){
                $('.question_time').fadeOut(1000);
                
                if(page_referer == '.start_test' || page_referer == '.duel_users'){
                    evt_next_question_test(page_referer,corrects_questions,params_url);
                }else{
                    evt_next_question(page_referer,corrects_questions);
                }
                
                clearInterval(count_timer);
            }
        },1000);
    }
}

// Evt to hide timer question
function hide_timer(){
    clearInterval(count_timer);
    $('.question_time').hide(500);
}

// Function to return number notifications
function evt_notifications(){
    var $id = localStorage.getItem('id_user');
    
    // ajax to get all notications actives
    $.ajax({
        url         : webService + 'notifications',
        type        : 'POST',
        data        : {
            id      : $id,
            param   : 'actives'
        },
        success     : function(res){
            var data = JSON.parse(res);
            var numbers_notifications = data.length;
            
            if(numbers_notifications == 0)
                $('.notifications_link').addClass('hide_notifications');
            else
                $('.notifications_link').removeClass('hide_notifications').attr('data-number-notifications',numbers_notifications);
        }
    });
}

// function to back page
function back(){
    history.back();
}

// Function to remove drag materialize
function remove_drag(){
    var drags = $('.drag-target');
    
    for(var i = 0; i < drags.length; i++)
        if(i > 1)
            $('.drag-target').remove();
}

// Render Templates
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

// Function to change order any array
Array.prototype.random = function(){
    var o = this;
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};