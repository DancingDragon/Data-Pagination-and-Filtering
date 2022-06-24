/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
	let startIndex = page*itemsPerPage-itemsPerPage;
	let endIndex = page*itemsPerPage;
	let studentList = document.querySelector("ul.student-list");
	studentList.innerHTML = "";
	
	//Create the HTML for each student and append to the studentList
	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			let userHTML = 
				`<li class="student-item cf">
					<div class="student-details">
					  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
					  <h3>${list[i].name.first} ${list[i].name.last}</h3>
					  <span class="email">${list[i].email}</span>
					</div>
					<div class="joined-details">
					  <span class="date">Joined ${list[i].registered.date}</span>
					</div>
				</li>`;
			studentList.insertAdjacentHTML("beforeend", userHTML);
		}
	}
	
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
	let nrBtnsNeeded = Math.ceil(list.length / itemsPerPage);
	let linkList = document.querySelector("ul.link-list");
	linkList.innerHTML = "";
	
	//Add all the page buttons
	for (let i = 1; i <= nrBtnsNeeded; i++) {
		linkList.insertAdjacentHTML("beforeend", 
			`<li>
				<button type="button"${i===1 ? ' class="active"':''}>${i}</button>
			</li>`);
	}
	
	//Add clickevent to the buttons
	linkList.addEventListener("click", (e) => {
		if (e.target.type==="button") {
			document.querySelector(".active").className="";
		}
		e.target.className="active";
		showPage(list, parseInt(e.target.textContent));
	}); 
}

function createSearchBar() {
	//Add Html of searchbar to the header
	let header = document.querySelector(".header");
	header.innerHTML += 
		`<form class="form">
			<label for="search" class="student-search">
				<span>Search by name</span>
				<input id="search" placeholder="Search by name...">
					<button type="button">
						<img src="img/icn-search.svg" alt="Search icon">
					</button>
				</input>
			</label>
		</form>`;

	//Add eventlistener for when you submit via pressing enter in searchbar
	document.querySelector(".form").addEventListener("submit", (e)=> {
		e.preventDefault();
		doSearch(document.getElementById("search").value);
	});
	//Add eventlistener for clicking the searchbutton
	document.querySelector(".student-search button").addEventListener("click", (e) => {
		doSearch(document.getElementById("search").value);
	});
}
function doSearch(input) {
	//Sort the data
	let alteredData = [];
	for (person of data) {
		if (person.name.first.toLowerCase().includes(input.toLowerCase()) ||
			person.name.last.toLowerCase().includes(input.toLowerCase()))
			alteredData.push(person)
	}
	
	//Update page
	showPage(alteredData, 1);
	addPagination(alteredData);
	//Show "no seach results if no results found
	if (alteredData.length===0) {
		document.querySelector("ul.student-list").innerHTML="<div style='text-align:center'>No matches found</div>";
	} 
}

// Call functions
showPage(data, 1); 
addPagination(data);
createSearchBar();