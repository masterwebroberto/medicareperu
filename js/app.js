// Toggle Menú Hamburguesa para vista Móvil
const btnToggleMenu = document.getElementById('btn-toggle-menu');
const mainNav = document.getElementById('main-nav');

if (btnToggleMenu && mainNav) {
  btnToggleMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = btnToggleMenu.querySelector('i');
    if (icon) {
      if (mainNav.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  });
}

// js/app.js - Lógica principal de Medicare Perú
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initAuthTabs();

  if (document.getElementById('doctors-list')) {
    initDoctorsCatalog();
  }

  initDoctorProfileContext();
  initBookingFlow();

  if (document.getElementById('appointments-container')) {
    renderUserAppointments();
  }

  initAccountTabs();
});

// --- PESTAÑAS EN MI CUENTA (DASHBOARD PACIENTE) ---
function initAccountTabs() {
  const tabs = [
    { btn: 'tab-citas', sec: 'sec-citas' },
    { btn: 'tab-atenciones', sec: 'sec-atenciones' },
    { btn: 'tab-recetas', sec: 'sec-recetas' },
    { btn: 'tab-examenes', sec: 'sec-examenes' }
  ];

  tabs.forEach(t => {
    const btnEl = document.getElementById(t.btn);
    const secEl = document.getElementById(t.sec);

    if (btnEl && secEl) {
      btnEl.addEventListener('click', () => {
        tabs.forEach(o => {
          const b = document.getElementById(o.btn);
          const s = document.getElementById(o.sec);
          if (b && s) {
            b.classList.remove('active');
            s.style.display = 'none';
          }
        });
        btnEl.classList.add('active');
        secEl.style.display = 'block';
      });
    }
  });

  // Botón Cerrar Sesión
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('medicare_user');
      alert('Sesión cerrada correctamente.');
      window.location.href = 'index.html';
    });
  }
}

// --- AUTENTICACIÓN / TABS EN LOGIN ---
function initAuthTabs() {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-auth');
  const formRegister = document.getElementById('form-register');

  if (tabLogin && tabRegister && formLogin && formRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.classList.add('active');
      formRegister.classList.remove('active');
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formRegister.classList.add('active');
      formLogin.classList.remove('active');
    });

    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      tabLogin.click();
    });

    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('medicare_user', JSON.stringify({ nombre: "Roberto Inga Alvarado", email: "roberto@ejemplo.com" }));
      
      alert('¡Bienvenido! Sesión iniciada correctamente.');
      window.location.href = 'micuenta.html';
    });
  }
}

// --- DIRECTORIO DE DOCTORES ---
function initDoctorsCatalog() {
  const container = document.getElementById('doctors-list');
  const inputName = document.getElementById('filter-name');
  const selectSpec = document.getElementById('filter-spec');
  const selectUnit = document.getElementById('filter-unit');

  function render(list) {
    container.innerHTML = '';
    if (list.length === 0) {
      container.innerHTML = `<p style="grid-column: span 4; text-align: center; color: var(--color-text-muted); padding: 30px;">No se encontraron médicos con los filtros seleccionados.</p>`;
      return;
    }

    list.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${doc.foto}" alt="${doc.nombre}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 12px;">
        <div class="rating"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div>
        <h3>${doc.nombre}</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">${doc.especialidad}</p>
        <p style="color: var(--color-primary-hover); font-weight: 700; margin: 8px 0;">S/ ${doc.precio.toFixed(2)}</p>
        <a href="perfil-doctor.html?id=${doc.id}" class="btn btn-secondary" style="margin-top: 10px; width: 100%;">Ver perfil</a>
      `;
      container.appendChild(card);
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  render(MEDICO_CATALOGO);

  function applyFilters() {
    const nameVal = inputName ? inputName.value.toLowerCase() : '';
    const specVal = selectSpec ? selectSpec.value.toLowerCase() : '';
    const unitVal = selectUnit ? selectUnit.value : '';

    const filtered = MEDICO_CATALOGO.filter(doc => {
      const matchName = doc.nombre.toLowerCase().includes(nameVal) || doc.especialidad.toLowerCase().includes(nameVal);
      const matchSpec = specVal === '' || doc.especialidad.toLowerCase().includes(specVal);
      const matchUnit = unitVal === '' || doc.unidad === unitVal;
      return matchName && matchSpec && matchUnit;
    });

    render(filtered);
  }

  if (inputName) inputName.addEventListener('input', applyFilters);
  if (selectSpec) selectSpec.addEventListener('change', applyFilters);
  if (selectUnit) selectUnit.addEventListener('change', applyFilters);
}

// --- PERFIL DE DOCTOR ---
function initDoctorProfileContext() {
  const urlParams = new URLSearchParams(window.location.search);
  const docId = urlParams.get('id');

  if (docId && typeof MEDICO_CATALOGO !== 'undefined') {
    const doc = MEDICO_CATALOGO.find(d => d.id === docId);
    if (doc) {
      const titleEl = document.querySelector('h1');
      if (titleEl && titleEl.textContent.includes('Dr.')) {
        titleEl.textContent = `Conoce a: ${doc.nombre}`;
      }
    }
  }
}

// --- FLUJO DE RESERVA Y PAGO SIMULADO (CON INYECCIÓN UNIVERSAL) ---
function initBookingFlow() {
  let modal = document.getElementById('modal-booking');

  if (!modal) {
    const modalHTML = `
      <div class="modal-overlay" id="modal-booking">
        <div class="modal-content">
          <button class="modal-close" id="btn-close-booking">&times;</button>
          <h2><i data-lucide="calendar"></i> Reserva tu Cita Médica</h2>
          <p style="margin-bottom: 20px; font-size: 0.9rem; color: var(--color-text-muted);">
            Selecciona el médico, fecha y hora disponible para agendar tu atención en soles (S/).
          </p>

          <form id="form-booking">
            <div style="margin-bottom: 15px;">
              <label style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 5px;">Especialista</label>
              <select id="booking-doctor" style="width: 100%; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);" required>
                <option value="Dr. Carlos Mendoza - Cardiología (S/ 150.00)">Dr. Carlos Mendoza - Cardiología (S/ 150.00)</option>
                <option value="Dra. Ana Torres - Pediatría (S/ 120.00)">Dra. Ana Torres - Pediatría (S/ 120.00)</option>
                <option value="Dr. Mario Ramírez - Cirugía Torácica (S/ 200.00)">Dr. Mario Ramírez - Cirugía Torácica (S/ 200.00)</option>
                <option value="Dr. Roberto Silva - Neurología (S/ 180.00)">Dr. Roberto Silva - Neurología (S/ 180.00)</option>
              </select>
            </div>

            <div style="margin-bottom: 15px;">
              <label style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 5px;">Fecha de Atención</label>
              <input type="date" id="booking-date" style="width: 100%; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);" required>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 5px;">Hora Disponible</label>
              <select id="booking-time" style="width: 100%; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);" required>
                <option value="">Selecciona un horario</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Confirmar Cita</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('modal-booking');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  const btnOpen1 = document.getElementById('btn-open-booking');
  const btnOpen2 = document.getElementById('btn-hero-booking');
  const btnClose = document.getElementById('btn-close-booking');
  const formBooking = document.getElementById('form-booking');

  if (modal) {
    const openModal = () => modal.classList.add('active');
    const closeModal = () => modal.classList.remove('active');

    if (btnOpen1) btnOpen1.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (btnOpen2) btnOpen2.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (btnClose) btnClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (formBooking) {
      formBooking.onsubmit = function(e) {
        e.preventDefault();
        const fecha = document.getElementById('booking-date').value;
        const hora = document.getElementById('booking-time').value;

        if (!fecha || !hora) {
          alert('Por favor selecciona una fecha y un horario válido.');
          return;
        }

        const selectedDate = new Date(fecha);
        const today = new Date();
        today.setHours(0,0,0,0);

        if (selectedDate < today) {
          alert('No puedes seleccionar una fecha pasada.');
          return;
        }

        const codigoReserva = 'MED-2026-' + Math.floor(1000 + Math.random() * 9000);
        const docSelect = document.getElementById('booking-doctor');
        const docText = docSelect ? docSelect.value : "Dr. Carlos Mendoza - Cardiología (S/ 150.00)";
        
        const nuevaCita = {
          codigo: codigoReserva,
          medico: docText.split(' - ')[0],
          especialidad: docText.split(' - ')[1]?.split(' (')[0] || "Cardiología",
          fecha: fecha,
          hora: hora,
          modalidad: "Virtual / Presencial",
          precio: 150.00,
          metodoPago: "Tarjeta Bancaria [DEMO]",
          estadoCita: "Confirmada",
          estadoPago: "Aprobado [DEMO]"
        };

        let citas = JSON.parse(localStorage.getItem('medicare_citas')) || [];
        citas.push(nuevaCita);
        localStorage.setItem('medicare_citas', JSON.stringify(citas));

        alert(`¡Cita solicitada con éxito!\n\nCódigo de Reserva: ${codigoReserva}\nPuedes revisarla en la sección 'Mi Cuenta'.`);
        closeModal();
        window.location.href = 'micuenta.html';
      };
    }
  }
}

// --- SECCIÓN "MIS CITAS" ---
function renderUserAppointments() {
  const container = document.getElementById('appointments-container');
  if (!container) return;

  const citas = JSON.parse(localStorage.getItem('medicare_citas')) || [];

  if (citas.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: var(--color-white); border-radius: var(--radius-md);">
        <i data-lucide="calendar-x" style="width: 48px; height: 48px; color: var(--color-text-muted); margin-bottom: 15px;"></i>
        <h3>No tienes citas próximas programadas</h3>
        <p style="color: var(--color-text-muted); margin: 10px 0 20px;">Aún no has agendado ninguna consulta médica activa.</p>
        <a href="doctores.html" class="btn btn-primary">Buscar un Médico y Reservar</a>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  container.innerHTML = `
    <h3 style="margin-bottom: 20px;">Citas Programadas Próximas</h3>
    <div style="display: flex; flex-direction: column; gap: 20px;">
      ${citas.map((c, index) => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px; text-align: left;">
          <div>
            <span style="background: var(--color-primary-light); color: var(--color-primary-hover); padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">${c.codigo}</span>
            <h3 style="margin-top: 8px;">${c.medico}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">${c.especialidad} — <strong>Modalidad:</strong>${c.modalidad}</p>
            <p style="margin-top: 8px; font-size: 0.9rem;"><i data-lucide="calendar" style="width: 14px; height: 14px; display: inline;"></i> <strong>Fecha:</strong> ${c.fecha} a las${c.hora}</p>
            <p style="margin-top: 4px; font-size: 0.9rem;"><i data-lucide="credit-card" style="width: 14px; height: 14px; display: inline;"></i> <strong>Total:</strong> S/ ${c.precio.toFixed(2)} (${c.metodoPago})</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
            <span style="padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; background: #e6f9f6; color: #008778; font-weight: 600;">Estado: ${c.estadoCita}</span>
            <button onclick="cancelarCita(${index})" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 12px; color: #d9534f; border-color: #d9534f;">Cancelar Cita</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function cancelarCita(index) {
  if (confirm('¿Estás seguro de que deseas cancelar esta solicitud de cita?')) {
    let citas = JSON.parse(localStorage.getItem('medicare_citas')) || [];
    citas.splice(index, 1);
    localStorage.setItem('medicare_citas', JSON.stringify(citas));
    renderUserAppointments();
  }
}