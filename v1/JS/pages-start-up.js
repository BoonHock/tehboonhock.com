// ################### CREATE STORY TITLE LIST ####################################################
/*
 * The program searches for story titles <h2>
 * and compile them into list elements
 * and insert them into
 * <div id="story-titles"><ul>*INSERT HERE*</ul></div>
 */

function createStoryList(){
	var storyTitlesUL = document.getElementsByClassName("story-titles-ul");
	try{
		var storyTitlesArray = document.getElementById("right-side").getElementsByTagName("h2");
		var titleList = ""; // initialize variable to set as <li>*content*</li>	
		for(var i = 0, j = storyTitlesArray.length; i < j; i++){
			titleList += "<li><a href=\"#menu"+i+"\">"+storyTitlesArray[i].innerHTML+"</a></li>";
		}
		for(var i = 0, j = storyTitlesUL.length; i < j; i++){
			storyTitlesUL[i].innerHTML = titleList;
		}
	}
	catch(err) {
		// no story titles with tag <h2> found
		// do nothing
	}
};
// ################### SET CLASS="ACTIVE" TO MAIN NAVBAR LINK ####################################################

function setActive(){
	var mainNav = document.getElementById("main-nav");
	for (var i = 0, j = mainNav.children.length; i<j; i++){
		// regular expression to return "/pages/" in "/pages/home.html"
		// remove "/pages/" in "/pages/home.html"
		if(mainNav.children[i].lastChild.getAttribute("href") == location.pathname.replace(/\/.{1,}\//g,"")){
			mainNav.children[i].setAttribute("class","active");
			break;
		}
	}
};

window.addEventListener('load', function(){createStoryList(),setActive();});