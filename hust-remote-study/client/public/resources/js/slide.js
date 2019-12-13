function sliderInit(listBackground) {
	var slidePanel = document.getElementById("listBackground");
	slidePanel.innerHTML = "";
	slidePanel.setAttribute("data-u", "slides");
	slidePanel.style="cursor: default; position: relative; top: 0px; left: 0px; width: 1100px; height: 400px; overflow: hidden;";
	for ( var i in listBackground) {
		var div = document.createElement("DIV");
		div.style="display: none;";
			var img = document.createElement("IMG");
			img.setAttribute("style", "width: 100%;");
			img.src = listBackground[i];
		div.appendChild(img);
		slidePanel.appendChild(div);
	}
	
	var sliderOptions = {
		$AutoPlay : true,
		$AutoPlaySteps : 4,
		$SlideDuration : 200,
		$SlideWidth : 275,
		$SlideSpacing : 3,
		$Cols : 4,
		$ArrowNavigatorOptions : {
			$Class : $JssorArrowNavigator$,
			$Steps : 4
		},
		$BulletNavigatorOptions : {
			$Class : $JssorBulletNavigator$,
			$SpacingX : 1,
			$SpacingY : 1
		}
	};
	var slider = new $JssorSlider$("jssor_1", sliderOptions);
	function ScaleSlider() {
		var refSize = slider.$Elmt.parentNode.clientWidth;
		if (refSize) {
			refSize = Math.min(refSize, 1140);
			slider.$ScaleWidth(refSize);
		} else {
			window.setTimeout(ScaleSlider, 30);
		}
	}
	ScaleSlider();
	$Jssor$.$AddEvent(window, "load", ScaleSlider);
	$Jssor$.$AddEvent(window, "resize", ScaleSlider);
	$Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
};