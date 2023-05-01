function fireworks()
    {
        // 创建画布并设置大小
        var canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        // 获取画布上下文
        var ctx = canvas.getContext('2d');

        // 烟花数组
        var fireworks = [];

        // 爆炸数组
        var explosions = [];

        // 创建烟花函数
        function createFirework()
            {
                var firework = {
                    x: Math.random() * canvas.width,
                    y: canvas.height,
                    size: 5,
                    speed: Math.random() * 3 + 2,
                    angle: Math.random() * Math.PI * 2,
                    color: 'hsl(' + Math.random() * 360 + ',100%,50%)',
                    explode: false
                };
                fireworks.push(firework);
            }

        // 更新烟花函数
        function updateFireworks()
            {
                for (var i = 0; i < fireworks.length; i++)
                    {
                        var firework = fireworks[i];

                        // 发射烟花
                        if (!firework.explode)
                            {
                                firework.x += Math.cos(firework.angle) * firework.speed;
                                firework.y -= Math.sin(firework.angle) * firework.speed;
                                if (firework.y <= canvas.height * 0.4)
                                    {
                                        firework.explode = true;
                                        explode(firework);
                                    }
                            }
                        // 爆炸效果
                        else
                            {
                                firework.size -= 0.1;
                            }
                    }
            }

        // 绘制烟花函数
        function drawFireworks()
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < fireworks.length; i++)
                    {
                        var firework = fireworks[i];
                        ctx.fillStyle = firework.color;
                        ctx.beginPath();
                        ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
            }

        // 创建爆炸效果函数
        function explode(firework)
            {
                var explosion = {
                    x: firework.x,
                    y: firework.y,
                    size: 2,
                    color: firework.color,
                    particles: []
                };

                for (var i = 0; i < 50; i++)
                    {
                        var particle = {
                            x: explosion.x,
                            y: explosion.y,
                            size: Math.random() * 3 + 2,
                            speed: Math.random() * 5 + 1,
                            angle: Math.random() * Math.PI * 2,
                            friction: 0.95,
                            gravity: 0.05
                        };
                        particle.vx = Math.cos(particle.angle) * particle.speed;
                        particle.vy = Math.sin(particle.angle) * particle.speed;
                        explosion.particles.push(particle);
                    }
                explosions.push(explosion);
            }

        // 更新爆炸效果函数
        function updateExplosions()
            {
                context.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < fireworks.length; i++)
                    {
                        fireworks[i].size += fireworks[i].growAmount;
                        fireworks[i].x += fireworks[i].xVelocity;
                        fireworks[i].y += fireworks[i].yVelocity + fireworks[i].gravity;
                        fireworks[i].opacity -= fireworks[i].fadeAmount;
                        if (fireworks[i].opacity <= 0 || fireworks[i].size <= 0)
                            {
                                fireworks.splice(i, 1);
                            }
                        else
                            {
                                context.beginPath();
                                context.arc(fireworks[i].x, fireworks[i].y, fireworks[i].size, 0, Math.PI * 2);
                                context.fillStyle = 'rgba(' + fireworks[i].red + ',' + fireworks[i].green + ',' + fireworks[i].blue + ',' + fireworks[i].opacity + ')';
                                context.fill();
                            }
                    }
            }


// 绘制爆炸效果函数
        function drawExplosions()
            {
                for (var i = 0; i < explosions.length; i++)
                    {
                        var explosion = explosions[i];
                        for (var j = 0; j < explosion.particles.length; j++)
                            {
                                var particle = explosion.particles[j];
                                ctx.fillStyle = explosion.color;
                                ctx.beginPath();
                                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        if (explosion.size >= 10)
                            {
                                explosions.splice(i, 1);
                            }
                    }
            }

// 动画循环函数
        function loop()
            {
                createFirework();
                updateFireworks();
                drawFireworks();
                updateExplosions();
                drawExplosions();
                requestAnimationFrame(loop);
            }

// 启动动画
        loop();
    }


// 调用烟花函数
fireworks();
