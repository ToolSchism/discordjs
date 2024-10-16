tailwind.config = {
    theme: {
        extend: {
            colors: {
                blurple: '#5865F2',
                darkBlurple: '#4752C4',
                discordDark: '#36393f',
                discordDarker: '#2f3136',
                discordDarkest: '#202225',
            },
        },
    },
}

const sections = {
    setup: `
        <h2 class="text-2xl font-bold mb-4">Setting Up Your Development Environment</h2>
        <!-- ... (rest of the section content) ... -->
    `,
    // ... (other sections remain the same) ...
};

function createSectionLinks() {
    const sectionList = document.getElementById('section-list');
    for (const sectionKey in sections) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = sectionKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        link.classList.add('section-link');
        link.href = `#${sectionKey}`;
        link.onclick = (e) => {
            e.preventDefault();
            showSection(sectionKey);
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        };
        listItem.appendChild(link);
        sectionList.appendChild(listItem);
    }
}

function showSection(sectionName) {
    const overlay = document.getElementById('section-overlay');
    const sectionContent = document.getElementById('section-content');
    sectionContent.innerHTML = sections[sectionName];
    overlay.classList.remove('hidden');
    Prism.highlightAll();
    history.pushState(null, '', `#${sectionName}`);
}

function closeSection() {
    const overlay = document.getElementById('section-overlay');
    overlay.classList.add('hidden');
    history.pushState(null, '', window.location.pathname);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    createSectionLinks();

    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', toggleSidebar);

    const sidebarOverlay = document.getElementById('sidebar-overlay');
    sidebarOverlay.addEventListener('click', toggleSidebar);

    const closeButton = document.getElementById('close-section');
    closeButton.addEventListener('click', closeSection);

    const sectionOverlay = document.getElementById('section-overlay');
    sectionOverlay.addEventListener('click', (event) => {
        if (event.target === sectionOverlay) {
            closeSection();
        }
    });

    const hash = window.location.hash.substring(1);
    if (hash && sections[hash]) {
        showSection(hash);
    }
});

// Highlight code blocks
Prism.highlightAll();
