$(function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var canvas1 = document.getElementById('canvas1');
    var context1 = canvas1.getContext('2d');
    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                context.drawImage($this, 0, 0);
                context1.drawImage($this, $this.width, 0);
                var imageData = context1.getImageData(0, 0, 640, 360);
                var sobelData = Sobel(imageData);
                var sobelImageData = sobelData.toImageData();
                context1.putImageData(sobelImageData, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
});