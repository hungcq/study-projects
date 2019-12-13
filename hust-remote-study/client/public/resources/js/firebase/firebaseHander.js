var courseIdsAlredyListen = [];

function queryUserOnline(courses, i){
	if(courses.length <= i){
		return
	}
	var course = courses[i]
	if(!courseIdsAlredyListen.indexOf(course.id) > -1){
		courseIdsAlredyListen[i] = course.id;
		KSFirebase.queryUserOnlineHome(course.id, function(data){
			var totalUserOnline = 0
			if(data != null ){
				var keys = Object.keys(data);
				totalUserOnline = keys.length
			}
			//console.log('id ', course.id , ' ', course.name, ' data ', totalUserOnline)
			var numberOnline = document.getElementById(""+course.id);
			if(numberOnline != null){
				numberOnline.innerHTML = "<div style=\"padding: 1px 5px; background-color: #e7e7e7; text-align: center;display: inline-block; border-radius: 3px; font-size: 12px;\"><i class=\"fa fa-circle\" style=\"color: #2ecc71; padding: 0px 5px 3px 0px; font-size: 10px;\"></i>" + totalUserOnline + " người online </div>";
			}
			i++;
			queryUserOnline(courses, i)
		}, function(err){
			console.log('err ' , err)
		})
	}
}