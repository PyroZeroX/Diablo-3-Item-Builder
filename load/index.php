<?php
	//load.php
	$data = $_POST['hash'];
	
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
	$link = $sql->real_escape_string($_POST['hash']);

	/* build the query, we'll use an insert this time */
	$query = "SELECT json FROM `items` WHERE link = '$link';";
	 
	/* execute the query, nice and simple */
	$result = $sql->query($query) or die($query.'<br />'.mysqli_error);
	$row = $result->fetch_row();
	if($row != null)
	{
		$response = $row[0];
		$response = str_replace('\\', '', $response);
	}
	$result->free();
	$sql->close();
	echo $response;
?>