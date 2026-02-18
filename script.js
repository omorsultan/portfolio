// =======================
// GLOBAL VARIABLES & CONFIG
// =======================

const config = {
    typing: {
        speed: 100,
        deleteSpeed: 50,
        pauseTime: 2000
    },
    animations: {
        observerOptions: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    },
    game: {
        canvas: null,
        context: null,
        gridSize: 20,
        tileCount: 20,
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        direction: { x: 0, y: 0 },
        score: 0,
        highScore: 0,
        isRunning: false,
        isPaused: false
    }
};

// Skills data structure using JavaScript objects
const skillsData = {
    programming: {
        title: "Programming Languages",
        skills: [
            { name: "JavaScript", level: 85, icon: "fab fa-js-square" },
            { name: "Java", level: 80, icon: "fab fa-java" },
            { name: "C++", level: 75, icon: "fas fa-code" },
            { name: "C", level: 70, icon: "fas fa-code" },
            { name: "SQL", level: 65, icon: "fas fa-database" }
        ]
    },
    technologies: {
        title: "Technologies & Tools",
        skills: [
            { name: "Git & GitHub", level: 80, icon: "fab fa-git-alt" },
            { name: "MySQL", level: 70, icon: "fas fa-database" }
        ]
    },
    learning: {
        title: "Currently Learning",
        skills: [
            { name: "Node.js", level: 60, icon: "fab fa-node-js" },
            { name: "Computer Networking", level: 50, icon: "fas fa-network-wired" }
        ]
    }
};

// Project data for modal display
const projectsData = {
    'smart-exam': {
        title: 'Smart Exam System',
        description: 'A comprehensive MCQ examination management system built with modern web technologies.',
        features: [
            'Multi-role system (Admin/Teacher/Student)',
            'Real-time exam creation and management',
            'Automated result calculation and tracking',
            'Secure authentication system',
            'Responsive user interface',
            'Database management with MySQL'
        ],
        technologies: ['Node.js', 'MySQL', 'JavaScript', 'HTML/CSS', 'Express.js'],
        github: 'https://github.com/omorsultan/smart-exam',
        challenges: 'Implemented secure role-based access control and real-time exam monitoring.',
        outcome: 'Successfully deployed system handling multiple concurrent users with 99% uptime.'
    },
    'brick-breaker': {
        title: '3-Level Brick Breaker Game',
        description: 'Classic arcade-style brick breaker game implemented in Java with Object-Oriented Programming principles.',
        features: [
            '3 progressive difficulty levels',
            'Dynamic brick patterns and layouts',
            'Score tracking and high score system',
            'Smooth collision detection',
            'Power-ups and special effects',
            'Clean, intuitive user interface'
        ],
        technologies: ['Java', 'Java Swing', 'OOP', 'Game Development'],
        github: 'https://github.com/omorsultan/brick-breaker',
        challenges: 'Optimized collision detection algorithms and implemented smooth gameplay mechanics.',
        outcome: 'Created an engaging gaming experience with scalable difficulty progression.'
    },
    'sneak-game': {
        title: 'Sneak Game',
        description: 'Console-based stealth game demonstrating advanced C++ programming and game logic implementation.',
        features: [
            'Interactive console-based gameplay',
            'Strategic movement and stealth mechanics',
            'Multiple game levels and challenges',
            'Real-time user input processing',
            'ASCII-based visual representation',
            'Save/load game state functionality'
        ],
        technologies: ['C++', 'Console Programming', 'Game Logic', 'File I/O'],
        github: 'https://github.com/omorsultan/sneak-game',
        challenges: 'Developed efficient console rendering and complex game state management.',
        outcome: 'Demonstrated mastery of C++ fundamentals and game development concepts.'
    }
};

// =======================
// INITIALIZATION
// =======================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all major components
    initializeTheme();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillsSection();
    initializeProjectsSection();
    initializeContactForm();
    initializeGame();
    
    console.log('🚀 Portfolio website initialized successfully!');
}

// =======================
// THEME MANAGEMENT
// =======================

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// =======================
// NAVIGATION
// =======================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlight on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// =======================
// TYPING ANIMATION
// =======================

function initializeTypingAnimation() {
    const nameElement = document.getElementById('typing-name');
    const subtitleElement = document.getElementById('typing-subtitle');
    
    const name = 'Omor Sultan';
    const subtitles = [
        'Software Engineering Student',
        'Problem Solver',
        'Future Software Engineer',
        'Technology Enthusiast'
    ];
    
    // Type name first
    typeText(nameElement, name, () => {
        // Then start subtitle rotation
        rotateSubtitles(subtitleElement, subtitles);
    });
}

function typeText(element, text, callback) {
    let index = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
            if (callback) callback();
        }
    }, config.typing.speed);
}

function rotateSubtitles(element, subtitles) {
    let currentIndex = 0;
    
    function displayNextSubtitle() {
        const subtitle = subtitles[currentIndex];
        typeText(element, subtitle, () => {
            setTimeout(() => {
                deleteText(element, () => {
                    currentIndex = (currentIndex + 1) % subtitles.length;
                    setTimeout(displayNextSubtitle, 300);
                });
            }, config.typing.pauseTime);
        });
    }
    
    displayNextSubtitle();
}

function deleteText(element, callback) {
    const text = element.textContent;
    let index = text.length;
    
    const deleteInterval = setInterval(() => {
        if (index > 0) {
            element.textContent = text.substring(0, index - 1);
            index--;
        } else {
            clearInterval(deleteInterval);
            if (callback) callback();
        }
    }, config.typing.deleteSpeed);
}

// =======================
// SCROLL ANIMATIONS
// =======================

function initializeScrollAnimations() {
    // Counter animation for stats
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                } else if (entry.target.classList.contains('cgpa-progress')) {
                    animateCGPABar(entry.target);
                } else if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, config.animations.observerOptions);
    
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
    
    // Observe CGPA progress bar
    document.querySelectorAll('.cgpa-progress').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe skill progress bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(target % 1 !== 0 ? 2 : 0);
        }
    }, 20);
}

function animateCGPABar(element) {
    const cgpa = parseFloat(element.getAttribute('data-cgpa'));
    const percentage = (cgpa / 4.0) * 100; // Assuming 4.0 scale
    element.style.width = percentage + '%';
}

function animateSkillBar(element) {
    const width = element.getAttribute('data-width');
    element.style.width = width;
}

// =======================
// SKILLS SECTION
// =======================

function initializeSkillsSection() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skill categories
            skillCategories.forEach(category => {
                const categoryFilter = category.getAttribute('data-category');
                if (filter === 'all' || filter === categoryFilter) {
                    category.style.display = 'block';
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize skill bars animation trigger
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        animateSkillBar(bar);
                    }, index * 200);
                });
            }
        });
    }, config.animations.observerOptions);
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// =======================
// PROJECTS SECTION
// =======================

function initializeProjectsSection() {
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal when clicking X or outside
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Global function for opening project modal (called from HTML)
function openProjectModal(projectKey) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const project = projectsData[projectKey];
    
    if (project) {
        modalBody.innerHTML = `
            <div class="modal-project">
                <h2>${project.title}</h2>
                <p class="project-description">${project.description}</p>
                
                <div class="modal-section">
                    <h3><i class="fas fa-list"></i> Key Features</h3>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-tools"></i> Technologies Used</h3>
                    <div class="tech-list">
                        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-lightbulb"></i> Challenges & Solutions</h3>
                    <p>${project.challenges}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-trophy"></i> Outcome</h3>
                    <p>${project.outcome}</p>
                </div>
                
                <div class="modal-actions">
                    <a href="${project.github}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> View on GitHub
                    </a>
                </div>
            </div>
        `;
        
        // Add modal-specific styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-project h2 {
                color: var(--primary-color);
                margin-bottom: 20px;
                font-size: 1.8rem;
            }
            .project-description {
                color: var(--text-secondary);
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .modal-section {
                margin-bottom: 25px;
            }
            .modal-section h3 {
                color: var(--text-primary);
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .modal-section h3 i {
                color: var(--primary-color);
            }
            .feature-list {
                list-style: none;
                padding: 0;
            }
            .feature-list li {
                padding: 8px 0;
                color: var(--text-secondary);
                position: relative;
                padding-left: 20px;
            }
            .feature-list li::before {
                content: '✓';
                color: var(--primary-color);
                font-weight: bold;
                position: absolute;
                left: 0;
            }
            .tech-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .tech-badge {
                background: var(--primary-color);
                color: white;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            .modal-actions {
                text-align: center;
                margin-top: 30px;
            }
        `;
        
        if (!document.getElementById('modal-styles')) {
            modalStyle.id = 'modal-styles';
            document.head.appendChild(modalStyle);
        }
        
        modal.style.display = 'block';
    }
}

// =======================
// CONTACT FORM VALIDATION
// =======================

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        field.addEventListener('blur', () => validateField(fieldName, field.value));
        field.addEventListener('input', () => clearFieldError(fieldName));
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Validate all fields
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            const value = field.value.trim();
            formData[fieldName] = value;
            
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(formData);
        }
    });
}

function validateField(fieldName, value) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const fieldElement = document.getElementById(fieldName);
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (!value) {
                errorMessage = 'Subject is required';
                isValid = false;
            } else if (value.length < 5) {
                errorMessage = 'Subject must be at least 5 characters';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        fieldElement.classList.remove('error');
        errorElement.classList.remove('show');
    } else {
        fieldElement.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
    
    return isValid;
}

function clearFieldError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const fieldElement = document.getElementById(fieldName);
    fieldElement.classList.remove('error');
    errorElement.classList.remove('show');
}

function submitForm(formData) {
    const submitBtn = document.querySelector('#contact-form .btn-primary');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in real scenario, would send to backend)
    setTimeout(() => {
        // Success feedback
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        
        // Reset form after success
        setTimeout(() => {
            document.getElementById('contact-form').reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            
            // Show success message
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        }, 2000);
        
    }, 1500);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// =======================
// MINI SNAKE GAME
// =======================

function initializeGame() {
    const canvas = document.getElementById('game-canvas');
    const startBtn = document.getElementById('game-start');
    const pauseBtn = document.getElementById('game-pause');
    const resetBtn = document.getElementById('game-reset');
    const scoreElement = document.getElementById('game-score');
    const highScoreElement = document.getElementById('game-high-score');
    
    // Initialize game config
    config.game.canvas = canvas;
    config.game.context = canvas.getContext('2d');
    config.game.highScore = parseInt(localStorage.getItem('snake-high-score')) || 0;
    highScoreElement.textContent = config.game.highScore;
    
    // Game controls event listeners
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    resetBtn.addEventListener('click', resetGame);
    
    // Keyboard controls
    document.addEventListener('keydown', handleGameInput);
    
    // Initialize game display
    drawGame();
}

function startGame() {
    if (!config.game.isRunning) {
        config.game.isRunning = true;
        config.game.isPaused = false;
        updateGameControls();
        gameLoop();
    } else if (config.game.isPaused) {
        config.game.isPaused = false;
        updateGameControls();
        gameLoop();
    }
}

function pauseGame() {
    if (config.game.isRunning && !config.game.isPaused) {
        config.game.isPaused = true;
        updateGameControls();
    }
}

function resetGame() {
    config.game.snake = [{ x: 10, y: 10 }];
    config.game.food = generateFood();
    config.game.direction = { x: 0, y: 0 };
    config.game.score = 0;
    config.game.isRunning = false;
    config.game.isPaused = false;
    
    updateScore();
    updateGameControls();
    drawGame();
}

function updateGameControls() {
    const startBtn = document.getElementById('game-start');
    const pauseBtn = document.getElementById('game-pause');
    
    if (!config.game.isRunning) {
        startBtn.textContent = 'Start Game';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    } else if (config.game.isPaused) {
        startBtn.textContent = 'Resume';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    } else {
        startBtn.textContent = 'Running...';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function handleGameInput(e) {
    if (!config.game.isRunning || config.game.isPaused) return;
    
    const { direction } = config.game;
    
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                config.game.direction = { x: 0, y: -1 };
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                config.game.direction = { x: 0, y: 1 };
            }
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                config.game.direction = { x: -1, y: 0 };
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                config.game.direction = { x: 1, y: 0 };
            }
            e.preventDefault();
            break;
    }
}

function gameLoop() {
    if (!config.game.isRunning || config.game.isPaused) return;
    
    updateGameState();
    drawGame();
    
    if (config.game.isRunning) {
        setTimeout(gameLoop, 150); // Game speed
    }
}

function updateGameState() {
    const { snake, direction, food } = config.game;
    
    // Move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Check wall collision
    if (head.x < 0 || head.x >= config.game.tileCount || 
        head.y < 0 || head.y >= config.game.tileCount) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        config.game.score += 10;
        config.game.food = generateFood();
        updateScore();
    } else {
        snake.pop();
    }
}

function generateFood() {
    const { snake, tileCount } = config.game;
    let food;
    
    do {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    
    return food;
}

function drawGame() {
    const { context, canvas, snake, food, gridSize } = config.game;
    
    // Clear canvas
    context.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-primary');
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid (optional light grid)
    context.strokeStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--border-color');
    context.lineWidth = 0.5;
    
    for (let i = 0; i <= config.game.tileCount; i++) {
        context.beginPath();
        context.moveTo(i * gridSize, 0);
        context.lineTo(i * gridSize, canvas.height);
        context.stroke();
        
        context.beginPath();
        context.moveTo(0, i * gridSize);
        context.lineTo(canvas.width, i * gridSize);
        context.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        context.fillStyle = index === 0 ? '#10b981' : '#34d399'; // Head is darker
        context.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, 
                        gridSize - 2, gridSize - 2);
    });
    
    // Draw food
    context.fillStyle = '#ef4444';
    context.beginPath();
    context.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, 
               gridSize/2 - 2, 0, 2 * Math.PI);
    context.fill();
}

function updateScore() {
    document.getElementById('game-score').textContent = config.game.score;
    
    if (config.game.score > config.game.highScore) {
        config.game.highScore = config.game.score;
        document.getElementById('game-high-score').textContent = config.game.highScore;
        localStorage.setItem('snake-high-score', config.game.highScore);
    }
}

function gameOver() {
    config.game.isRunning = false;
    config.game.isPaused = false;
    updateGameControls();
    
    // Show game over message
    const { context, canvas, score, highScore } = config.game;
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = 'white';
    context.font = 'bold 24px Arial';
    context.textAlign = 'center';
    context.fillText('Game Over!', canvas.width/2, canvas.height/2 - 20);
    
    context.font = '16px Arial';
    context.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2 + 10);
    
    if (score === highScore && score > 0) {
        context.fillStyle = '#f59e0b';
        context.fillText('New High Score!', canvas.width/2, canvas.height/2 + 35);
    }
    
    context.fillStyle = 'white';
    context.fillText('Click Reset to play again', canvas.width/2, canvas.height/2 + 60);
    
    // Show notification for high score
    if (score === highScore && score > 0) {
        setTimeout(() => {
            showNotification(`🎉 New High Score: ${score}!`, 'success');
        }, 500);
    }
}