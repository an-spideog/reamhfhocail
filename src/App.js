import './App.css';
import React from 'react';
import { useState } from 'react';
import { 
	standardForms, munsterForms, connachtForms, ulsterForms 
} from './forms.js' 
const forms = {
	standard: standardForms,
	munster: munsterForms, 
	connacht: connachtForms,
	ulster: ulsterForms
}
const dialects = ["standard", "munster", "connacht", "ulster"];

function App() {
	return (
		<div className="App">
			<div className="titleBar">
				<h1> Na Réamhfhocail </h1>
				<div className="description"> 
					<p>
						The various dialectal forms of prepositions in Irish. Given 
						both as phonetic spellings and Celticist transcriptions.
					</p>
				</div>
			</div>

			<TableWithOptions />

			<h3> Notes </h3>
			<p>
				The Official Standard does not dictate any pronunciations so no
				transcriptions are included for those forms.
			</p>
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
			<p> 
				<i> An Teanga Bheo - Corca Dhuibhne, </i> Diarmuid Ó Sé 
			</p>
			<p> <i> Gaeilge Chorca Dhuibhne, </i> Diarmuid Ó Sé </p>
			
			<h4> Connacht </h4>
			<p> 
				<i> An Teanga Bheo - Gaeilge Chonamara, </i> Séamas Ó Murchú 
			</p>
			<p> <i> Learning Irish, </i> Mícheál Ó Siadhail </p>
			<p> 
				<i> Gaeilge Chois Fhairrge - An Deilbhíocht </i>, 
				Tomás De Bhaldraithe
			</p>
			
			<h4> Ulster </h4>
			<p> <i> An Teanga Bheo - Gaeilge Uladh, </i> Dónall P. Ó Baoill</p>
			<p>
				<i> 
					Gaeilge Theilinn - Foghraidheacht, Gramadach, Téacsana, 
				</i> Heinrich Wagner 
			</p>
			<p> 
				<i> 
					A Phonetic Study of the Irish of Tory Island, Co. Donegal,
				</i> John Noel Hamilton
			</p>
			<footer> Made by 
				<a href="https://github.com/killuaDev"> killuaDev </a>
			</footer>
		</div>
	);
}


function TableWithOptions() {
	const [isDialectOn, setIsDialectOn] = useState({
		standard: true,
		munster: false,
		connacht: false,
		ulster: false
	});
	const [isCelticistOn, setIsCelticistOn] = useState(false);

	function handleToggleDialect(dialect) {
		setIsDialectOn({
			...isDialectOn,
			[dialect]: !isDialectOn[dialect]
		});
	}

	function handleToggleCelticist() {
		setIsCelticistOn(!isCelticistOn);
	}

	return (
		<div className="TableWithOptions">
			<Options isDialectOn={isDialectOn} 
			         handleToggleDialect={handleToggleDialect}
				     isCelticistOn={isCelticistOn}
				     handleToggleCelticist={handleToggleCelticist}
			/>
			<Table isDialectOn={isDialectOn}
				   isCelticistOn={isCelticistOn}/>
		</div>
	);
}


function Options(
	{ isDialectOn, handleToggleDialect, isCelticistOn, handleToggleCelticist }
) {
	return (
		<div>
			<div className="buttonGroup">
				{dialects.map((dialect) =>
						<ToggleDialectButton
							dialect={dialect}
							isDialectOn={isDialectOn}
							handleToggleDialect={handleToggleDialect}
						/>
				)}
			</div>
			<button 
				className={
					`celticistButton celticist${isCelticistOn ? "On" : "Off"}`
				} 
				onClick={handleToggleCelticist}
			>
				 Celticist Transcriptions
			</button>
		</div>
	);
}


function ToggleDialectButton({ dialect, isDialectOn, handleToggleDialect }) {
	const capitalisedDialect = dialect.charAt(0).toUpperCase() 
		+ dialect.slice(1);
	return (
		<button 
			className={
				`${dialect}Button dialectButton 
				dialect${isDialectOn[dialect] ? "On" : "Off"}`
			}
			onClick={() => handleToggleDialect(dialect)}
		>
			{capitalisedDialect}
		</button>
	);
}


function Table({isDialectOn, isCelticistOn}) {
	const prepositions = [
		"ag", "ar", "as", "chuig", "de", "do", "fara", "faoi", "i", "idir", 
		"ionsar", "le", "ó", "roimh", "thar", "trí", "um"
	];
	const rows = prepositions.map(preposition => 
		<Row preposition={preposition}
		     isDialectOn={isDialectOn}
		     isCelticistOn={isCelticistOn} 
			 key={preposition}
		/>
	);

	return (
		<table>
			<thead>
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
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	);
}


/* Row() will be given a preposition and the dialects desired and it
 * will return a div with the relevant content */
function Row({preposition, isDialectOn, isCelticistOn}) {  
	const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const cells = indices.map( (index) =>
		<Cell index={index} 
		      preposition={preposition} 
		      isDialectOn={isDialectOn}
			  isCelticistOn={isCelticistOn}
			  key={index}
		/>
	);
	return (
		<tr>
			{cells}
		</tr>
	);
}


function Cell({ index, preposition, isDialectOn, isCelticistOn }) {
	const dialects = ["standard", "munster", "connacht", "ulster"];
	return (
		<td>
			{dialects.map((dialect) =>
				<SpellingAndTranscription
					preposition={preposition}
					index={index}
					dialect={dialect}
					isDialectOn={isDialectOn}
					isCelticistOn={isCelticistOn}
					key={dialect}
				/>
			)}
		</td>
		);
}


function SpellingAndTranscription(
	{ preposition, index, dialect, isDialectOn, isCelticistOn }
) {
	if (dialect === "standard")
		isCelticistOn = false;  // Standard has no transcriptions
	if (isDialectOn[dialect]) {
		return (
			<div className={`${dialect} SpellingAndTranscription`}>
				<div className="spelling">
				{forms[dialect][preposition].writtenForms[index]}
				</div>
				{isCelticistOn && 
					forms[dialect][preposition].celticistForms[index] !== "" ? 
					<div className="celticist">
						{" /" 
						+ forms[dialect][preposition].celticistForms[index] 
						+ "/"}
					</div>
				: null}
			</div>
		);
	}
	else {
		return null;
	}
}


export default App;

