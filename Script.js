
    lucide.createIcons();

    /* DYNAMIC HANGING ID CARD SLIDESHOW */
    const photos = document.querySelectorAll('.id-photo');
    let currentPhotoIndex = 0;
    setInterval(() => {
      photos[currentPhotoIndex].classList.remove('active');
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      photos[currentPhotoIndex].classList.add('active');
    }, 3500);

    /* CONTACT MODAL CONTROL */
    function openContactModal() {
      document.getElementById('contactModal').classList.add('active');
    }
    function closeContactModal() {
      document.getElementById('contactModal').classList.remove('active');
    }

    /* PREDEFINED GLASSMorphic OPTION HANDLER */
    const presets = {
      edu: {
        user: "Tell me about Sahil's Education & CGPA.",
        bot: "<strong>Academic Background:</strong><br>• Degree: Bachelor of Science in Computer Science (BSCS)<br>• Institution: SZABIST University, Karachi<br>• Expected Graduation: 2027<br>• Academic Standing: <strong>3.08 CGPA</strong>"
      },
      leadership: {
        user: "Show Sahil's Leadership & Director Experience.",
        bot: "<strong>Leadership Roles & Achievements:</strong><br>1. <strong>Tech Core Director</strong> — Zabefest, SZABIST (2026): Coordinated a 6–10 member technical team managing event systems for 1000+ participants.<br>2. <strong>Marketing Director</strong> — ACM Student Chapter, SZABIST (2025–2026): Led multi-channel promotional campaigns.<br>3. <strong>Brand Ambassador</strong> — Developers Day, FAST University (2026): Expanded outreach across student tech communities.<br>4. <strong>Hackathon Participant & NYVN Volunteer</strong>: Active member of local tech hackathons and community networks."
      },
      projects: {
        user: "What are Sahil's key production projects?",
        bot: "<strong>Featured Production Builds:</strong><br>• <strong>ProjectVault</strong>: Next.js + Google Gemini 2.5 Flash developer memory app.<br>• <strong>FixKarachi</strong>: Civic issue reporting React Native mobile app.<br>• <strong>MealSync</strong>: Enterprise multi-tenant NestJS catering management tool.<br>• <strong>EventSphere</strong>: Campus event registration React Native app.<br>• <strong>PayPredict</strong>: PyTorch Neural Network predicting salaries with 91% accuracy.<br>• <strong>SmartVote</strong>: C# ASP.NET Core online voting platform."
      },
      tech: {
        user: "What is Sahil's core technology stack?",
        bot: "<strong>Technical Capabilities:</strong><br>• <strong>Frontend & Mobile</strong>: React.js, Next.js, React Native, TypeScript, Tailwind CSS, HTML5/CSS3<br>• <strong>Backend & AI</strong>: Node.js, Nest.js, ASP.NET Core (C#), Flask, PyTorch, Gemini API<br>• <strong>Databases & DevOps</strong>: PostgreSQL (Neon), SQL Server, Prisma ORM, Git, GitHub"
      },
      intern: {
        user: "Is Sahil open for internships?",
        bot: "<strong>Availability:</strong><br>Yes! Sahil is actively open for Full-Stack Web, Mobile, or AI Software Engineering Internship opportunities for 2026."
      },
      contact: {
        user: "How can I contact Sahil directly?",
        bot: "<strong>Direct Contact Information:</strong><br>• <strong>Location</strong>: Karachi, Pakistan<br>• <strong>Email</strong>: heresahil294@gmail.com<br>• <strong>Phone</strong>: +92 333 7302994<br>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/sahil-kumar005/' target='_blank' style='color:#0a84ff; font-weight:600;'>sahil-kumar005</a><br>• <strong>GitHub</strong>: <a href='https://github.com/sahilkumar-05' target='_blank' style='color:#0a84ff; font-weight:600;'>sahilkumar-05</a>"
      }
    };

    function triggerPreset(key) {
      const data = presets[key];
      if (!data) return;

      const chatWindow = document.getElementById('chatWindow');

      // Add user query bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.innerText = data.user;
      chatWindow.appendChild(userBubble);

      // Add bot response bubble
      setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = data.bot;
        chatWindow.appendChild(botBubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 250);

      chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    /* 3D CANVAS PARTICLES */
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const count = 70;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      particles.push({
        angle: angle,
        radius: 180 + Math.random() * 50,
        yOffset: (Math.random() - 0.5) * 60,
        speed: 0.0015 + Math.random() * 0.002
      });
    }

    let scrollProgress = 0;

    function drawCanvas() {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const rotationY = scrollProgress * Math.PI;

      particles.forEach(p => {
        p.angle += p.speed;
        const currentAngle = p.angle + rotationY;

        const x3d = Math.cos(currentAngle) * p.radius;
        const z3d = Math.sin(currentAngle) * p.radius;
        const fov = 350;
        const perspective = fov / (fov + z3d);

        const screenX = centerX + x3d * perspective;
        const screenY = centerY + p.yOffset * perspective;
        const opacity = Math.max(0.08, (z3d + p.radius) / (2 * p.radius));

        ctx.beginPath();
        ctx.arc(screenX, screenY, 2 * perspective, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 30, 30, ${opacity * (1 - scrollProgress * 0.8)})`;
        ctx.fill();
      });

      requestAnimationFrame(drawCanvas);
    }
    drawCanvas();

    /* WORK SHOWCASE SCROLL SCRIPT */
    const heroTrigger = document.getElementById('hero-trigger');
    const pinnedWrapper = document.getElementById('pinned-wrapper');
    const showcaseLayouts = document.querySelectorAll('.showcase-layout');
    const progressDots = document.querySelectorAll('.progress-dot');

    function updatePinnedShowcase() {
      if (window.innerWidth <= 992) return;

      const wrapperRect = pinnedWrapper.getBoundingClientRect();
      const wrapperHeight = pinnedWrapper.offsetHeight - window.innerHeight;
      
      const scrollRatio = Math.min(Math.max(-wrapperRect.top / wrapperHeight, 0), 0.999);
      const activeIndex = Math.floor(scrollRatio * 6);

      showcaseLayouts.forEach((layout, idx) => {
        if (idx === activeIndex) {
          layout.classList.add('active');
        } else {
          layout.classList.remove('active');
        }
      });

      progressDots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function onScroll() {
      const scrollY = window.scrollY;
      const heroHeight = heroTrigger.offsetHeight - window.innerHeight;
      scrollProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

      const heroContent = document.querySelector('.hero-content');
      if (scrollProgress > 0) {
        heroContent.style.transform = `scale(${1 - scrollProgress * 0.15}) translateY(${-scrollProgress * 40}px)`;
        heroContent.style.opacity = `${1 - scrollProgress * 1.5}`;
      } else {
        heroContent.style.transform = `scale(1) translateY(0px)`;
        heroContent.style.opacity = `1`;
      }

      updatePinnedShowcase();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
