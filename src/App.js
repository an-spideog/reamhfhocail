import './App.css';
import React from 'react';
import { useState } from 'react';
import { standardForms, munsterForms, connachtForms, ulsterForms } from './forms.js' 

function App() {
	return (
		<div className="App">
			<h2> Na Réamhfhocail </h2>
			<div className="Description"> 
				<p>The various dialectal forms of prepositions in Irish. Given both as phonetic spellings and Celticist transcriptions.</p>
			</div>

			<TableWithOptions />

			<h3> Notes </h3>
			<p> 
				The spellings given here are not necessarily the spellings that 
				would be in common usage. Standard spellings are the 
				ones seen most in modern writing. These spellings are provided 
				to show the pronunciation as best as possible to those who 
				don't know Celticist. The way written dialectal forms of these 
				words are not standardised, but things such as "agaí", "fésna" 
				and "a'm" are seen in writing. 
			</p> 
			{/* 
			  * Should add links to some examples, perhaps saol ó dheas, maybe 
			  * another dialectal journalist 
			  */}
			<p> 
				Often several variations of a certain form are present within a
				given dialect, I have tried to pick the one reported as being 
				the most common. If you're interested in a particularly dialect 
				I'd highly recommend reading one of the relevant sources below 
				as you'll get a much more thorough overview of the existing 
				forms.
			</p>

			<h3> Sources </h3>
			<p>
				Primarily I based this page off of the following books:
			</p>

			<h4> Munster </h4>
			<p> <i> An Teanga Bheo - Chorca Dhuibhne, </i>  Diarmuid Ó Sé </p>
			<p> <i> Gaeilge Chorca Dhuibhne, </i> Diarmuid Ó Sé </p>
			
			<h4> Connacht </h4>
			<p> <i> An Teanga Bheo - Gaeilge Chonamara, </i> Séamas Ó Murchú </p>
			<p> <i> Learning Irish, </i> Mícheál Ó Siadhail </p>
			<p> 
				<i> Gaeilge Chois Fhairrge - An Deilbhíocht </i>,  Tomás De Bhaldraithe
			</p>
			
			<h4> Ulster </h4>
			<p> <i> An Teanga Bheo - Gaeilge Uladh, </i> Dónall P. Ó Baoill</p>
			<p>
				<i> Gaeilge Theilinn - Foghraidheacht, Gramadach, Téacsana, </i>
				Heinrich Wagner 
			</p>
			<p> 
				<i> A Phonetic Study of the Irish of Tory Island, Co. Donegal,  </i>
				John Noel Hamilton
			</p>

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
		</div>
	);
}


function Table({enabledDialects, isCelticistOn}) {
	const prepositions = ["ag", "ar", "as", "chuig", "de", "do", "fara", "faoi", "i", "idir", "ionsar", "le", "ó", "roimh", "thar", "trí", "um"];
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

