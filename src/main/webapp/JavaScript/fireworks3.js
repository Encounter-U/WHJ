function fireworks3()
    {
        // 获取canvas元素
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        // 设置canvas宽高
        var width = canvas.width = window.innerWidth;
        var height = canvas.height = window.innerHeight;

        // 随机生成烟花的起点坐标
        var startX = Math.random() * width;
        var startY = Math.random() * height;

        // 定义烟花的颜色和半径
        var hue = Math.random() * 360;
        var radius = 4;

        // 创建烟花的粒子
        var particles = [];
        for (var i = 0; i < 100; i++)
            {
                particles.push(new Particle(startX, startY, hue, radius));
            }

        // 定义粒子的构造函数
        function Particle(x, y, hue, radius)
            {
                this.x = x;
                this.y = y;
                this.hue = hue;
                this.radius = radius;
                this.vx = Math.random() * 6 - 3;
                this.vy = Math.random() * 6 - 3;
                this.gravity = 0.1;
                this.alpha = 1;
                this.fade = Math.random() * 0.05 + 0.95;
            }

        // 绘制烟花
        function draw()
            {
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(0, 0, width, height);

                ctx.globalCompositeOperation = 'lighter';
                for (var i = 0; i < particles.length; i++)
                    {
                        var p = particles[i];

                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
                        ctx.fillStyle = 'hsla(' + p.hue + ', 100%, 50%, ' + p.alpha + ')';
                        ctx.fill();

                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += p.gravity;
                        p.alpha *= p.fade;
                        p.radius *= p.fade;

                        // 移除已经消失的粒子
                        if (p.alpha <= 0)
                            {
                                particles.splice(i, 1);
                            }
                    }
            }

        // 循环绘制烟花
        var timer = setInterval(function ()
        {
            draw();

            // 当所有粒子都消失时，停止绘制
            if (particles.length === 0)
                {
                    clearInterval(timer);

                    // 在爆炸位置添加祝福语
                    ctx.font = 'bold 48px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText('祝福语', startX - 100, startY + 50);
                }
        }, 30);
    }
