function fullScreenFireworks()
    {
        var canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-1";
        document.body.appendChild(canvas);

        var context = canvas.getContext("2d");
        var fireworks = [];

        function random(min, max)
            {
                return Math.random() * (max - min) + min;
            }

        function createFireworks(x, y)
            {
                var sparks = [];
                var count = random(10, 100);
                for (var i = 0; i < count; i++)
                    {
                        var vx = random(-5, 5);
                        var vy = random(-5, 5);
                        var size = random(3, 5);
                        var opacity = random(0.3, 1);
                        var color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                        sparks.push({
                            x: x,
                            y: y,
                            vx: vx,
                            vy: vy,
                            size: size,
                            opacity: opacity,
                            color: color
                        });
                    }
                return sparks;
            }

        function updateFireworks()
            {
                for (var i = 0; i < fireworks.length; i++)
                    {
                        fireworks[i].x += fireworks[i].vx;
                        fireworks[i].y += fireworks[i].vy;
                        fireworks[i].vy += 0.05;
                        fireworks[i].size -= 0.05;
                        fireworks[i].opacity -= 0.02;
                        if (fireworks[i].opacity <= 0 || fireworks[i].size <= 0)
                            {
                                fireworks.splice(i, 1);
                            }
                    }
            }

        function renderFireworks()
            {
                context.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < fireworks.length; i++)
                    {
                        context.beginPath();
                        context.arc(fireworks[i].x, fireworks[i].y, fireworks[i].size, 0, Math.PI * 2);
                        context.fillStyle = fireworks[i].color;
                        context.globalAlpha = fireworks[i].opacity;
                        context.fill();
                    }
            }

        function loop()
            {
                var x = random(0, canvas.width);
                var y = random(0, canvas.height);
                fireworks.push.apply(fireworks, createFireworks(x, y));
                updateFireworks();
                renderFireworks();
                requestAnimationFrame(loop);
            }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        loop();
    }
