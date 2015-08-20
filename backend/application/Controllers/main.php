<?php

/*
* Main Controller Application
*/

class main {
    
    # Function to validate the login
    public function validate_login(){
        $email = $_POST['email'];
        $password = md5($_POST['pwd']);
        
        $result = jur_users::all(array('conditions' => array('( email = ? OR username = ? ) AND password = ?', $email, $email, $password)));
        
        if(count($result) > 0){
            $r = $result[0]->attributes();
            $data = array(
                    'message'   => "Welcome to Jurisquiz",
                    'status'    => "OK",
                    'id_user'   => base64_encode($r['id']),
                    'role'      => $r['role'],
                    'gender'    => $r['gender']
                );
        }else{
            $data = array(
                    'message'   => "The user $email isn't registered",
                    'status'    => "FAIL"
                );
        }
          
        echo json_encode($data);
    }
    
    # Function to register new user
    public function register_user(){
        $email = $_POST['email'];
        $pwd = md5($_POST['password']);
        $gender = $_POST['gender'];
        
        $query = jur_users::all(array('conditions'  => array('email = ?',$email)));
        
        if(count($query) > 0){
            $response = array( 
                "message"   => 'El usuario <b>'.$email.'</b> no se pudo registrar en el sistema por que ya existe!!!',
                "status"    => 'FAIL'
            );
        }else{
            $username = explode('@',$email);
            $data = jur_users::create(array(
                'id'                => NULL, 
                'role'              => 'user', 
                'name'              => '',
                'image'             => 'defaul_user.png',
                'image_biography'   => 'default.png',
                'username'          => $username[0],
                'email'             => $email,
                'password'          => $pwd,
                'gender'            => $gender,
                'points'            => '0',
                'level'             => '1'
            ));
            
            if( $data->errors->errors === null){
                $response = array( 
                    "message"   => 'El usuario <b>'.$email.'</b> ha sido registrado satisfactoriamente',
                    "status"    => 'OK'
                );
            }else{
                $response = array( 
                    "message"   => 'Ocurrio un error intentalo de nuevo',
                    "status"    => 'FAIL'
                );
            }
        }
        
        echo json_encode($response);
    }
    
    # User Data
    function user_data(){
        $id = base64_decode($_POST['id']);
        
        $query = jur_users::all(array('conditions' => array('id = ?', $id)));
        
        if(count($query) > 0){
            $r = $query[0]->attributes();
            $data = array(
                    'user_id'   => $r['id'],
                    'role'      => $r['role'],
                    'name'      => $r['name'],
                    'username'  => $r['username'],
                    'image'     => $r['image'],
                    'image_b'   => $r['image_biography'],
                    'email'     => $r['email'],
                    'gender'    => $r['gender'],
                    'points'    => $r['points'],
                    'level'     => $r['level'],
                );
        }else{
            $data = array(
                    'message'   => '¡Ocurrio un error!',
                    'status'    => 'FAIL'
                );
        }
        
        echo json_encode( $data );
    }
    
    # User Data by id
    function user_data_id(){
        $id = $_POST['id'];
        
        $query = jur_users::find($id);
        
        echo json_encode($query->attributes());
    }
    
    # Function to return all users
    function users($app,$filter){
        if($filter == 'admin'){
            $query = jur_users::all(array('conditions' => array('role = "admin"')));
        }else if($filter == 'users'){
            $query = jur_users::all(array('conditions' => array('role = "user" ORDER BY points DESC')));
        }else if($filter == 'users_less_me'){
            $query = jur_users::all(array('conditions' => array('id NOT IN(?) AND role = "user" ORDER BY points DESC',base64_decode($_POST['id']))));
        }else if($filter == 'all'){
            $query = jur_users::all();
        }
        
        foreach($query as $k => $i){
			$data[$k] = $i->attributes();
			$data[$k]['id_user'] = base64_encode($data[$k]['id']);
		}
		
		echo json_encode($data);
    }
    
    # Function to change image profile each user
    function image_user(){
        $directory = '/home/ubuntu/workspace/frontend/media/profile_users/';
        
        $type = $_FILES["image_user"]["type"];
        $file = $_FILES["image_user"]["tmp_name"];
        $name = $_FILES["image_user"]["name"];
        
        $id = base64_decode($_POST['id_user']);
        
        $r =  move_uploaded_file($file,$directory.$name);
        
        if($r){
            $query = jur_users::find($id);
            $query->image = $name;
            $response = $query->save();
            
            if($response){
                $data = array(
                        'message'       => 'La imagen ha sido cambiada correctamente',
                        'status'        => 'OK'
                    );
            }else{
                $data = array(
                        'message'       => 'La imagen no se ha podido cambiar correctamente',
                        'status'        => 'FAIL'
                    );
            }
        }else{
            $data = array(
                        'message'       => 'Algo salió mal, intentalo nuevamente...!',
                        'status'        => 'FAIL'
                    );
        }
        
        echo json_encode($data);
    }
    
    # Function to change image biography each user
    function image_user_biography(){
        $directory = '/home/ubuntu/workspace/frontend/media/biography_users/';
        
        $type = $_FILES["image_user_biography"]["type"];
        $file = $_FILES["image_user_biography"]["tmp_name"];
        $name = $_FILES["image_user_biography"]["name"];
        
        $id = base64_decode($_POST['id_user']);
        
        $r =  move_uploaded_file($file,$directory.$name);
        
        if($r){
            $query = jur_users::find($id);
            $query->image_biography = $name;
            $response = $query->save();
            
            if($response){
                $data = array(
                        'message'       => 'La imagen ha sido cambiada correctamente',
                        'status'        => 'OK'
                    );
            }else{
                $data = array(
                        'message'       => 'La imagen no se ha podido cambiar correctamente',
                        'status'        => 'FAIL'
                    );
            }
        }else{
            $data = array(
                        'message'       => 'Algo salió mal, intentalo nuevamente...!',
                        'status'        => 'FAIL'
                    );
        }
        
        echo json_encode($data);
    }
    
    # Function to change password
    function change_password(){
        $id = base64_decode($_POST['id']);
        $current_password = md5($_POST['c_password']);
        $password = md5($_POST['password']);
        
        $query = jur_users::all(array('conditions'  => array('id = ? AND password = ?',$id,$current_password)));
        
        if(count($query) > 0){
            $d = $query[0]->attributes();
            
            $tmp = jur_users::find($d['id']);
            
            $tmp->password = $password;
            $response = $tmp->save();
            
            if($response){
                $data = array( 
                    "message"   => 'La contraseña se cambio correctamente, los cambios surgiran la proxima vez que inicie sesión en la aplicación',
                    "status"    => 'OK'
                );
            }else{
                $data = array( 
                    "message"   => 'La contraseña no se pudo cambiar :/',
                    "status"    => 'FAIL'
                );
            }
        }
        else{
            $data = array( 
                    "message"   => 'La contraseña es incorrecta, intentelo nuevamente!',
                    "status"    => 'FAIL',
                    "password"  => $_POST['password'],
                    "pwd"       => $password,
                    "c_pwd"     => $current_password
                );
        }
        
        echo json_encode($data);
    }
    
    # Function to change name user
    function change_name_user(){
        $id = base64_decode($_POST['id']);
        $name = $_POST['name'];
        
        $query = jur_users::find($id);
        $query->name = $name;
        $response = $query->save();
        
        if($response){
            $data = array( 
                "message"   => 'El nombre se cambio correctamente!',
                "status"    => 'OK'
            );
        }else{
            $data = array( 
                "message"   => 'No se pudo cambiar el nombre :/',
                "status"    => 'FAIL'
            );
        }
        
        echo json_encode($data);
    }
    
    # Function to change username user
    function change_username_user(){
        $id = base64_decode($_POST['id']);
        $username = $_POST['username'];
        
        $query = jur_users::all(array('conditions'  => array('username = ?',$username)));
        
        if(count($query) > 0){
            $data = array( 
                "message"   => 'El usuario ya existe, intenta con otro',
                "status"    => 'FAIL'
            );
        }else{
            $tmp = jur_users::find($id);
            $tmp->username = $username;
            $response = $tmp->save();
            
            if($response){
                $data = array( 
                    "message"   => 'El nombre se cambio correctamente!',
                    "status"    => 'OK'
                );
            }else{
                $data = array( 
                    "message"   => 'No se pudo cambiar el nombre :/',
                    "status"    => 'FAIL'
                );
            }
        }
        
        echo json_encode($data);
    }
    
    # Function to verify username user
    function verify_username_user(){
        $username = $_POST['username'];
        
        $query = jur_users::all(array('conditions'  => array('username = ?',$username)));
        
        if(count($query) > 0){
            $data = array( 
                "status"    => 'FAIL'
            );
        }else{
            $data = array( 
                "status"    => 'OK'
            );   
        }
        
        echo json_encode($data);
    }
    
    # Function to get all levels mode game
    function levels_mode(){
        $id_mode_game = $_POST['id'];
        
        $query = jur_level_game::all(array('conditions'=>array('id_game_mode = ?',$id_mode_game)));
        
        foreach($query as $k){
			$data[] = $k->attributes();
		}
        
        echo json_encode($data);
    }
    
    # Function to get all categories level game
    function category_level(){
        $id = $_POST['id'];
        
        if($id != "" || $id != null){
            $query = jur_level_category::all(array('conditions'=>array('id_level_game = ?',$id)));
            $data = "";
            foreach($query as $k){
    			$data[] = $k->attributes();
    		}
    		
    		echo json_encode($data);
        }
    }
    
    # Function to register new question
    function register_question(){
        $id_specialty = $_POST['id_specialty'];
        $question = $_POST['question'];
        $type_question = $_POST['type_question'];
        $options_question = $_POST['options_question'];
        $correct_answer = $_POST['correct_answer'];
        
        $data = jur_questions::create(array(
            'id'                    => NULL, 
            'id_specialty'          => $id_specialty,
            'question'              => $question,
            'type_question'         => $type_question,
            'options_question'      => $options_question,
            'correct_answer'        => $correct_answer,
            'state'                 => 'active'
        ));
        
        if( $data->errors->errors === null){
            $response = array( 
                "message"   => 'La pregunta se ha registrado satisfactoriamente!',
                "status"    => 'OK'
            );
        }else{
            $response = array( 
                "message"   => 'Ocurrio un error intentalo de nuevo',
                "status"    => 'FAIL'
            );
        }
        
        echo json_encode($response);
    }
    
    # Function to update a question
    function modify_question(){
        $id = $_POST['id'];
        $id_specialty = $_POST['id_specialty'];
        $question = $_POST['question'];
        $type_question = $_POST['type_question'];
        $options_question = $_POST['options_question'];
        $correct_answer = $_POST['correct_answer'];
        
        $query = jur_questions::find($id);
        $query->id_specialty = $id_specialty;
        $query->question = $question;
        $query->type_question = $type_question;
        $query->options_question = $options_question;
        $query->correct_answer = $correct_answer;
        
        $status = $query->save();
        
        if($status){
            $data = array(
                    'message'       => 'La pregunta se cambio correctamente!',
                    'status'        => 'OK'
                );
        }else{
            $data = array(
                    'message'       => 'La pregunta no se cambio correctamente!',
                    'status'        => 'FAIL'
                );
        }
        
        echo json_encode($data);
    }
    
    # Function to get all questions from database
    function all_questions($app,$filter){
        
        $data = array();
        
        if($filter == "actives")
            $query = jur_questions::all(array('conditions' => array('state = "active"')));
        else if($filter == "inactives")
            $query = jur_questions::all(array('conditions' => array('state = "inactive"')));
        else if($filter == 'all')
            $query = jur_questions::find_by_sql("SELECT * FROM jur_questions");
        
        foreach ($query as $value) {
            $data[] = $value->attributes();
        }
        
        echo json_encode($data);
    }
    
    # Function to get data to unique question
    function data_question(){
        $data = jur_questions::find($_POST['id']);
        
        echo json_encode($data->attributes());
    }
    
    # Function to active or deactive a question
    function question($app,$param){
        
        $query = jur_questions::find($_POST['id']);
        
        if($param == 'inactive'){
            $query->state = 'active';
            $ref = 'actives';
        }else if($param == 'active'){
            $query->state = 'inactive';
            $ref = 'inactives';
        }
            
        $res = $query->save();
        
        if($res){
            $data = array( 
                "message"   => 'El estado de la pregunta se cambio correctamente!',
                "status"    => 'OK',
                'ref'       => $ref
            );
        }else{
            $data = array( 
                "message"   => 'El estado de la pregunta no se cambio correctamente!',
                "status"    => 'FAIL',
                'ref'       => $ref
            );
        }
        
        echo json_encode($data);
        
    }
    
    #Function to get all question by specialty
    function find_question(){
        $id_specilty = $_POST['id_specialty'];
        
        $data = array();
        
        $query = jur_questions::all(array('conditions' => array('id_specialty = ?',$id_specilty)));
        
        foreach($query as $k){
			$data[] = $k->attributes();
		}
        
        echo json_encode($data);
    }
    
    # Function to get all question by specialty
    function all_caseLitigation(){
        
        $data = array();
        
        $query = jur_litigio_mode::all(array('conditions' => array('state = "active"')));
        
        foreach($query as $k){
			$data[] = $k->attributes();
		}
        
        echo json_encode($data);
    }
    
    # Function that return all mode games
    function all_games_mode(){
        $q = jur_game_mode::all();
        
        $d = array();
        
        foreach ($q as $k) {
            $d[] = $k->attributes();
        }
        
        echo json_encode($d);
    }
    
    # Function to register new specialty
    function register_specialty(){
        $id_game_mode = $_POST['id_game_mode'];
        $id_level_game = $_POST['id_level_game'];
        $name = $_POST['name'];
        
        $data = jur_specialty::create(array(
            'id'                    => NULL, 
            'id_game_mode'          => $id_game_mode, 
            'id_level_game'         => $id_level_game,
            'name'                  => $name,
            'state'                 => 'active'
        ));
        
        if( $data->errors->errors === null){
            $response = array( 
                "message"   => 'La especialidad se ha registrado satisfactoriamente!',
                "status"    => 'OK'
            );
        }else{
            $response = array( 
                "message"   => 'Ocurrio un error intentalo de nuevo',
                "status"    => 'FAIL'
            );
        }
        
        echo json_encode($response);
    }
    
    # Function to get all specialties from database
    function all_specialties($app,$filter){
        
        $data = array();
        
        if($filter == "actives")
            $query = jur_specialty::all(array('conditions' => array('state = "active"')));
        else if($filter == "inactives")
            $query = jur_specialty::all(array('conditions' => array('state = "inactive"')));
        else if($filter == 'all')
            $query = jur_specialty::find_by_sql("SELECT * FROM jur_specialty");
        
        foreach ($query as $value) {
            $data[] = $value->attributes();
        }
        
        echo json_encode($data);
    }
    
    # Lista los nombres de las specialty
    function listNamespecialty(){
        
        $query = jur_specialty::all(array('select' => 'id,name','conditions' => array('state = "active"')));

        foreach($query as $k){
			$data[] = $k->attributes();
		}
		echo json_encode($data);
    }
    
    # Lista los nombres de los casos
    function listLitigationCases(){
        
        $query = jur_litigio_mode::all(array('select' => 'id,litigio_titulo','conditions' => array('state = "active"')));

        foreach($query as $k){
			$data[] = $k->attributes();
		}
		echo json_encode($data);
    }
    
    # Function to active or deactive a specialty
    function specialty($app,$param){
        
        $query = jur_specialty::find($_POST['id']);
        
        if($param == 'inactive'){
            $query->state = 'active';
            $ref = 'actives';
        }else if($param == 'active'){
            $query->state = 'inactive';
            $ref = 'inactives';
        }
            
        $res = $query->save();
        
        if($res){
            $data = array( 
                "message"   => 'El estado de la especialidad se cambio correctamente!',
                "status"    => 'OK',
                'ref'       => $ref
            );
        }else{
            $data = array( 
                "message"   => 'El estado de la especialidad no se cambio correctamente!',
                "status"    => 'FAIL',
                'ref'       => $ref
            );
        }
        
        echo json_encode($data);
        
    }
    
    # Function to find a specialty
    function find_specialty(){
        $query = jur_specialty::find($_POST['id']);
        
        $res = $query->attributes();
        
        $data = array(
                'name'  => $res['name']
            );
        
        echo json_encode($data);
    }
    
    # Function to get data to unique specialty
    function data_specialty(){
        $data = jur_specialty::find($_POST['id']);
        
        echo json_encode($data->attributes());
    }
    
    # Function to update a specialty
    function modify_specialty(){
        $id = $_POST['id'];
        $id_game_mode = $_POST['id_game_mode'];
        $id_level_game = $_POST['id_level_game'];
        $name = $_POST['name'];
        
        $query = jur_specialty::find($id);
        $query->id_game_mode = $id_game_mode;
        $query->id_level_game = $id_level_game;
        $query->name = $name;
        
        $status = $query->save();
        
        if($status){
            $data = array(
                    'message'       => 'La especialidad se cambio correctamente!',
                    'status'        => 'OK'
                );
        }else{
            $data = array(
                    'message'       => 'La especialidad no se cambio correctamente!',
                    'status'        => 'FAIL'
                );
        }
        
        echo json_encode($data);
    }
    
    # Function to get all categories to level game
    function categories_level(){
        $query = jur_level_category::all(array('conditions' => array('id_level_game = ?',$_POST['id'])));
        
        foreach($query as $k){
			$data[] = $k->attributes();
		}
        
        echo json_encode($data);
    }
    
    # Function to validate current level
    function validate_level(){
        $id = base64_decode($_POST['id']);
        
        $query = jur_current_state_game::all(array('conditions' => array('id_user = ?',$id)));
        
        $data = array();
        
        foreach($query as $key){
            $data[] = $key->attributes();
        }
        
        echo json_encode($data);
    }
    
    # Function to save when the user answer well a question
    function correct_answers(){
        $id = base64_decode($_POST['id_user']);
        
        $query = jur_current_state_game::all(array('conditions' => array('id_user = ?', $id)));
        
        
        $query_ = jur_users::find($id);
        $options = $query->attributes();
        $id_user = $query->attributes();
        
        if(isset($_POST['id_level_category'])){
            if($options['id_level_game'] == $_POST['id_level_game']){
                $query->id_level_category = $query->id_level_category + 1;
                $query->correct_answers = 0;
                $query_->points = $_POST['points'];
                $query_->level = $query->id_level_category;
                
                if($query->id_level_category > 3){
                    $query->id_level_game = (++$options['id_level_game']);
                    $query->id_level_category = 1;
                    $query->correct_answers = 0;
                    $query_->points = $_POST['points'];
                    $query_->level = 1;
                }
            }
        }
        else{
            $query->correct_answers = $_POST['number'];
            $query_->points = $_POST['points'];
        }
        
        $res = $query->save();
        $res_ = $query_->save();
        
        if($res && $res_){
            $answers = jur_answers::create(array(
                    'id'            => null,
                    'id_user'       => $id,
                    'id_question'   => $_POST['id_question']
                ));
                
            if($answers->errors->errors === null){
                $data = array(
                    'message'           => 'Se guardo el numero de respuestas correctamente',
                    'status'            => 'OK',
                    'id_user'           => base64_encode($id_user['id_user']),
                    'metadata'          => $query->attributes(),
                    'id_level_game'     => $options['id_level_game'],
                    'id_level_category' => $options['id_level_category']
                );
            }else{
                $data = array(
                    'message'       => 'Ocurrio un error',
                    'status'        => 'FAIL'
                );
            }
        }else{
            $data = array(
                    'message'       => 'Error al actualizar las respuestas correctas',
                    'status'        => 'FAIL'
                );
        }
        
        echo (json_encode($data));
    }
    
    #Function to return correct answers mode test
    function correct_answers_test(){
        echo "jajajjaja";
    }
    
    # Function to get total points
    function points($app,$id){
        $id_user = base64_decode($id);
        
        $query = jur_users::find($id_user);
        
        echo json_encode($query->attributes());
    }
    
    # Function to get total points
    function points_test(){
        $id_user = base64_decode($_POST['id']);
        
        $query = jur_users::find($id_user);
        $user = $query->attributes();
        $points = (int) $query->points;
        $correct_answer = (int) $_POST['points'];
        $query->points = ($points + $correct_answer);
        
        $res = $query->save();
        
        if($res){
            $data = array(
                    'message'   => 'Se actualizaron los puntos correctamente!',
                    'status'    => 'OK',
                    'id_user'   => $user['id'],
                    'metadata'  => $user
                );
        }else{
            $data = array(
                    'message'   => 'Ocurrio un error guardando los puntos!',
                    'status'    => 'FAIL'
                );
        }
        
        echo json_encode($data);
    }
    
    # Function to get correct answers
    function answers($app,$id){
        $id_user = base64_decode($id);
        
        $query = jur_answers::all(array('conditions' => array('id_user = ?', $id_user)));
        
        $data = array();
        
        foreach($query as $k){
			$data[] = $k->attributes();
		}
        
        echo json_encode($data);
    }
    
    # Function to write data duel
    function duel(){
        $id_user = base64_decode($_POST['id_user']);
        $id_friend = base64_decode($_POST['id_friend']);
        date_default_timezone_set('America/Bogota');
        $date = date('Y-m-d H:i:s');
        
        $query = jur_duel::create(array(
                'id'        => null,
                'id_user_1' => $id_user,
                'id_user_2' => $id_friend,
                'date_duel' => $date,
                'date_start'=> $date,
                'date_end'  => null,
                'state_duel'=> 'wait'
            ));
            
        if($query->errors->errors == null){
            $user_data = jur_users::find($id_user);
            $data_duel = jur_duel::find($query->id);
            $noti = jur_notifications::create(array(
                    'id'            => null,
                    'id_user'       => $id_friend,
                    'notification'  => 'Tu amigo '. $user_data->name . ' te ha retado!',
                    'state'         => 'active',
                    'metadata'      => $query->id
                ));
            if($noti->errors->errors == null){
                $data_duel = jur_duel::find($query->id);
                $data = array(
                    'message'   => 'El reto se creo correctamente',
                    'status'    => 'OK',
                    'data_duel' => $data_duel->attributes()
                );
            }
        }else{
            $data = array(
                    'message'   => 'Ocurrio un error al crear el reto',
                    'status'    => 'FAIL'
                );
        }
        
        echo json_encode($data);
    }
    
    # Function to cancel duel
    function cancel_duel(){
        $id = $_POST['id'];
        $id_notification = $_POST['id_notification'];
        
        $query = jur_duel::find($id);
        $query_ = jur_notifications::find($id_notification);
        
        $query_->state = "reject";
        $query->state_duel = "reject";
        
        $res_ = $query_->save();
        $res = $query->save();
        
        if($res && $res_){
            $data = array(
                    'message'       => 'Se cancelo el duelo correctamente',
                    'status'        => 'OK'
                );
        }else{
            $data = array(
                    'message'       => 'No se pudo cancelar el duelo',
                    'status'        => 'FAIL'
                );
        }
        
        echo json_encode($data);
        
    }
    
    # Function to accept duel
    function accept_duel(){
        $id = $_POST['id'];
        $id_notification = $_POST['id_notification'];
        
        $query = jur_duel::find($id);
        $query_ = jur_notifications::find($id_notification);
        
        $query_->state = "inactive";
        $query->state_duel = "accept";
        
        $res_ = $query_->save();
        $res = $query->save();
        
        if($res && $res_){
            $data = array(
                    'message'       => 'Se acepto el duelo correctamente',
                    'status'        => 'OK',
                    'metadata'      => $query->attributes()
                );
        }else{
            $data = array(
                    'message'       => 'No se pudo acceptar el duelo, intentalo de nuevo',
                    'status'        => 'FAIL'
                );
        }
        
        echo json_encode($data);
        
    }
    
    # Function to get all notifications by user
    function notifications(){
        $id = base64_decode($_POST['id']);
        
        $data = array();
        
        if(isset($_POST['param'])){
            $query = jur_notifications::all(array('conditions' => array('id_user = ? AND state = "active"',$id)));
        }else{
            $query = jur_notifications::all(array('conditions' => array('id_user = ? ORDER BY id DESC',$id)));
        }
        
        foreach($query as $k){
            $data[] = $k->attributes();
        }
        
        echo json_encode($data);
    }
    
    # Function to insert questions in table duel_result
    function questions_duel(){
        $id_duel = $_POST['id_duel'];
        $metadata = $_POST['metadata'];
        
        $query = jur_duel_result::all(array('conditions' => array('id_duel = ?', $id_duel)));
        
        foreach($query as $k){
            $data[] = $k->attributes();
        }
        
        $q = jur_duel_result::find($data[0]['id']);
        $q->duel_questions = $metadata;
        $q->save();
        
        if($q){
            $res = array(
                    'message'   => 'Las preguntas se guardaron correctamente!',
                    'status'    => 'OK'
                );
        }else{
            $res = array(
                    'message'   => 'Las preguntas no se pudieron guardar!',
                    'status'    => 'FAIL'
                );
        }
        
        echo json_encode($res);
    }
    
    # Function to update table duel_result
    function update_duel(){
        $id_duel = $_POST['id_duel'];
        $id_user_1 = $_POST['id_user_1'];
        $id_user_2 = $_POST['id_user_2'];
        $correct_answers = $_POST['correct_answers'];
        
        date_default_timezone_set('America/Bogota');
        $date = date('Y-m-d H:i:s');
        
        $query = jur_duel_result::all(array('conditions' => array('id_duel = ?', $id_duel)));
        
        foreach($query as $k){
            $data[] = $k->attributes();
        }
        
        $q = jur_duel_result::find($data[0]['id']);
        
        if(isset($_POST['ref'])){
            $q->total_corrects_answers_user_1 = $correct_answers;
            
            $q->save();
        
            if($q){
                $res = array(
                        'message'   => 'El resultado del duelo se actualizo correctamente',
                        'status'    => 'OK'
                    );
            }else{
                $res = array(
                        'message'   => 'No se pudo actualizar el duelo!',
                        'status'    => 'FAIL'
                    );
            }
        }else{ // when accept the other user the duel
            $q->total_corrects_answers_user_2 = $correct_answers;
            
            $q->save();
        
            $win = jur_duel_result::find($q->id);
            $duel = jur_duel::find($q->id_duel);
            
            $duel->date_end = $date;
            
            if($win->total_corrects_answers_user_1 == $win->total_corrects_answers_user_2){
                $win_duel = '¡El duelo terminó empatado!';
                $win->id_win_user = 0;
                $duel->state_duel = 'wait';
            }else if($win->total_corrects_answers_user_1 > $win->total_corrects_answers_user_2){
                $win_duel = '¡Perdiste el Duelo!';
                $win->id_win_user = $duel->id_user_1;
                $duel->state_duel = 'finish';
                
                $noti1 = jur_notifications::create(array(
                    'id'            => null,
                    'id_user'       => $duel->id_user_1,
                    'notification'  => 'Ganaste un reto!',
                    'state'         => 'win',
                    'metadata'      => '{}'
                ));
                
                $noti2 = jur_notifications::create(array(
                    'id'            => null,
                    'id_user'       => $duel->id_user_2,
                    'notification'  => 'Perdiste un reto!',
                    'state'         => 'loss',
                    'metadata'      => '{}'
                ));
            }else{
                $win_duel = '¡Ganaste el duelo!';
                $win->id_win_user = $duel->id_user_2;
                $duel->state_duel = 'finish';
                
                $noti1 = jur_notifications::create(array(
                    'id'            => null,
                    'id_user'       => $duel->id_user_2,
                    'notification'  => 'Ganaste un reto!',
                    'state'         => 'win',
                    'metadata'      => '{}'
                ));
                
                $noti2 = jur_notifications::create(array(
                    'id'            => null,
                    'id_user'       => $duel->id_user_1,
                    'notification'  => 'Perdiste un reto!',
                    'state'         => 'loss',
                    'metadata'      => '{}'
                ));
            }
            
            $res_duel = $duel->save();
            $res_win = $win->save();
            
            if($q && $res_win && $res_duel){
                $res = array(
                        'message'   => $win_duel,
                        'status'    => 'OK',
                        'data_duel' => $q->attributes()
                    );
            }else{
                $res = array(
                        'message'   => 'No se pudo actualizar el duelo!',
                        'status'    => 'FAIL'
                    );
            }
        }
        
        echo json_encode($res);
    }
    
    # Function to get all data after accept duel
    function data_duel(){
        $id_duel = $_POST['id_duel'];
        
        $query = jur_duel_result::all(array('conditions' => array('id_duel = ?', $id_duel)));
        
        foreach($query as $k){
            $data[] = $k->attributes();
        }
        
        echo json_encode($data);
    }
    
}