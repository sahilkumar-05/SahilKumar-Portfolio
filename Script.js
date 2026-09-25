<script>
    lucide.createIcons();

    /* TOGGLE MOBILE NAVIGATION DRAWER */
    function toggleMobileMenu() {
      const drawer = document.getElementById('mobileNavDrawer');
      drawer.classList.toggle('active');
    }

    /* TOGGLE FLOATING POP-UP CHAT WINDOW */
    function togglePopupChat() {
      const chatWindow = document.getElementById('popupChatWindow');
      chatWindow.classList.toggle('active');
    }

    /* DETAILED KNOWLEDGE REPOSITORY FOR BOTH CHATS */
    const knowledgeBase = {
      university: {
        user: "Which university do you study at?",
        bot: "<strong>University Details:</strong><br>• Institution: SZABIST University, Karachi<br>• Degree: Bachelor of Science in Computer Science (BSCS)<br>• Expected Graduation: 2027"
      },
      cgpa: {
        user: "What is your current CGPA?",
        bot: "<strong>Academic Standing:</strong><br>• CGPA: <strong>3.08 / 4.00</strong><br>• Maintaining a strong balance between coursework and production projects."
      },
      leadership: {
        user: "What are your leadership experiences?",
        bot: "<strong>Leadership Roles:</strong><br>1. <strong>Tech Core Director</strong> — Zabefest, SZABIST (2026): Managed technical teams for 1000+ participants.<br>2. <strong>Marketing Director</strong> — ACM Society, SZABIST (2025–2026).<br>3. <strong>Brand Ambassador</strong> — Developers Day, FAST University (2026)."
      },
      certifications: {
        user: "What certifications do you have?",
        bot: "<strong>Certifications:</strong><br>• Detailed certification records and certificates are currently being updated. Feel free to check my GitHub or LinkedIn for recent project credentials!"
      },
      techstack: {
        user: "What is your core tech stack?",
        bot: "<strong>Tech Stacks:</strong><br>• Frontend: React.js, Next.js, Tailwind CSS<br>• Backend: Node.js, Nest.js, ASP.NET Core, Flask<br>• Mobile: React Native, TypeScript<br>• Data & AI: PostgreSQL, Prisma ORM, PyTorch"
      },
      projects: {
        user: "What are your major production projects?",
        bot: "<strong>Featured Projects:</strong><br>• ProjectVault (AI Developer Memory System)<br>• FixKarachi (Civic Issue Reporting Mobile App)<br>• MealSync (Catering Management System)<br>• EventSphere & PayPredict (PyTorch AI Neural Net)"
      },
      coursework: {
        user: "What academic coursework have you completed?",
        bot: "<strong>Completed Coursework:</strong><br>• Data Structures and Algorithms (DSA)<br>• Object-Oriented Programming (OOP)<br>• Web Development<br>• Hybrid Mobile Application Development<br>• Operating Systems<br>• Database Management Systems (DBMS)"
      },
      contact: {
        user: "What are your contact details?",
        bot: "<strong>Contact Details:</strong><br>• Email: heresahil294@gmail.com (<a href='https://mail.google.com/mail/?view=cm&fs=1&to=heresahil294@gmail.com' target='_blank' style='color:#0071e3;'>Send Email</a>)<br>• Phone: +92 333 7302994 (<a href='tel:+923337302994' style='color:#0071e3;'>Call Direct</a>)"
      },
      github: {
        user: "What is your GitHub profile?",
        bot: "<strong>GitHub Profile:</strong><br>• <a href='https://github.com/sahilkumar-05' target='_blank' style='color:#0071e3;'>github.com/sahilkumar-05</a>"
      },
      linkedin: {
        user: "What is your LinkedIn profile?",
        bot: "<strong>LinkedIn Profile:</strong><br>• <a href='https://www.linkedin.com/in/sahil-kumar005/' target='_blank' style='color:#0071e3;'>linkedin.com/in/sahil-kumar005</a>"
      }
    };

    function triggerMainPreset(key) {
      processPreset(key, 'mainChatWindow');
    }

    function triggerPopupPreset(key) {
      processPreset(key, 'popupChatWindowBody');
    }

    function processPreset(key, containerId) {
      const data = knowledgeBase[key];
      if (!data) return;

      const chatContainer = document.getElementById(containerId);
      if (!chatContainer) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.innerText = data.user;
      chatContainer.appendChild(userBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Show typing indicator
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot typing';
      typingBubble.innerText = 'Typing...';
      chatContainer.appendChild(typingBubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      setTimeout(() => {
        chatContainer.removeChild(typingBubble);

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = data.bot;
        chatContainer.appendChild(botBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 500);
    }

    /* MOCKUP CAROUSEL LOGIC */
    const slideIndices = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

    function changeSlide(projectIndex, direction) {
      const showcaseLayouts = document.querySelectorAll('.showcase-layout');
      const targetLayout = showcaseLayouts[projectIndex];
      const images = targetLayout.querySelectorAll('.mockup-img');
      
      if (images.length === 0) return;

      slideIndices[projectIndex] = (slideIndices[projectIndex] + direction + images.length) % images.length;
      
      images.forEach((img, idx) => {
        img.classList.toggle('active', idx === slideIndices[projectIndex]);
      });
    }

    /* ID CARD SLIDESHOW */
    const photos = document.querySelectorAll('.id-photo');
    let currentPhotoIndex = 0;
    setInterval(() => {
      photos[currentPhotoIndex].classList.remove('active');
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      photos[currentPhotoIndex].classList.add('active');
    }, 3500);

    /* MODAL CONTROL */
    function openContactModal() {
      document.getElementById('contactModal').classList.add('active');
    }
    function closeContactModal() {
      document.getElementById('contactModal').classList.remove('active');
    }

    /* HERO CANVAS PARTICLES */
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
      particles.push({
        angle: (i / count) * Math.PI * 2,
        radius: 180 + Math.random() * 50,
        yOffset: (Math.random() - 0.5) * 60,
        speed: 0.0015 + Math.random() * 0.002
      });
    }

    function drawCanvas() {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach(p => {
        p.angle += p.speed;
        const x3d = Math.cos(p.angle) * p.radius;
        const z3d = Math.sin(p.angle) * p.radius;
        const perspective = 350 / (350 + z3d);

        ctx.beginPath();
        ctx.arc(centerX + x3d * perspective, centerY + p.yOffset * perspective, 2 * perspective, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 30, 30, 0.3)`;
        ctx.fill();
      });

      requestAnimationFrame(drawCanvas);
    }
    drawCanvas();

    /* PINNED DESKTOP SCRIPT */
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
        layout.classList.toggle('active', idx === activeIndex);
      });

      progressDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }

    window.addEventListener('scroll', updatePinnedShowcase, { passive: true });
  </script>
