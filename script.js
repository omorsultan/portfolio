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
