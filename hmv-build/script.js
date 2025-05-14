document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuButton || !mobileMenu) {
        console.error('Mobile menu elements not found!');
        return;
    }

    // Toggle mobile menu visibility
    mobileMenuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        
        // Toggle menu state
        const isOpen = !mobileMenu.classList.contains('pointer-events-none');
        
        if (isOpen) {
            // Close menu
            mobileMenu.classList.add('pointer-events-none', 'opacity-0', 'scale-y-0');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        } else {
            // Open menu
            mobileMenu.classList.remove('pointer-events-none', 'opacity-0', 'scale-y-0');
            mobileMenuButton.querySelector('i').classList.remove('fa-bars');
            mobileMenuButton.querySelector('i').classList.add('fa-times');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('pointer-events-none', 'opacity-0', 'scale-y-0');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        }
    });

    // Close menu when clicking menu items
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('pointer-events-none', 'opacity-0', 'scale-y-0');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });
});
