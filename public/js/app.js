$( document ).ready(function() {

	var c = document.getElementById("myCanvas");
	var canvasCtx = c.getContext("2d");
	var WIDTH = c.width;
	var HEIGHT = c.height;

	console.log(WIDTH);

	navigator.getUserMedia = (navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	var analyser = audioCtx.createAnalyser();
	var video = document.getElementById("v");

	source = audioCtx.createMediaElementSource(video);
	source.connect(analyser);
	source.connect(audioCtx.destination);



	analyser.fftSize = 256;
	var bufferLength = analyser.frequencyBinCount;
	console.log(bufferLength);
	var dataArray = new Uint8Array(bufferLength);

	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

	function draw() {
		drawVisual = requestAnimationFrame(draw);

		analyser.getByteFrequencyData(dataArray);

		canvasCtx.fillStyle = 'rgb(0, 0, 0)';
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		var barWidth = (WIDTH / bufferLength);
		var barHeight;
		var x = 0;
		for(var i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i]*2;

			canvasCtx.fillStyle = 'hsl('  + Math.floor(360*i/bufferLength)+','+ Math.floor(barHeight*250/HEIGHT) + '%, 50%)';
			canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

			x += barWidth + 1;
		}
	};
	draw();

});