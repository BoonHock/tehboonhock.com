window.onload = function(){
	var inputBox = document.getElementById("username");
	/* 
	**CHANGE INPUT BOX AND GLYPHICON
	condition - success/warning/error
	glyphicon - ok/warning-sign/remove
	*/
	function changeInputBox(condition,glyphicon,warning){
		$('#username-div').removeAttr('class').addClass('form-group has-'+condition+' has-feedback');
		inputBox.nextSibling.setAttribute("class","glyphicon glyphicon-"+glyphicon+" form-control-feedback");
		inputBox.nextSibling.nextSibling.innerHTML= warning;
	};
	function inputBoxNames(){
		// when user starts typing name
		var names = ["Anna","Brittany","Cinderella","Diana","Eva","Fiona",
							 "Gunda","Hege","Inga","Johanna","Kitty","Linda","Nina",
							 "Ophelia","Petunia","Amanda","Raquel","Cindy","Doris",
							 "Eve","Evita","Sunniva","Tove","Unni","Violet","Liza",
							 "Elizabeth","Ellen","Wenche","Vicky"];
		var inputValue = inputBox.value.toLowerCase(); // user input
		var listNames = ''; // to store list of names matched
		// if user input box is not empty, perform match
		if (inputValue !== ''){
			for (iName in names){
				// substring() does not include character of last index specified,
				// in this case, the last index is inputValue.length
				if (inputValue === names[iName].substring(0,inputValue.length).toLowerCase()){
					listNames += (listNames === '')? names[iName] : ', ' + names[iName];
				}
			}
		}
		if (listNames != ''){
			$('#suggestion').text('Suggestion: ' + listNames); // suggest names
		} else{
			$('#suggestion').empty(); // if no suggested name, clear the html content
		}
		if(inputBox.value.length < 3){
			changeInputBox("warning","warning-sign", "Too short! :|");
		}else{
			changeInputBox("success","ok","Nice name! :)");
		}
	};
	function generateName(){
		// when user clicks on Generate Random name button
		switch(Math.floor(Math.random() * 10)){
			case 0:
				inputBox.value = "Jessica";
				break;
			case 1:
				inputBox.value = "Michelle";
				break;
			case 2:
				inputBox.value = "Tiffany";
				break;
			case 3:
				inputBox.value = "Susan";
				break;
			case 4:
				inputBox.value = "Helen";
				break;
			case 5:
				inputBox.value = "Bryan";
				break;
			case 6:
				inputBox.value = "John";
				break;
			case 7:
				inputBox.value = "Alexander";
				break;
			case 8:
				inputBox.value = "Michael";
				break;
			default:
				inputBox.value = "Rabback Omaba";				
		}
		changeInputBox("success","ok", "Nice name! :)");
	};
	function bigRedButton(){
		var username = inputBox.value;
		/*
		* If input box is empty, highlight input box red
		* If input box value lesser than 3 characters, highlight yellow
		*/
		if(username == ""){
			changeInputBox("error","remove", "Please enter a name with minimum length of 3 characters! :(");
			inputBox.placeholder = "No name entered";
		} else if(username.length < 3){
			changeInputBox("error","remove", "Please enter a name with minimum length of 3 characters! :(");
		}	else{
			setUsername(username);
		}
	};
	function setUsername(username){
		if(typeof(sessionStorage) === "undefined"){
			// Web storage not supported in this browser
		} else{
			sessionStorage.username = username;
			$('#big-red-button').off('click',bigRedButton);
		}
		$('#snail').html('<p class="hello">Hello, ' + username + '!</p><img src="images/walking-snail.gif">');
		/* replace index.html with nothing first then add pages/home.html behind.
		 * cannot replace directly with pages/home.html because url without index.html still can work properly
		 * when index.html is not present in url and still able to visit index.html, program will not be able to 
		 * replace string and link crashes
		 */
//		setTimeout(function(){
//			window.location.href = window.location.href.replace('main.html','') + 'pages/home.html'},8000);
	};
	$(document).ready(function(){
		$('#username').on('keyup', inputBoxNames);
		$('#generate-name').on('click', generateName);
		$('#big-red-button').on('click', bigRedButton);
	});
};