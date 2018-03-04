function changeStyle(element) {
	element.style.transform="translate(10px,0)";
	element.style.color= "white";
	element.style.border= "2px solid grey";
	element.style.borderRadius="20px";
}

function resetOriginal() {
	var x = document.getElementsByClassName("main_button");
	for(var i = 0; i < x.length; i++) {
		x[i].style.color = "grey";
		x[i].style.transform="translate(-10px,0)";
		x[i].style.border= "2px solid transparent";
	}
}

function doAll(element) {
	resetOriginal();
	changeStyle(element);
}