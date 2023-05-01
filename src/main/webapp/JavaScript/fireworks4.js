function firework(x, y, color)
    {
        // 创建画布元素
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        // 获取画布上下文
        const ctx = canvas.getContext('2d');

        // 烟花粒子的颜色数组
        const colors = [
            '#FF6138',
            '#FFFF9D',
            '#BEEB9F',
            '#79BD8F',
            '#00A388'
        ];

        // 烟花粒子的形状数组
        const shapes = [
            'circle',
            'square',
            'triangle',
            'line'
        ];

        // 烟花粒子类
        class Particle
            {
                constructor(x, y, color)
                    {
                        this.x = x;
                        this.y = y;
                        this.color = color;
                        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
                        this.size = 4;
                        this.speed = 3;
                        this.vx = Math.random() * this.speed - this.speed / 2;
                        this.vy = Math.random() * this.speed - this.speed / 2;
                        this.alpha = 1;
                        this.decay = 0.01 + Math.random() * 0.015;
                    }

                // 更新烟花粒子的状态
                update()
                    {
                        this.vx *= 0.98;
                        this.vy *= 0.98;
                        this.vy += 0.15;

                        this.x += this.vx;
                        this.y += this.vy;

                        this.alpha -= this.decay;
                        if (this.alpha < 0)
                            {
                                this.alpha = 0;
                            }

                        this.size -= this.decay * 8;
                        if (this.size < 0)
                            {
                                this.size = 0;
                            }
                    }

                // 绘制烟花粒子
                draw()
                    {
                        ctx.globalAlpha = this.alpha;
                        ctx.fillStyle = this.color;
                        if (this.shape === 'circle')
                            {
                                ctx.beginPath();
                                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        else if (this.shape === 'square')
                            {
                                ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                            }
                        else if (this.shape === 'triangle')
                            {
                                ctx.beginPath();
                                ctx.moveTo(this.x, this.y - this.size / 2);
                                ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
                                ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
                                ctx.closePath();
                                ctx.fill();
                            }
                        else if (this.shape === 'line')
                            {
                                ctx.beginPath();
                                ctx.moveTo(this.x - this.size / 2, this.y - this.size / 2);
                                ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
                                ctx.stroke();
                            }
                    }
            }


        // 烟花爆炸的粒子数组
        const particles = [];

        // 创建烟花爆炸的粒子
        function createParticles(x, y, color)
            {
                for (let i = 0; i < 50; i++)
                    {
                        const particle = new Particle(x, y, color);
                        particles.push(particle);
                    }
            }

        // 绘制烟花
        function drawFirework()
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(particle =>
                {
                    particle.update();
                    particle.draw();
                });
            }

        // 烟花爆炸动画的循环
        function animate()
            {
                requestAnimationFrame(animate);
                drawFirework();
            }

        // 创建烟花并启动动画
        createParticles(x, y, color);
        animate();

        // 添加祝福语
        const text = '祝福语';
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(text, x - 120, y - 100);

        // 删除画布元素
        setTimeout(() =>
        {
            document.body.removeChild(canvas);
        }, 5000);
    }
