<?php
	header("Content-Type: application/json; charset=UTF-8");
	$obj = json_decode($_GET["player"], false);

	$servername = "localhost";
	$username = "toor";
	$password = "root";
	$dbname = "tpc";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("0Connection failed: " . $conn->connect_error);
	} else {
		// echo "DB Connected";
	}

	$play = json_decode($obj);

	$sql = "INSERT INTO `tblPlayers` (`ID`, `Tier`, `FullName`, `DOB`, `Position`, `Professional`, `Amateur`, `Scholar`, `WithSign`, `WithUntil`, `ClubCont`, `ClubName`, `ClubSign`, `ClubDur`, `Comment`, `CopyAgency`, `CopyPlaying`) 
		VALUES 
		(NULL, 
		'$obj->tier', 
		'$obj->fullName', 
		'$obj->dob', 
		'$obj->pos', 
		'$obj->prof',
		'$obj->amat',
		'$obj->scholar',
		'$obj->TPCSign',
		'$obj->TPCUntil',
		'$obj->ClubContract',
		'$obj->ClubName',
		'$obj->ClubSign',
		'$obj->ClubDur',
		'$obj->comment',
		'$obj->CopyAgency', 
		'$obj->CopyPlaying')";

	if ($conn->query($sql) === TRUE) {
	    echo "1";
	} else {
	    echo "0" . $sql . "<br>" . $conn->error;
	}

	$conn->close();
?>