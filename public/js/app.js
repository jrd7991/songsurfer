$( document ).ready(function() {
	var scene, camera, renderer;
	var geometry, material, mesh;

	init();
	animate();

	function init() {

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 1000;

		material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );


		var object;

		object = new THREE.Mesh( new THREE.BoxGeometry( 50, 50, 100 ), material );
		object.position.set( 0, 0, 200 );
		scene.add( object );

		object = new THREE.Mesh( new THREE.BoxGeometry( 200, 50, 100 ), material );
		object.position.set( 500, 0, 200);
		scene.add( object );
 		// geometry = new THREE.BoxGeometry( 200, 200, 200 );
        // material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

	}

	function animate() {

		requestAnimationFrame( animate );
				render();

		renderer.render( scene, camera );

	}


	function render() {
		var timer = Date.now() * 0.0001;
				camera.position.x = Math.cos( timer ) * 800;
				camera.position.z = Math.sin( timer ) * 800;
				camera.lookAt( scene.position );
				for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
					var object = scene.children[ i ];
					object.rotation.x = timer * 5;
					object.rotation.y = timer * 2.5;
				}
				renderer.render( scene, camera );

	}

});