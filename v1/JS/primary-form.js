window.addEventListener('load', function(){
	var bRadiusInput = document.getElementById("input-border-radius").children;
	var changeStyleP = document.getElementById("change-style");
	var changeStyleDiv = changeStyleP.parentElement;
	/*
	 * for each <input type="radio">, add event listener 'click'
	 * that changes border radius
	*/
	var i = 0;
	while(bRadiusInput[i]){
		bRadiusInput[i].lastElementChild.addEventListener("click", changeBorderRadius);
		i++;
	}
	function changeBorderRadius(){
		// 'this' refers to <input type="radio"> that is selected
		changeStyleDiv.style.borderRadius = this.value;
	};

	document.getElementById("input-font-style").onchange = function(){
		changeStyleP.style.fontFamily = this.value;
	};
	document.getElementById("input-font-size").onchange = function(){
		changeStyleP.style.fontSize = (this.value)*20 +"%";
	};
	document.getElementById("input-bg-opacity").onchange = function(){
		changeStyleDiv.style.opacity = this.value;
	};
	document.getElementById("input-bg-color").onchange = function(){
		changeStyleDiv.style.backgroundColor = this.value;
	};
	document.getElementById("input-section-pic").onchange = function(){
		var sectionPic = document.getElementById("section-pic");
		var userPic = this.files[0]; // select file(img) uploaded
		var reader = new FileReader(); // FileReader() is a built-in object
		if (userPic){
			// if input in <input type="file"> is not undefined(empty)
			reader.readAsDataURL(userPic); // read pic as URL
		}
		reader.onloadend = function(){
			sectionPic.src = reader.result; //change 'src' of <img> tag
		};
	};
});