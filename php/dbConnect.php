<?php
	header("Content-Type: application/json; charset=UTF-8");

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$servername = "sql29.jnb2.host-h.net";
	$username = "affixnruuc_1";
	$password = "6Tf0Q2yhNbCz87cQW3ZR";
	$dbname = "affixnruuc_db1";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("0Connection failed: " . $conn->connect_error);
	}

	// CREATE TABLE `affixnruuc_db1`.`tblPlayers` ( `ID` INT NOT NULL AUTO_INCREMENT ,  `Tier` INT NOT NULL ,  `FullName` VARCHAR NOT NULL ,  `DOB` VARCHAR NOT NULL ,  `Position` VARCHAR NOT NULL ,  `Professional` BOOLEAN NOT NULL ,  `Amateur` BOOLEAN NOT NULL ,  `Scholar` INT NOT NULL ,  `WithSign` DATE NOT NULL ,  `WithUntil` DATE NOT NULL ,  `ClubCont` VARCHAR NOT NULL ,  `ClubName` VARCHAR NOT NULL ,  `ClubSign` DATE NOT NULL ,  `ClubDur` DATE NOT NULL ,  `Comment` TEXT NOT NULL ,  `CopyAgency` VARCHAR NOT NULL ,  `CopyPlaying` VARCHAR NOT NULL ,    PRIMARY KEY  (`ID`)) ENGINE = InnoDB;

?>