import React, {Component} from 'react';
import * as BABYLON from 'babylonjs';
// import * as HAND from 'handjs';

import './LogoT.css';

class LogoB extends Component {
    
    constructor(props){
        super(props);
        this.translateBox = this.translateBox.bind(this);
        this.rotateBox = this.rotateBox.bind(this);
        this.scaleBox = this.scaleBox.bind(this);
        this.handleBoxSelected = this.handleBoxSelected.bind(this);
        this.returnBox = this.returnBox.bind(this);
        this.state = {
            boxes: [
                {
                    nBox: 'box1',
                    posX: 0,
                    posY: 0,
                    posZ: 0,
                    rotX: 0,
                    rotY: 0,
                    rotZ: 0,
                    scaX: 1,
                    scaY: 1,
                    scaZ: 1
                },
                {
                    nBox: 'box2',
                    posX: 0,
                    posY: 0,
                    posZ: 0,
                    rotX: 0,
                    rotY: 0,
                    rotZ: 0,
                    scaX: 1,
                    scaY: 1,
                    scaZ: 1
                },
                {
                    nBox: 'box3',
                    posX: 0,
                    posY: 0,
                    posZ: 0,
                    rotX: 0,
                    rotY: 0,
                    rotZ: 0,
                    scaX: 1,
                    scaY: 1,
                    scaZ: 1
                }

            ],
            boxSelected: 'box1',
            boxSelectedArray: 0
        }
    }

    componentDidMount() {
        var elementCanvas = document.getElementById('canvasLogo'),
            motorBabylon = new BABYLON.Engine(elementCanvas, true),
            scene = new BABYLON.Scene(motorBabylon),
            camera = new BABYLON.ArcRotateCamera("Camera", 1, 1, 10, new BABYLON.Vector3(0,0,0), scene),
            light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 5), scene );
            
        this.box1 = new BABYLON.Mesh.CreateBox("Box1", 3, scene);
        this.box1.position = new BABYLON.Vector3(0,0,0);
        this.box1.material = new BABYLON.StandardMaterial('MaterialBox1', scene);
        this.box1.material.diffuseColor = new BABYLON.Color3(1,0,0);

        this.box2 = new BABYLON.Mesh.CreateBox("Box2", 3, scene);
        this.box2.position = new BABYLON.Vector3(0,0,0);
        this.box2.material = new BABYLON.StandardMaterial('MaterialBox2', scene);
        this.box2.material.diffuseColor = new BABYLON.Color3(0,1,0);

        this.box3 = new BABYLON.Mesh.CreateBox("Box3", 3, scene);
        this.box3.position = new BABYLON.Vector3(0,0,0);
        this.box3.material = new BABYLON.StandardMaterial('MaterialBox3', scene);
        this.box3.material.diffuseColor = new BABYLON.Color3(0,0,1);


        scene.activeCamera.attachControl(elementCanvas);
        motorBabylon.runRenderLoop(function(){
            scene.render();
        })
    }

    componentWillUnmount() {
      
    }

    returnBox() {
        var box;
        if(this.state.boxSelectedArray == 0){
            return box = this.box1;
        }else if(this.state.boxSelectedArray == 1){
            return box = this.box2;
        }else if(this.state.boxSelectedArray == 2){
            return box = this.box3;
        }
    }

    translateBox(e) {
        const axis = e.target.className.substr(6);
        var box = this.returnBox();
        const n = this.state.boxSelectedArray;
       

        
        if(axis === 'X'){
            const posX = Number(e.target.value);          
            // var boxes = JSON.parse(JSON.stringify(this.state.boxes));
            // boxes[n].posX = posX;
            // this.setState({
            //     boxes         
            // })
            this.setState(prevState => ({
                boxes: prevState.boxes.map(
                obj => (obj.nBox === `box${n+1}` ? Object.assign(obj, { posX: posX }) : obj)
              )
            }));

            // console.log(this.state.boxes[n].posX) No imprime bien
            box.position.x = posX;
        }

        if(axis === 'Y') {
            const posY = Number(e.target.value);
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].posY = posY;
            this.setState({
                boxes: boxesCopy            
            })
            box.position.y = posY;
        }

        if(axis === 'Z') {
            const posZ = Number(e.target.value);
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].posZ = posZ;
            this.setState({
                boxes: boxesCopy          
            })
            box.position.z = posZ;
        }
    }

    rotateBox(e) {
        const axis = e.target.className.substr(6);
        var box = this.returnBox();
        const n = this.state.boxSelectedArray;
        
        if(axis === 'X'){
            var desnormboxRotX = Number(e.target.value);
            var rotX = desnormboxRotX * Math.PI / 180;
          
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].rotX = desnormboxRotX;


            this.setState({
                boxes: boxesCopy           
            })
            box.rotation.x = rotX;
        }
        if(axis === 'Y'){
            var desnormboxRotY = Number(e.target.value);
            var rotY = desnormboxRotY * Math.PI / 180;
          
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].rotY = desnormboxRotY;


            this.setState({
                boxes: boxesCopy           
            })
            box.rotation.y = rotY;
        }

        if(axis === 'Z'){
            var desnormboxRotZ = Number(e.target.value);
            var rotZ = desnormboxRotZ * Math.PI / 180;
          
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].rotZ = desnormboxRotZ;


            this.setState({
                boxes: boxesCopy           
            })
            box.rotation.z = rotZ;
        }
    }

    scaleBox(e) {
        const axis = e.target.className.substr(6);
        var box = this.returnBox();
        const n = this.state.boxSelectedArray;


        if(axis === 'X'){
            const scaX = Number(e.target.value);          
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].scaX = scaX;

            this.setState({
                boxes: boxesCopy         
            })
            box.scaling.x = scaX;
        }

        if(axis === 'Y') {
            const scaY = Number(e.target.value);          
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].scaY = scaY;

            this.setState({
                boxes: boxesCopy         
            })
            box.scaling.y = scaY;
        }

        if(axis === 'Z') {
            const scaZ = Number(e.target.value);          
            var boxesCopy = JSON.parse(JSON.stringify(this.state.boxes));
            boxesCopy[n].scaZ = scaZ;

            this.setState({
                boxes: boxesCopy         
            })
            box.scaling.z = scaZ;
        }
    }

    handleBoxSelected(e) {
        const boxSelected = e.target.value;
        // const boxSelectedArray = Number(boxSelected.substr(3)) - 1;
        const boxSelectedArray = document.getElementById('selectBox').selectedIndex;
        this.setState({
            boxSelected,
            boxSelectedArray
        })
        
    }

    render(){ 
        return (
            <div className="body-app">
                <div id="canvas-wrapper">
                    <div className="canvasController">
                        <div className="header-canvasController">
                            Controller
                        </div>
                        <div className="body-canvasController">

                            Select box  
                            <select id="selectBox" onChange={this.handleBoxSelected}>
                                {
                                    this.state.boxes.map((box, key) => {
                                        return (<option
                                                    key={key}
                                                    value={box}
                                                >
                                                    {`Box ${key+1}`}
                                                </option>)
                                    })
                                }
                            </select>
                            <br/><br/>

                            Translate X:
                            <input className="tRangeX" type="range" min="-10" max="10" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].posX} onChange={this.translateBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].posX} <br/>
                            Translate Y:
                            <input className="tRangeY" type="range" min="-10" max="10" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].posY} onChange={this.translateBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].posY} <br/>
                            Translate Z:
                            <input className="tRangeZ" type="range" min="-10" max="10" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].posZ} onChange={this.translateBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].posZ} <br/> <br/>
                            
                            Scale X:
                            <input className="sRangeX" type="range" min="0" max="5" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].scaX} onChange={this.scaleBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].scaX} <br/>
                            Scale Y:
                            <input className="sRangeY" type="range" min="0" max="5" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].scaY} onChange={this.scaleBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].scaY} <br/>
                            Scale Z:
                            <input className="sRangeZ" type="range" min="0" max="5" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].scaZ} onChange={this.scaleBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].scaZ} <br/> <br/>

                            Rotate X:
                            <input className="rRangeX" type="range" min="-360" max="360" step="45" value={this.state.boxes[this.state.boxSelectedArray].rotX} onChange={this.rotateBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].rotX}º <br/>
                            Rotate Y:
                            <input className="rRangeY" type="range" min="-360" max="360" step="45" value={this.state.boxes[this.state.boxSelectedArray].rotY} onChange={this.rotateBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].rotY}º <br/>
                            Rotate Z:
                            <input className="rRangeZ" type="range" min="-360" max="360" step="45" value={this.state.boxes[this.state.boxSelectedArray].rotZ} onChange={this.rotateBox}>
                            </input> {this.state.boxes[this.state.boxSelectedArray].rotZ}º <br/> 

                        </div>
                    </div>
                    <canvas id="canvasLogo"></canvas>
                </div>
                
                <div className="leyend">
                    <span>Leyend: </span>
                    <span style={{color: "red", fontWeight: "900"}}>Box 1</span>
                    <span style={{color: "green", fontWeight: "900"}}>Box 2</span>
                    <span style={{color: "blue", fontWeight: "900"}}>Box 3</span>
                </div>
            </div>
        )
    }

}


export default LogoB;


