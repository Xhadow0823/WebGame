<?php
    $myFile = "rank.json";
    $arr_data = array();
    
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Origin: *');
header('x-requested-with: XMLHttpRequest');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

    try{
        if(!$_POST[name] || !$_POST[score]){
            echo file_get_contents($myFile);
            exit();
        }
	   $formdata = [$_POST[name],$_POST[score]];

       $jsondata = file_get_contents($myFile);
       
	   $arr_data = json_decode($jsondata, true);

	   array_push($arr_data,$formdata);

	   $jsondata = json_encode($arr_data);
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
	        echo file_get_contents($myFile);
	    }
	   else 
	        echo "error";
   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }
?>

