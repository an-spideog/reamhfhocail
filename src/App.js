import './App.css';
import React from 'react';
import { useState } from 'react';
import { standardForms, munsterForms, connachtForms, ulsterForms } from './forms.js' 

function App() {
	return (
		<div className="App">
			<h2> Title </h2>
			<div className="Description"> 
				<p>The various dialectal forms of prepositions in irish.</p>
			</div>
			<TableWithOptions />
			<p> Notes. </p>

		</div>
	);
}


function TableWithOptions() {
	const [enabledDialects, setEnabledDialects] = useState({
		isStandardOn: true,
		isMunsterOn: false,
		isConnachtOn: false,
		isUlsterOn: false
	});
	const [isCelticistOn, setIsCelticistOn] = useState(false);

	function handleToggleDialect(dialect) {
		setEnabledDialects({
			...enabledDialects,
			[dialect]: !enabledDialects[dialect]
		});
	}

	function handleToggleCelticist() {
		setIsCelticistOn(!isCelticistOn);
	}

	return (
		<div className="TableWithOptions">
			<Options enabledDialects={enabledDialects} 
			         toggleDialect={handleToggleDialect}
				     isCelticistOn={isCelticistOn}
				     handleToggleCelticist={handleToggleCelticist}
			/>
			<Table enabledDialects={enabledDialects}
				   isCelticistOn={isCelticistOn}/>
		</div>
	);
}


function Options({enabledDialects, toggleDialect, isCelticistOn, handleToggleCelticist}) {
	return (
		<div>
			<button className="standard" onClick={() => toggleDialect("isStandardOn")}>
				Standard:{enabledDialects.isStandardOn ? "ON" : "OFF"}
			</button>
			<button className="munster" onClick={() => toggleDialect("isMunsterOn")}>
				Munster:{enabledDialects.isMunsterOn ? "ON" : "OFF"}
			</button>
			<button className="connacht" onClick={() => toggleDialect("isConnachtOn")}>
				Connacht:{enabledDialects.isConnachtOn ? "ON" : "OFF"}
			</button>
			<button className="ulster" onClick={() => toggleDialect("isUlsterOn")}>
				Ulster:{enabledDialects.isUlsterOn ? "ON" : "OFF"}
			</button>
			<button className="celticist" onClick={handleToggleCelticist}>
				Showing Celticist Transcriptions: {isCelticistOn ? "true" : "false"}
			</button>
		</div>
	);
}


function Table({enabledDialects, isCelticistOn}) {
	const prepositions = ["ag", "ar", "as", "chuig", "de", "do", "fara", "faoi", "i", "idir", "le", "ó", "roimh", "trí", "thar", "um"];
	const rows = prepositions.map(preposition => 
		<Row preposition={preposition}
		     enabledDialects={enabledDialects}
		     isCelticistOn={isCelticistOn} 
		/>
	);

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
				<td>With the article 'an'</td>
				<td>With the article 'na'</td>
				<td>With 'a'</td>
			</tr>
			{rows}
		</table>
	);
}


/* Row() will be given a preposition and the dialects desired and it
 * will return a div with the relevant content */
function Row({preposition, enabledDialects, isCelticistOn}) {  
	const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const cells = indices.map( (index) =>
		<Cell index={index} 
		      preposition={preposition} 
		      enabledDialects={enabledDialects}
			  isCelticistOn={isCelticistOn}
		/>
	);
	return (
		<tr>
			{cells}
		</tr>
	);
}

function Cell({ index, preposition, enabledDialects, isCelticistOn }) {
	console.log(preposition);
	return (
		<td> 
			{enabledDialects.isStandardOn ? (
				<div className="standard"> 
					{standardForms[preposition].writtenForms[index]}
				</div>
			) : null}
			{enabledDialects.isMunsterOn ? ( 
				<div className="munster"> 
					{munsterForms[preposition].writtenForms[index]}
					{isCelticistOn ? " /" + munsterForms[preposition].celticistForms[index] + "/": null}
				</div>
			) : null}
			{enabledDialects.isConnachtOn ? (
				<div className="connacht"> 
					{connachtForms[preposition].writtenForms[index]}
					{isCelticistOn ? " /" + connachtForms[preposition].celticistForms[index] + "/": null}
				</div>
			): null}
			{enabledDialects.isUlsterOn ? (
				<div className="ulster"> 
					{ulsterForms[preposition].writtenForms[index]}
					{isCelticistOn ? " /" + ulsterForms[preposition].celticistForms[index] + "/" : null}
				</div>
			) : null}
		</td>
	);
}
	


export default App;

