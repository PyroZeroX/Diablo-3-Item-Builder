<?php
	//save.php
	
	//load configuration file (contains connection details)
	require_once('../config/configuration.php');
	/* instantiate our class, and select our database automatically */
	$sql = new mysqli($host, $user, $pass, $db);
	/* check connection */
	if (mysqli_connect_errno()) {
	    printf("Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}

	/*
	let's assume we've just received a form submission.
	so we'll receive the information, and we'll escape it
	*/
	$json = $sql->real_escape_string($_POST['data']);
	$link = rand_string(7,20);

	/* build the query, we'll use an insert this time */
	$query = "INSERT INTO `items`(link, json) VALUES ('$link','$json');";
	 
	/* execute the query, nice and simple */
	$sql->query($query) or die($query.'<br />'.mysqli_error);
	$sql->close();

	$response['success'] = true;
	$response['link'] = $link;
	$response['message'] = 'Successfully saved';
	echo json_encode($response);

	function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
	$size = strlen( $chars );
	$str ='';
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}
	return $str;
}
?>
