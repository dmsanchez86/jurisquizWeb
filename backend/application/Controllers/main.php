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
    public function register_question(){
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
    public function modify_question(){
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
    public function register_specialty(){
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
       // echo json_encode($query->name);
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
    public function modify_specialty(){
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
        
        $query = jur_current_state_game::find($id);
        
        echo (json_encode($query->attributes()));
    }
    
    # Function to save when the user answer well a question
    function correct_answers(){
        $id = base64_decode($_POST['id_user']);
        
        $query = jur_current_state_game::find($id);
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
            $data = array(
                    'message'   => 'El reto se creo correctamente',
                    'status'    => 'OK'
                );
        }else{
            $data = array(
                    'message'   => 'Ocurrio un error al crear el reto',
                    'status'    => 'FAIL'
                );
        }
        
        echo json_encode($data);
    }
}