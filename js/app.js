document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Iconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- 2. MODAL RESERVA DE CITA (modal-booking) ---
  const modalBooking = document.getElementById('modal-booking');
  const btnOpenBooking = document.getElementById('btn-open-booking');
  const btnHeroBooking = document.getElementById('btn-hero-booking');
  const formBooking = document.getElementById('form-booking');
  const bookingDateInput = document.getElementById('booking-date');

  // Asignar fecha mínima hoy para la reserva
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', today);
  }

  const openBookingModal = (e) => {
    if (e) e.preventDefault();
    if (modalBooking) modalBooking.classList.add('active');
  };

  if (btnOpenBooking) btnOpenBooking.addEventListener('click', openBookingModal);
  if (btnHeroBooking) btnHeroBooking.addEventListener('click', openBookingModal);

  if (formBooking) {
    formBooking.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('booking-date')?.value || '';
      const time = document.getElementById('booking-time')?.value || '';

      alert(`¡Cita reservada con éxito para el ${date} a las ${time}!`);
      if (modalBooking) modalBooking.classList.remove('active');
    });
  }

  // --- 3. MODAL ONBOARDING (modal-onboarding) ---
  const modalOnboarding = document.getElementById('modal-onboarding');
  const formOnboarding = document.getElementById('form-onboarding');

  if (!localStorage.getItem('onboarding_completed') && modalOnboarding) {
    setTimeout(() => {
      modalOnboarding.classList.add('active');
    }, 1000);
  }

  if (formOnboarding) {
    formOnboarding.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('onboarding_completed', 'true');
      if (modalOnboarding) modalOnboarding.classList.remove('active');
      alert('¡Gracias por tus respuestas!');
    });
  }

  // --- 4. CIERRE GLOBAL DE MODALES (Botón X y clic fuera en overlay) ---
  document.addEventListener('click', (e) => {
    // Cerrar con el botón de la equis (.modal-close)
    if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    }

    // Cerrar al hacer clic en el fondo oscuro
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }

    // Abrir modal de felicitaciones si hace clic en el botón con id btn-open-feedback
    if (e.target.id === 'btn-open-feedback' || e.target.closest('#btn-open-feedback')) {
      openFeedbackModal();
    }
  });

  // --- 5. FILTRO EN TIEMPO REAL PARA LISTA DE DOCTORES ---
  const filterName = document.getElementById('filter-name');
  const filterSpec = document.getElementById('filter-spec');
  const doctorCards = document.querySelectorAll('#doctors-list .card');

  function filterDoctors() {
    const nameVal = filterName ? filterName.value.toLowerCase() : '';
    const specVal = filterSpec ? filterSpec.value : '';

    doctorCards.forEach(card => {
      const name = card.getAttribute('data-name')?.toLowerCase() || '';
      const spec = card.getAttribute('data-spec') || '';

      const matchesName = name.includes(nameVal);
      const matchesSpec = !specVal || spec === specVal;

      card.style.display = (matchesName && matchesSpec) ? 'block' : 'none';
    });
  }

  if (filterName) filterName.addEventListener('input', filterDoctors);
  if (filterSpec) filterSpec.addEventListener('change', filterDoctors);

  // --- 6. VALIDACIÓN BÁSICA FORMULARIO LOGIN ---
  const formAuth = document.getElementById('form-auth');
  if (formAuth) {
    formAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Sesión iniciada exitosamente. Redirigiendo a tu panel...');
      window.location.href = 'index.html';
    });
  }
});

// --- 7. MODAL LIBRO DE FELICITACIONES (modal-feedback) ---
function openFeedbackModal() {
  let modalFeedback = document.getElementById('modal-feedback');

  if (!modalFeedback) {
    const modalHTML = `
      <div class="modal-overlay active" id="modal-feedback">
        <div class="modal-content">
          <button type="button" class="modal-close">&times;</button>
          <h2>Libro de Felicitaciones</h2>
          <p style="margin-bottom: 20px; font-size: 0.9rem; color: var(--color-text-muted);">
            Comparte tu historia y ayuda a otros pacientes.
          </p>
          <form id="form-feedback-submit">
            <div style="margin-bottom: 15px;">
              <label style="display: block; font-weight: 600;">Nombre Completo</label>
              <input type="text" placeholder="Ej. Maria José G." style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);" required>
            </div>
            <div style="margin-bottom: 15px;">
              <label style="display: block; font-weight: 600;">Especialidad / Servicio Atendido</label>
              <input type="text" placeholder="Ej. Cardiología" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);" required>
            </div>
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-weight: 600;">Tu Experiencia</label>
              <textarea rows="4" placeholder="Escribe tu testimonio aquí..." style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Publicar Felicitación</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('form-feedback-submit')?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Muchas gracias! Tu comentario ha sido enviado a revisión.');
      closeFeedbackModal();
    });
  } else {
    modalFeedback.classList.add('active');
  }
}

function closeFeedbackModal() {
  const modalFeedback = document.getElementById('modal-feedback');
  if (modalFeedback) {
    modalFeedback.classList.remove('active');
  }
}



// --- LÓGICA DEL SLIDER DE IMÁGENES HERO ---
  const slides = document.querySelectorAll('.hero-slides .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const btnPrev = document.querySelector('.prev-slide');
  const btnNext = document.querySelector('.next-slide');

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    };

    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    };

    const prevSlide = () => {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    };

    const startAutoSlide = () => {
      slideInterval = setInterval(nextSlide, 4000);
    };

    const resetAutoSlide = () => {
      clearInterval(slideInterval);
      startAutoSlide();
    };

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        showSlide(index);
        resetAutoSlide();
      });
    });

    // Iniciar temporizador automático
    startAutoSlide();
  }






  // --- LÓGICA DE PESTAÑAS LOGIN / REGISTRO ---
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formAuth = document.getElementById('form-auth');
  const formRegister = document.getElementById('form-register');

  if (tabLogin && tabRegister && formAuth && formRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formAuth.classList.add('active');
      formRegister.classList.remove('active');
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formRegister.classList.add('active');
      formAuth.classList.remove('active');
    });
  }

  // Evento de Envío Formulario Registro
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Cuenta de paciente creada exitosamente! Redirigiendo a tu panel...');
      window.location.href = 'index.html';
    });
  }