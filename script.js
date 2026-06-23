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
    initTypewriter();
    initProjectCardEffects();
    initGitHubStats();
    initAnalyticsDashboard();
    initAccentPicker();
    initGeoGreeting();
    fetchNasaApod();
    init3DTagCloud();
});

/* ==========================================================================
   1. NAVBAR & MOBLE MENU LOGIC
   ========================================================================== */

function initNavbar() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll background change (passive event listener for better performance)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Dynamic link activation using IntersectionObserver (highly optimized, prevents layout thrashing)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.getAttribute('id');
                if (currentSectionId) {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${currentSectionId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
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

/// Detailed descriptions and features for the projects
const projectData = {
    warkop: {
        title: "Warung Kopi Pendopo",
        category: "Web UMKM & Landing Page",
        description: "Warung Kopi Pendopo adalah sebuah platform digital (landing page) yang didesain khusus untuk mendukung digitalisasi UMKM kedai kopi tradisional di Telagasari, Karawang. Platform ini menyajikan perpaduan estetika tradisional dan modern, memudahkan pelanggan melihat menu andalan, suasana tempat, serta melakukan reservasi secara langsung.",
        images: [
            "public/images/project kopi 1.webp",
            "public/images/project kopi 2.webp",
            "public/images/project kopi 3.webp",
            "public/images/project kopi 4.webp"
        ],
        features: [
            "WhatsApp Ordering Integration: Memudahkan pemesanan menu makanan/minuman secara langsung ke admin warkop.",
            "Live Booking System: Form terintegrasi untuk memesan tempat duduk/meja secara online.",
            "Interactive Menu Catalog: Menampilkan menu makanan berat, cemilan, dan kopi Nusantara dengan harga detail.",
            "Responsive Suasana Gallery: Koleksi foto suasana kedai pendopo tradisional yang nyaman dengan grid responsif.",
            "Google Maps & Contact: Peta penunjuk jalan interaktif untuk mempermudah navigasi pembeli ke lokasi."
        ],
        tech: ["HTML5", "CSS3", "Vanilla JS", "WhatsApp API", "Responsive Grid"],
        demoLink: "https://wa.me/62895806317711",
        repoLink: "https://github.com/Fajarrr124314/warkop-pendopo"
    },
    yogya: {
        title: "Yogya Fresh System Pro",
        category: "Sistem POS & Retail Labeling",
        description: "Yogya Fresh System Pro adalah sistem portal administrator berbasis web yang dirancang khusus untuk mengelola data harga, informasi kualitas, dan cetak label produk segar (seperti daging, sayur, buah, dan ikan) di Yogya Supermarket. Sistem ini membantu menyelaraskan data harga gudang dengan label fisik secara real-time.",
        images: [
            "public/images/project pos 1.webp",
            "public/images/project pos 2.webp",
            "public/images/project pos 3.webp"
        ],
        features: [
            "Secure Access Portal: Login terenkripsi khusus untuk staf administrator and operator retail.",
            "Dynamic Label Barcode Generator: Mencetak label produk segar lengkap dengan nama, kode SKU, berat, tanggal kemas, dan barcode.",
            "Inventory Database Management: Panel CRUD (Create, Read, Update, Delete) data produk segar supermarket.",
            "Real-time Price Synchronization: Update harga jual harian untuk mencegah perbedaan harga kasir dengan etalase.",
            "Print Queue Logs: Catatan histori aktivitas cetak label oleh operator."
        ],
        tech: ["POS Integration", "Barcode System", "Security Access", "Database Design", "Web Portal"],
        demoLink: "",
        repoLink: "https://github.com/Fajarrr124314/yogya-fresh-system-pro"
    },
    vieroku: {
        title: "Vie Roku Management Career Platform",
        category: "Sistem Rekrutmen & Pelatihan",
        description: "Vie Roku Management Careers Portal adalah platform pencarian kerja terpadu dan manajemen pelatihan profesional. Platform ini dikembangkan untuk memfasilitasi pencari kerja dalam menemukan lowongan, mendaftar ke komunitas member, serta mengikuti program peningkatan karir (training class).",
        images: [
            "public/images/project rekrut 1.webp",
            "public/images/project rekrut 2.webp",
            "public/images/project rekrut 3.webp"
        ],
        features: [
            "Job Vacancy Directory: Antarmuka filter pencarian lowongan kerja berdasarkan posisi dan keahlian.",
            "Member Registration System: Pendaftaran terintegrasi menjadi member resmi untuk mendapatkan info karir eksklusif.",
            "Professional Training Modules: Katalog program pelatihan bersertifikat dari Vie Roku Management.",
            "Application Tracking Status: Halaman ringkasan lamaran bagi pencari kerja untuk memantau status seleksi.",
            "Admin Recruitment Board: Panel admin untuk memposting info lowongan kerja dan mengelola data pelamar."
        ],
        tech: ["Job Portal", "Membership System", "PHP", "MySQL", "CSS Grid & Flexbox"],
        demoLink: "",
        repoLink: "https://github.com/Fajarrr124314/vieroku-management"
    },
    zslaw: {
        title: "ZS Law Firm & Associate Digital Portal",
        category: "Portal Hukum (Legal Tech)",
        description: "ZS Law Firm & Associate Digital Portal (berlabel 'Future Legal') merupakan platform teknologi hukum (Legal Tech) modern yang menyatukan klien dengan pengacara profesional secara virtual. Melalui portal ini, klien dapat melakukan konsultasi hukum, membuat janji temu, serta mengelola dokumen hukum.",
        images: [
            "public/images/legal 1.webp",
            "public/images/legal 2.webp",
            "public/images/legal 3.webp",
            "public/images/legal 4.webp",
            "public/images/legal 5.webp"
        ],
        features: [
            "Online Case Case Consultation Form: Memudahkan klien mengajukan analisis awal kasus hukum mereka.",
            "Lawyer Scheduling Calendar: Sistem pemesanan jadwal tatap muka/telekonsultasi bersama partner pengacara.",
            "Legal Drafting Module: Manajemen pengunggahan dan revisi draf surat perjanjian atau dokumen legalitas.",
            "Premium Dark & Light UI Toggle: Antarmuka premium dengan transisi warna halus untuk kenyamanan membaca berkas hukum.",
            "Law Firm Admin Board: Kelola portofolio pengacara, bidang keahlian hukum, dan detail tagihan klien."
        ],
        tech: ["Tailwind CSS", "Legal Tech Features", "Interactive Theme Toggle", "Admin Dashboard"],
        demoLink: "https://fajarrr124314.github.io/zslawfirm",
        repoLink: "https://github.com/Fajarrr124314/zslawfirm"
    },
    smartats: {
        title: "Smart ATS Portal - PT Indonesia",
        category: "Sistem ATS (Ongoing Project)",
        description: "Smart ATS (Applicant Tracking System) Portal adalah aplikasi web HR tingkat lanjut untuk PT Indonesia. Dilengkapi fitur AI Smart Screening untuk menyaring berkas CV pelamar secara otomatis. HRD dapat memantau pergerakan pelamar kerja melalui pipeline visual papan Kanban yang interaktif.",
        images: [
            "public/images/kategori sedang dikerjakan 1.webp",
            "public/images/kategori sedang dikerjakan 2.webp",
            "public/images/kategori sedang dikerjakan 3.webp",
            "public/images/kategori sedang dikerjakan 4.webp",
            "public/images/kategori sedang dikerjakan 5.webp",
            "public/images/kategori sedang dikerjakan 6.webp",
            "public/images/kategori sedang dikerjakan 7.webp",
            "public/images/kategori sedang dikerjakan 8.webp",
            "public/images/kategori sedang dikerjakan 9.webp",
            "public/images/kategori sedang dikerjakan 10.webp"
        ],
        features: [
            "AI Smart Screening & Matching: Secara otomatis menghitung persentase kecocokan CV pelamar dengan kualifikasi pekerjaan.",
            "HR Recruitment Kanban Board: Papan visual drag-and-drop/klik status pelamar (Administrasi, Psikotes, Interview, MCU, Hired, Rejected).",
            "Comprehensive HR Analytics Dashboard: Rekap real-time total pelamar harian/bulanan, rasio penerimaan (acceptance/rejection rates).",
            "Candidate Detailed Review Page: Memeriksa berkas CV, sertifikat, dan menginput nilai tes seleksi pelamar secara terpadu.",
            "Activity Logs: Riwayat operasional recruiter (seperti Fajar NF - Admin HRD) untuk menjaga transparansi proses seleksi."
        ],
        tech: ["Node.js", "AI CV Screening", "Kanban Logic", "HR Analytics", "SQL Database"],
        demoLink: "",
        repoLink: "https://github.com/Fajarrr124314/smart-ats"
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

    // Set Action Links (Live Demo & Source Code)
    const liveLinkBtn = document.getElementById('modalLiveLink');
    const repoLinkBtn = document.getElementById('modalRepoLink');

    if (project.demoLink) {
        liveLinkBtn.href = project.demoLink;
        liveLinkBtn.style.display = 'inline-flex';
    } else {
        liveLinkBtn.style.display = 'none';
    }

    if (project.repoLink) {
        repoLinkBtn.href = project.repoLink;
        repoLinkBtn.style.display = 'inline-flex';
    } else {
        repoLinkBtn.style.display = 'none';
    }

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
        src: "public/images/Sertifikat Juara Respective Fest Vol.1 - Universitas Brawijaya_page-0001.webp",
        caption: "Juara Respective Fest Vol.1 - Universitas Brawijaya (Halaman Utama)"
    },
    {
        src: "public/images/2Sertifikat Juara Respective Fest Vol.1 - Universitas Brawijaya (1)_page-0001.webp",
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
   8. CONTACT FORM SUBMIT HANDLING (WEB3FORMS INTEGRATION)
   ========================================================================== */

function handleFormSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('.btn-submit');

    // Ambil token Web3Forms
    const accessKeyInput = form.querySelector('input[name="access_key"]');
    const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

    // Change button state to loading
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim Pesan...';
    submitBtn.disabled = true;

    // Jika masih menggunakan placeholder, jalankan simulasi agar tidak error
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        setTimeout(() => {
            status.className = "form-status success animate-init animate-play";
            status.style.display = 'block';
            status.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Simulasi Sukses!</strong> Terima kasih telah menghubungi Fajar. Pesan Anda akan dibalas sesegera mungkin. <br><small style="opacity: 0.85;">(Catatan: Untuk pengiriman email asli, silakan ganti value access_key di index.html dengan key Web3Forms Anda)</small>';

            // Reset form
            form.reset();

            // Restore button state
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;

            // Auto scroll status into view
            status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hide message after 8 seconds
            setTimeout(() => {
                status.style.display = 'none';
            }, 8000);

        }, 1500);
    } else {
        // Pengiriman email asli ke Web3Forms API
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let jsonRes = await response.json();
                if (response.status == 200) {
                    status.className = "form-status success animate-init animate-play";
                    status.style.display = 'block';
                    status.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pesan asli terkirim! Terima kasih telah menghubungi Fajar. Pesan Anda akan segera dibalas.';
                    form.reset();
                } else {
                    status.className = "form-status error animate-init animate-play";
                    status.style.display = 'block';
                    status.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Gagal mengirim pesan: ${jsonRes.message || 'Terjadi kesalahan server.'}`;
                }
            })
            .catch(error => {
                console.error(error);
                status.className = "form-status error animate-init animate-play";
                status.style.display = 'block';
                status.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Terjadi kesalahan jaringan. Silakan periksa koneksi Anda dan coba lagi.';
            })
            .then(() => {
                // Restore button state
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide message after 8 seconds
                setTimeout(() => {
                    status.style.display = 'none';
                }, 8000);
            });
    }
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
    if (skillsChartInstance) {
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

    if (window.analyticsChartInstance) {
        const textColor = isDark ? '#a4a7c6' : '#5a5d7c';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(108, 92, 231, 0.06)';

        window.analyticsChartInstance.options.scales.x.ticks.color = textColor;
        window.analyticsChartInstance.options.scales.x.grid.color = gridColor;
        window.analyticsChartInstance.options.scales.y.ticks.color = textColor;
        window.analyticsChartInstance.options.scales.y.grid.color = gridColor;
        window.analyticsChartInstance.options.scales.y.title.color = textColor;

        window.analyticsChartInstance.update();
    }
}

/* ==========================================================================
   10. HERO TYPEWRITER DYNAMIC TEXT EFFECT
   ========================================================================== */

function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;

    const words = [
        "pengembangan web.",
        "analisis data.",
        "desain UI/UX.",
        "solusi teknologi inovatif."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Erase speed
        } else {
            target.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Type speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000); // Initial delay
}

/* ==========================================================================
   11. INTERACTIVE 3D TILT & MOUSE SPOTLIGHT GLOW ON PROJECT CARDS
   ========================================================================== */

function initProjectCardEffects() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS variables for spotlight glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate 3D tilt angle
            const width = rect.width;
            const height = rect.height;
            const centerX = width / 2;
            const centerY = height / 2;

            const mouseX = x - centerX;
            const mouseY = y - centerY;

            // Limit max rotation to 8 degrees for subtle/premium feel
            const maxRotation = 8;
            const rotateX = -((mouseY / centerY) * maxRotation).toFixed(2);
            const rotateY = ((mouseX / centerX) * maxRotation).toFixed(2);

            // Apply inline style with translateY (for hover lift) and rotateX/rotateY
            card.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset style properties to let CSS transition them back smoothly
            card.style.transform = '';
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });
}

/* ==========================================================================
   12. CV LIGHTBOX VIEW
   ========================================================================== */

function openCvLightbox() {
    const lightbox = document.getElementById('certLightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    if (!lightbox || !img || !caption) return;

    img.src = "public/images/CV_FajarNF_New.webp";
    caption.textContent = "Curriculum Vitae - Fajar Nur Farrijal";

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reuse the keyboard handler from certificate lightbox
    document.addEventListener('keydown', handleLightboxKeys);
}

window.openCvLightbox = openCvLightbox;

/* ==========================================================================
   13. INTERACTIVE JOURNEY TIMELINE LOGIC
   ========================================================================== */

const timelineData = {
    '2023': {
        title: "Mulai Pendidikan S1 Informatika",
        desc: "Memulai perjalanan akademis di jurusan S1 Informatika. Mempelajari fundamental ilmu komputer, pemrograman dasar, algoritma & struktur data, serta mengeksplorasi minat mendalam pada rekayasa perangkat lunak dan analisis data.",
        techs: ["S1 Informatika", "Fundamental CS", "Algoritma & Struktur Data"]
    },
    '2025': {
        title: "Platform Karir Vie Roku & Juara Respective Fest Vol.1",
        desc: "Membangun Vie Roku Management Career Platform (portal rekrutmen terpadu & membership). Pada tahun yang sama, berhasil menyabet gelar Juara Respective Fest Vol.1 di Universitas Brawijaya, memvalidasi skill kompetitif dan kerja sama tim dalam memecahkan masalah teknologi.",
        techs: ["Job Portal", "PHP / MySQL", "Kompetisi UI/UX", "Problem Solving"]
    },
    '2026': {
        title: "Sistem POS Yogya Fresh, Proyek ZA, & Smart ATS",
        desc: "Tahun produktif dalam merancang solusi nyata: Yogya Fresh System Pro (Sistem Labeling & POS retail), portal hukum modern Proyek ZA (ZS Law Firm), Warung Kopi Pendopo (Web UMKM & WhatsApp Ordering), serta sedang menyelesaikan Smart ATS (Applicant Tracking System dengan AI screening).",
        techs: ["Sistem POS", "Legal Tech", "Smart ATS", "Node.js & AI", "HTML/CSS/JS"]
    },
    '2027': {
        title: "Kelulusan S1 Informatika & Karir Profesional",
        desc: "Target kelulusan studi sarjana S1 Informatika dengan portofolio yang matang. Berfokus penuh untuk berkarir secara profesional sebagai Full-Stack Web Developer atau Data Analyst yang siap memberikan dampak positif lewat solusi perangkat lunak bernilai tinggi.",
        techs: ["Kelulusan S1", "Software Engineer", "Data Analyst", "Professional Career"]
    }
};

function selectTimelineYear(year) {
    const data = timelineData[year];
    if (!data) return;

    const nodes = document.querySelectorAll('.timeline-node');
    const card = document.getElementById('timelineDetailCard');
    const yearBadge = document.getElementById('timelineYearBadge');
    const title = document.getElementById('timelineDetailTitle');
    const desc = document.getElementById('timelineDetailDesc');
    const techsContainer = document.getElementById('timelineDetailTechs');

    if (!card || !yearBadge || !title || !desc || !techsContainer) return;

    // Update active node state
    nodes.forEach(node => {
        if (node.getAttribute('data-year') === year) {
            node.classList.add('active');
        } else {
            node.classList.remove('active');
        }
    });

    // Add animating fade-out effect
    card.classList.add('animating');

    setTimeout(() => {
        // Update content
        yearBadge.textContent = year;
        title.textContent = data.title;
        desc.textContent = data.desc;

        // Update tech tags
        techsContainer.innerHTML = '';
        data.techs.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techsContainer.appendChild(span);
        });

        // Fade-in animated card
        card.classList.remove('animating');
    }, 250);
}

// Export to window
window.selectTimelineYear = selectTimelineYear;

/* ==========================================================================
   14. GITHUB API LIVE STATS & DATA ANALYSIS DASHBOARD LOGIC
   ========================================================================== */

function showGitHubFallback() {
    const loading = document.getElementById('githubLoading');
    const content = document.getElementById('githubProfile');
    if (!loading || !content) return;

    // Set fallback data
    document.getElementById('ghAvatar').src = 'public/images/photos.webp';
    document.getElementById('ghName').textContent = 'Fajar Nur Farrijal';
    document.getElementById('ghBio').textContent = 'Mahasiswa Teknik Informatika | Web Developer & Data Analyst';
    document.getElementById('ghLink').href = 'https://github.com/Fajarrr124314';
    document.getElementById('ghRepos').textContent = '12';
    document.getElementById('ghFollowers').textContent = '10+';

    // Repos
    const reposList = document.getElementById('ghReposList');
    reposList.innerHTML = `
        <li>
            <a href="https://github.com/Fajarrr124314/smart-ats" target="_blank" class="gh-repo-link"><i class="fa-solid fa-folder-open"></i> smart-ats</a>
            <div class="gh-repo-meta">
                <span><span class="lang-dot" style="background-color: #f1e05a;"></span> JavaScript</span>
                <span><i class="fa-regular fa-star"></i> 1</span>
            </div>
        </li>
        <li>
            <a href="https://github.com/Fajarrr124314/zslawfirm" target="_blank" class="gh-repo-link"><i class="fa-solid fa-folder-open"></i> zslawfirm</a>
            <div class="gh-repo-meta">
                <span><span class="lang-dot" style="background-color: #563d7c;"></span> CSS</span>
                <span><i class="fa-regular fa-star"></i> 1</span>
            </div>
        </li>
        <li>
            <a href="https://github.com/Fajarrr124314/warkop-pendopo" target="_blank" class="gh-repo-link"><i class="fa-solid fa-folder-open"></i> warkop-pendopo</a>
            <div class="gh-repo-meta">
                <span><span class="lang-dot" style="background-color: #e34c26;"></span> HTML</span>
                <span><i class="fa-regular fa-star"></i> 0</span>
            </div>
        </li>
    `;

    loading.style.display = 'none';
    content.style.display = 'block';
}

function initGitHubStats() {
    const loading = document.getElementById('githubLoading');
    const content = document.getElementById('githubProfile');
    if (!loading || !content) return;

    const username = 'Fajarrr124314';

    // Fetch profile info
    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) throw new Error('API Rate Limit or Error');
            return res.json();
        })
        .then(profile => {
            document.getElementById('ghAvatar').src = profile.avatar_url;
            document.getElementById('ghName').textContent = profile.name || username;
            document.getElementById('ghBio').textContent = profile.bio || 'Web Developer & Data Analyst';
            document.getElementById('ghLink').href = profile.html_url;
            document.getElementById('ghRepos').textContent = profile.public_repos;
            document.getElementById('ghFollowers').textContent = profile.followers;

            // Fetch repos
            return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        })
        .then(res => {
            if (!res.ok) throw new Error('API Repos Error');
            return res.json();
        })
        .then(repos => {
            const reposList = document.getElementById('ghReposList');
            reposList.innerHTML = '';

            // Filter out forks or just take the first 3
            const mainRepos = repos.filter(r => !r.fork).slice(0, 3);

            // Language colors mapping
            const langColors = {
                'JavaScript': '#f1e05a',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'PHP': '#4f5d95',
                'Python': '#3572A5',
                'TypeScript': '#3178c6'
            };

            if (mainRepos.length === 0) {
                // If no public own repos, take first 3 repos in general
                repos.slice(0, 3).forEach(repo => addRepoToList(repo));
            } else {
                mainRepos.forEach(repo => addRepoToList(repo));
            }

            function addRepoToList(repo) {
                const li = document.createElement('li');
                const lang = repo.language || 'HTML';
                const color = langColors[lang] || '#8e92bc';

                li.innerHTML = `
                    <a href="${repo.html_url}" target="_blank" class="gh-repo-link">
                        <i class="fa-solid fa-folder-open"></i> ${repo.name}
                    </a>
                    <div class="gh-repo-meta">
                        <span><span class="lang-dot" style="background-color: ${color};"></span> ${lang}</span>
                        <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                    </div>
                `;
                reposList.appendChild(li);
            }

            loading.style.display = 'none';
            content.style.display = 'block';
        })
        .catch(err => {
            console.warn('GitHub API fetch failed. Using fallback.', err);
            showGitHubFallback();
        });
}

// Analytics Dashboard Data & Logic
const analyticsData = {
    all: {
        projects: "5",
        hours: "320+",
        languages: "HTML, PHP, JS, SQL",
        values: [90, 85, 80, 75, 60]
    },
    web: {
        projects: "3",
        hours: "200+",
        languages: "HTML, CSS, JS, PHP",
        values: [95, 88, 82, 70, 20]
    },
    data: {
        projects: "2",
        hours: "120+",
        languages: "SQL, Python, Excel",
        values: [40, 30, 20, 85, 90]
    }
};

function initAnalyticsDashboard() {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isDark = document.body.classList.contains('dark-theme');

    const textColor = isDark ? '#a4a7c6' : '#5a5d7c';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(108, 92, 231, 0.06)';

    const data = {
        labels: ["HTML/CSS", "JavaScript", "PHP", "SQL / DB", "Python / Data"],
        datasets: [{
            label: 'Tingkat Penggunaan / Keahlian (%)',
            data: analyticsData.all.values,
            backgroundColor: [
                'rgba(108, 92, 231, 0.75)', // Accent purple
                'rgba(0, 206, 201, 0.75)',  // Accent cyan
                'rgba(253, 121, 168, 0.75)', // Pink
                'rgba(9, 132, 227, 0.75)',  // Blue
                'rgba(225, 112, 85, 0.75)'  // Orange
            ],
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            borderWidth: 1,
            borderRadius: 6
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(25, 25, 50, 0.85)',
                    titleFont: { family: 'Space Grotesk', size: 12 },
                    bodyFont: { family: 'Outfit', size: 12 },
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        font: { family: 'Space Grotesk', size: 10, weight: '600' }
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        font: { family: 'Outfit', size: 10 },
                        stepSize: 20
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    };

    window.analyticsChartInstance = new Chart(ctx, config);
}

function updateAnalyticsDashboard(category) {
    const data = analyticsData[category];
    if (!data) return;

    // Update metric numbers with slight fade effect
    const elements = {
        projects: document.getElementById('metricProjects'),
        hours: document.getElementById('metricHours'),
        languages: document.getElementById('metricLanguages')
    };

    Object.keys(elements).forEach(key => {
        const el = elements[key];
        if (el) {
            el.style.opacity = '0';
            setTimeout(() => {
                if (key === 'projects') el.textContent = data.projects;
                if (key === 'hours') el.textContent = data.hours;
                if (key === 'languages') el.textContent = data.languages;
                el.style.opacity = '1';
            }, 200);
        }
    });

    // Update Chart
    if (window.analyticsChartInstance) {
        window.analyticsChartInstance.data.datasets[0].data = data.values;
        window.analyticsChartInstance.update();
    }
}

// Export to window
window.initGitHubStats = initGitHubStats;
window.initAnalyticsDashboard = initAnalyticsDashboard;
window.updateAnalyticsDashboard = updateAnalyticsDashboard;

/* ==========================================================================
   15. ASTROBOT VIRUTAL ASSISTANT (CHATBOT FAQ) LOGIC
   ========================================================================== */

function toggleChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    if (!chatWindow) return;

    chatWindow.classList.toggle('active');

    // Auto scroll to bottom when opened
    if (chatWindow.classList.contains('active')) {
        const msgContainer = document.getElementById('chatbotMessages');
        if (msgContainer) {
            setTimeout(() => {
                msgContainer.scrollTop = msgContainer.scrollHeight;
            }, 100);
        }
    }
}

const botReplies = {
    siapa: "Fajar Nur Farrijal adalah Mahasiswa S1 Informatika yang berfokus pada Full-Stack Web Development, Data Analytics, dan Desain UI/UX. Fajar memiliki hasrat besar untuk memecahkan masalah kompleks lewat baris kode yang efisien dan estetika visual yang premium.",
    skills: "Berikut adalah keahlian utama Fajar:<br><br>🛸 <strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Bootstrap<br>🌌 <strong>Backend:</strong> PHP, Node.js, RESTful API<br>🛰️ <strong>Database:</strong> MySQL / SQL<br>📊 <strong>Lainnya:</strong> Data Visualization, Dashboard Analytics, Sistem ATS & POS",
    proyek: "Fajar telah mengerjakan berbagai proyek menarik:<br><br>1. 🚀 <strong>Smart ATS:</strong> Portal HR dengan penyaringan CV otomatis menggunakan AI.<br>2. 🛒 <strong>Yogya Fresh Pro:</strong> Sistem POS retail dengan label barcode pencetakan harga.<br>3. ⚖️ <strong>ZS Law Firm:</strong> Portal hukum digital premium dengan toggle mode Gelap/Terang.<br>4. ☕ <strong>Warkop Pendopo:</strong> Website reservasi tempat kopi UMKM dengan WhatsApp ordering.",
    kontak: "Anda bisa menghubungi Fajar dengan cepat melalui:<br><br>📱 <strong>WhatsApp:</strong> 0895806317711<br>✉️ <strong>Email:</strong> fajarnf77@gmail.com<br>🔗 <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/fajar-nur-farrijal-448644255/' target='_blank' style='color:var(--accent); font-weight:700; text-decoration:none;'>Fajar Nur Farrijal</a><br><br>Atau silakan isi <strong>Form Kontak</strong> di bawah untuk mengirim pesan langsung!",
    game: "Wah, Anda menemukan Easter Egg! 🎮 Klik tombol di bawah ini untuk bermain <strong>Astro-Jump</strong>:<br><br><button onclick='openGameModal(); toggleChatbot();' class='btn btn-primary btn-sm' style='padding:6px 12px; font-size:0.85rem;'><i class='fa-solid fa-gamepad'></i> Main Astro-Jump</button>"
};

let isBotTyping = false;

function askAstroBot(topic) {
    if (isBotTyping) return;

    const msgContainer = document.getElementById('chatbotMessages');
    const repliesContainer = document.getElementById('chatbotReplies');
    if (!msgContainer || !repliesContainer) return;

    // User message mapping for UI display
    const topicQuestions = {
        siapa: "Siapa Fajar?",
        skills: "Apa saja keahliannya?",
        proyek: "Apa saja proyek terbarunya?",
        kontak: "Bagaimana cara menghubunginya?",
        game: "Main Game? 🎮"
    };

    const userText = topicQuestions[topic] || "Tanya sesuatu...";

    // 1. Add User Message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = "chat-message user-msg";
    userMsgDiv.innerHTML = `<p>${userText}</p>`;
    msgContainer.appendChild(userMsgDiv);

    // Scroll to bottom
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Disable replies during typing
    const chips = repliesContainer.querySelectorAll('.reply-chip');
    chips.forEach(chip => chip.disabled = true);
    isBotTyping = true;

    // 2. Show Typing Indicator
    setTimeout(() => {
        const typingDiv = document.createElement('div');
        typingDiv.className = "typing-indicator";
        typingDiv.id = "typingIndicator";
        typingDiv.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        msgContainer.appendChild(typingDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;

        // 3. Add Bot Response after typing delay
        setTimeout(() => {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();

            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = "chat-message bot-msg";
            botMsgDiv.innerHTML = `<p>${botReplies[topic] || 'Maaf, saya tidak mengerti pertanyaan tersebut.'}</p>`;
            msgContainer.appendChild(botMsgDiv);

            // Scroll to bottom
            msgContainer.scrollTop = msgContainer.scrollHeight;

            // Re-enable replies
            chips.forEach(chip => chip.disabled = false);
            isBotTyping = false;
        }, 1200);

    }, 400);
}

// Export to window
window.toggleChatbot = toggleChatbot;
window.askAstroBot = askAstroBot;

/* ==========================================================================
   16. WHATSAPP FLOATING WIDGET LOGIC
   ========================================================================== */

function toggleWaPopup() {
    const waPopup = document.getElementById('waPopup');
    if (!waPopup) return;

    waPopup.classList.toggle('active');

    // Hide notification badge when opened
    const badge = document.querySelector('.wa-badge');
    if (badge && waPopup.classList.contains('active')) {
        badge.style.display = 'none';
    }
}

function sendWaMessage(text) {
    if (!text || text.trim() === "") return;

    const phoneNumber = "62895806317711";
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function triggerCustomWaMessage() {
    const input = document.getElementById('waInputText');
    if (!input) return;

    const text = input.value.trim();
    if (text === "") return;

    sendWaMessage(text);
    input.value = ""; // Clear input
}

function handleWaKey(e) {
    if (e.key === 'Enter') {
        triggerCustomWaMessage();
    }
}

// Setup periodically shake widget to catch recruiter's attention
setInterval(() => {
    const trigger = document.querySelector('.wa-trigger');
    if (trigger && !document.getElementById('waPopup').classList.contains('active')) {
        trigger.classList.add('shake-animation');
        setTimeout(() => trigger.classList.remove('shake-animation'), 1000);
    }
}, 12000);

// Export to window
window.toggleWaPopup = toggleWaPopup;
window.sendWaMessage = sendWaMessage;
window.triggerCustomWaMessage = triggerCustomWaMessage;
window.handleWaKey = handleWaKey;

/* ==========================================================================
   17. COLOR ACCENT PICKER LOGIC
   ========================================================================== */

function initAccentPicker() {
    const toggleBtn = document.getElementById('accentPickerToggle');
    const dropdown = document.getElementById('accentDropdown');

    if (!toggleBtn || !dropdown) return;

    // Toggle dropdown
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Close dropdown on clicking outside
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });

    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Restore saved accent color
    const savedColor = localStorage.getItem('accent-color');
    const savedRgb = localStorage.getItem('accent-rgb');
    const savedName = localStorage.getItem('accent-name') || 'purple';

    if (savedColor && savedRgb) {
        setAccentColor(savedColor, savedRgb, savedName);
    }
}

function setAccentColor(colorHex, colorRgb, name) {
    // 1. Set CSS custom properties
    document.documentElement.style.setProperty('--accent', colorHex);
    document.documentElement.style.setProperty('--accent-rgb', colorRgb);

    // 2. Mark active button in UI
    const options = document.querySelectorAll('.accent-opt');
    options.forEach(opt => {
        if (opt.classList.contains(`color-${name}`)) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    // 3. Save selection
    localStorage.setItem('accent-color', colorHex);
    localStorage.setItem('accent-rgb', colorRgb);
    localStorage.setItem('accent-name', name);

    // 4. Update Chart.js Radar Colors dynamically
    if (window.skillsChartInstance) {
        window.skillsChartInstance.data.datasets[0].backgroundColor = `rgba(${colorRgb}, 0.2)`;
        window.skillsChartInstance.data.datasets[0].borderColor = `rgba(${colorRgb}, 0.8)`;
        window.skillsChartInstance.data.datasets[0].pointHoverBorderColor = colorHex;
        window.skillsChartInstance.update();
    }

    // 5. Update Chart.js Analytics Bar Colors dynamically
    if (window.analyticsChartInstance) {
        window.analyticsChartInstance.data.datasets[0].backgroundColor[0] = `rgba(${colorRgb}, 0.75)`;
        window.analyticsChartInstance.update();
    }
}

window.initAccentPicker = initAccentPicker;
window.setAccentColor = setAccentColor;

/* ==========================================================================
   18. GEOLOCATION & WEATHER WELCOMING CARD LOGIC
   ========================================================================== */

function initGeoGreeting() {
    const greetingEl = document.getElementById('geoGreetingText');
    const greetingCard = document.getElementById('geoGreeting');
    if (!greetingEl) return;

    // Fallback message
    const setFallbackGreeting = () => {
        greetingEl.innerHTML = "Halo penjelajah antariksa! Selamat datang di ruang portofolio Fajar. Selamat menjelajahi proyek-proyek saya!";
        const dot = document.querySelector('.geo-status-dot');
        if (dot) dot.style.backgroundColor = "var(--accent)";
    };

    // Get client IP Geolocation info
    fetch('https://ipapi.co/json/')
        .then(response => {
            if (!response.ok) throw new Error('IP API failed');
            return response.json();
        })
        .then(locData => {
            const city = locData.city || '';
            const country = locData.country_name || '';
            const lat = locData.latitude;
            const lon = locData.longitude;

            if (!lat || !lon) {
                setFallbackGreeting();
                return;
            }

            // Get weather from Open-Meteo
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                .then(res => {
                    if (!res.ok) throw new Error('Weather API failed');
                    return res.json();
                })
                .then(weatherData => {
                    const temp = Math.round(weatherData.current_weather.temperature);
                    const code = weatherData.current_weather.weathercode;

                    // Map weather code to description and icon
                    // Code mapping from Open-Meteo
                    let weatherDesc = "Cerah";
                    let icon = "☀️";

                    if (code === 0) { weatherDesc = "Cerah"; icon = "☀️"; }
                    else if (code >= 1 && code <= 3) { weatherDesc = "Berawan Sebagian"; icon = "⛅"; }
                    else if (code === 45 || code === 48) { weatherDesc = "Berkabut"; icon = "🌫️"; }
                    else if (code >= 51 && code <= 67) { weatherDesc = "Hujan Gerimis"; icon = "🌧️"; }
                    else if (code >= 71 && code <= 86) { weatherDesc = "Bersalju"; icon = "❄️"; }
                    else if (code >= 95 && code <= 99) { weatherDesc = "Badai Petir"; icon = "⛈️"; }
                    else { weatherDesc = "Hujan Sedang"; icon = "🌧️"; }

                    // Format beautiful message
                    let locationStr = city ? `${city}, ${country}` : country;
                    greetingEl.innerHTML = `Halo pengunjung dari <strong>${locationStr}</strong>! Saat ini cuaca di sana sedang <strong>${weatherDesc} ${icon}</strong> dengan suhu <strong>${temp}°C</strong>. Selamat menjelajahi portofolio saya!`;
                });
        })
        .catch(err => {
            console.warn('Geolocation greeting failed. Using fallback.', err);
            setFallbackGreeting();
        });
}

window.initGeoGreeting = initGeoGreeting;

/* ==========================================================================
   19. NASA APOD (ASTRONOMY PICTURE OF THE DAY) WIDGET LOGIC
   ========================================================================== */

function showNasaFallback() {
    const loading = document.getElementById('nasaLoading');
    const content = document.getElementById('nasaContent');
    if (!loading || !content) return;

    document.getElementById('nasaImg').src = "public/images/project kopi 1.webp"; // Fallback to an existing local space/nice image or custom url
    // Let's use a beautiful public unsplash space image to make it look real!
    document.getElementById('nasaImg').src = "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop";
    document.getElementById('nasaTitle').textContent = "Pillars of Creation (James Webb Space Telescope)";
    document.getElementById('nasaExplanation').textContent = "Pilar-Pilar Penciptaan (Pillars of Creation) adalah salah satu struktur kosmik paling ikonik di alam semesta. Terletak di Nebula Elang (M16) berjarak sekitar 6.500 tahun cahaya dari Bumi, pilar gas dan debu tebal ini merupakan tempat persemaian bintang-bintang baru yang lahir. Citra inframerah dekat dari Teleskop James Webb ini menembus debu kosmik untuk memperlihatkan ratusan bintang muda yang baru terbentuk berkilau merah menyala.";
    document.getElementById('nasaDate').textContent = "Foto Favorit: James Webb Infrared View";

    loading.style.display = 'none';
    content.style.display = 'grid';
}

function fetchNasaApod() {
    const loading = document.getElementById('nasaLoading');
    const content = document.getElementById('nasaContent');
    if (!loading || !content) return;

    const today = new Date().toISOString().split('T')[0];

    // Check if we have cached APOD data for today
    const cachedDate = localStorage.getItem('nasa-apod-date');
    const cachedTitle = localStorage.getItem('nasa-apod-title');
    const cachedUrl = localStorage.getItem('nasa-apod-url');
    const cachedExplanation = localStorage.getItem('nasa-apod-explanation');

    if (cachedDate === today && cachedTitle && cachedUrl && cachedExplanation) {
        // Load from cache
        document.getElementById('nasaImg').src = cachedUrl;
        document.getElementById('nasaTitle').textContent = cachedTitle;
        document.getElementById('nasaExplanation').textContent = cachedExplanation;
        document.getElementById('nasaDate').textContent = `Tanggal: ${cachedDate} (Dari Cache Lokal)`;

        loading.style.display = 'none';
        content.style.display = 'grid';
        return;
    }

    // Fetch from NASA API
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        .then(response => {
            if (!response.ok) throw new Error('NASA API Failed');
            return response.json();
        })
        .then(data => {
            // Handle videos (like YouTube embeds) occasionally returned by APOD
            let mediaUrl = data.url;
            if (data.media_type === 'video') {
                mediaUrl = data.thumbnail_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop";
            }

            // Populate DOM
            document.getElementById('nasaImg').src = mediaUrl;
            document.getElementById('nasaTitle').textContent = data.title;
            document.getElementById('nasaExplanation').textContent = data.explanation;
            document.getElementById('nasaDate').textContent = `Tanggal: ${data.date} (NASA APOD Live)`;

            // Cache data
            localStorage.setItem('nasa-apod-date', today);
            localStorage.setItem('nasa-apod-title', data.title);
            localStorage.setItem('nasa-apod-url', mediaUrl);
            localStorage.setItem('nasa-apod-explanation', data.explanation);

            loading.style.display = 'none';
            content.style.display = 'grid';
        })
        .catch(err => {
            console.warn('NASA API rate limit exceeded or network error. Using fallback APOD.', err);
            showNasaFallback();
        });
}

window.fetchNasaApod = fetchNasaApod;

/* ==========================================================================
   20. 3D ORBIT SKILL TAG CLOUD LOGIC
   ========================================================================== */

function init3DTagCloud() {
    const canvas = document.getElementById('skillsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const skills = [
        "HTML5", "CSS3", "JavaScript", "PHP", "MySQL",
        "Tailwind CSS", "Bootstrap", "Node.js", "REST API",
        "Git & GitHub", "Python", "Data Analysis", "UI/UX Design",
        "AI Screening", "POS System", "Web UMKM", "Responsive"
    ];

    const count = skills.length;
    const tags = [];
    const radius = 95; // Sphere radius
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Mouse coords relative to canvas center
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;

    // Default rotation speed
    let speedX = 0.003;
    let speedY = 0.003;

    // Distribute tags uniformly on a sphere
    for (let i = 0; i < count; i++) {
        // Fibonacci sphere / Golden spiral distribution
        const phi = Math.acos(-1 + (2 * i + 1) / count);
        const theta = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle

        tags.push({
            text: skills[i],
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi),
            projX: 0,
            projY: 0,
            scale: 1,
            opacity: 1,
            hovered: false
        });
    }

    // Rotate coordinates around Y axis
    function rotateY(tag, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x1 = tag.x * cos - tag.z * sin;
        const z1 = tag.z * cos + tag.x * sin;
        tag.x = x1;
        tag.z = z1;
    }

    // Rotate coordinates around X axis
    function rotateX(tag, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const y1 = tag.y * cos - tag.z * sin;
        const z1 = tag.z * cos + tag.y * sin;
        tag.y = y1;
        tag.z = z1;
    }

    // Update and draw loop
    let animationFrameId = null;

    function update() {
        let currentSpeedX = speedX;
        let currentSpeedY = speedY;

        if (isMouseOver) {
            // Speed based on distance from center
            currentSpeedX = (mouseY / cy) * 0.015;
            currentSpeedY = -(mouseX / cx) * 0.015;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update tag positions & project to 2D
        tags.forEach(tag => {
            rotateX(tag, currentSpeedX);
            rotateY(tag, currentSpeedY);

            // Perspective projection
            const distance = 200; // Camera distance
            tag.scale = distance / (distance + tag.z);
            tag.projX = cx + tag.x * tag.scale;
            tag.projY = cy + tag.y * tag.scale;

            // Opacity based on depth (z)
            tag.opacity = (tag.scale - 0.5) * 0.85 + 0.15;
            if (tag.opacity < 0.1) tag.opacity = 0.1;
            if (tag.opacity > 1) tag.opacity = 1;
        });

        // Sort tags by depth (z) descending (painter's algorithm)
        const sortedTags = [...tags].sort((a, b) => b.z - a.z);

        // Draw tags
        sortedTags.forEach(tag => {
            const isDark = document.body.classList.contains('dark-theme');
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6c5ce7';
            const defaultColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(45, 52, 54, 0.8)';

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Size based on scale depth
            const fontSize = Math.round(11 * tag.scale + 3);
            ctx.font = `600 ${fontSize}px 'Space Grotesk', sans-serif`;

            if (tag.hovered) {
                ctx.fillStyle = accentColor;
                ctx.shadowColor = accentColor;
                ctx.shadowBlur = 8;
            } else {
                ctx.fillStyle = defaultColor;
                ctx.shadowBlur = 0;
            }

            ctx.globalAlpha = tag.opacity;
            ctx.fillText(tag.text, tag.projX, tag.projY);
            ctx.restore();
        });

        animationFrameId = requestAnimationFrame(update);
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
        mouseX = x - cx;
        mouseY = y - cy;
    }

    canvas.addEventListener('mousemove', (e) => {
        isMouseOver = true;
        getMousePos(e);

        let anyHovered = false;
        tags.forEach(tag => {
            const dx = (e.clientX - canvas.getBoundingClientRect().left) * (canvas.width / canvas.getBoundingClientRect().width) - tag.projX;
            const dy = (e.clientY - canvas.getBoundingClientRect().top) * (canvas.height / canvas.getBoundingClientRect().height) - tag.projY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const textWidth = ctx.measureText(tag.text).width;
            const size = Math.max(textWidth, 40) / 2 + 5;

            if (distance < size && tag.z < 20) {
                tag.hovered = true;
                anyHovered = true;
            } else {
                tag.hovered = false;
            }
        });

        canvas.style.cursor = anyHovered ? 'pointer' : 'default';
    });

    canvas.addEventListener('mouseleave', () => {
        isMouseOver = false;
        tags.forEach(tag => tag.hovered = false);
        canvas.style.cursor = 'default';
    });

    canvas.addEventListener('click', () => {
        const clickedTag = tags.find(tag => tag.hovered);
        if (clickedTag) {
            const chatbotWindow = document.getElementById('chatbotWindow');
            if (chatbotWindow) {
                if (!chatbotWindow.classList.contains('active')) {
                    toggleChatbot();
                }
                askAstroBot('skills');
            }
        }
    });

    // Start/stop animation loop based on visibility (crucial for mobile performance)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationFrameId) {
                    update();
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.05 });

    observer.observe(canvas);
}

window.init3DTagCloud = init3DTagCloud;

/* ==========================================================================
   22. ASTRO-JUMP MINIGAME LOGIC
   ========================================================================== */

let isGameModalOpen = false;
let isPlaying = false;
let isGameOver = false;
let gameScore = 0;
let gameHighScore = 0;
let gameAnimationId = null;

const astronaut = {
    x: 60,
    y: 133, // 180 (ground) - 47 (height)
    width: 26,
    height: 47,
    velocityY: 0,
    gravity: 0.55,
    jumpStrength: -10.5,
    isJumping: false
};

let obstacles = [];
let gameStars = [];
let nextObstacleTimer = 0;

// Initialize background stars
for (let i = 0; i < 25; i++) {
    gameStars.push({
        x: Math.random() * 600,
        y: Math.random() * 160,
        size: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 1.2 + 0.3
    });
}

function openGameModal() {
    isGameModalOpen = true;
    const modal = document.getElementById('gameModal');
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset scoreboard in UI
    gameHighScore = parseInt(localStorage.getItem('astro-jump-highscore') || '0', 10);
    document.getElementById('gameHighScore').textContent = gameHighScore;
    document.getElementById('gameScore').textContent = '0';

    // Show start overlay, hide game over overlay
    document.getElementById('gameStartOverlay').style.display = 'flex';
    document.getElementById('gameOverOverlay').style.display = 'none';

    // Draw initial static state
    drawStaticScene();

    // Bind listeners
    document.addEventListener('keydown', handleGameKeys);

    const jumpBtn = document.getElementById('gameJumpBtn');
    if (jumpBtn) {
        jumpBtn.onclick = (e) => {
            e.preventDefault();
            triggerJump();
        };
    }
}

function closeGameModal() {
    isGameModalOpen = false;
    isPlaying = false;
    isGameOver = false;

    const modal = document.getElementById('gameModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';

    // Unbind listeners
    document.removeEventListener('keydown', handleGameKeys);

    if (gameAnimationId) {
        cancelAnimationFrame(gameAnimationId);
        gameAnimationId = null;
    }
}

function triggerJump() {
    if (!isPlaying) {
        startGame();
        return;
    }
    if (!astronaut.isJumping) {
        astronaut.velocityY = astronaut.jumpStrength;
        astronaut.isJumping = true;
    }
}

function handleGameKeys(e) {
    if (!isGameModalOpen) return;

    if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        triggerJump();
    } else if (e.key === 'Escape') {
        closeGameModal();
    }
}

function drawStaticScene() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    drawAndUpdateStars(ctx);

    // Draw ground
    drawGround(ctx);

    // Draw astronaut standing
    astronaut.y = 133;
    astronaut.velocityY = 0;
    astronaut.isJumping = false;
    drawAstronaut(ctx, astronaut);
}

function startGame() {
    isPlaying = true;
    isGameOver = false;
    gameScore = 0;
    obstacles = [];
    nextObstacleTimer = 40;

    astronaut.y = 133;
    astronaut.velocityY = 0;
    astronaut.isJumping = false;

    document.getElementById('gameStartOverlay').style.display = 'none';
    document.getElementById('gameOverOverlay').style.display = 'none';
    document.getElementById('gameScore').textContent = '0';

    if (gameAnimationId) {
        cancelAnimationFrame(gameAnimationId);
    }
    gameAnimationId = requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!isPlaying) return;

    updateGameLogic();
    drawGameScene();

    if (!isGameOver) {
        gameAnimationId = requestAnimationFrame(gameLoop);
    }
}

function updateGameLogic() {
    // 1. Gravity & Jump physics
    astronaut.velocityY += astronaut.gravity;
    astronaut.y += astronaut.velocityY;

    // Check ground collision
    if (astronaut.y >= 133) {
        astronaut.y = 133;
        astronaut.velocityY = 0;
        astronaut.isJumping = false;
    }

    // 2. Spawn obstacles (meteors)
    nextObstacleTimer--;
    if (nextObstacleTimer <= 0) {
        const size = Math.floor(Math.random() * 12) + 20;
        const isFloating = Math.random() < 0.25;
        const obstacleY = isFloating ? 100 : 180 - size;
        const speed = 5.2 + Math.min(gameScore / 25, 4.8);

        obstacles.push({
            x: 600,
            y: obstacleY,
            width: size,
            height: size,
            speed: speed,
            passed: false
        });

        nextObstacleTimer = Math.floor(Math.random() * 65) + 75;
    }

    // 3. Move obstacles and check collisions
    obstacles.forEach(obs => {
        obs.x -= obs.speed;

        if (!obs.passed && obs.x + obs.width < astronaut.x) {
            obs.passed = true;
            gameScore++;
            document.getElementById('gameScore').textContent = gameScore;

            if (gameScore > gameHighScore) {
                gameHighScore = gameScore;
                document.getElementById('gameHighScore').textContent = gameHighScore;
                localStorage.setItem('astro-jump-highscore', gameHighScore);
            }
        }

        // AABB Collision with small margin reduction
        const astBox = {
            left: astronaut.x + 4,
            right: astronaut.x + astronaut.width - 4,
            top: astronaut.y + 2,
            bottom: astronaut.y + astronaut.height - 2
        };

        const obsBox = {
            left: obs.x + 3,
            right: obs.x + obs.width - 3,
            top: obs.y + 3,
            bottom: obs.y + obs.height - 3
        };

        if (astBox.left < obsBox.right &&
            astBox.right > obsBox.left &&
            astBox.top < obsBox.bottom &&
            astBox.bottom > obsBox.top) {
            endGame();
        }
    });

    obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function endGame() {
    isGameOver = true;
    isPlaying = false;

    document.getElementById('finalScore').textContent = gameScore;
    document.getElementById('gameOverOverlay').style.display = 'flex';

    if (gameAnimationId) {
        cancelAnimationFrame(gameAnimationId);
        gameAnimationId = null;
    }
}

function drawGameScene() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAndUpdateStars(ctx);
    drawGround(ctx);

    obstacles.forEach(obs => {
        drawObstacle(ctx, obs);
    });

    drawAstronaut(ctx, astronaut);
}

function drawAndUpdateStars(ctx) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    gameStars.forEach(star => {
        if (isPlaying && !isGameOver) {
            star.x -= star.speed;
            if (star.x < 0) {
                star.x = 600;
                star.y = Math.random() * 160;
            }
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}

function drawGround(ctx) {
    ctx.save();
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6c5ce7';
    const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '108, 92, 231';

    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 180);
    ctx.lineTo(600, 180);
    ctx.stroke();

    const gradient = ctx.createLinearGradient(0, 180, 0, 200);
    gradient.addColorStop(0, `rgba(${accentRgb}, 0.15)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 180, 600, 20);

    ctx.restore();
}

function drawAstronaut(ctx, ast) {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6c5ce7';
    ctx.save();

    // Flame
    if (ast.isJumping && ast.velocityY < 0) {
        ctx.fillStyle = '#ff9f43';
        ctx.beginPath();
        ctx.moveTo(ast.x - 3, ast.y + 35);
        ctx.lineTo(ast.x - 8, ast.y + 45 + Math.random() * 5);
        ctx.lineTo(ast.x - 1, ast.y + 39);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(ast.x - 3, ast.y + 35);
        ctx.lineTo(ast.x - 6, ast.y + 41 + Math.random() * 3);
        ctx.lineTo(ast.x - 1, ast.y + 37);
        ctx.closePath();
        ctx.fill();
    }

    // Jetpack
    ctx.fillStyle = '#8e92bc';
    ctx.beginPath();
    ctx.roundRect(ast.x - 4, ast.y + 20, 8, 16, 2);
    ctx.fill();

    // Body (Suit)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(ast.x + 4, ast.y + 18, 22, 20, 5);
    ctx.fill();

    // Details
    ctx.fillStyle = accent;
    ctx.fillRect(ast.x + 10, ast.y + 24, 10, 4);
    ctx.fillStyle = '#00cec9';
    ctx.fillRect(ast.x + 11, ast.y + 30, 3, 3);
    ctx.fillStyle = '#ff7675';
    ctx.fillRect(ast.x + 16, ast.y + 30, 3, 3);

    // Helmet
    ctx.fillStyle = '#f5f6fa';
    ctx.beginPath();
    ctx.arc(ast.x + 15, ast.y + 11, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#dcdde1';
    ctx.stroke();

    // Visor
    ctx.fillStyle = '#2f3542';
    ctx.beginPath();
    ctx.arc(ast.x + 17, ast.y + 11, 7, -Math.PI / 2, Math.PI / 2);
    ctx.fill();

    // Shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.ellipse(ast.x + 19, ast.y + 8, 2, 4, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ast.x + 6, ast.y + 38, 7, 7);
    ctx.fillRect(ast.x + 17, ast.y + 38, 7, 7);

    // Boots
    ctx.fillStyle = accent;
    ctx.fillRect(ast.x + 5, ast.y + 44, 9, 3);
    ctx.fillRect(ast.x + 16, ast.y + 44, 9, 3);

    ctx.restore();
}

function drawObstacle(ctx, obs) {
    ctx.save();

    // Tail
    const gradient = ctx.createLinearGradient(obs.x + obs.width, obs.y + obs.height / 2, obs.x + obs.width + 30, obs.y + obs.height / 2);
    gradient.addColorStop(0, 'rgba(255, 118, 117, 0.8)');
    gradient.addColorStop(0.5, 'rgba(253, 121, 168, 0.4)');
    gradient.addColorStop(1, 'rgba(108, 92, 231, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(obs.x + obs.width / 2, obs.y);
    ctx.lineTo(obs.x + obs.width + 40, obs.y + obs.height / 2 - 5);
    ctx.lineTo(obs.x + obs.width + 40, obs.y + obs.height / 2 + 5);
    ctx.lineTo(obs.x + obs.width / 2, obs.y + obs.height);
    ctx.closePath();
    ctx.fill();

    // Body
    ctx.fillStyle = '#57606f';
    ctx.beginPath();
    ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#2f3542';
    ctx.stroke();

    // Craters
    ctx.fillStyle = '#2f3542';
    ctx.beginPath();
    ctx.arc(obs.x + obs.width * 0.4, obs.y + obs.height * 0.35, obs.width * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(obs.x + obs.width * 0.7, obs.y + obs.height * 0.6, obs.width * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(obs.x + obs.width * 0.35, obs.y + obs.height * 0.7, obs.width * 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

window.openGameModal = openGameModal;
window.closeGameModal = closeGameModal;
window.startGame = startGame;

