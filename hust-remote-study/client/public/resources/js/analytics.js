(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
function initTracker(){
	ga('create', 'UA-72183459-1', 'auto');
}

function trackerPage(pageName){
	ga('send', 'screenview', {
	  'appName': 'LOXO_WEB',
	  'screenName': 'LOXO_WEB_'+ pageName
	});
}

function trackerEvent(eventName){
	ga('send', 'event', 'LOXO_WEB', eventName, 'xxx');
}