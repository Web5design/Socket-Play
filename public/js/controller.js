$(document).ready( function () {
	var socket = io.connect(),
		connected = false,
		paused = false;

	socket.on('new connection', function(){
		askForID();
	});

	socket.on('game closed', function(){
		$('#status').html('Game Closed.');
		connected = false;
		$('#connect').show();
	});

	socket.on('game paused', function(){
		paused = true;
	});

	socket.on('game resumed', function(){
		paused = false;
	});

	$('#connect').tap(function(){
		askForID();
	});

	function askForID() {
		var stamp = prompt("Enter the game id:");
		if (stamp != '' && stamp != null) {
			socket.emit('new controller', stamp, function(success){
				if (success) {
					start();
				} else {
					askForID();
				}
			});
		}
	}

	function start() {
		connected = true;
		$('#status').html('Connected');
		$('#connect').hide();
		window.addEventListener('deviceorientation', function(data){
			if (connected && !paused) {
				var data;
				if ('ontouchstart' in window) {
					data = {
						//x and z axis are swapped here becaues the device is held in landscape orientation
						x: -data.gamma.toFixed(3),
						//y: data.alpha,
						z: -data.beta.toFixed(3)
					}
				} else {
					data = {
						x: data.beta.toFixed(3),
						z: -data.gamma.toFixed(3)
					}
				}
				socket.emit('update', data);
				//$('#info').html(data.beta+'<br/>'+data.alpha+'<br/>'+data.gamma);
			}
		}, false);
	}
});