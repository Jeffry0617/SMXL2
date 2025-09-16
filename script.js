 <script>
    // 控制粒子和星星数量
const MAX_STARS = 80;   // 可以自己调大小，越大星星越多
const MAX_PARTICLES = 50; // 控制粒子数量

let stars = [];
let particles = [];

    window.addEventListener("load", () => {
        const loading = document.getElementById("loading");
        setTimeout(() => {
          loading.style.display = "none";
        }, 2000); // 2秒后消失
      });
	  
    // 🌟 背景星星
  const starsBackground = document.getElementById('starsBackground');
  const totalStars = 250;
  for (let i = 0; i < totalStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (Math.random() * 3 + 2).toFixed(2) + 's';
    star.style.opacity = Math.random();
    starsBackground.appendChild(star);
  }

  // 🌠 流星
  const meteorCount = 1000;
  const starField = document.getElementById('starField');
  for (let i = 0; i < meteorCount; i++) {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.left = Math.random() * 100 + 'vw';
    meteor.style.animationDuration = (Math.random() * 1 + 0.6).toFixed(2) + 's';
    meteor.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
    starField.appendChild(meteor);
  }

  // 📸 相册
  const carousel = document.getElementById('carousel');
  const images = carousel.children;
  const angle = 360 / images.length;
  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `rotateY(${i * angle}deg) translateZ(500px)`;
  }

  // 🔠 打字
  const text = "Happy Birthday我的同桌，Shirley MOk Xue Ling ✨";
  const caption = document.getElementById('caption');
  let index = 0;
  function typeWriter() {
    if (index < text.length) {
      caption.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();

  // 🖼️ 点击放大图片 + 隐藏提示
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const photoHint = document.getElementById('photoHint');

let typingInterval; // 保存打字定时器

Array.from(images).forEach(img => {
  img.onclick = function () {
    // 显示大图
    lightboxImg.src = this.src;
    lightbox.style.display = 'flex';
setTimeout(() => {
  lightbox.classList.add("show");
}, 50);


    // 获取 data-text 里的浪漫文字
    let text = this.dataset.text || "💖 这是属于我们的浪漫时刻";
    const lightboxText = document.getElementById("modalText");
    lightboxText.textContent = "";
    lightboxText.style.opacity = 1;

    // 打字机效果
    let i = 0;
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
      if (i < text.length) {
        lightboxText.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // 打字速度，100ms 一个字

    // 用户点击一次后，隐藏提示
    if (photoHint) {
      photoHint.style.display = 'none';
    }
  };
});

// 点击背景关闭大图 + 清空文字
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.getElementById("modalText").textContent = "";
  clearInterval(typingInterval);
});


  // 🎵 自动播放 + 提示 + 控制 + 淡入淡出
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  const notice = document.getElementById("musicNotice");

  let fadeInterval = null;

  // 音乐淡入
  function fadeInMusic(targetVolume = 1, duration = 3000) {
    clearInterval(fadeInterval);
    music.volume = 0;
    const step = targetVolume / (duration / 100);
    fadeInterval = setInterval(() => {
      if (music.volume < targetVolume) {
        music.volume = Math.min(music.volume + step, targetVolume);
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  }

  // 音乐淡出
  function fadeOutMusic(duration = 2000) {
    clearInterval(fadeInterval);
    const step = music.volume / (duration / 100);
    fadeInterval = setInterval(() => {
      if (music.volume > 0) {
        music.volume = Math.max(music.volume - step, 0);
      } else {
        clearInterval(fadeInterval);
        music.pause(); // 完全静音后暂停
      }
    }, 100);
  }

  // 页面加载后尝试自动播放
  window.addEventListener("DOMContentLoaded", () => {
    music.muted = false;
    music.play().then(() => {
      fadeInMusic(); // 自动播放时淡入
      btn.textContent = "🎵 暂停音乐";
    }).catch(err => {
      console.log("自动播放失败:", err);
      notice.style.display = "block";
    });
  });

  // 用户点击提示 → 播放音乐并淡入
  notice.addEventListener("click", () => {
    music.muted = false;
    music.play();
    fadeInMusic();
    notice.style.display = "none";
    btn.textContent = "🎵 暂停音乐";
  });

  // 播放/暂停按钮控制
  btn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      fadeInMusic();
      btn.textContent = "🎵 暂停音乐";
    } else {
      fadeOutMusic(); // 点击暂停时淡出
      btn.textContent = "🎵 播放音乐";
    }
  });
  
  // 🌟 星星光晕效果
const starGlow = document.getElementById("starGlow");
for (let i = 0; i < 50; i++) {
  const glow = document.createElement("span");
  glow.style.left = Math.random() * 100 + "vw";
  glow.style.top = Math.random() * 100 + "vh";
  glow.style.animationDuration = (Math.random() * 5 + 3) + "s";
  starGlow.appendChild(glow);
}

// ✨ 点击屏幕生成粒子
document.addEventListener("click", (e) => {
  const particles = ["✨", "💫", "🌸", "🌟", "💖"];
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.textContent = particles[Math.floor(Math.random() * particles.length)];
  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";
  document.body.appendChild(particle);

  // 动画结束后移除
  setTimeout(() => {
    particle.remove();
  }, 1500);
});

// 🌌 点击屏幕生成彩色烟花
document.addEventListener("click", (e) => {
  const colors = ["#ff4d4d", "#4dff4d", "#4d4dff", "#ffff4d", "#ff4dff", "#4dffff"];
  
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    
    // 随机扩散方向
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 120 + 30; // 爆炸范围
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";
    dot.style.setProperty("--x", x);
    dot.style.setProperty("--y", y);

    document.body.appendChild(dot);

    // 动画结束后移除
    setTimeout(() => dot.remove(), 1000);
  }
});

// 鼠标/手指移动时触发粒子效果
document.addEventListener("mousemove", spawnEffect);
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  spawnEffect(touch);
});

function spawnEffect(e) {
  const chance = Math.random();

  if (chance < 0.7) {
    // 🎉 Emoji 拖尾
    const emojis = ["✨", "🌸", "💖", "🌟", "🎶", "🎊", "💫", "🎉", "🎀", "🎁", "🎗️"];
    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = e.clientX + "px";
    emoji.style.top = e.clientY + "px";
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 1500);
  } else {
    // 🌌 烟花点拖尾
    const gradientColors = [
      "#ff4d4d", "#4dff4d", "#4d4dff", "#ffff4d", 
      "#ff4dff", "#4dffff", "#ff9800", "#00e676"
    ];
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      let color = gradientColors[Math.floor(Math.random() * gradientColors.length)];
      dot.style.setProperty("--color", color);
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 50 + 10;
      dot.style.setProperty("--x", Math.cos(angle) * distance + "px");
      dot.style.setProperty("--y", Math.sin(angle) * distance + "px");

      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 800);
    }
  }
}

// ✨ 生成粒子光点
const effects = document.getElementById('effects');
for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = Math.random() * 100 + 'vh';
  particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
  effects.appendChild(particle);
}

// 🌠 生成流星
for (let i = 0; i < 5; i++) {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.animationDelay = (Math.random() * 10) + 's';
  effects.appendChild(star);
}

function createStar() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2
  };
}

function createParticle(x, y) {
  return {
    x: x,
    y: y,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    life: 100
  };
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    // 星星往下移动
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function updateParticles() {
  particles.forEach((p, i) => {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  });
}

  </script>