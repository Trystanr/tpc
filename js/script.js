$(document).ready(function() {
	console.log("ready!");

	// Init elements
	// $( "#dob" ).datepicker();

	$("#requestAddPlayer").click(function(e) {

		/*

			TODO

			- Feedback on success, failure

		*/

		e.preventDefault();

		console.log("Add Player");

		playerObject = {
			"tier": $('#tier').val(),
			"fullName": $('#fullName').val(),
			"dob": $('#dob').val(),
			"pos": $('#pos').val(),
			"prof": 0,
			"amat": 0,
			"scholar": $('#scholar').val(),
			"TPCSign": $('#TPCSign').val(),
			"TPCUntil": $('#TPCUntil').val(),
			"ClubContract": $('#ClubContract').val(),
			"ClubName": $('#ClubName').val(),
			"ClubSign": $('#ClubSign').val(),
			"ClubDur": $('#ClubDur').val(),
			"comment": $('#comment').val(),
			"CopyAgency": "agency/document.pdf",
			"CopyPlaying": "agency/document.pdf"
		};

		if ($('#prof').prop("checked")) {
			playerObject.prof = 1;
		} else {
			playerObject.prof = 0;
		}

		if ($('#amat').prop("checked")) {
			playerObject.amat = 1;
		} else {
			playerObject.amat = 0;
		}

		player = JSON.stringify(playerObject);

		$.ajax({
			type: "GET",
			url: "php/createPlayer.php",
			data: { player },
			dataType: "text",
			error: function(xhr, statusText) { console.log("Error: " + statusText); },
			success: function(d) {

				console.log(d);
				if (d[0] == "1") {
					console.log("success");
				}

			}
		});

	});

	$("#requestGetPlayers").click(function(e) {

		/*

			TODO

			-

		*/

		e.preventDefault();

		console.log("get Player");

		$.ajax({
			type: "GET",
			url: "php/getPlayers.php",
			dataType: "text",
			error: function(xhr, statusText) { console.log("Error: " + statusText); },
			success: function(msg) {
				// console.log( (msg) ); 
				console.log(JSON.parse(msg));

				var jsonObj = JSON.parse(msg);

				populateTable("player-table", jsonObj);
			}
		});

	});
});


function JSONtoTable(obj) {

	// console.log(obj);
	var sOut = "";

	//table headers
	sOut += "<thead>";
	sOut += "<tr>";
	sOut += "<th>ID</th>";
	sOut += "<th>Tier</th>";
	sOut += "<th>Full Name</th>";
	sOut += "<th>DOB</th>";
	sOut += "<th>Position</th>";
	sOut += "<th>P</th>";
	sOut += "<th>A</th>";
	sOut += "<th>S</th>";
	sOut += "<th>Signed To TPC</th>";
	sOut += "<th>With TPC Until</th>";
	sOut += "<th>Contracted Club</th>";
	sOut += "<th>Club Name</th>";
	sOut += "<th>Club Sign Date</th>";
	sOut += "<th>Club @ Duration</th>";
	sOut += "<th>Comment</th>";
	sOut += "<th>CA</th>";
	sOut += "<th>PL</th>";

	sOut += "</tr>";
	sOut += "</thead>";

	sOut += "<tbody>";
	for (var i = 0; i < obj["items"].length - 1; i++) {
		sOut += '<tr data-id="' + obj["items"][i]['id'] + '">';
		sOut += "<td>" + obj["items"][i]['id'] + "</td>";
		sOut += "<td>" + obj["items"][i]['tier'] + "</td>";
		sOut += "<td>" + obj["items"][i]['fullName'] + "</td>";
		sOut += "<td>" + obj["items"][i]['dob'] + "</td>";
		sOut += "<td>" + obj["items"][i]['pos'] + "</td>";
		sOut += "<td>" + obj["items"][i]['prof'] + "</td>";
		sOut += "<td>" + obj["items"][i]['amat'] + "</td>";
		sOut += "<td>" + obj["items"][i]['scholar'] + "</td>";
		sOut += "<td>" + obj["items"][i]['TPCSign'] + "</td>";
		sOut += "<td>" + obj["items"][i]['TPCUntil'] + "</td>";
		sOut += "<td>" + obj["items"][i]['ClubContract'] + "</td>";
		sOut += "<td>" + obj["items"][i]['ClubName'] + "</td>";
		sOut += "<td>" + obj["items"][i]['ClubSign'] + "</td>";
		sOut += "<td>" + obj["items"][i]['ClubDur'] + "</td>";
		sOut += "<td>" + obj["items"][i]['comment'] + "</td>";
		sOut += "<td><a href='" + obj["items"][i]['CopyAgency'] + "'>link</a></td>";
		sOut += "<td><a href='" + obj["items"][i]['CopyPlaying'] + "'>link</a></td>";
		sOut += "</tr>";
	}
	sOut += "</tbody>";


	return sOut;

}

function populateTable(tableID, jsonString) {

	var tableElement = document.getElementById(tableID);

	tableElement.innerHTML = JSONtoTable(jsonString);

	$('#'+tableID).DataTable();

	$('#'+tableID).find('tr').click( function(){
		if ($(this).parent('thead').length == 0) {
			console.log('You clicked row '+ ($(this).index()+1) );
			console.log($(this).data("id"));
		}
	});
}





