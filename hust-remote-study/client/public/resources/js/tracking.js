function init_ga(trackingId) {
	window.ga = window.ga || function() {
		(ga.q = ga.q || []).push(arguments)
	};
	ga.l = +new Date;
	ga('create', trackingId, 'auto');
	ga('send', 'pageview');
}