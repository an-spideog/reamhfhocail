import './App.css';
import React from 'react';

/*
 * Proposed Structure:
 * TableWithOptions
 * 	Options
 * 	Table
 * 		Row
 * 			Content
 */

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


/* 
 * State will live here, because it needs to get to the rows from the options
 * Because of this, it will be a class rather than a function 
 */
class TableWithOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			standard: true, 
			munster: false, 
			connacht: false, 
			ulster: false
		}

		this.toggleStandard = this.toggleStandard.bind(this);
		this.toggleMunster = this.toggleMunster.bind(this);
		this.toggleConnacht = this.toggleConnacht.bind(this);
		this.toggleUlster = this.toggleUlster.bind(this);
		this.toggleDialect = this.toggleDialect.bind(this);
	}

	/*toggleDialect(dialect) {
		this.setState(prevState => ({
			dialect: !prevState.dialect // this is considering dialect the name of a property rather than as a variable that I passed
		}));
		
	} */

	/* This is the current workaround, it feels repetitive and unneccessary though */
	toggleStandard() {
		this.setState(prevState => ({standard: !prevState.standard}));
	}
	toggleMunster() {
		this.setState(prevState => ({munster: !prevState.munster}));
	}
	toggleConnacht() {
		this.setState(prevState => ({connacht: !prevState.connacht}));
	}
	toggleUlster() {
		this.setState(prevState => ({ulster: !prevState.ulster}));
	}

	toggleDialect(dialect) {
		switch (dialect) {
			case "standard":
				this.toggleStandard();
				break;
			case "munster":
				this.toggleMunster();
				break;
			case "connacht":
				this.toggleConnacht();
				break;
			case "ulster":
				this.toggleUlster();
				break;
			default:
				console.log("concern");
		}
	}




	render () {
		return (
			<div className="TableWithOptions">
				<Options enabled={this.state}
					     toggleDialect={this.toggleDialect}
				/>
				<Table enabled={this.state}/>
			</div>
		); 
	}
}


function Options(props) {
	return (
		<div>
			<button onClick={() => { 
				props.toggleDialect("standard");
				console.log("test");
				console.log(props.enabled);
				}}>
				Standard:{props.enabled.standard ? "ON" : "OFF"}
			</button>
			<button onClick={() => props.toggleDialect("munster")}>
				Munster:{props.enabled.munster ? "ON" : "OFF"}
			</button>
			<button onClick={() => props.toggleDialect("connacht")}>
				Connacht:{props.enabled.connacht ? "ON" : "OFF"}
			</button>
			<button onClick={() => props.toggleDialect("ulster")}>
				Ulster:{props.enabled.ulster ? "ON" : "OFF"}
			</button>
		</div>
	);
}


function Table(props) {
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
			<Row preposition="ag" enabled={props.enabled}/>
		</table>
	);
}


/* Row() will be given a preposition and the dialects desired and it
 * will return a div with the relevant content */
function Row(props) {  
	const indices = [0, 1, 2, 3, 4, 5, 6];
	const cells = indices.map( (index) =>
		<Cell enabled={props.enabled} index={index} preposition="ar"/>
	);
	return (
		<tr>
			<td> {props.preposition} </td>
			{cells}
		</tr>
	);
}

function Cell(props) {
	const standard = {
		ag: ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	const connacht = {
		ag: ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	const ulster = {
		ag: ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	const munster = {
		ag: ["agum", "agut", "aige", "aici", "aguinn", "aguibh", "acu"],
		ar: ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"]
	};

	return (
		<td> 
			{props.enabled.standard &&
				<div className="standard"> 
					{standard[props.preposition][props.index]}
				</div>
			}
			
			{props.enabled.munster &&
				<div className="munster">
					{munster[props.preposition][props.index]}
				</div>
			}

			{props.enabled.connacht &&
				<div className="connacht">
					{connacht[props.preposition][props.index]}
				</div>
			}

			{props.enabled.ulster &&
				<div className="ulster">
					{ulster[props.preposition][props.index]}
				</div>
			}
		</td>
	);
}
	


export default App;

