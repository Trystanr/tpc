// TODO:
/*
	Split up code into: 
		network,
		utility,
		modal
*/

var players = [];

var transitionOfffset = 200;

var modalPositions = {
	top: 0,
	left: 0,
	width: 0,
	height: 0
}

$.get( "http://affix.joburg/tpc/php/getPlayers.php", function( data ) {
  console.log(data);

  for (var i = data.items.length - 1; i >= 0; i--) {

  	// TODO: Club logo checking with switch
  	$('#player-list').append(
  	  $('<li data-player="'+i+'"><div class="player-head"><h2>'+data.items[i].fullName+'</h2><h3>'+calcAge(data.items[i].dob)+' Years</h3></div><div class="player-team" style="background-image:url(img/clubs/'+data.items[i].ClubName.toLowerCase()+'.png)"></div></li>')
  	);
  }

  players = data.items;
});

$("#player-modal-dismiss").on("click", function(e) {
	e.preventDefault();
	closeModal();
});

$( "#player-list" ).delegate( "li", "click", function( event ) {
	openModal($(this), $(this).data("player"));
});

function openModal( target, player) {

	populateModal(player);

	modalPositions.top = $(target).position().top;
	modalPositions.left = $(target).position().left;
	modalPositions.width = $(target).width();
	modalPositions.height = $(target).height();

	$("#player-modal").css(
		{
			"top": $(target).position().top - $(window).scrollTop() + "px",
			"left": $(target).position().left + "px",
			"width": $(target).width() + "px",
			"height": $(target).height() + "px",
			"border-radius": "8px",
			"opacity": 0
		}
	);

	setTimeout( function(){
		$('#player-modal').addClass("transitions-allow");
		$("#player-modal").removeClass("modal-hide");

		$('#player-modal').css(
			{
				"opacity": 1
			}
		)
	},1);

	setTimeout( function(){
		$('#player-modal').css(
			{
				"top": "0",
				"left": "0",
				"width": "100vw",
				"height": "100vh",
				"border-radius": "0"
			}
		)

	},1*transitionOfffset);

	setTimeout( function(){
		$("#player-modal-dismiss").css(
			{
				"top": "10px"
			}
		);

		$("#player-modal-content").addClass("content-show");

	},2.8*transitionOfffset);

}

function closeModal(  ) {
	
	$("#player-modal-content").removeClass("content-show");

	$("#player-modal-dismiss").css(
		{
			"top": "-50px"
		}
	);

	setTimeout( function(){
		$("#player-modal").css(
			{
				"top": (modalPositions.top - $(window).scrollTop()) + "px",
				"left": modalPositions.left + "px",
				"width": modalPositions.width + "px",
				"height": modalPositions.height + "px",
				"opacity": 1,
				"border-radius": "8px"
			}
		);
	},1*transitionOfffset);
	

	setTimeout( function(){
		$('#player-modal').css(
			{
				"opacity": "0"
			}
		);
	},2.2*transitionOfffset);

	setTimeout( function(){
		$('#player-modal').removeClass("transitions-allow");
		$("#player-modal").addClass("modal-hide");
	},4*transitionOfffset);

}

function calcAge(birthday) {
	var parts =birthday.split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
	var ageDifMs = Date.now() - mydate;

	var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function populateModal(playerIndex) {
	console.log(players[playerIndex]);
	if (playerIndex !== undefined) {
		$("#player-modal-content h2#content-name").text(players[playerIndex].fullName);
		$("#player-modal-content h3#content-dob").text(players[playerIndex].dob);
		$("#player-modal-content h3#content-club").text(players[playerIndex].ClubName);
	}	
}