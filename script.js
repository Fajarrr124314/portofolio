/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSkillsChart();
    initNavbar();
    initScrollAnimations();
    initPortfolioScroll();
    initPortfolioFilters();
});

/* ==========================================================================
   1. NAVBAR & MOBLE MENU LOGIC
   ========================================================================== */

function initNavbar() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll background change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Dynamic link activation on scroll
        let currentSectionId = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

/* ==========================================================================
   2. INTERACTIVE SKILL CHART (CHART.JS)
   ========================================================================== */

let skillsChartInstance = null;

function initSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isDark = document.body.classList.contains('dark-theme');
    
    // Choose colors based on theme
    const labelColor = isDark ? '#a4a7c6' : '#5a5d7c';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(108, 92, 231, 0.08)';
    const tickColor = isDark ? '#6b6e8d' : '#8e92bc';
    const angleColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(108, 92, 231, 0.15)';
    
    // Skill metrics
    const data = {
        labels: [
            'Frontend Dev',
            'Backend Dev',
            'UI/UX Design',
            'Database Management',
            'Data Analytics',
            'Problem Solving'
        ],
        datasets: [{
            label: 'Tingkat Kemampuan (%)',
            data: [88, 80, 84, 82, 76, 92],
            backgroundColor: 'rgba(108, 92, 231, 0.2)', // Accent purple transparent
            borderColor: 'rgba(108, 92, 231, 0.8)',     // Accent purple border
            borderWidth: 2,
            pointBackgroundColor: '#00cec9',            // Cyan point centers
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#6c5ce7',
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    // Configuration options for Space Light Theme
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide default legend
                },
                tooltip: {
                    backgroundColor: 'rgba(25, 25, 50, 0.8)',
                    titleFont: {
                        family: 'Space Grotesk',
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Outfit',
                        size: 12
                    },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: angleColor
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: labelColor,
                        font: {
                            family: 'Space Grotesk',
                            size: 11,
                            weight: '600'
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: tickColor,
                        font: {
                            family: 'Outfit',
                            size: 9
                        },
                        stepSize: 20
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    };

    skillsChartInstance = new Chart(ctx, config);
}

/* ==========================================================================
   3. SCROLL-BASED ENTRANCE ANIMATIONS
   ========================================================================== */

function initScrollAnimations() {
    const animElements = document.querySelectorAll('.animate-init');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-play');
                }, delay);
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. PORTFOLIO SCROLL NAVIGATION
   ========================================================================== */

function initPortfolioScroll() {
    const container = document.getElementById('portfolioScroll');
    const prevBtn = document.querySelector('.scroll-prev');
    const nextBtn = document.querySelector('.scroll-next');

    if (!container || !prevBtn || !nextBtn) return;

    // Scroll step width matching card size + gap
    const scrollStep = 390; 

    nextBtn.addEventListener('click', () => {
        container.scrollBy({
            left: scrollStep,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollStep,
            behavior: 'smooth'
        });
    });

    // Monitor scroll to enable/disable navigation buttons
    const updateButtonsState = () => {
        const isAtStart = container.scrollLeft <= 10;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        
        prevBtn.style.opacity = isAtStart ? '0.4' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextBtn.style.opacity = isAtEnd ? '0.4' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    };

    container.addEventListener('scroll', updateButtonsState);
    window.addEventListener('resize', updateButtonsState);
    
    // Initial check
    setTimeout(updateButtonsState, 200);
}

/* ==========================================================================
   5. PORTFOLIO CATEGORY FILTER TAB LOGIC
   ========================================================================== */

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    const container = document.getElementById('portfolioScroll');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filters and add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });

            // Smooth scroll back to start of gallery when filtering
            if (container) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            }
        });
    });
}

/* ==========================================================================
   6. PORTFOLIO DETAILED MULTI-IMAGE CAROUSEL MODAL DATA & FUNCTIONS
   ========================================================================== */

// Detailed descriptions and features for the projects
const projectData = {
    warkop: {
        title: "Warung Kopi Pendopo",
        category: "Web UMKM & Landing Page",
        description: "Warung Kopi Pendopo adalah sebuah platform digital (landing page) yang didesain khusus untuk mendukung digitalisasi UMKM kedai kopi tradisional di Telagasari, Karawang. Platform ini menyajikan perpaduan estetika tradisional dan modern, memudahkan pelanggan melihat menu andalan, suasana tempat, serta melakukan reservasi secara langsung.",
        images: [
            "public/images/project kopi 1.png",
            "public/images/project kopi 2.png",
            "public/images/project kopi 3.png",
            "public/images/project kopi 4.png"
        ],
        features: [
            "WhatsApp Ordering Integration: Memudahkan pemesanan menu makanan/minuman secara langsung ke admin warkop.",
            "Live Booking System: Form terintegrasi untuk memesan tempat duduk/meja secara online.",
            "Interactive Menu Catalog: Menampilkan menu makanan berat, cemilan, dan kopi Nusantara dengan harga detail.",
            "Responsive Suasana Gallery: Koleksi foto suasana kedai pendopo tradisional yang nyaman dengan grid responsif.",
            "Google Maps & Contact: Peta penunjuk jalan interaktif untuk mempermudah navigasi pembeli ke lokasi."
        ],
        tech: ["HTML5", "CSS3", "Vanilla JS", "WhatsApp API", "Responsive Grid"]
    },
    yogya: {
        title: "Yogya Fresh System Pro",
        category: "Sistem POS & Retail Labeling",
        description: "Yogya Fresh System Pro adalah sistem portal administrator berbasis web yang dirancang khusus untuk mengelola data harga, informasi kualitas, dan cetak label produk segar (seperti daging, sayur, buah, dan ikan) di Yogya Supermarket. Sistem ini membantu menyelaraskan data harga gudang dengan label fisik secara real-time.",
        images: [
            "public/images/project pos 1.png",
            "public/images/project pos 2.png",
            "public/images/project pos 3.png"
        ],
        features: [
            "Secure Access Portal: Login terenkripsi khusus untuk staf administrator dan operator retail.",
            "Dynamic Label Barcode Generator: Mencetak label produk segar lengkap dengan nama, kode SKU, berat, tanggal kemas, dan barcode.",
            "Inventory Database Management: Panel CRUD (Create, Read, Update, Delete) data produk segar supermarket.",
            "Real-time Price Synchronization: Update harga jual harian untuk mencegah perbedaan harga kasir dengan etalase.",
            "Print Queue Logs: Catatan histori aktivitas cetak label oleh operator."
        ],
        tech: ["POS Integration", "Barcode System", "Security Access", "Database Design", "Web Portal"]
    },
    vieroku: {
        title: "Vie Roku Management Career Platform",
        category: "Sistem Rekrutmen & Pelatihan",
        description: "Vie Roku Management Careers Portal adalah platform pencarian kerja terpadu dan manajemen pelatihan profesional. Platform ini dikembangkan untuk memfasilitasi pencari kerja dalam menemukan lowongan, mendaftar ke komunitas member, serta mengikuti program peningkatan karir (training class).",
        images: [
            "public/images/project rekrut 1.png",
            "public/images/project rekrut 2.png",
            "public/images/project rekrut 3.png"
        ],
        features: [
            "Job Vacancy Directory: Antarmuka filter pencarian lowongan kerja berdasarkan posisi dan keahlian.",
            "Member Registration System: Pendaftaran terintegrasi menjadi member resmi untuk mendapatkan info karir eksklusif.",
            "Professional Training Modules: Katalog program pelatihan bersertifikat dari Vie Roku Management.",
            "Application Tracking Status: Halaman ringkasan lamaran bagi pencari kerja untuk memantau status seleksi.",
            "Admin Recruitment Board: Panel admin untuk memposting info lowongan kerja dan mengelola data pelamar."
        ],
        tech: ["Job Portal", "Membership System", "PHP", "MySQL", "CSS Grid & Flexbox"]
    },
    zslaw: {
        title: "ZS Law Firm & Associate Digital Portal",
        category: "Portal Hukum (Legal Tech)",
        description: "ZS Law Firm & Associate Digital Portal (berlabel 'Future Legal') merupakan platform teknologi hukum (Legal Tech) modern yang menyatukan klien dengan pengacara profesional secara virtual. Melalui portal ini, klien dapat melakukan konsultasi hukum, membuat janji temu, serta mengelola dokumen hukum.",
        images: [
            "public/images/legal 1.png",
            "public/images/legal 2.png",
            "public/images/legal 3.png",
            "public/images/legal 4.png",
            "public/images/legal 5.png"
        ],
        features: [
            "Online Case Consultation Form: Memudahkan klien mengajukan analisis awal kasus hukum mereka.",
            "Lawyer Scheduling Calendar: Sistem pemesanan jadwal tatap muka/telekonsultasi bersama partner pengacara.",
            "Legal Drafting Module: Manajemen pengunggahan dan revisi draf surat perjanjian atau dokumen legalitas.",
            "Premium Dark & Light UI Toggle: Antarmuka premium dengan transisi warna halus untuk kenyamanan membaca berkas hukum.",
            "Law Firm Admin Board: Kelola portofolio pengacara, bidang keahlian hukum, dan detail tagihan klien."
        ],
        tech: ["Tailwind CSS", "Legal Tech Features", "Interactive Theme Toggle", "Admin Dashboard"]
    },
    smartats: {
        title: "Smart ATS Portal - PT Indonesia",
        category: "Sistem ATS (Ongoing Project)",
        description: "Smart ATS (Applicant Tracking System) Portal adalah aplikasi web HR tingkat lanjut untuk PT Indonesia. Dilengkapi fitur AI Smart Screening untuk menyaring berkas CV pelamar secara otomatis. HRD dapat memantau pergerakan pelamar kerja melalui pipeline visual papan Kanban yang interaktif.",
        images: [
            "public/images/kategori sedang dikerjakan 1.png",
            "public/images/kategori sedang dikerjakan 2.png",
            "public/images/kategori sedang dikerjakan 3.png",
            "public/images/kategori sedang dikerjakan 4.png",
            "public/images/kategori sedang dikerjakan 5.png",
            "public/images/kategori sedang dikerjakan 6.png",
            "public/images/kategori sedang dikerjakan 7.png",
            "public/images/kategori sedang dikerjakan 8.png",
            "public/images/kategori sedang dikerjakan 9.png",
            "public/images/kategori sedang dikerjakan 10.png"
        ],
        features: [
            "AI Smart Screening & Matching: Secara otomatis menghitung persentase kecocokan CV pelamar dengan kualifikasi pekerjaan.",
            "HR Recruitment Kanban Board: Papan visual drag-and-drop/klik status pelamar (Administrasi, Psikotes, Interview, MCU, Hired, Rejected).",
            "Comprehensive HR Analytics Dashboard: Rekap real-time total pelamar harian/bulanan, rasio penerimaan (acceptance/rejection rates).",
            "Candidate Detailed Review Page: Memeriksa berkas CV, sertifikat, dan menginput nilai tes seleksi pelamar secara terpadu.",
            "Activity Logs: Riwayat operasional recruiter (seperti Fajar NF - Admin HRD) untuk menjaga transparansi proses seleksi."
        ],
        tech: ["Node.js", "AI CV Screening", "Kanban Logic", "HR Analytics", "SQL Database"]
    }
};

let currentProjectKey = '';
let activeSlideIndex = 0;
let modalImagesCount = 0;

function openProjectModal(projectKey) {
    const project = projectData[projectKey];
    if (!project) return;

    currentProjectKey = projectKey;
    activeSlideIndex = 0;
    modalImagesCount = project.images.length;

    // Set text elements
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalDescription').textContent = project.description;

    // Inject features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    project.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        featuresList.appendChild(li);
    });

    // Inject tech tags
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.tech.forEach(t => {
        const span = document.createElement('span');
        span.textContent = t;
        techContainer.appendChild(span);
    });

    // Inject slides in Carousel
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = '';
    project.images.forEach((imgSrc, idx) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${project.title} Screenshot ${idx + 1}`;
        // Prevent lazy loading delay during user viewing
        img.loading = "eager";
        
        slide.appendChild(img);
        carouselTrack.appendChild(slide);
    });

    // Inject indicators (dots)
    const dotsContainer = document.getElementById('carouselDots');
    dotsContainer.innerHTML = '';
    project.images.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });

    // Configure Navigation Buttons
    updateCarouselButtons();

    // Show Modal
    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock main scroll

    // Attach keyboard listener
    document.addEventListener('keydown', handleModalKeys);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock main scroll
    
    // Remove keyboard listener to free memory
    document.removeEventListener('keydown', handleModalKeys);
}

function goToSlide(index) {
    if (index < 0 || index >= modalImagesCount) return;
    
    activeSlideIndex = index;
    
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${activeSlideIndex * 100}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
        if (idx === activeSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    updateCarouselButtons();
}

function nextSlide() {
    if (activeSlideIndex < modalImagesCount - 1) {
        goToSlide(activeSlideIndex + 1);
    } else {
        goToSlide(0); // Loop back to start
    }
}

function prevSlide() {
    if (activeSlideIndex > 0) {
        goToSlide(activeSlideIndex - 1);
    } else {
        goToSlide(modalImagesCount - 1); // Loop to end
    }
}

function updateCarouselButtons() {
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    
    if (!prevBtn || !nextBtn) return;
    
    // Wire up events
    prevBtn.onclick = prevSlide;
    nextBtn.onclick = nextSlide;
}

function handleModalKeys(e) {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'Escape') {
        closeProjectModal();
    }
}

// Global scopes for inline HTML onclick attributes
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

/* ==========================================================================
   7. CERTIFICATE LIGHTBOX LOGIC
   ========================================================================== */

const certificateData = [
    {
        src: "public/images/Sertifikat Juara Respective Fest Vol.1 - Universitas Brawijaya_page-0001.jpg",
        caption: "Juara Respective Fest Vol.1 - Universitas Brawijaya (Halaman Utama)"
    },
    {
        src: "public/images/2Sertifikat Juara Respective Fest Vol.1 - Universitas Brawijaya (1)_page-0001.jpg",
        caption: "Sertifikat Penghargaan Respective Fest Vol.1 - Universitas Brawijaya (Halaman Lampiran)"
    }
];

function openCertLightbox(index) {
    const cert = certificateData[index];
    if (!cert) return;

    const lightbox = document.getElementById('certLightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    img.src = cert.src;
    caption.textContent = cert.caption;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleLightboxKeys);
}

function closeCertLightbox() {
    const lightbox = document.getElementById('certLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleLightboxKeys);
}

function handleLightboxKeys(e) {
    if (e.key === 'Escape') {
        closeCertLightbox();
    }
}

window.openCertLightbox = openCertLightbox;
window.closeCertLightbox = closeCertLightbox;

/* ==========================================================================
   8. CONTACT FORM SIMULATION HANDLING
   ========================================================================== */

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Change button state to loading
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim Pesan...';
    submitBtn.disabled = true;
    
    // Simulate network delay for premium feel
    setTimeout(() => {
        status.className = "form-status success animate-init animate-play";
        status.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pesan terkirim! Terima kasih telah menghubungi Fajar. Pesan Anda akan dibalas sesegera mungkin.';
        
        // Reset form
        form.reset();
        
        // Restore button state
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        
        // Auto scroll status into view
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 7 seconds
        setTimeout(() => {
            status.style.display = 'none';
        }, 7000);
        
    }, 1500);
}

window.handleFormSubmit = handleFormSubmit;

/* ==========================================================================
   9. DARK / LIGHT MODE SWITCHER LOGIC
   ========================================================================== */

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;
    
    const icon = themeToggleBtn.querySelector('i');
    
    // Check localStorage or device system theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDarkDefault = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    if (isDarkDefault) {
        document.body.classList.add('dark-theme');
        icon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('dark-theme');
        icon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        
        // Persist theme choice
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update toggle icon
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        
        // Update Chart colors
        updateChartTheme(isDark);
    });
}

function updateChartTheme(isDark) {
    if (!skillsChartInstance) return;
    
    const rScale = skillsChartInstance.options.scales.r;
    
    if (isDark) {
        rScale.pointLabels.color = '#a4a7c6';
        rScale.grid.color = 'rgba(255, 255, 255, 0.06)';
        rScale.ticks.color = '#6b6e8d';
        rScale.angleLines.color = 'rgba(255, 255, 255, 0.1)';
    } else {
        rScale.pointLabels.color = '#5a5d7c';
        rScale.grid.color = 'rgba(108, 92, 231, 0.08)';
        rScale.ticks.color = '#8e92bc';
        rScale.angleLines.color = 'rgba(108, 92, 231, 0.15)';
    }
    
    skillsChartInstance.update();
}
