<?php

/*
* Controller for the login the application
*/

class home {
    
    # Function to validate the login
    public function validate_login(){
        $email = $_POST['email'];
        $password = $_POST['pwd'];
        
        $result = jur_users::all(array('conditions' => array('username = ? OR email = ? AND password = MD5(?) ',$email, $email, $password)));
        
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
                'image'             => 'default_user.png',
                'image_biography'   => 'default.jpg',
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
    
    function image_user(){
        $uploads_dir = '/frontend/media/profile_users';
        
        $type = $_FILES["image_user"]["type"];
        $file = $_FILES["image_user"]["tmp_name"];
        
        echo $type;
        // if($_FILES["image_user"]["error"] == 0) {
        //     $tmp_name = $_FILES["image_user"]["tmp_name"][0];
        //     $name = $_FILES["image_user"]["name"][0];
        //     $response = move_uploaded_file($tmp_name, "$uploads_dir/$name");
        //     // echo $tmp_name;
        //     echo $name;
        // }
    }
}