import React, {Component} from 'react';
import * as THREE from 'three';

import './LogoT.css';

class LogoT extends Component {
    constructor(props){
        super(props);
        this.cameraInitialize = this.cameraInitialize.bind(this);
        this.animateScene = this.animateScene.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        
        window.addEventListener( 'resize', this.onWindowResize, false );        

        this.height = document.getElementById('canvasLogo1').clientHeight;
        this.width = document.getElementById('canvasLogo1').clientWidth;
        this.aspectRadio = this.width / this.height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.aspectRadio, 0.1, 1000);
        this.light = new THREE.PointLight(0xFFFF00);

        // this.camera.position.set(0, 0, 4);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x000000);

        document.getElementById('canvasLogo').appendChild(this.renderer.domElement);


        // this.vertex = [
        //                 [-1,0,0], [1,0,0], [1,1,0], [-1,1,0], [-1,0,0]  
        //               ];
        // this.geometry = new THREE.Geometry();
        // var tam = this.vertex.length;

        // for(var i = 0; i < tam; i++) {
        //     var Px = this.vertex[i][0],
        //         Py = this.vertex[i][1],
        //         Pz = this.vertex[i][2],
        //         vertice = new THREE.Vector3(Px,Py,Pz);
                
        //     this.geometry.vertices.push(vertice);
        // }
        // this.material = new THREE.ParticleBasicMaterial({color: 0xFFFF00});
        // this.shape  = new THREE.Line(this.geometry, this.material);
        // this.scene.add(this.shape);




        this.geometry1 = new THREE.BoxGeometry( 2.5, 4, 1); 
        this.geometry2 = new THREE.BoxGeometry( 2.5, 4, 1); 
        this.geometry3 = new THREE.BoxGeometry( 2.5, 4, 1); 
        
        this.material1 = new THREE.MeshLambertMaterial( { color: 0xFF0000, wireframe: false} );
        this.material2 = new THREE.MeshLambertMaterial( { color: 0x00FF00, wireframe: false} );
        this.material3 = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, wireframe: false} );
        
        this.cube1 = new THREE.Mesh( this.geometry1, this.material1 ); 
        this.cube2 = new THREE.Mesh( this.geometry2, this.material2 );
        this.cube3 = new THREE.Mesh( this.geometry3, this.material3 );

        this.cube1.rotation.z += 90 * Math.PI / 180;

        this.cube1.position.set(0, -1, 0.5);

        this.cube2.position.set(0, 0, 0);
        this.cube3.position.set(5, 0, 0);
        this.light.position.set(0, 0, 5);
        
        this.scene.add(this.cube1, this.cube2, this.cube3);
        
        this.scene.add(this.camera);
        this.scene.add(this.light);

        this.cameraInitialize();
        this.animateScene();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        document.getElementById('canvasLogo1').removeChild(this.renderer.domElement);
    }

    onWindowResize () {
        this.height = document.getElementById('canvasLogo1').clientHeight;
        this.width = document.getElementById('canvasLogo1').clientWidth;

        this.camera.updateProjectionMatrix();
        this.camera.aspect = this.width / this.height;    
        this.renderer.setSize( this.width, this.height );
    }


    cameraInitialize() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 6;
    }

    animateScene() {
        this.frameId = window.requestAnimationFrame(this.animateScene);
        // this.cube1.rotation.x -=0.01;
        this.renderer.render(this.scene, this.camera);
    }

    render(){ 
        return (
          <div id="canvasLogo1">
          </div>
        )
    }

}


export default LogoT;



