$( document ).ready(function() {

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				controls.handleResize();
				render();
			}

	var arr = ["levels.mp4","helload.mp4"];
	var vi = 0;
	$("#button").click(function() {
		$("#v").attr("src", "songs/" + arr[(vi ^= 1)]); // lol
	});
	var sizeval = 2.75;
	$("#dec").click(function() {
		sizeval -= 0.05;
		$("#size").text(sizeval);
	});
	$("#inc").click(function() {
		sizeval += 0.05;
		$("#size").text(sizeval);
	});
	var WIDTH = 800, HEIGHT = 500;
	var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;
	var $container = $('#container');
	var renderer = new THREE.WebGLRenderer();
	var camera =
	new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	var scene = new THREE.Scene();
scene.add(camera);
camera.position.z = 800;
camera.position.x = 400;
camera.position.y = 600;
renderer.setSize(WIDTH, HEIGHT);
$container.append(renderer.domElement);
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, .15);
directionalLight.position.set( 0, 0, 1 );
scene.add( directionalLight );

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



	analyser.fftSize = 1024;
	var bufferLength = analyser.frequencyBinCount;
	console.log(bufferLength);
	var dataArray = new Uint8Array(bufferLength);

	
	var boxarr = [];

	var intarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 34, 35, 37, 39, 41, 43, 45, 47, 49, 51, 54, 56, 59, 62, 65, 68, 71, 74, 78, 82, 86, 90, 94, 98, 103, 108, 113, 118, 124, 130, 136, 142, 149, 156, 163, 171, 179, 187, 196, 205, 215, 225, 236, 247, 259, 271, 284, 297, 311, 326, 341, 357, 374, 391, 410, 429, 449, 470, 492];

	// bufferLength = intarr.length;
	for (var j = 0; j < 30; j++) {

		var boxarr2 = [];
		for (var i = 0; i < intarr.length-1; i++) {

			var sphereMaterial =
new THREE.MeshLambertMaterial();
sphereMaterial.color.setHSL( Math.floor(360*i/intarr.length)/360.0, 100/100 ,50/100.0);


			var boxgeom =  new THREE.BoxGeometry(
				WIDTH/intarr.length-1,
				100,
				WIDTH/intarr.length-1);
			boxgeom.applyMatrix( new THREE.Matrix4().makeTranslation( WIDTH*i/intarr.length, 50, WIDTH*j/intarr.length ) );
			// boxgeom.updateMatrix();
	// canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
		var box = new THREE.Mesh(boxgeom,



		sphereMaterial);


			// add the sphere to the scene
			
			scene.add(box);
			boxarr2.push(box);
			// console.log("HI");
		}
		boxarr.push(boxarr2);

	}

	controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];

	var scalef = 1.0;

	var scalef2 = 0.75;
	var scalef3 = 1;
	renderer.render(scene, camera); 
	var l = 0;
var newarr;

window.addEventListener( 'resize', onWindowResize, false );
	function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);

}
	function draw() {
		drawVisual = requestAnimationFrame(draw);
		analyser.getByteFrequencyData(dataArray);
		newarr = [];
		for (var n = 0; n < intarr.length-1; n++) {
			var sum = 0.0;
			var sum2 = 0.0;
			var ind = intarr[n];
			for (var k = 0; k < bufferLength; k++) {
				var val = 1.0/(1+Math.pow(2.71,Math.pow((getBaseLog(1.047,ind)-getBaseLog(1.047,k))/sizeval,2.0)));
				sum += dataArray[k]*val;
				sum2 += val;
			}
			newarr.push(sum/sum2);
			}
		var barWidth = (WIDTH / intarr.length);
		var barHeight;
		var x = 0;
		// for (var j = boxarr.length-1; j > boxarr.length-6; j--) {
		// 	for(var i = 0; i < newarr.length; i++) {
		// 		if (boxarr[j-1][i].scale.y*scalef > 0) {
		// 		// boxarr[j][i].scale.set(1,boxarr[j-1][i].scale.y*scalef*scalef3*5/(5+j-boxarr.length+6),1);
		// 		}

		// 	}
		// }
		for (var j = boxarr.length-1; j > 12; j--) {
			for(var i = 0; i < newarr.length; i++) {
				if (boxarr[j-1][i].scale.y*scalef > 0) {
				boxarr[j][i].scale.set(1,boxarr[j-1][i].scale.y*scalef,1);
				}

			}
		}
		for (var j = 12; j > 0; j--) {
			for(var i = 0; i < newarr.length; i++) {
				if (boxarr[j-1][i].scale.y*scalef > 0) {
					var sum = 0, sum2 = 0;
					for (var k = 0; k < j; k++) {
						var val = 1.0/(1+Math.pow(2.71,Math.pow((k-j)/20.0,1.0)));
						sum2 += val;
						sum += val*boxarr[k][i].scale.y;
					}
				boxarr[j][i].scale.set(1,sum/sum2*scalef2,1);
				}

			}
		}
		for(var i = 0; i < newarr.length; i++) {
			barHeight = newarr[i]*4.0/HEIGHT;
			if (newarr[i] > 0 && newarr[i] <= 10000) { 
				boxarr[0][i].scale.set(1,newarr[i]*4.0/HEIGHT,1);
			}
			else {
				boxarr[0][i].scale.set(1,.01/HEIGHT,1);
			}
		}
		controls.update();	
		renderer.render(scene, camera); 
		};
		draw();

	});


