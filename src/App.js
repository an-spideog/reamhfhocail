import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
	return (
		<div className="App">
			<h2> Title </h2>
			<p> Description </p>
			<TableWithOptions />
			<p> Notes. </p>

		</div>
	);
}


function TableWithOptions() {
	const [standard, setStandard] = useState(true);
	const [munster, setMunster] = useState(false);
	const [connacht, setConnacht] = useState(false);
	const [ulster, setUlster] = useState(false);

	function toggleStandard() {
		setStandard(!standard);
	}
	function toggleMunster() {
		setMunster(!munster);
	}
	function toggleConnacht() {
		setConnacht(!connacht);
	}
	function toggleUlster() {
		setUlster(!ulster);
	}

	return (
		<div className="TableWithOptions">
			<Options standard={standard} toggleStandard={toggleStandard}
					 munster={munster}   toggleMunster={toggleMunster}
					 connacht={connacht} toggleConnacht={toggleConnacht}
					 ulster={ulster}     toggleUlster={toggleUlster}
			/>
			<Table standard={standard}
				   munster={munster}
				   connacht={connacht}
			       ulster={ulster}
			/>
		</div>
	);
}


function Options({standard, toggleStandard, munster, toggleMunster, connacht, toggleConnacht, ulster, toggleUlster}) {
	return (
		<div>
			<button onClick={toggleStandard}>
				Standard:{standard ? "ON" : "OFF"}
			</button>
			<button onClick={toggleMunster}>
				Munster:{munster ? "ON" : "OFF"}
			</button>		
			<button onClick={toggleConnacht}>
				Connacht:{connacht ? "ON" : "OFF"}
			</button>		
			<button onClick={toggleUlster}>
				Ulster:{ulster ? "ON" : "OFF"}
			</button>
		</div>
	);
}


function Table({standard, munster, connacht, ulster}) {
	return (
		<table>
			<tr>
				<td>Preposition</td>
				<td>First Person Singular</td>
				<td>Second Person Singular</td>
				<td>Third Person Masculine Singular</td>
				<td>Third Person Feminine Singular</td>
				<td>First Person Plural</td>
				<td>Second Person Plural</td>
				<td>Third Person Plural</td>
			</tr>
			<Row preposition="ag" standard={standard} munster={munster} connacht={connacht} ulster={ulster}/>
		</table>
	);
}


/* Row() will be given a preposition and the dialects desired and it
 * will return a div with the relevant content */
function Row({preposition, standard, munster, connacht, ulster}) {  
	const indices = [0, 1, 2, 3, 4, 5, 6];
	const cells = indices.map( (index) =>
		<Cell standard={standard} index={index} preposition={preposition} munster={munster} connacht={connacht} ulster={ulster}/>
	);
	return (
		<tr>
			<td> {preposition} </td>
			{cells}
		</tr>
	);
}

function Cell( {index, preposition, standard, munster, connacht, ulster} ) {
	const standardList = {
		ag: ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	const connachtList = {
		ag: ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	const ulsterList = {
		ag: ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	const munsterList = {
		ag: ["agum", "agut", "aige", "aici", "aguinn", "aguibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	return (
		<td> 
			{standard &&
				<div className="standard"> 
					{standardList[preposition][index]}
				</div>
			}
			{munster &&
				<div className="munster"> 
					{munsterList[preposition][index]}
				</div>
			}
			{connacht &&
				<div className="connacht"> 
					{connachtList[preposition][index]}
				</div>
			}
			{ulster &&
				<div className="ulster"> 
					{ulsterList[preposition][index]}
				</div>
			}
		</td>
	);
}
	


export default App;

