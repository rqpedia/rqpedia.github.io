let currentIndex = 0;
const totalSections = 5;
let isAnimating = false;
let startY = 0;

// Fungsi Navigasi Antar Section
function goTo(index) {
    if (index < 0 || index >= totalSections || isAnimating) return;

    isAnimating = true;
    currentIndex = index;

    const wrapper = document.getElementById('mainWrapper');
    if (wrapper) {
        wrapper.style.transform = `translateY(-${index * 100}vh)`;
    }

    // Update State Navigasi
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });

    // Reset lock animasi setelah transisi selesai (sesuai durasi CSS)
    setTimeout(() => { isAnimating = false; }, 700);
}

// Event Listener untuk Mouse Wheel
window.addEventListener('wheel', e => {
    if (e.deltaY > 0) goTo(currentIndex + 1);
    else goTo(currentIndex - 1);
}, { passive: true });

// Event Listener untuk Touch (HP)
document.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) > 50) { // Threshold 50px
        if (diff > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
    }
}, { passive: true });

// Toggle Dark/Light Theme
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');

    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');

    if (themeBtn) {
        themeBtn.innerText = isDark ? "☀️" : "🌙";
    }

    // Opsional: Simpan preferensi ke local storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// WhatsApp Integration
function sendWhatsApp() {
    const name = document.getElementById('waName').value;
    const msg = document.getElementById('waMessage').value;

    if (!name || !msg) {
        alert("Mohon isi nama dan pesan Anda terlebih dahulu.");
        return;
    }

    const phoneNumber = "6282371464575";
    const encodedMsg = encodeURIComponent(`Halo Afif, saya ${name}. ${msg}`);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
}

// Load preferensi tema saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
});