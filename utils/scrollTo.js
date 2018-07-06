export default function scrollTo(to, duration) {
	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	var start = top,
		change = to - start,
		currentTime = 0,
		increment = 20;

	console.warn(top, to);

	var animateScroll = function(){
		currentTime += increment;
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		window.scrollTo(0, val);

		if(currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
	};
	animateScroll();
}

// t = current time
// b = start value
// c = change in value
// d = duration
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
