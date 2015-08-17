<?php

/*
* Model of table modo litigio
*/

class jur_litigio_mode extends ActiveRecord\Model{
   
   # explicit table name since our table is not "books"
   static $table_name = 'jur_litigio_mode';
 
   # explicit pk since our pk is not "id"
   static $primary_key = 'id';
 
   # explicit connection name since we always want our test db with this model
   static $connection = 'development';
}

?>