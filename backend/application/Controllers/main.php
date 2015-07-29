<?php

/*
* Controller for the login the application
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
                    'role'      => $r['role']
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
    function users(){
        $query = jur_users::all();
        
        foreach($query as $k){
			$data[] = $k->attributes();
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
    
    # Function to register new user
    public function register_question(){
        $id_level_game = $_POST['id_level_game'];
        $id_mode_game = $_POST['id_mode_game'];
        $id_level_category = $_POST['id_level_category'];
        $question = $_POST['question'];
        $type_question = $_POST['type_question'];
        $structure_question = $_POST['structure_question'];
        $correct_answer = $_POST['correct_answer'];
        
        $data = jur_questions::create(array(
            'id'                    => NULL, 
            'id_level_game'         => $id_level_game, 
            'id_mode_game'          => $id_mode_game,
            'id_level_category'     => $id_level_category,
            'question'              => $question,
            'type_question'         => $type_question,
            'structure_question'    => $structure_question,
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
    
}