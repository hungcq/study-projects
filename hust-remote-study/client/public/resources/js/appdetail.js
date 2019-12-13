var AppDetail =
{
		loadListApp : function loadListApp(listTopApp, listAllApp, idListTopApp, idListAllApp) {
				var topAppDiv = document.getElementById(idListTopApp);
				var allAppDiv = document.getElementById(idListAllApp);
				if(listTopApp){
					for ( var i in listTopApp) {
						var imgParent = document.createElement("A");
						imgParent.style="text-decoration: none; display: inline-block; margin-right: 20px;"
							var prefixUrl = createAppUrl(listTopApp[i]);
						imgParent.href = "/app/" +  prefixUrl;
						imgParent.target = "_blank";
						var img = document.createElement("IMG");
						if(listTopApp[i].imageAndroid){
							img.src = listTopApp[i].imageAndroid;
						}else if(listTopApp[i].imageIos){
							img.src = listTopApp[i].imageIos;
						}else {
							console.log(listTopApp[i].name);
						}
						img.style = "width: 50px; margin: 0 auto; margin-bottom: 10px; display: block;";
						imgParent.appendChild(img);
						topAppDiv.appendChild(imgParent);
					}
				}
				
				if(listAllApp){
					for ( var i in listAllApp) {
						var imgParent = document.createElement("A");
						imgParent.style="text-decoration: none; display: inline-block; margin-right: 20px;"
						var prefixUrl = createAppUrl(listAllApp[i]);
						imgParent.href = "/app/" +  prefixUrl;
						imgParent.target = "_blank";
							var img = document.createElement("IMG");
							if(listAllApp[i].imageAndroid){
								img.src = listAllApp[i].imageAndroid;
							}else if(listAllApp[i].imageIos){
								img.src = listAllApp[i].imageIos;
							}else {
								console.log(listAllApp[i].name);
							}
							img.style = "width: 50px; margin: 0 auto; margin-bottom: 10px; display: block;";
						imgParent.appendChild(img);
						allAppDiv.appendChild(imgParent);
					}
				}
				
		}
}
