// js/doctors.js - Catálogo central de médicos y especialidades para Medicare Perú
const MEDICO_CATALOGO = [
  {
    id: "doc-1",
    nombre: "Dr. Carlos Mendoza",
    especialidad: "Cardiología",
    unidad: "cardiologia",
    cmp: "045120",
    rne: "021450",
    precio: 150.00,
    modalidad: "Ambos (Virtual y Presencial)",
    foto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    descripcion: "Especialista en cardiología clínica e intervención cardiovascular con más de 12 años de experiencia en centros de alta complejidad.",
    horarios: ["09:00 AM", "11:00 AM", "03:00 PM"]
  },
  {
    id: "doc-2",
    nombre: "Dra. Ana Torres",
    especialidad: "Pediatría",
    unidad: "pediatria",
    cmp: "052310",
    rne: "031200",
    precio: 120.00,
    modalidad: "Presencial",
    foto: "https://images.unsplash.com/photo-1594824813576-652a65d56220?auto=format&fit=crop&w=400&q=80",
    descripcion: "Pediatra dedicada al desarrollo integral infantil, control de crecimiento, vacunación y prevención de enfermedades respiratorias.",
    horarios: ["08:30 AM", "10:30 AM", "02:30 PM", "04:30 PM"]
  },
  {
    id: "doc-3",
    nombre: "Dr. Mario Ramírez",
    especialidad: "Cirugía Tórax y Cardiovascular",
    unidad: "quirurgica",
    cmp: "068860",
    rne: "043521",
    precio: 200.00,
    modalidad: "Presencial",
    foto: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    descripcion: "Cirujano Torácico y Cardiovascular formado en la UNMSM, especializado en procedimientos de alta precisión y quirófanos inteligentes.",
    horarios: ["10:00 AM", "01:00 PM", "05:00 PM"]
  },
  {
    id: "doc-4",
    nombre: "Dr. Roberto Silva",
    especialidad: "Neurología",
    unidad: "neurologia",
    cmp: "041980",
    rne: "019870",
    precio: 180.00,
    modalidad: "Ambos (Virtual y Presencial)",
    foto: "https://images.unsplash.com/photo-1527613426441-2da1747cb7c6?auto=format&fit=crop&w=400&q=80",
    descripcion: "Neurólogo clínico enfocado en trastornos del sistema nervioso, migrañas crónicas y estudios electroencefalográficos.",
    horarios: ["09:00 AM", "12:00 PM", "04:00 PM"]
  },
  {
    id: "doc-5",
    nombre: "Dra. Elena Gómez",
    especialidad: "Dermatología",
    unidad: "dermatologia",
    cmp: "058740",
    rne: "039410",
    precio: 130.00,
    modalidad: "Virtual",
    foto: "https://images.unsplash.com/photo-1594824813576-652a65d56220?auto=format&fit=crop&w=400&q=80",
    descripcion: "Especialista en dermatología clínica y estética, cuidado de la piel, acné y prevención dermatológica avanzada.",
    horarios: ["08:00 AM", "11:30 AM", "03:30 PM"]
  }
];