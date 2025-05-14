// Society Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Society Data - Replace with actual data
  const societyData = [
    {
      id: 1,
      name: "Science Society",
      category: "academic",
      description: "Exploring scientific concepts through experiments and discussions",
      image: "https://picsum.photos/id/1011/600/400",
      members: 45,
      established: "2010",
      achievements: "National Science Competition Winners 2023"
    },
    {
      id: 2,
      name: "Literary Club",
      category: "cultural",
      description: "Fostering creativity through writing and literary appreciation",
      image: "https://picsum.photos/id/1012/600/400",
      members: 30,
      established: "2012",
      achievements: "Published school anthology 'Creative Minds'"
    },
    {
      id: 3,
      name: "Sports Club",
      category: "sports",
      description: "Promoting physical fitness and sportsmanship",
      image: "https://picsum.photos/id/1013/600/400",
      members: 60,
      established: "2008",
      achievements: "District Cricket Champions 2024"
    },
    {
      id: 4,
      name: "Art Society",
      category: "cultural",
      description: "Exploring various art forms and techniques",
      image: "https://picsum.photos/id/1014/600/400",
      members: 25,
      established: "2015",
      achievements: "National Art Exhibition Participants"
    },
    {
      id: 5,
      name: "Robotics Club",
      category: "academic",
      description: "Building and programming robots for competitions",
      image: "https://picsum.photos/id/1015/600/400",
      members: 20,
      established: "2018",
      achievements: "Regional Robotics Challenge Finalists"
    },
    {
      id: 6,
      name: "Environmental Club",
      category: "service",
      description: "Working towards a sustainable environment through awareness and action",
      image: "https://picsum.photos/id/1016/600/400",
      members: 35,
      established: "2014",
      achievements: "School Garden Project Implementation"
    },
    {
      id: 7,
      name: "Debate Club",
      category: "academic",
      description: "Developing critical thinking and public speaking skills",
      image: "https://picsum.photos/id/1017/600/400",
      members: 22,
      established: "2016",
      achievements: "Inter-School Debate Competition Winners"
    },
    {
      id: 8,
      name: "Music Society",
      category: "cultural",
      description: "Exploring musical talents through various instruments and vocals",
      image: "https://picsum.photos/id/1018/600/400",
      members: 28,
      established: "2011",
      achievements: "Annual Cultural Show Performances"
    },
    {
      id: 9,
      name: "Community Service Club",
      category: "service",
      description: "Engaging in community service projects to help those in need",
      image: "https://picsum.photos/id/1019/600/400",
      members: 40,
      established: "2013",
      achievements: "Organized Annual Charity Drive"
    }
  ];

  // Function to render society cards
  function renderSocieties(category = 'all') {
    const societyGrid = document.getElementById('societyGrid');
    if (!societyGrid) return;
    
    societyGrid.innerHTML = '';

    const filteredSocieties = category === 'all' 
      ? societyData 
      : societyData.filter(society => society.category === category);

    filteredSocieties.forEach(society => {
      const card = document.createElement('div');
      card.className = 'society-card glassmorphism hover-zoom';
      card.innerHTML = `
        <div class="card-header relative overflow-hidden rounded-t-xl">
          <img src="${society.image}" alt="${society.name}" class="w-full h-auto object-cover" />
          <div class="category-badge badge-${society.category}">${capitalizeFirstLetter(society.category)}</div>
        </div>
        <div class="card-body p-4">
          <h3 class="text-lg font-semibold mb-2">${society.name}</h3>
          <p class="text-sm text-gray-300 mb-3">${society.description}</p>
          <div class="flex justify-between text-xs text-gray-400">
            <span><i class="fas fa-users mr-1"></i> ${society.members} members</span>
            <span><i class="fas fa-calendar-alt mr-1"></i> Est. ${society.established}</span>
          </div>
          <div class="mt-4 pt-3 border-t border-gray-700">
            <p class="text-xs font-medium"><i class="fas fa-trophy text-yellow-500 mr-1"></i> ${society.achievements}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openSocietyModal(society));
      societyGrid.appendChild(card);
    });

    // Animate cards on scroll
    animateCardsOnScroll();
  }

  // Function to open society details modal
  function openSocietyModal(society) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md';
    modal.innerHTML = `
      <div class="relative w-full max-w-2xl bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div class="relative h-48 md:h-64 overflow-hidden">
          <img src="${society.image}" alt="${society.name}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <span class="category-badge badge-${society.category}">${capitalizeFirstLetter(society.category)}</span>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">${society.name}</h2>
          <p class="text-gray-300 mb-4">${society.description}</p>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-gray-800 p-3 rounded-lg">
              <h3 class="text-sm font-semibold text-gray-400">Members</h3>
              <p class="text-xl font-bold">${society.members}</p>
            </div>
            <div class="bg-gray-800 p-3 rounded-lg">
              <h3 class="text-sm font-semibold text-gray-400">Established</h3>
              <p class="text-xl font-bold">${society.established}</p>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 class="text-sm font-semibold text-gray-400 mb-2">Achievements</h3>
            <p class="text-sm">${society.achievements}</p>
          </div>
          
          <div class="flex justify-between">
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <i class="fas fa-user-plus mr-2"></i>Join Society
            </button>
            <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              Close
            </button>
          </div>
        </div>
        <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-white hover:text-red-400 text-2xl bg-black/50 w-8 h-8 rounded-full flex items-center justify-center">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Filter buttons functionality
  function setupFilters() {
    const filterButtons = document.querySelectorAll('.society-filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Render societies based on selected category
        renderSocieties(btn.getAttribute('data-category'));
      });
    });

    // Mobile filter dropdown
    const mobileFilter = document.querySelector('.mobile-filter-dropdown');
    if (mobileFilter) {
      mobileFilter.addEventListener('change', e => {
        renderSocieties(e.target.value);
      });
    }
  }

  // GSAP Animations
  function animateCardsOnScroll() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Clear any existing animations first
      gsap.killTweensOf('.society-card');
      
      // Set all cards to visible immediately to prevent flashing
      const allCards = document.querySelectorAll('.society-card');
      allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.visibility = 'visible';
      });
      
      // Use a short timeout to ensure DOM is ready
      setTimeout(() => {
        const cards = gsap.utils.toArray('.society-card');
        if (cards.length > 0) {
          // Create a timeline for better control
          const tl = gsap.timeline({
            defaults: {
              ease: "power2.out",
              duration: 0.4
            }
          });
          
          // Add each card to the timeline with stagger
          tl.to(cards, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            clearProps: "transform", // Clean up transform after animation
            scrollTrigger: {
              trigger: '#societyGrid',
              start: 'top 85%',
              toggleActions: 'play none none reset' // Reset on scroll out
            }
          });
        }
      }, 50); // Shorter delay for better responsiveness
    }
  }

  // Initialize
  function init() {
    renderSocieties();
    // Ensure filters are set up before animation
    setTimeout(() => {
    setupFilters();
    animateCardsOnScroll();
    }, 50);
  }

  // Run initialization
  init();
});