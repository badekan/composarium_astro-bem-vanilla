// Don't ever us this as noise, it slow down the performance of the borwser a lot!

// technique for this demo found here 
// http://stackoverflow.com/questions/22003491/animating-canvas-to-look-like-tv-noise    
const app = document.querySelector('#lavaLamp');
const canvas = document.createElement('canvas');
canvas.setAttribute('id','noise');

let ctx = canvas.getContext('2d');

canvas.width = canvas.height = 128;

app.appendChild(canvas);

resize();
window.onresize = resize;

function resize() {
	canvas.width = window.innerWidth * window.devicePixelRatio
	canvas.height = window.innerHeight * window.devicePixelRatio
	canvas.style.width = app.innerWidth + 'px'
	canvas.style.height = app.innerHeight + 'px'
}

function noise(ctx) {
    
	const w = ctx.canvas.width,
				h = ctx.canvas.height,
				iData = ctx.createImageData(w, h),
				buffer32 = new Uint32Array(iData.data.buffer),
				len = buffer32.length
	  let i = 0

	for(; i < len;i++)
		if (Math.random() < 0.7) buffer32[i] = 0xffffffff;
		ctx.putImageData(iData, 0, 0);
}

(function loop() {
    noise(ctx);
    requestAnimationFrame(loop);
})();