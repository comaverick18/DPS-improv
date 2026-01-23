// ConvoQuest - Gamified Conversation Challenges
// Full functionality with localStorage persistence

(function() {
    'use strict';

    // ============================================
    // Quest Data
    // ============================================
    const QUESTS = [
        // Starter Quests
        {
            id: 'coffee-chat',
            title: 'Coffee Shop Chat',
            category: 'starter',
            difficulty: 'easy',
            xp: 50,
            time: '5 min',
            icon: '☕',
            description: 'Start a casual conversation with a barista about something other than your order.',
            objective: 'Ask a barista a non-coffee related question and have a brief friendly conversation. This could be about their day, local recommendations, or anything that sparks natural dialogue.',
            tips: [
                'Choose a time when the coffee shop isn\'t too busy',
                'Start with a genuine smile and friendly tone',
                'Ask open-ended questions like "How\'s your day going?"',
                'Practice active listening and follow up on their responses',
                'Don\'t worry if the conversation is short - that\'s perfectly fine!'
            ],
            skills: ['Small Talk', 'Curiosity', 'Active Listening'],
            locationQuery: 'coffee shop',
            unlockLevel: 1
        },
        {
            id: 'book-recommendation',
            title: 'Book Recommendation',
            category: 'starter',
            difficulty: 'easy',
            xp: 75,
            time: '10 min',
            icon: '📚',
            description: 'Ask someone for a book recommendation and discuss why they enjoyed it.',
            objective: 'Find someone reading or at a bookstore and ask what they\'re reading or for a recommendation. Engage in a brief discussion about why they like it.',
            tips: [
                'Approach someone who looks relaxed and approachable',
                'Explain why you\'re asking (e.g., "I\'m looking for something new to read")',
                'Ask follow-up questions about why they enjoyed the book',
                'Share your own reading preferences to keep the conversation flowing',
                'Thank them genuinely for the recommendation'
            ],
            skills: ['Active Listening', 'Questions', 'Empathy'],
            locationQuery: 'bookstore library',
            unlockLevel: 1
        },
        {
            id: 'compliment-stranger',
            title: 'Compliment & Connect',
            category: 'starter',
            difficulty: 'easy',
            xp: 50,
            time: '5 min',
            icon: '✨',
            description: 'Give a genuine compliment to someone and see where the conversation goes.',
            objective: 'Find something you genuinely appreciate about a stranger (clothing, accessories, energy) and compliment them. If they engage, continue the brief conversation naturally.',
            tips: [
                'Make sure your compliment is genuine and specific',
                'Focus on choices they made (clothing, accessories) rather than physical features',
                'Deliver the compliment with a warm smile',
                'If they respond positively, ask a follow-up question',
                'Be prepared for any response - not everyone will engage, and that\'s okay'
            ],
            skills: ['Positivity', 'Connection', 'Observation'],
            locationQuery: null,
            unlockLevel: 1
        },
        // Social Quests
        {
            id: 'event-small-talk',
            title: 'Event Small Talk',
            category: 'social',
            difficulty: 'medium',
            xp: 100,
            time: '15 min',
            icon: '🎉',
            description: 'Strike up a conversation with someone at a social event or gathering.',
            objective: 'At your next social event, introduce yourself to someone new and have a conversation lasting at least 5 minutes. Find common interests or experiences.',
            tips: [
                'Look for someone who appears open to conversation (not deeply engaged elsewhere)',
                'Start with context - comment on the event or venue',
                'Ask what brought them to the event',
                'Find common ground and build on shared interests',
                'Practice the "yes, and" technique - add to what they share'
            ],
            skills: ['Networking', 'First Impressions', 'Finding Common Ground'],
            locationQuery: null,
            unlockLevel: 1
        },
        {
            id: 'ask-directions',
            title: 'Ask for Directions',
            category: 'social',
            difficulty: 'easy',
            xp: 50,
            time: '5 min',
            icon: '🗺️',
            description: 'Ask a local for directions and turn it into a brief conversation.',
            objective: 'Instead of using your phone, ask someone for directions. Extend the interaction by asking about their favorite spots in the area.',
            tips: [
                'Approach someone who looks approachable and not in a hurry',
                'Be polite and make eye contact when asking',
                'After getting directions, ask a follow-up like "Any good places to eat around there?"',
                'Thank them warmly and wish them a good day',
                'This works great when exploring a new neighborhood'
            ],
            skills: ['Approach Confidence', 'Local Connection', 'Curiosity'],
            locationQuery: null,
            unlockLevel: 1
        },
        {
            id: 'restaurant-chat',
            title: 'Restaurant Chat',
            category: 'social',
            difficulty: 'medium',
            xp: 75,
            time: '10 min',
            icon: '🍽️',
            description: 'Have a conversation with your server beyond just ordering.',
            objective: 'Connect with your server by asking for their personal recommendations and engaging in friendly banter throughout your meal.',
            tips: [
                'Ask for their honest recommendation - "What\'s YOUR favorite?"',
                'If they share something personal, acknowledge it',
                'Be respectful of their time - keep it light and friendly',
                'Comment positively on the food when they check in',
                'Leave a genuine compliment with your tip'
            ],
            skills: ['Small Talk', 'Genuine Interest', 'Rapport Building'],
            locationQuery: 'restaurant',
            unlockLevel: 1
        },
        // Professional Quests
        {
            id: 'networking-intro',
            title: 'Networking Introduction',
            category: 'professional',
            difficulty: 'medium',
            xp: 100,
            time: '15 min',
            icon: '🤝',
            description: 'Introduce yourself to someone new at a professional event.',
            objective: 'At a professional event, introduce yourself to at least one person you don\'t know. Exchange contact information if the conversation goes well.',
            tips: [
                'Have a clear, concise introduction ready (name, what you do, why you\'re there)',
                'Ask about their work and show genuine interest',
                'Find ways to be helpful - share resources or connections',
                'Practice active listening and remember details',
                'Follow up within 24 hours if you exchange contact info'
            ],
            skills: ['First Impressions', 'Professional Communication', 'Follow-through'],
            locationQuery: null,
            unlockLevel: 1
        },
        {
            id: 'elevator-pitch',
            title: 'Elevator Pitch',
            category: 'professional',
            difficulty: 'hard',
            xp: 150,
            time: '5 min',
            icon: '🎯',
            description: 'Share what you do with a stranger in under 60 seconds.',
            objective: 'When someone asks "What do you do?", deliver a clear, engaging 30-60 second explanation that sparks interest and invites follow-up questions.',
            tips: [
                'Lead with the problem you solve, not your job title',
                'Use simple language anyone can understand',
                'Include a memorable hook or story',
                'End with something that invites a response',
                'Practice until it feels natural, not rehearsed'
            ],
            skills: ['Clarity', 'Confidence', 'Storytelling'],
            locationQuery: null,
            unlockLevel: 2
        },
        {
            id: 'meeting-icebreaker',
            title: 'Meeting Ice Breaker',
            category: 'professional',
            difficulty: 'medium',
            xp: 100,
            time: '10 min',
            icon: '💼',
            description: 'Start a meeting with a creative ice breaker that gets everyone engaged.',
            objective: 'Before your next meeting starts, facilitate a brief ice breaker that helps everyone connect and sets a positive tone.',
            tips: [
                'Keep it brief (2-3 minutes max)',
                'Make it relevant to the meeting or current events',
                'Ensure everyone can participate easily',
                'Go first to model the response',
                'Have a backup in case the first one doesn\'t land'
            ],
            skills: ['Leadership', 'Creativity', 'Group Dynamics'],
            locationQuery: null,
            unlockLevel: 2
        },
        // Advanced Quests
        {
            id: 'lead-discussion',
            title: 'Lead a Group Discussion',
            category: 'advanced',
            difficulty: 'hard',
            xp: 200,
            time: '30 min',
            icon: '👥',
            description: 'Facilitate a group conversation ensuring everyone participates.',
            objective: 'Lead a group discussion (social or professional) where you ensure everyone has a chance to contribute and the conversation stays productive.',
            tips: [
                'Start by setting the context and ground rules',
                'Ask open-ended questions to the group',
                'Notice who hasn\'t spoken and invite them in gently',
                'Acknowledge and build on contributions',
                'Summarize key points and next steps at the end'
            ],
            skills: ['Facilitation', 'Inclusivity', 'Leadership'],
            locationQuery: null,
            unlockLevel: 3
        },
        {
            id: 'difficult-conversation',
            title: 'Handle Difficult Conversation',
            category: 'advanced',
            difficulty: 'hard',
            xp: 200,
            time: '20 min',
            icon: '⚡',
            description: 'Navigate a challenging conversation with empathy and clarity.',
            objective: 'Have a conversation you\'ve been avoiding - giving feedback, addressing a concern, or discussing a sensitive topic - while staying calm and constructive.',
            tips: [
                'Prepare your key points but stay flexible',
                'Start by establishing shared goals',
                'Use "I" statements to express your perspective',
                'Listen to understand, not to respond',
                'Focus on solutions, not just problems'
            ],
            skills: ['Emotional Intelligence', 'Conflict Resolution', 'Empathy'],
            locationQuery: null,
            unlockLevel: 3
        },
        {
            id: 'public-speaking-mini',
            title: 'Public Speaking Mini',
            category: 'advanced',
            difficulty: 'hard',
            xp: 250,
            time: '15 min',
            icon: '🎤',
            description: 'Give a brief impromptu speech or toast at a gathering.',
            objective: 'Volunteer to give a brief speech, toast, or presentation at your next opportunity. Speak for 1-3 minutes on a topic with minimal preparation.',
            tips: [
                'Have a simple structure: opening, 2-3 points, closing',
                'Start with a hook - question, story, or surprising fact',
                'Make eye contact with different people',
                'Pause for emphasis instead of rushing',
                'End with a clear call to action or memorable statement'
            ],
            skills: ['Public Speaking', 'Improvisation', 'Confidence'],
            locationQuery: null,
            unlockLevel: 3
        }
    ];

    // ============================================
    // Achievements Data
    // ============================================
    const ACHIEVEMENTS = [
        { id: 'first-quest', name: 'First Steps', icon: '🎯', description: 'Complete your first quest', condition: (progress) => progress.completedQuests.length >= 1 },
        { id: 'streak-3', name: 'On Fire', icon: '🔥', description: '3 day streak', condition: (progress) => progress.streak >= 3 },
        { id: 'streak-7', name: 'Unstoppable', icon: '⚡', description: '7 day streak', condition: (progress) => progress.streak >= 7 },
        { id: 'level-2', name: 'Rising Star', icon: '⭐', description: 'Reach Level 2', condition: (progress) => progress.level >= 2 },
        { id: 'level-5', name: 'Conversation Master', icon: '👑', description: 'Reach Level 5', condition: (progress) => progress.level >= 5 },
        { id: 'quests-5', name: 'Quest Hunter', icon: '🏹', description: 'Complete 5 quests', condition: (progress) => progress.completedQuests.length >= 5 },
        { id: 'all-starter', name: 'Starter Complete', icon: '🌱', description: 'Complete all starter quests', condition: (progress) => {
            const starterQuests = QUESTS.filter(q => q.category === 'starter').map(q => q.id);
            return starterQuests.every(id => progress.completedQuests.includes(id));
        }},
        { id: 'all-quests', name: 'Legendary', icon: '🏆', description: 'Complete all quests', condition: (progress) => progress.completedQuests.length >= QUESTS.length }
    ];

    // ============================================
    // Level System
    // ============================================
    const LEVEL_XP = [0, 100, 250, 500, 850, 1300, 1850, 2500, 3250, 4100, 5000];

    function calculateLevel(xp) {
        for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_XP[i]) {
                return i + 1;
            }
        }
        return 1;
    }

    function getXPForNextLevel(level) {
        if (level >= LEVEL_XP.length) return 0;
        return LEVEL_XP[level];
    }

    function getXPProgress(xp, level) {
        const currentLevelXP = LEVEL_XP[level - 1] || 0;
        const nextLevelXP = LEVEL_XP[level] || LEVEL_XP[LEVEL_XP.length - 1];
        const progress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);
        return Math.min(Math.max(progress, 0), 1);
    }

    // ============================================
    // LocalStorage Manager
    // ============================================
    const STORAGE_KEY = 'convoquest_progress';

    const defaultProgress = {
        xp: 0,
        level: 1,
        streak: 0,
        lastActiveDate: null,
        completedQuests: [],
        activeQuest: null,
        achievements: [],
        reflections: []
    };

    function loadProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return { ...defaultProgress, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.error('Error loading progress:', e);
        }
        return { ...defaultProgress };
    }

    function saveProgress(progress) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Error saving progress:', e);
        }
    }

    // ============================================
    // State
    // ============================================
    let userProgress = loadProgress();
    let selectedQuestId = null;
    let currentRating = 0;

    // ============================================
    // Rotating Text Animation
    // ============================================
    const rotatingTexts = [
        'coffee shop chats',
        'networking events',
        'book recommendations',
        'elevator pitches',
        'small talk mastery',
        'professional introductions'
    ];
    let rotatingIndex = 0;

    function updateRotatingText() {
        const el = document.getElementById('rotatingText');
        if (!el) return;

        rotatingIndex = (rotatingIndex + 1) % rotatingTexts.length;
        el.style.opacity = 0;
        el.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            el.textContent = rotatingTexts[rotatingIndex];
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, 300);
    }

    // ============================================
    // Streak Management
    // ============================================
    function checkAndUpdateStreak() {
        const today = new Date().toDateString();
        const lastActive = userProgress.lastActiveDate;

        if (!lastActive) {
            return;
        }

        const lastDate = new Date(lastActive);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            // Streak broken
            userProgress.streak = 0;
            saveProgress(userProgress);
        }
    }

    function updateStreakForCompletion() {
        const today = new Date().toDateString();

        if (userProgress.lastActiveDate !== today) {
            userProgress.streak += 1;
            userProgress.lastActiveDate = today;
        }
    }

    // ============================================
    // UI Rendering
    // ============================================
    function renderStats() {
        // Total XP
        const totalXPEl = document.getElementById('totalXP');
        if (totalXPEl) {
            animateNumber(totalXPEl, parseInt(totalXPEl.textContent) || 0, userProgress.xp);
        }

        // Level
        const levelDisplay = document.getElementById('levelDisplay');
        const currentLevel = document.getElementById('currentLevel');
        const levelProgress = document.getElementById('levelProgress');
        const xpToNext = document.getElementById('xpToNext');

        if (levelDisplay) levelDisplay.textContent = userProgress.level;
        if (currentLevel) currentLevel.textContent = userProgress.level;

        if (levelProgress) {
            const progress = getXPProgress(userProgress.xp, userProgress.level);
            const circumference = 2 * Math.PI * 16;
            const offset = circumference * (1 - progress);
            levelProgress.style.strokeDasharray = circumference;
            levelProgress.style.strokeDashoffset = offset;
        }

        if (xpToNext) {
            const nextLevelXP = getXPForNextLevel(userProgress.level);
            const remaining = nextLevelXP - userProgress.xp;
            xpToNext.textContent = remaining > 0 ? remaining : 'MAX';
        }

        // Streak
        const currentStreak = document.getElementById('currentStreak');
        const streakIcon = document.getElementById('streakIcon');
        if (currentStreak) currentStreak.textContent = userProgress.streak;
        if (streakIcon && userProgress.streak > 0) {
            streakIcon.classList.add('active');
        }

        // Completed count
        const completedCount = document.getElementById('completedCount');
        const totalQuests = document.getElementById('totalQuests');
        if (completedCount) completedCount.textContent = userProgress.completedQuests.length;
        if (totalQuests) totalQuests.textContent = QUESTS.length;
    }

    function animateNumber(el, start, end) {
        const duration = 500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(start + (end - start) * easeOutQuart(progress));
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function renderActiveQuest() {
        const noActiveQuest = document.getElementById('noActiveQuest');
        const activeQuestContent = document.getElementById('activeQuestContent');

        if (!userProgress.activeQuest) {
            if (noActiveQuest) noActiveQuest.style.display = 'block';
            if (activeQuestContent) activeQuestContent.style.display = 'none';
            return;
        }

        const quest = QUESTS.find(q => q.id === userProgress.activeQuest);
        if (!quest) {
            userProgress.activeQuest = null;
            saveProgress(userProgress);
            renderActiveQuest();
            return;
        }

        if (noActiveQuest) noActiveQuest.style.display = 'none';
        if (activeQuestContent) activeQuestContent.style.display = 'block';

        document.getElementById('activeQuestTitle').textContent = quest.title;
        document.getElementById('activeQuestDesc').textContent = quest.description;
        document.getElementById('activeQuestXP').textContent = `+${quest.xp} XP`;
        document.getElementById('activeQuestTime').innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            ${quest.time}
        `;
    }

    function renderQuests() {
        const grid = document.getElementById('questsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        const currentCategory = document.querySelector('.cq-pill.active')?.dataset.category || 'all';

        const filteredQuests = QUESTS.filter(quest => {
            if (currentCategory !== 'all' && quest.category !== currentCategory) {
                return false;
            }
            return true;
        });

        filteredQuests.forEach(quest => {
            const isCompleted = userProgress.completedQuests.includes(quest.id);
            const isLocked = quest.unlockLevel > userProgress.level;
            const isActive = userProgress.activeQuest === quest.id;

            const card = document.createElement('div');
            card.className = `cq-quest-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
            card.dataset.questId = quest.id;

            card.innerHTML = `
                <div class="cq-quest-header">
                    <div class="cq-quest-icon">${quest.icon}</div>
                    <div class="cq-quest-badges">
                        <span class="cq-difficulty-badge ${quest.difficulty}">${quest.difficulty}</span>
                        <span class="cq-xp-badge">+${quest.xp} XP</span>
                    </div>
                </div>
                <h3 class="cq-quest-title">${quest.title}</h3>
                <p class="cq-quest-description">${quest.description}</p>
                <div class="cq-quest-tags">
                    ${quest.skills.map(skill => `<span class="cq-tag">${skill}</span>`).join('')}
                </div>
                <div class="cq-quest-meta">
                    <span class="cq-quest-time">
                        <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        ${quest.time}
                    </span>
                    <div class="cq-quest-actions">
                        ${isCompleted ? `
                            <button class="cq-btn-completed">
                                <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Completed
                            </button>
                        ` : isLocked ? `
                            <span class="cq-locked-text">🔒 Level ${quest.unlockLevel}</span>
                        ` : isActive ? `
                            <button class="cq-btn-start" disabled>In Progress</button>
                        ` : `
                            <button class="cq-btn-details" data-quest="${quest.id}">Details</button>
                            <button class="cq-btn-start" data-quest="${quest.id}">Start</button>
                        `}
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });

        // Add event listeners
        grid.querySelectorAll('.cq-btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openQuestModal(btn.dataset.quest);
            });
        });

        grid.querySelectorAll('.cq-btn-start').forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    startQuest(btn.dataset.quest);
                });
            }
        });
    }

    function renderAchievements() {
        const grid = document.getElementById('achievementsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        ACHIEVEMENTS.forEach(achievement => {
            const isUnlocked = userProgress.achievements.includes(achievement.id);

            const el = document.createElement('div');
            el.className = `cq-achievement ${isUnlocked ? '' : 'locked'}`;
            el.innerHTML = `
                <span class="cq-achievement-icon">${achievement.icon}</span>
                <h4 class="cq-achievement-name">${achievement.name}</h4>
                <p class="cq-achievement-desc">${achievement.description}</p>
            `;

            grid.appendChild(el);
        });

        // Update count
        const unlockedBadges = document.getElementById('unlockedBadges');
        if (unlockedBadges) {
            unlockedBadges.textContent = userProgress.achievements.length;
        }
    }

    // ============================================
    // Quest Modal
    // ============================================
    function openQuestModal(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        if (!quest) return;

        selectedQuestId = questId;

        // Update modal content
        document.getElementById('modalTitle').textContent = quest.title;
        document.getElementById('modalDescription').textContent = quest.description;
        document.getElementById('modalDifficulty').textContent = quest.difficulty;
        document.getElementById('modalDifficulty').className = `cq-difficulty-badge ${quest.difficulty}`;
        document.getElementById('modalXP').textContent = `+${quest.xp} XP`;
        document.getElementById('modalObjective').textContent = quest.objective;
        document.getElementById('modalTime').textContent = quest.time;

        // Skills
        const skillsContainer = document.getElementById('modalSkills');
        skillsContainer.innerHTML = quest.skills.map(skill => `<span class="cq-tag">${skill}</span>`).join('');

        // Tips
        const tipsList = document.getElementById('modalTipsList');
        tipsList.innerHTML = quest.tips.map((tip, i) => `
            <div class="cq-tip-item">
                <span class="cq-tip-number">${i + 1}</span>
                <span class="cq-tip-text">${tip}</span>
            </div>
        `).join('');

        // Reset location finder
        document.getElementById('locationsList').innerHTML = '<p class="cq-locations-hint">Click to find places near you for this quest</p>';
        document.getElementById('findLocationBtn').disabled = false;
        document.getElementById('findLocationBtn').innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            Find Nearby Locations
        `;

        // Reset tabs
        document.querySelectorAll('.cq-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.cq-tab-content').forEach(content => content.classList.remove('active'));
        document.querySelector('.cq-tab[data-tab="overview"]').classList.add('active');
        document.getElementById('tab-overview').classList.add('active');

        // Show modal
        document.getElementById('questModal').classList.add('active');
    }

    function closeQuestModal() {
        document.getElementById('questModal').classList.remove('active');
        selectedQuestId = null;
    }

    // ============================================
    // Quest Actions
    // ============================================
    function startQuest(questId) {
        if (userProgress.activeQuest) {
            alert('You already have an active quest! Complete or abandon it first.');
            return;
        }

        const quest = QUESTS.find(q => q.id === questId);
        if (!quest) return;

        if (quest.unlockLevel > userProgress.level) {
            alert(`This quest requires Level ${quest.unlockLevel}. Keep completing quests to level up!`);
            return;
        }

        userProgress.activeQuest = questId;
        saveProgress(userProgress);

        closeQuestModal();
        renderActiveQuest();
        renderQuests();

        showNotification(`Quest started: ${quest.title}`, 'success');
    }

    function abandonQuest() {
        if (!userProgress.activeQuest) return;

        if (confirm('Are you sure you want to abandon this quest? You won\'t lose any XP.')) {
            userProgress.activeQuest = null;
            saveProgress(userProgress);

            renderActiveQuest();
            renderQuests();

            showNotification('Quest abandoned', 'info');
        }
    }

    function completeQuest() {
        if (!userProgress.activeQuest) return;

        const quest = QUESTS.find(q => q.id === userProgress.activeQuest);
        if (!quest) return;

        // Show completion modal
        document.getElementById('completedQuestTitle').textContent = quest.title;
        document.getElementById('xpEarned').textContent = `+${quest.xp}`;
        document.getElementById('reflectionText').value = '';
        currentRating = 0;
        updateRatingStars();

        // Create confetti
        createConfetti();

        document.getElementById('completionModal').classList.add('active');
    }

    function saveCompletion() {
        const quest = QUESTS.find(q => q.id === userProgress.activeQuest);
        if (!quest) return;

        const reflection = document.getElementById('reflectionText').value.trim();
        const oldLevel = userProgress.level;

        // Update progress
        userProgress.xp += quest.xp;
        userProgress.completedQuests.push(quest.id);
        userProgress.activeQuest = null;
        userProgress.level = calculateLevel(userProgress.xp);

        // Update streak
        updateStreakForCompletion();

        // Save reflection if provided
        if (reflection) {
            userProgress.reflections.push({
                questId: quest.id,
                text: reflection,
                rating: currentRating,
                date: new Date().toISOString()
            });
        }

        // Check for new achievements
        const newAchievements = checkAchievements();

        saveProgress(userProgress);

        // Close completion modal
        document.getElementById('completionModal').classList.remove('active');

        // Show XP gain animation
        showXPGain(quest.xp);

        // Check for level up
        if (userProgress.level > oldLevel) {
            setTimeout(() => showLevelUp(userProgress.level), 1000);
        }

        // Show achievement notifications
        newAchievements.forEach((achievement, index) => {
            setTimeout(() => {
                showNotification(`Achievement unlocked: ${achievement.name} ${achievement.icon}`, 'success');
            }, (index + 1) * 1500);
        });

        // Re-render
        renderStats();
        renderActiveQuest();
        renderQuests();
        renderAchievements();
    }

    function checkAchievements() {
        const newAchievements = [];

        ACHIEVEMENTS.forEach(achievement => {
            if (!userProgress.achievements.includes(achievement.id)) {
                if (achievement.condition(userProgress)) {
                    userProgress.achievements.push(achievement.id);
                    newAchievements.push(achievement);
                }
            }
        });

        return newAchievements;
    }

    function showXPGain(amount) {
        const badge = document.getElementById('xpGainBadge');
        if (badge) {
            badge.textContent = `+${amount}`;
            badge.classList.add('show');
            setTimeout(() => badge.classList.remove('show'), 2000);
        }
    }

    function showLevelUp(newLevel) {
        document.getElementById('newLevel').textContent = newLevel;

        // Check what's unlocked
        const unlocksContainer = document.getElementById('levelUnlocks');
        const newlyUnlocked = QUESTS.filter(q => q.unlockLevel === newLevel);

        if (newlyUnlocked.length > 0) {
            unlocksContainer.innerHTML = `
                <h4>New Quests Unlocked!</h4>
                ${newlyUnlocked.map(q => `
                    <div class="cq-unlock-item">
                        <span class="cq-unlock-icon">${q.icon}</span>
                        <span class="cq-unlock-text">${q.title}</span>
                    </div>
                `).join('')}
            `;
        } else {
            unlocksContainer.innerHTML = '<p>Keep going to unlock more quests!</p>';
        }

        createConfetti();
        document.getElementById('levelUpModal').classList.add('active');
    }

    function closeLevelUpModal() {
        document.getElementById('levelUpModal').classList.remove('active');
    }

    // ============================================
    // Rating Stars
    // ============================================
    function updateRatingStars() {
        document.querySelectorAll('.cq-star').forEach((star, index) => {
            star.classList.toggle('active', index < currentRating);
        });
    }

    // ============================================
    // Location Finder
    // ============================================
    function findNearbyLocations() {
        const quest = QUESTS.find(q => q.id === selectedQuestId);
        if (!quest || !quest.locationQuery) {
            document.getElementById('locationsList').innerHTML = '<p class="cq-locations-hint">This quest doesn\'t have specific locations.</p>';
            return;
        }

        const btn = document.getElementById('findLocationBtn');
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="spin" viewBox="0 0 24 24" fill="none" width="20" height="20">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="31.4" stroke-dashoffset="10"/>
            </svg>
            Finding locations...
        `;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Simulate API call with mock data
                    setTimeout(() => {
                        const mockLocations = generateMockLocations(quest.locationQuery);
                        displayLocations(mockLocations);
                        btn.disabled = false;
                        btn.innerHTML = `
                            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            Refresh Locations
                        `;
                    }, 1500);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    document.getElementById('locationsList').innerHTML = '<p class="cq-locations-hint">Unable to get location. Please enable location services.</p>';
                    btn.disabled = false;
                    btn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" stroke="currentColor" stroke-width="2"/>
                            <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Try Again
                    `;
                }
            );
        } else {
            document.getElementById('locationsList').innerHTML = '<p class="cq-locations-hint">Geolocation is not supported by your browser.</p>';
            btn.disabled = false;
        }
    }

    function generateMockLocations(query) {
        const locationTypes = {
            'coffee shop': [
                { name: 'Starbucks', address: '123 Main St' },
                { name: 'Local Brew Café', address: '456 Oak Ave' },
                { name: 'The Coffee Bean', address: '789 Pine St' }
            ],
            'bookstore library': [
                { name: 'Barnes & Noble', address: '100 Reading Rd' },
                { name: 'Public Library', address: '200 Book Ln' },
                { name: 'Indie Bookshop', address: '300 Chapter St' }
            ],
            'restaurant': [
                { name: 'The Local Kitchen', address: '500 Food St' },
                { name: 'Bistro Corner', address: '600 Taste Ave' },
                { name: 'Family Diner', address: '700 Meal Blvd' }
            ]
        };

        const locations = locationTypes[query] || [
            { name: 'Nearby Location 1', address: 'Somewhere close' },
            { name: 'Nearby Location 2', address: 'Not far away' },
            { name: 'Nearby Location 3', address: 'Just around the corner' }
        ];

        return locations.map((loc, i) => ({
            ...loc,
            distance: `0.${i + 2} miles`
        }));
    }

    function displayLocations(locations) {
        const container = document.getElementById('locationsList');
        container.innerHTML = locations.map(loc => `
            <div class="cq-location-item">
                <div class="cq-location-info">
                    <h5>${loc.name}</h5>
                    <p>${loc.address}</p>
                </div>
                <span class="cq-location-distance">${loc.distance}</span>
            </div>
        `).join('');
    }

    // ============================================
    // Confetti Effect
    // ============================================
    function createConfetti() {
        const container = document.getElementById('confettiContainer') || document.querySelector('.cq-confetti');
        if (!container) return;

        container.innerHTML = '';
        const colors = ['#FFD700', '#4169E1', '#10B981', '#FF6B6B', '#A855F7'];

        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = Math.random() * 0.5 + 's';
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(piece);
        }

        setTimeout(() => {
            container.innerHTML = '';
        }, 4000);
    }

    // ============================================
    // Notifications
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cq-notification cq-notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="cq-notification-close">&times;</button>
        `;

        // Add styles if not present
        if (!document.querySelector('#cq-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cq-notification-styles';
            styles.textContent = `
                .cq-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 2000;
                    animation: slideInNotification 0.3s ease-out;
                    max-width: 350px;
                }
                .cq-notification-success {
                    border-left: 4px solid #10B981;
                }
                .cq-notification-info {
                    border-left: 4px solid #4169E1;
                }
                .cq-notification-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    color: #9CA3AF;
                    cursor: pointer;
                    padding: 0;
                }
                @keyframes slideInNotification {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        notification.querySelector('.cq-notification-close').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInNotification 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // ============================================
    // Event Listeners
    // ============================================
    function initEventListeners() {
        // Category pills
        document.querySelectorAll('.cq-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.cq-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                renderQuests();
            });
        });

        // View toggle
        document.querySelectorAll('.cq-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cq-view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const grid = document.getElementById('questsGrid');
                if (grid) {
                    grid.classList.toggle('list-view', btn.dataset.view === 'list');
                }
            });
        });

        // Modal tabs
        document.querySelectorAll('.cq-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.cq-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.cq-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
            });
        });

        // Modal close
        document.getElementById('modalClose')?.addEventListener('click', closeQuestModal);
        document.getElementById('modalCancelBtn')?.addEventListener('click', closeQuestModal);
        document.querySelector('#questModal .cq-modal-overlay')?.addEventListener('click', closeQuestModal);

        // Start quest from modal
        document.getElementById('modalStartBtn')?.addEventListener('click', () => {
            if (selectedQuestId) startQuest(selectedQuestId);
        });

        // Active quest actions
        document.getElementById('completeQuestBtn')?.addEventListener('click', completeQuest);
        document.getElementById('abandonQuestBtn')?.addEventListener('click', abandonQuest);

        // Completion modal
        document.getElementById('saveCompletionBtn')?.addEventListener('click', saveCompletion);

        // Level up modal
        document.getElementById('closeLevelUpBtn')?.addEventListener('click', closeLevelUpModal);

        // Location finder
        document.getElementById('findLocationBtn')?.addEventListener('click', findNearbyLocations);

        // Rating stars
        document.querySelectorAll('.cq-star').forEach(star => {
            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.rating);
                updateRatingStars();
            });
        });

        // Close modals on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeQuestModal();
                document.getElementById('completionModal')?.classList.remove('active');
                document.getElementById('levelUpModal')?.classList.remove('active');
            }
        });
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        // Check streak
        checkAndUpdateStreak();

        // Render UI
        renderStats();
        renderActiveQuest();
        renderQuests();
        renderAchievements();

        // Initialize event listeners
        initEventListeners();

        // Start rotating text
        setInterval(updateRotatingText, 3000);

        console.log('ConvoQuest initialized!');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
