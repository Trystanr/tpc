<?php
	header("Content-Type: application/json; charset=UTF-8");

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$servername = "localhost";
	$username = "toor";
	$password = "root";
	$dbname = "tpc";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("0Connection failed: " . $conn->connect_error);
	}

	/* Select queries return a resultset */
	if ($result = $conn->query("SELECT * FROM tblPlayers")) {
	    // printf("Select returned %d rows.\n", $result->num_rows);

	    $rowCount = 0;

	    echo '{ "items" : [';
	    while ($row = $result->fetch_assoc()) {

	    	if ($rowCount == 0) {
	    		echo "{";
	    	} else {
	    		echo ", {";
	    	}

			echo '"id" : "' . $row["ID"] . '",';
			echo '"tier" : "' . $row["Tier"] . '",';
			echo '"fullName" : "' . $row["FullName"] . '",';
			echo '"dob" : "' . $row["DOB"] . '",';
			echo '"pos" : "' . $row["Position"] . '",';
			echo '"prof" : "' . $row["Professional"] . '",';
			echo '"amat" : "' . $row["Amateur"] . '",';
			echo '"scholar" : "' . $row["Scholar"] . '",';
			echo '"TPCSign" : "' . $row["WithSign"] . '",';
			echo '"TPCUntil" : "' . $row["WithUntil"] . '",';
			echo '"ClubContract" : "' . $row["ClubCont"] . '",';
			echo '"ClubName" : "' . $row["ClubName"] . '",';
			echo '"ClubSign" : "' . $row["ClubSign"] . '",';
			echo '"ClubDur" : "' . $row["ClubDur"] . '",';
			echo '"comment" : "' . $row["Comment"] . '",';
			echo '"CopyAgency" : "' . $row["CopyAgency"] . '",';
			echo '"CopyPlaying" : "' . $row["CopyPlaying"] . '"';
			
			echo "}";

			$rowCount++;
	    }
	    echo "] }";

	    /* free result set */
	    $result->close();
	}
	
	$conn->close();
?>