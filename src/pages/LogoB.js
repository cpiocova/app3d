import React, {Component} from 'react';
import * as BABYLON from 'babylonjs';
import './LogoT.css';
import {BOXES_INITIAL_STATE} from '../consts'

class LogoB extends Component {
    state = {
        boxes: BOXES_INITIAL_STATE,
        boxSelected: 'box1',
        boxSelectedArray: 0
    }

    componentDidMount() {
        let elementCanvas = document.getElementById('canvasLogo'), // Esto no se hace, react no tome getElementById
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

    returnBox = () => {
        let box;
        if(this.state.boxSelectedArray == 0){
            return box = this.box1; // Esto no es valido, mas no se como lo pensaste, no lo puedo refactor
        }else if(this.state.boxSelectedArray == 1){
            return box = this.box2;
        }else if(this.state.boxSelectedArray == 2){
            return box = this.box3;
        }
    }

    translateBox = e => {
        const axis = e.target.className.substr(6);
        let box = this.returnBox();
        const n = this.state.boxSelectedArray;
        if(axis === 'X'){
            const posX = Number(e.target.value); 
            this.setState(prevState => ({
                boxes: prevState.boxes.map(
                obj => (obj.nBox === `box${n+1}` ? Object.assign(obj, { posX }) : obj)
              )
            }));
            box.position.x = posX;
        }
        if(axis === 'Y') {
            const posY = Number(e.target.value);
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].posY = posY;
            this.setState({boxes})
            box.position.y = posY;
        }
        if(axis === 'Z') {
            const posZ = Number(e.target.value);
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].posZ = posZ;
            this.setState({boxes})
            box.position.z = posZ;
        }
    }

    rotateBox = e => {
        const axis = e.target.className.substr(6);
        let box = this.returnBox();
        const n = this.state.boxSelectedArray;
        if(axis === 'X'){
            let desnormboxRotX = Number(e.target.value);
            let rotX = desnormboxRotX * Math.PI / 180;
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].rotX = desnormboxRotX;
            this.setState({boxes});
            box.rotation.x = rotX;
        }
        if(axis === 'Y'){
            let desnormboxRotY = Number(e.target.value);
            let rotY = desnormboxRotY * Math.PI / 180;
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].rotY = desnormboxRotY;
            this.setState({boxes});
            box.rotation.y = rotY;
        }
        if(axis === 'Z'){
            let desnormboxRotZ = Number(e.target.value);
            let rotZ = desnormboxRotZ * Math.PI / 180;
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].rotZ = desnormboxRotZ;
            this.setState({boxes});
            box.rotation.z = rotZ;
        }
    }

    scaleBox = e => {
        const axis = e.target.className.substr(6);
        let box = this.returnBox();
        const n = this.state.boxSelectedArray;
        if(axis === 'X'){
            const scaX = Number(e.target.value);          
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].scaX = scaX;
            this.setState({boxes});
            box.scaling.x = scaX;
        }
        if(axis === 'Y') {
            const scaY = Number(e.target.value);          
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].scaY = scaY;
            this.setState({boxes});
            box.scaling.y = scaY;
        }
        if(axis === 'Z') {
            const scaZ = Number(e.target.value);          
            let boxes = JSON.parse(JSON.stringify(this.state.boxes));
            boxes[n].scaZ = scaZ;
            this.setState({boxes});
            box.scaling.z = scaZ;
        }
    }

    handleBoxSelected = e => {
        const boxSelected = e.target.value;
        const boxSelectedArray = document.getElementById('selectBox').selectedIndex;
        this.setState({
            boxSelected,
            boxSelectedArray
        });
    }

    render(){ 
        const {boxes, boxSelected, boxSelectedArray} = this.state;
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
                            </input> {boxes[boxSelectedArray].posX} <br/>
                            Translate Y:
                            <input className="tRangeY" type="range" min="-10" max="10" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].posY} onChange={this.translateBox}>
                            </input> {boxes[boxSelectedArray].posY} <br/>
                            Translate Z:
                            <input className="tRangeZ" type="range" min="-10" max="10" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].posZ} onChange={this.translateBox}>
                            </input> {boxes[boxSelectedArray].posZ} <br/> <br/>
                            Scale X:
                            <input className="sRangeX" type="range" min="0" max="5" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].scaX} onChange={this.scaleBox}>
                            </input> {boxes[boxSelectedArray].scaX} <br/>
                            Scale Y:
                            <input className="sRangeY" type="range" min="0" max="5" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].scaY} onChange={this.scaleBox}>
                            </input> {boxes[boxSelectedArray].scaY} <br/>
                            Scale Z:
                            <input className="sRangeZ" type="range" min="0" max="5" step="0.1" value={this.state.boxes[this.state.boxSelectedArray].scaZ} onChange={this.scaleBox}>
                            </input> {boxes[boxSelectedArray].scaZ} <br/> <br/>

                            Rotate X:
                            <input className="rRangeX" type="range" min="-360" max="360" step="45" value={this.state.boxes[this.state.boxSelectedArray].rotX} onChange={this.rotateBox}>
                            </input> {boxes[boxSelectedArray].rotX}º <br/>
                            Rotate Y:
                            <input className="rRangeY" type="range" min="-360" max="360" step="45" value={this.state.boxes[this.state.boxSelectedArray].rotY} onChange={this.rotateBox}>
                            </input> {boxes[boxSelectedArray].rotY}º <br/>
                            Rotate Z:
                            <input className="rRangeZ" type="range" min="-360" max="360" step="45" value={this.state.boxes[this.state.boxSelectedArray].rotZ} onChange={this.rotateBox}>
                            </input> {boxes[boxSelectedArray].rotZ}º <br/> 

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


