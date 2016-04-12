var camera;

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='js/stats.min.js';document.head.appendChild(script);})()

$( document ).ready(function() {

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				controls.handleResize();
				// render();
			}

// SC.initialize({
//   client_id: '6c3507a1755ff1781664a4cc4b5c99c7'
// });

// stream track id 293
// SC.stream("/tracks/222245726",function(sound){
//         $("#stop").click(function(){
//             sound.stop();
//         });
//         $("#start").click(function(){
//             sound.start();
//         });
        
//     });
// SC.stream('/tracks/253413810').then(function(player){
//   player.play();
// });

// SC.stream('/tracks/253413810').then(function(player){
//   player.play();
// });

var id;
var url = "songs/mp3/dream.mp3";
$("#player").attr("src", url)
$("#update").click(function() {
	var id2;
	url = $("#url").val();

	SC.get("/resolve/?url="+url).then(function(result){
       id2 = result.id;	
SC.get("/tracks/" + id2).then(function(sound){
    $("#player").attr("src", sound.uri+"/stream?client_id=6c3507a1755ff1781664a4cc4b5c99c7");
   });

    // $("#player").play();/
    // $("#player").crossOrigin = "anonymous";
});
});

// SC.get("/resolve/?url="+url).then(function(result){
//        id = result.id;
//    });

// SC.get("/tracks/" + id).then(function(sound){
//     $("#player").attr("src", sound.uri+"/stream?client_id=6c3507a1755ff1781664a4cc4b5c99c7");
//     // $("#player").play();
//     // $("#player").crossOrigin = "anonymous";
// });
	var player = document.getElementById("player");
// player.setAttribute('src', "http://api.soundcloud.com/tracks/253413810&client_id=6c3507a1755ff1781664a4cc4b5c99c7");
//         player.play();


// var track_url = 'https://soundcloud.com/imaginedragons/imagine-dragons-dream-jorgen-odegard-remix';
// SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
// 	console.log(oEmbed);
//   $("#emb").html(oEmbed.html);
// });


	var arr = ["levels.mp4","arms.mp4","dream.mp4","helload.mp4","withthem"];
	var vi = 0;

	var arr2 = ["dream.mp3","arms.mp3","pillowtalk.mp3"];
	for (var i = 0; i < arr2.length; i++) {
		$("#songs").append("<button data-s='" + i + "' id='song-" + i + "'>" + arr2[i] + "</button>");
		$("#song-"+i).click(function() {
			$("#player").attr("src", "songs/mp3/"+arr2[$(this).data("s")]);
		});
	}

	// var player = new MediaElementPlayer('#v');
	$("#button").click(function() {
		vi++;
		if (vi == arr.length) vi = 0;
		$("#v").attr("src", "songs/" + arr[vi]); // lol
	});
	var sizeval = 2;
	$("#dec").click(function() {
		sizeval -= 0.05;
		$("#size").text(sizeval);
	});
	$("#inc").click(function() {
		sizeval += 0.05;
		$("#size").text(sizeval);
	});
	var WIDTH = 1200, HEIGHT = 600;
	var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;
	var $container = $('#container');
	var renderer = new THREE.WebGLRenderer();
	 camera =
	new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR)

	var scene = new THREE.Scene();
scene.add(camera);
camera.position.z = 445;
camera.position.x = 1455;
camera.position.y = 200;
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

// 	videos = document.querySelectorAll("video");
// for (var i = 0, l = videos.length; i < l; i++) {
//     var video = videos[i];
//     var src = video.src || (function () {
//         var sources = video.querySelectorAll("source");
//         for (var j = 0, sl = sources.length; j < sl; j++) {
//             var source = sources[j];
//             var type = source.type;
//             var isMp4 = type.indexOf("mp4") != -1;
//             if (isMp4) return source.src;
//         }
//         return null;
//     })();
//     if (src) {
//         var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
//         if (isYoutube) {
//             var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
//             id = (id.length > 1) ? id.splice(1) : id;
//             id = id.toString();
//             var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
//             video.src = mp4url + id;
//         }
//     }
// }

	$('video, audio').mediaelementplayer();



	// var player = document.getElementById("player");

	var analyser = audioCtx.createAnalyser();
	var video1 = document.getElementById("v");

	// source = audioCtx.destination;

	source = audioCtx.createMediaElementSource(player);
	source.connect(analyser);
	source.connect(audioCtx.destination);

		// player.setAttribute('src', "https://soundcloud.com/tracks/222245726");
  //       player.play();

	analyser.fftSize = 512;

        analyser.smoothingTimeConstant = .83;
	var bufferLength = analyser.frequencyBinCount;
	console.log(bufferLength);
	var dataArray = new Uint8Array(bufferLength);
// var sphereMaterial = new THREE.MeshLambertMaterial();


// sphereMaterial.color.setHSL( Math.floor(360)/360.0, 100/100 ,50/100.0);
	
	var boxarr = [];

	var intarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 34, 35, 37, 39, 41, 43, 45, 47, 49, 51, 54, 56, 59, 62, 65, 68, 71, 74, 78, 82, 86, 90, 94, 98, 103, 108, 113, 118, 124, 130, 136, 142, 149, 156, 163, 171, 179, 187, 196, 205, 215];
	//, 259, 271, 284, 297, 311, 326, 341, 357, 374, 391, 410, 429, 449, 470, 492]; , 225, 236, 247];
	// console.log()
	// var intarr = [];

	// for (var i = 0; i < )

	// bufferLength = intarr.length;

	var boxgeom =  new THREE.BoxGeometry(
				WIDTH/intarr.length-1,
				100,
				WIDTH/intarr.length-1);

			boxgeom.applyMatrix( new THREE.Matrix4().makeTranslation(0, 50, 0 ) );

	for (var j = 0; j < 40; j++) {

		var boxarr2 = [];
		for (var i = 0; i < intarr.length-1; i++) {


			
			
			// boxgeom.applyMatrix( new THREE.Matrix4().makeTranslation( WIDTH*i/intarr.length, 50, WIDTH*j/intarr.length ) );


			// boxgeom.updateMatrix();

// boxgeom.computeVertexNormals();
var sphereMaterial = new THREE.MeshLambertMaterial();


sphereMaterial.color.setHSL( Math.floor(360*i/intarr.length)/360.0, 100/100 ,50/100.0);

	// canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
		var box = new THREE.Mesh(boxgeom,



		sphereMaterial);

			box.position.x = WIDTH*i/intarr.length;
			box.position.y = 50;
			box.position.z = WIDTH*j/intarr.length;

			// add the sphere to the scene
			
			scene.add(box);
			boxarr2.push(box);

			// if (boxarr2.length > 0) {
			// boxarr2[i].geometry.merge(boxarr2[i-1]);
			// }

			// console.log("HI");
		}
		boxarr.push(boxarr2);

	}

	controls = new THREE.TrackballControls( camera , renderer.domElement);
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

		// for (var n = 0; n < intarr.length-1; n++) {
		// 	var sum = 0.0;
		// 	// var sum2 = 0.0;
		// 	// console.log(bufferLength*n/intarr.length);
		// 	newarr.push(dataArray[Math.floor(bufferLength*n/intarr.length)])

		// 	// // var ind = intarr[n];
		// 	// for (var k = 0; k < bufferLength; k++) {
		// 	// 	var val = 1.0/(1+Math.pow(2.71,Math.pow((getBaseLog(1.047,ind)-getBaseLog(1.047,k))/sizeval,2.0)));
		// 	// 	sum += dataArray[k]*val;
		// 	// 	sum2 += val;
		// 	// }
		// 	// newarr.push(sum/sum2);
		// }
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
		for (var j = boxarr.length-1; j > 20; j--) {
			for(var i = 0; i < newarr.length; i++) {
				if (boxarr[j-1][i].scale.y*scalef > 0) {
				boxarr[j][i].scale.set(1,boxarr[j-1][i].scale.y*scalef,1);
				}

			}
		}
		for (var j = 20; j > 0; j--) {
			for(var i = 0; i < newarr.length; i++) {
				if (boxarr[j-1][i].scale.y*scalef > 0) {
					var sum = 0, sum2 = 0;
					for (var k = 0; k < j; k++) {
						var val = 1.0/(1+Math.pow(2.71,Math.pow((k-j)/10.0,1.0)));
						sum2 += val;
						sum += val*boxarr[k][i].scale.y;
					}
				boxarr[j][i].scale.set(1,sum/sum2*scalef2,1);
				}

			}
		}
		for(var i = 0; i < newarr.length; i++) {
			barHeight = newarr[i]*4.0/HEIGHT;
			if (newarr[i]*6.0/HEIGHT > 10/HEIGHT && newarr[i] <= 10000) { 
				boxarr[0][i].scale.set(1,newarr[i]*12.0/HEIGHT,1);
			}
			else {
				boxarr[0][i].scale.set(1,10/HEIGHT,1);
			}
		}


		// var object = scene.children[0];
		// scene.traverse( function ( child )
  //   {
  //       if ( child instanceof THREE.Mesh ) { child.color.setHSL(Math.floor(150), 255/255.0 ,50/100.0); }
  //   });

  		// console.log(l);


		for (var j = boxarr.length-1; j >= 0; j--) {
			for(var i = 0; i < newarr.length; i++) {
				boxarr[j][i].material.color.setHSL(Math.floor(360.0*i/newarr.length+l/10.0)/360.0, boxarr[j][i].scale.y*200/255.0+3.0/4.0 ,50.0/100.0);
				

			}
		}

		controls.update();	

			renderer.setPixelRatio( window.devicePixelRatio );
		renderer.render(scene, camera); 
		l += 10;
		if (l == 3600) { l = 0;}
		};
		draw();

	});





