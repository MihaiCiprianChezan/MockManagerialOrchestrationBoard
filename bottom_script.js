
        // Initialize Lucide icons and set up navigation
        document.addEventListener('DOMContentLoaded', function() {
            lucide.createIcons();

            // Add click handlers to nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function() {
                    const pageId = this.getAttribute('data-page');
                    if (pageId) {
                        navigateTo(pageId);
                    }
                });
            });
        });

        // Breadcrumb data mapping
        const breadcrumbMap = {
            'dashboard': { title: 'Dashboard', section: 'Overview' },
            'agents': { title: 'Agent Fleet', section: 'Overview' },
            'protocol': { title: 'Protocol Interface', section: 'Overview' },
            'workpackages': { title: 'Work Packages', section: 'Operations' },
            'tasks': { title: 'Quick Tasks', section: 'Operations' },
            'approvals': { title: 'Approvals', section: 'Operations' },
            'analytics': { title: 'Analytics', section: 'Insights' },
            'audit': { title: 'Audit Trail', section: 'Insights' },
            'integrations': { title: 'Integrations', section: 'System' },
            'settings': { title: 'Settings', section: 'System' }
        };

        // Navigation function
        function navigateTo(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-view').forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });

            // Find and activate the nav item with matching data-page
            const navItem = document.querySelector(`[data-page="${pageId}"]`);
            if (navItem) {
                navItem.classList.add('active');
            }

            // Update breadcrumb
            const breadcrumbData = breadcrumbMap[pageId];
            if (breadcrumbData) {
                document.querySelector('.page-title').textContent = breadcrumbData.title;
                document.getElementById('breadcrumb-current').textContent = breadcrumbData.section;
            }
        }

        // Modal functions
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Re-initialize icons in modal
                lucide.createIcons();
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Close modal when clicking overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = '';
            }
        });

        // Simulate real-time updates (for demo purposes)
        function simulateActivity() {
            const activities = [
                'CustomerSupport-01 resolved ticket #4523',
                'FinanceBot processed invoice #INV-8472',
                'LegalAssist completed contract review',
                'HRRecruiter screened 5 new candidates',
                'DataAnalyst-Pro generated weekly report'
            ];

            // This would update the activity feed in a real implementation
            console.log('Activity:', activities[Math.floor(Math.random() * activities.length)]);
        }

        // Run simulation every 30 seconds (for demo)
        // setInterval(simulateActivity, 30000);

        // Add click handlers for agent cards to open detail modal
        document.querySelectorAll('.agent-card').forEach(card => {
            card.addEventListener('click', function() {
                openModal('agentDetailModal');
            });
        });



        // Smooth scroll for any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Add hover effects for topology nodes
        document.querySelectorAll('.topology-node').forEach(node => {
            node.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            node.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Audit Trail Tab Switching
        function switchAuditTab(tabName, buttonElement) {
            // Hide all audit views
            document.querySelectorAll('.audit-view').forEach(view => {
                view.classList.remove('active');
            });

            // Show selected view
            const viewElement = document.getElementById(`audit-${tabName}`);
            if (viewElement) {
                viewElement.classList.add('active');
            }

            // Update tab buttons
            document.querySelectorAll('.audit-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            buttonElement.classList.add('active');
        }

        // Toggle Audit Group Collapse/Expand
        function toggleAuditGroup(headerElement) {
            const chevron = headerElement.querySelector('i[data-lucide="chevron-down"]');
            const content = headerElement.nextElementSibling;

            if (content && content.classList.contains('audit-group-content')) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    headerElement.classList.remove('collapsed');
                    if (chevron) chevron.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    headerElement.classList.add('collapsed');
                    if (chevron) chevron.style.transform = 'rotate(-90deg)';
                }
            }
        }

        // ============================================
        // WORK PACKAGES FUNCTIONALITY
        // ============================================

        // Tab switching for Work Packages
        document.querySelectorAll('.wp-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // Remove active class from all tabs
                document.querySelectorAll('.wp-tab').forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all views
                document.querySelectorAll('.wp-view').forEach(view => view.classList.remove('active'));

                // Show selected view
                const viewId = tabName + '-view';
                const view = document.getElementById(viewId);
                if (view) {
                    view.classList.add('active');
                }
            });
        });

        // Toggle Epic
        window.toggleEpic = function(element) {
            const header = element;
            const content = header.nextElementSibling;

            header.classList.toggle('collapsed');
            if (content && content.classList.contains('epic-content')) {
                content.style.display = content.style.display === 'none' ? 'flex' : 'none';
            }
        };

        // Toggle Feature
        window.toggleFeature = function(element) {
            const header = element;
            const content = header.nextElementSibling;

            header.classList.toggle('collapsed');
            if (content && content.classList.contains('feature-content')) {
                content.style.display = content.style.display === 'none' ? 'flex' : 'none';
            }
        };

        // Toggle Story
        window.toggleStory = function(element) {
            const header = element;
            const content = header.nextElementSibling;

            header.classList.toggle('collapsed');
            if (content && content.classList.contains('story-content')) {
                content.style.display = content.style.display === 'none' ? 'flex' : 'none';
            }
        };

        // Open work item detail modal
        window.openWorkItemDetail = function(itemId, itemTitle, itemType) {
            const modal = document.getElementById('workItemDetailModal');
            if (modal) {
                // Update modal content based on item
                const header = modal.querySelector('.modal-header h3');
                const typeSpan = modal.querySelector('.modal-header span');
                if (header) {
                    header.textContent = itemTitle;
                }
                if (typeSpan) {
                    typeSpan.textContent = itemType.toUpperCase();
                }
                modal.classList.add('active');
            }
        };

        // Close modal function
        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
        };

        // Close modal when clicking overlay
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal-overlay')) {
                event.target.classList.remove('active');
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });

        // Theme Toggle Function
        window.toggleTheme = function() {
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const icon = themeToggle.querySelector('i');

            // Toggle light/dark theme
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                // Update icon to sun (for dark mode)
                icon.setAttribute('data-lucide', 'sun');
            } else {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                // Update icon to moon (for light mode)
                icon.setAttribute('data-lucide', 'moon');
            }

            // Re-initialize icons
            lucide.createIcons();
        };

        // Load theme preference on page load
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const icon = themeToggle.querySelector('i');

            if (savedTheme === 'light') {
                body.classList.add('light-theme');
                icon.setAttribute('data-lucide', 'moon');
            } else {
                body.classList.remove('light-theme');
                icon.setAttribute('data-lucide', 'sun');
            }

            lucide.createIcons();
        });

        // Console welcome message
        console.log('%cMOB - Managerial Orchestration Board', 'font-size: 20px; font-weight: bold; color: #6366f1;');
        console.log('%cEnterprise AI Agent Management Platform', 'font-size: 14px; color: #a1a1aa;');
        console.log('%cDemo Version - All data is mocked', 'font-size: 12px; color: #71717a;');
