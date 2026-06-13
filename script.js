// --- DATABASE BAHASA ---
const translations = {
    id: {
        hero_title: "Hey, My Fav Person",
        hero_desc: "Untuk Najwa Aidah, orang yang kucintai.",
        letter_title: "Semua ini berisi ulang tahun, kenangan, dan lagu untukmu.",
        letter_body_1: "Hey, Sayang",
        letter_body_2: "Aku iseng bikin website ini khusus buat kamu. Gak seberapa sih, tapi ini bentuk kecil dari rasa sayang aku. Di sini ada memori kita, lagu favorit, dan harapan-harapan baik buat kamu. Semoga Kamu Suka!",
        letter_signature: "For Najwa Aidah,<br>From Damta Noviyan Muhamad Faiz.",
        countdown_title: "Menuju Hari Spesial Kita",
        months: "Bulan", days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik",
        memory_title: "Foto Random",
        mem_title_1: "Random 1", desc_1: "Foto dimana kita pertama ketemu..",
        mem_title_2: "Random 2", desc_2: "Foto dimana aku jemput kamu dan tiba' dikasih hadiah ultah.",
        mem_title_3: "Random 3", desc_3: "Foto nongkrong(random).",
        mem_title_4: "Random 4", desc_4: "Foto dimana kita ke Ancol ber-4 sama dapi & lestari.",
        mem_title_5: "Random 5", desc_5: "Foto pertama aku didatengin pas wisuda.",
        mem_title_6: "Random 6", desc_6: "Foto dimana aku first time surprise girlfriend.",
        // Foto Baru (7 dan 11 adalah Album)
        mem_title_7: "Random 7 (Album)", desc_7: "Kenangan manis lainnya (Geser >).",
        mem_title_8: "Random 8", desc_8: "Jalan-jalan sore.",
        mem_title_9: "Random 9", desc_9: "Momen lucu kita.",
        mem_title_10: "Random 10", desc_10: "Dinner bareng.",
        mem_title_11: "Random 11 (Album)", desc_11: "Selfie favorite (Geser >).",
        
        words_title: "Kata-kata Untukmu",
        quote_1: "[Semangat terus sayangku!!!]",
        quote_2: "[Jangan lupa jaga kesehatan.]",
        quote_3: "[Aku selalu di sini untukmu.]",
        quote_4: "[Selalu Cinta Sama Kamu.]",
        quote_5: "[Aku Sayang Kamu.]",
        song_title: "🎵 Lagu Favoritku Untukmu",
        footer_text: "© 2025 Created by Damta Noviyan Muhamad Faiz.",
        happy_day: "Selamat Hari Spesial! 🎉",
        fab_hint: "Pencet aku! 💕",
        love_notes: [
            "Kamu adalah hal terbaik yang pernah terjadi di hidupku. 💖",
            "Senyummu itu obat paling manjur buat hariku. 😊",
            "Makasih ya udah jadi kamu. Aku sayang kamu. 🥰",
            "Bareng kamu, hari biasa jadi luar biasa. ✨",
            "Kamu cantik, hari ini, besok, dan selamanya. 🌹",
            "Aku bersyukur tiap hari punya kamu. 🍀",
            "Pelukan virtual buat kamu! Jangan lupa makan ya. 🤗",
            "Kamu nggak pernah sendirian, aku selalu ada. 💌"
        ]
    },
    en: {
        hero_title: "Hey, My Fav Person",
        hero_desc: "For Najwa Aidah, the person I love.",
        letter_title: "All of these contain birthdays, memories, and songs for you.",
        letter_body_1: "Hey, Dear",
        letter_body_2: "I made this little website just for you. It might not be much, but it's a small token of my love. Here lie our memories, favorite songs, and my best wishes for you. Hope you like it!",
        letter_signature: "For Najwa Aidah,<br>From Damta Noviyan Muhamad Faiz.",
        countdown_title: "Towards Our Special Day",
        months: "Months", days: "Days", hours: "Hours", minutes: "Mins", seconds: "Secs",
        memory_title: "Random Photos",
        mem_title_1: "Random 1", desc_1: "The photo where we first met..",
        mem_title_2: "Random 2", desc_2: "The photo where I picked you up and suddenly gave you a birthday gift.",
        mem_title_3: "Random 3", desc_3: "Hanging out photo (random).",
        mem_title_4: "Random 4", desc_4: "Photo where the four of us went to Ancol with Dapi & Lestari.",
        mem_title_5: "Random 5", desc_5: "First photo where my girlfriend came to my graduation.",
        mem_title_6: "Random 6", desc_6: "Photo where I surprised my girlfriend for the first time.",
        // New Photos
        mem_title_7: "Random 7 (Album)", desc_7: "Sweet memories (Slide >).",
        mem_title_8: "Random 8", desc_8: "Evening walk.",
        mem_title_9: "Random 9", desc_9: "Funny moments.",
        mem_title_10: "Random 10", desc_10: "Dinner together.",
        mem_title_11: "Random 11 (Album)", desc_11: "Favorite selfie (Slide >).",
        
        words_title: "Words For You",
        quote_1: "[Keep up the spirit my love!!!]",
        quote_2: "[Don't forget to stay healthy.]",
        quote_3: "[I'm always here for you.]",
        quote_4: "[Always Loving You.]",
        quote_5: "[I Love You.]",
        song_title: "🎵 My Favorite Song For You",
        footer_text: "© 2025 Created by Damta Noviyan Muhamad Faiz.",
        happy_day: "Happy Special Day! 🎉",
        fab_hint: "Press me! 💕",
        love_notes: [
            "You're the best thing that's ever happened to me. 💖",
            "Your smile is the best cure for my whole day. 😊",
            "Thank you for being you. I love you. 🥰",
            "With you, ordinary days become extraordinary. ✨",
            "You're beautiful, today, tomorrow, and always. 🌹",
            "I'm grateful every single day to have you. 🍀",
            "A virtual hug for you! Don't forget to eat. 🤗",
            "You're never alone, I'm always here. 💌"
        ]
    }
};

// --- Konfigurasi Side Nav (navigasi titik samping) ---
const navConfig = [
    { id: 'hero',          icon: '🏠', id_label: 'Beranda',   en_label: 'Home' },
    { id: 'letter',        icon: '💌', id_label: 'Surat',     en_label: 'Letter' },
    { id: 'countdown-sec', icon: '⏳', id_label: 'Hitung Mundur', en_label: 'Countdown' },
    { id: 'memory',        icon: '📸', id_label: 'Memori',    en_label: 'Memories' },
    { id: 'words',         icon: '💬', id_label: 'Kata-kata', en_label: 'Words' },
    { id: 'song',          icon: '🎵', id_label: 'Lagu',      en_label: 'Song' },
    { id: 'game-section',  icon: '🎮', id_label: 'Game',      en_label: 'Game' }
];

let currentLang = 'id';
let currentTheme = 'dark';

document.addEventListener('DOMContentLoaded', function() {
    // --- Setup Tema & Bahasa ---
    const htmlEl = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    if(localStorage.getItem('theme')) {
        currentTheme = localStorage.getItem('theme');
        htmlEl.setAttribute('data-theme', currentTheme);
    }
    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    const langBtn = document.getElementById('lang-btn');
    if(localStorage.getItem('lang')) {
        currentLang = localStorage.getItem('lang');
        updateLanguage(currentLang);
    }
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        updateLanguage(currentLang);
        localStorage.setItem('lang', currentLang);
    });

    function updateLanguage(lang) {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang][key]) {
                elem.innerHTML = translations[lang][key];
            }
        });
        langBtn.textContent = lang === 'id' ? '🇮🇩 ID' : '🇺🇸 EN';

        // Update label navigasi titik samping
        document.querySelectorAll('.side-nav a').forEach(a => {
            const cfg = navConfig.find(c => c.id === a.dataset.target);
            const label = a.querySelector('.nav-label');
            if (cfg && label) label.textContent = lang === 'id' ? cfg.id_label : cfg.en_label;
        });
    }

    // --- Observer Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // --- Tooltip Logic ---
    const tooltip = document.getElementById('memory-tooltip');
    if (tooltip) {
        document.querySelectorAll('.memory-card').forEach(card => {
            const titleElement = card.querySelector('h3');
            const descriptionElement = card.querySelector('p'); 

            if (titleElement && descriptionElement) {
                card.addEventListener('mousemove', function(e) {
                    const title = titleElement.textContent;
                    const description = descriptionElement.textContent;
                    tooltip.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
                    tooltip.style.left = (e.clientX + 15) + 'px';
                    tooltip.style.top = (e.clientY + 15) + 'px';
                });
                card.addEventListener('mouseenter', () => tooltip.classList.add('visible'));
                card.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
            }
        });
    }

    createEffects();
    startCountdown();
    startCarousel();

    // --- Fitur baru ---
    buildSideNav();
    initScrollProgress();
    initFloatingHearts();
    initCursorTrail();
    initLoveFab();
    initCountdownTilt();
});

// --- SIDE NAV: bangun titik navigasi + scrollspy ---
function buildSideNav() {
    const nav = document.getElementById('side-nav');
    if (!nav) return;

    navConfig.forEach(cfg => {
        const section = document.getElementById(cfg.id);
        if (!section) return;

        const dot = document.createElement('a');
        dot.href = '#' + cfg.id;
        dot.dataset.target = cfg.id;

        const label = document.createElement('span');
        label.className = 'nav-label';
        label.textContent = currentLang === 'id' ? cfg.id_label : cfg.en_label;
        dot.appendChild(label);

        dot.addEventListener('click', (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });

        nav.appendChild(dot);
    });

    // Scrollspy: tandai titik aktif sesuai bagian yang terlihat
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.side-nav a').forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.side-nav a[data-target="${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    navConfig.forEach(cfg => {
        const section = document.getElementById(cfg.id);
        if (section) spy.observe(section);
    });
}

// --- SCROLL PROGRESS BAR ---
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;
    const update = () => {
        const h = document.documentElement;
        const scrolled = h.scrollTop;
        const total = h.scrollHeight - h.clientHeight;
        bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// --- FLOATING HEARTS (hati melayang naik di background) ---
function initFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💝', '🤍', '✨', '🌸'];
    setInterval(() => {
        // Jangan numpuk kalau tab tidak aktif
        if (document.hidden) return;
        const h = document.createElement('div');
        h.className = 'floating-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = Math.random() * 100 + 'vw';
        h.style.fontSize = (Math.random() * 16 + 14) + 'px';
        const dur = Math.random() * 6 + 7;
        h.style.animationDuration = dur + 's';
        h.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
        h.style.setProperty('--max-op', (Math.random() * 0.4 + 0.4).toFixed(2));
        document.body.appendChild(h);
        h.addEventListener('animationend', () => h.remove());
    }, 1400);
}

// --- CURSOR SPARKLE TRAIL (jejak kilau mengikuti kursor) ---
function initCursorTrail() {
    // Hanya untuk perangkat dengan mouse (bukan sentuh) biar tetap mulus
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    const glyphs = ['✨', '💫', '💕', '⭐'];
    let last = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - last < 70) return; // throttle
        last = now;
        const s = document.createElement('div');
        s.className = 'cursor-sparkle';
        s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
        document.body.appendChild(s);
        s.addEventListener('animationend', () => s.remove());
    }, { passive: true });
}

// --- LEDAKAN CONFETTI HATI ---
function burstConfetti(x, y) {
    const glyphs = ['💖', '💕', '💗', '💛', '💙', '💜', '✨', '🌟'];
    const count = 26;
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-heart';
        c.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        c.style.left = x + 'px';
        c.style.top = y + 'px';
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 180 + 80;
        c.style.setProperty('--cx', Math.cos(angle) * dist + 'px');
        c.style.setProperty('--cy', (Math.sin(angle) * dist - 60) + 'px');
        c.style.setProperty('--cr', (Math.random() * 720 - 360) + 'deg');
        c.style.fontSize = (Math.random() * 12 + 16) + 'px';
        document.body.appendChild(c);
        c.addEventListener('animationend', () => c.remove());
    }
}

// --- LOVE FAB: tombol kejutan -> confetti + pesan manis acak ---
let lastNoteIndex = -1;
function initLoveFab() {
    const fab = document.getElementById('love-fab');
    const toast = document.getElementById('love-toast');
    if (!fab || !toast) return;

    let toastTimer;
    fab.addEventListener('click', () => {
        const rect = fab.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

        const notes = translations[currentLang].love_notes;
        let idx = Math.floor(Math.random() * notes.length);
        if (notes.length > 1 && idx === lastNoteIndex) idx = (idx + 1) % notes.length;
        lastNoteIndex = idx;

        toast.textContent = notes[idx];
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
    });
}

// --- COUNTDOWN: efek tilt 3D mengikuti kursor ---
function initCountdownTilt() {
    document.querySelectorAll('.countdown-box').forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const r = box.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            box.style.transform = `scale(1.1) rotateY(${px * 18}deg) rotateX(${-py * 18}deg)`;
        });
        box.addEventListener('mouseleave', () => {
            box.style.transform = '';
        });
    });
}

// --- Background Effects ---
function createEffects() {
    const container = document.querySelector('.background-effects');
    if (!container) return;
    for(let i=0; i<20; i++) {
        let f = document.createElement('div');
        f.className = 'firefly';
        f.style.left = Math.random()*100+'vw';
        f.style.top = Math.random()*100+'vh';
        f.style.animationDuration = (Math.random()*10+10)+'s';
        container.appendChild(f);
    }
}

// --- LOGIKA INTERNAL SLIDER (UNTUK KARTU 7 & 11) ---
const innerSliderState = {
    'slider-7': 0,
    'slider-11': 0
};

function changeInnerSlide(sliderId, direction) {
    const container = document.getElementById(sliderId);
    if (!container) return;

    const images = container.querySelectorAll('.slide-img');
    let currentIndex = innerSliderState[sliderId];

    // Hilangkan active dari gambar sekarang
    images[currentIndex].classList.remove('active');

    // Update index
    currentIndex += direction;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;

    // Tambahkan active ke gambar baru
    images[currentIndex].classList.add('active');
    
    // Simpan state baru
    innerSliderState[sliderId] = currentIndex;

    // Stop event bubbling agar tidak mentrigger klik pada card utama (jika ada)
    event.stopPropagation(); 
}


// --- Countdown Logic ---
let countdownCelebrated = false;
function startCountdown() {
    const targetDate = new Date('November 2, 2026 00:00:00');
    setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference > 0) {
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            
            let months = (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth());
            let days = targetDate.getDate() - now.getDate();
            if (days < 0) {
                months--;
                let prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
                days += prevMonth;
            }

            document.getElementById('months').innerText = months;
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = `<h3>${translations[currentLang]['happy_day']}</h3>`;
            if (!countdownCelebrated) {
                countdownCelebrated = true;
                // Rentetan confetti dari beberapa titik untuk merayakan
                [0.25, 0.5, 0.75].forEach((fx, i) => {
                    setTimeout(() => burstConfetti(window.innerWidth * fx, window.innerHeight * 0.4), i * 250);
                });
            }
        }
    }, 1000);
}

// --- Text Carousel ---
let slideIndex = 1;
function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    if(!slides.length) return;
    slides.forEach(s => { s.classList.remove('active'); s.style.display='none'; });
    
    slideIndex += n;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    
    slides[slideIndex-1].classList.add('active');
    slides[slideIndex-1].style.display = 'block';
}
function startCarousel() {
    moveSlide(0); 
    setInterval(() => moveSlide(1), 5000);
}

// --- GAME LOGIC ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let gameRunning = false;
let score = 0;
let items = [];
let playerX = 0;
let animationFrame;

function resizeCanvas() {
    if(!canvas) return;
    const container = document.getElementById('game-container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    playerX = canvas.width / 2;
}
window.addEventListener('resize', resizeCanvas);
if(canvas) {
    resizeCanvas();
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        playerX = e.clientX - rect.left;
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        playerX = e.touches[0].clientX - rect.left;
    }, { passive: false });
}

function startGame() {
    if(!canvas) return;
    document.getElementById('game-start-screen').classList.add('hidden-screen');
    document.getElementById('game-over-screen').classList.add('hidden-screen');
    gameRunning = true;
    score = 0;
    items = [];
    document.getElementById('score').innerText = score;
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = '#FAFF00';
    ctx.shadowBlur = 20; ctx.shadowColor = '#FAFF00';
    ctx.fillRect(playerX - 25, canvas.height - 20, 50, 10);
    ctx.shadowBlur = 0;

    // Spawn Items
    if (Math.random() < 0.03) {
        const types = ['💖', '💌', '💀'];
        const type = types[Math.floor(Math.random() * types.length)];
        items.push({ x: Math.random() * canvas.width, y: 0, type: type, speed: Math.random() * 2 + 2 });
    }

    // Update Items
    for (let i = 0; i < items.length; i++) {
        items[i].y += items[i].speed;
        ctx.font = '24px Arial';
        ctx.fillText(items[i].type, items[i].x, items[i].y);

        if (items[i].y > canvas.height - 30 && items[i].y < canvas.height && 
            items[i].x > playerX - 30 && items[i].x < playerX + 30) {
                if (items[i].type === '💀') {
                    gameOver();
                } else {
                    score += 10;
                    document.getElementById('score').innerText = score;
                }
                items.splice(i, 1);
                i--;
        } else if (items[i].y > canvas.height) {
            items.splice(i, 1);
            i--;
        }
    }
    animationFrame = requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationFrame);
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-screen').classList.remove('hidden-screen');
}