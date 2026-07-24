export const categories = {
  business: {
    color: "blue",
    en: "Business Solutions",
    es: "Soluciones empresariales",
    description: {
      en: "Practical software that helps businesses manage operations, inventory, accounts payable workflows, and customer interactions.",
      es: "Software práctico que ayuda a los negocios a gestionar operaciones, inventario, flujos de cuentas por pagar e interacciones con clientes.",
    },
  },
  financial: {
    color: "green",
    en: "Financial Solutions",
    es: "Soluciones financieras",
    description: {
      en: "Focused experiences that help people understand their finances and make steadier decisions.",
      es: "Experiencias enfocadas que ayudan a entender las finanzas y tomar decisiones más firmes.",
    },
  },
  learning: {
    color: "cyan",
    en: "Learning Solutions",
    es: "Soluciones educativas",
    description: {
      en: "Pymeriq Learn It offers hands-on educational programs—live today with three web-development programs—so small businesses and future business owners have the tools to make it happen.",
      es: "Pymeriq Learn It ofrece programas educativos prácticos —hoy en vivo con tres programas de desarrollo web— para que pequeños negocios y futuros dueños tengan las herramientas para lograrlo.",
    },
  },
};

export const products = [
  {
    slug: "storefront",
    category: "business",
    status: "development",
    icon: "store",
    name: "Pymeriq Storefront",
    related: ["warehouse", "billing"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "A practical digital storefront designed around the daily reality of growing businesses.",
      description:
        "Bring products, orders, and customer touchpoints into one focused storefront experience. Storefront is being shaped to help SMEs build a useful online presence without unnecessary complexity.",
      audience: "Growing businesses that want a clearer way to present products and organize digital orders.",
      outcomes: ["Give customers a clear way to browse products", "Organize incoming orders", "Build a dependable digital presence"],
    },
    es: {
      summary: "Una tienda digital práctica diseñada alrededor de la realidad diaria de negocios en crecimiento.",
      description:
        "Integra productos, pedidos y puntos de contacto con clientes en una experiencia enfocada. Storefront se está diseñando para ayudar a las PYMEs a crear una presencia digital útil sin complejidad innecesaria.",
      audience: "Negocios en crecimiento que buscan presentar productos y organizar pedidos digitales con mayor claridad.",
      outcomes: ["Dar a los clientes una forma clara de explorar productos", "Organizar pedidos entrantes", "Crear una presencia digital confiable"],
    },
  },
  {
    slug: "warehouse",
    category: "business",
    status: "development",
    icon: "boxes",
    name: "Pymeriq Warehouse",
    related: ["storefront", "expiry-alerts", "codes"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "Clear operational visibility across inventory movement, stock levels, and warehouse activity.",
      description:
        "Warehouse is an ecosystem product focused on helping teams track inventory movement, stock levels, and warehouse activity with greater clarity.",
      audience: "Small operational teams that need dependable visibility into stock movement and priorities.",
      outcomes: ["See inventory movement and stock levels clearly", "Reduce operational blind spots", "Keep teams aligned"],
    },
    es: {
      summary: "Visibilidad operacional clara del movimiento de inventario, los niveles de existencias y la actividad del almacén.",
      description:
        "Warehouse es un producto del ecosistema enfocado en ayudar a los equipos a dar seguimiento al movimiento de inventario, los niveles de existencias y la actividad del almacén con mayor claridad.",
      audience: "Equipos operacionales pequeños que necesitan visibilidad confiable del movimiento y las prioridades de inventario.",
      outcomes: ["Ver claramente el movimiento de inventario y los niveles de existencias", "Reducir puntos ciegos", "Mantener equipos alineados"],
    },
  },
  {
    slug: "billing",
    category: "business",
    status: "coming",
    icon: "receipt",
    name: "Pymeriq AP",
    related: ["storefront", "warehouse"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "Clear accounts payable workflows for supplier invoices, approvals, due dates, and payment visibility.",
      description:
        "Pymeriq AP is being explored to help smaller teams organize supplier invoices, track payment obligations and due dates, coordinate approvals, and see what needs to be paid.",
      audience: "Smaller teams that need a focused, understandable way to manage accounts payable.",
      outcomes: ["Keep supplier invoices and payment obligations visible", "Coordinate approvals and due dates", "Improve payment visibility"],
    },
    es: {
      summary: "Flujos claros de cuentas por pagar para facturas de proveedores, aprobaciones, fechas de vencimiento y visibilidad de pagos.",
      description:
        "Pymeriq AP se está explorando para ayudar a equipos pequeños a organizar facturas de proveedores, dar seguimiento a obligaciones y fechas de vencimiento, coordinar aprobaciones y ver qué pagos requieren atención.",
      audience: "Equipos pequeños que necesitan una forma enfocada y fácil de entender para gestionar cuentas por pagar.",
      outcomes: ["Mantener visibles las facturas de proveedores y las obligaciones de pago", "Coordinar aprobaciones y fechas de vencimiento", "Mejorar la visibilidad de pagos"],
    },
  },
  {
    slug: "codes",
    category: "business",
    status: "ecosystem",
    icon: "qr",
    name: "Pymeriq Codes",
    related: ["warehouse", "expiry-alerts"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "Useful codes and labels that connect physical operations to digital information.",
      description:
        "Codes is an ecosystem concept for creating clearer connections between products, places, and the information teams need at the right moment.",
      audience: "Teams exploring better traceability between physical items and useful digital information.",
      outcomes: ["Identify items and access their information quickly", "Improve traceability", "Make access more immediate"],
    },
    es: {
      summary: "Códigos y etiquetas útiles que conectan operaciones físicas con información digital.",
      description:
        "Codes es un concepto del ecosistema para crear conexiones más claras entre productos, lugares y la información que los equipos necesitan en el momento correcto.",
      audience: "Equipos que exploran mejor trazabilidad entre artículos físicos e información digital útil.",
      outcomes: ["Identificar artículos y acceder rápidamente a su información", "Mejorar trazabilidad", "Dar acceso más inmediato"],
    },
  },
  {
    slug: "expiry-alerts",
    category: "business",
    status: "coming",
    icon: "bell",
    name: "Pymeriq Expiry Alerts",
    related: ["warehouse", "codes"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "Timely visibility into products and records approaching important dates.",
      description:
        "Expiry Alerts is a planned solution for turning important dates into useful, timely action across inventory and operational records.",
      audience: "Businesses that manage time-sensitive inventory, records, or recurring operational dates.",
      outcomes: ["See upcoming expirations before they become urgent", "Act before value is lost", "Build more consistent routines"],
    },
    es: {
      summary: "Visibilidad oportuna de productos y registros que se acercan a fechas importantes.",
      description:
        "Expiry Alerts es una solución planificada para convertir fechas importantes en acciones útiles y oportunas en inventario y registros operativos.",
      audience: "Negocios que manejan inventario, registros o fechas operacionales sensibles al tiempo.",
      outcomes: ["Ver próximos vencimientos antes de que sean urgentes", "Actuar antes de perder valor", "Crear rutinas consistentes"],
    },
  },
  {
    slug: "pf",
    category: "financial",
    status: "development",
    icon: "chart",
    name: "Pymeriq PF",
    related: ["learn-it"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "A personal finance direction centered on understanding, habits, and practical progress.",
      description:
        "PF is being developed to help people see their finances more clearly and turn that understanding into steadier everyday decisions.",
      audience: "People who want a calmer, more understandable approach to everyday personal finance.",
      outcomes: ["See the full personal finance picture clearly", "Build healthier habits", "Make informed decisions"],
    },
    es: {
      summary: "Una dirección de finanzas personales centrada en comprensión, hábitos y progreso práctico.",
      description:
        "PF se está desarrollando para ayudar a las personas a ver sus finanzas con mayor claridad y convertir esa comprensión en mejores decisiones cotidianas.",
      audience: "Personas que buscan una forma más tranquila y comprensible de manejar sus finanzas personales.",
      outcomes: ["Ver claramente el panorama completo de las finanzas personales", "Crear hábitos más saludables", "Tomar decisiones informadas"],
    },
  },
  {
    slug: "learn-it",
    category: "learning",
    status: "live",
    icon: "book",
    name: "Pymeriq Learn It",
    website: "https://learn.pymeriq.com",
    related: ["pf", "warehouse"],
    visuals: { card: null, detail: null, features: [] },
    en: {
      summary: "Hands-on educational programs where you learn to create by creating — live at learn.pymeriq.com.",
      description:
        "Learn It is Pymeriq's educational platform, live today. Three complete programs in Spanish teach real web development from absolute zero: build a web page (HTML, CSS, JavaScript), publish it on the internet, and turn it into an application that remembers data and talks to real APIs. Everything is typed by hand and verified against the real effect of your code — honest correction, no shortcuts. Areas like Business Administration and Accounting will follow.",
      audience: "Anyone who wants to learn to create with code from zero — small business owners, future business owners, and curious beginners.",
      outcomes: ["Learn by building: every line is typed and verified for real", "Three programs live: create a web page, publish it, and turn it into an application", "Free, in Spanish, at learn.pymeriq.com"],
    },
    es: {
      summary: "Programas educativos prácticos donde aprendes a crear, creando — en vivo en learn.pymeriq.com.",
      description:
        "Learn It es la plataforma educativa de Pymeriq, disponible hoy. Tres programas completos en español enseñan desarrollo web real desde cero absoluto: crear una página web (HTML, CSS, JavaScript), publicarla en internet, y convertirla en una aplicación que recuerda datos y conversa con APIs reales. Todo se teclea a mano y se verifica contra el efecto real del código — corrección honesta, sin atajos. Le seguirán áreas como Administración de Empresas y Contabilidad.",
      audience: "Cualquier persona que quiera aprender a crear con código desde cero — dueños de pequeños negocios, futuros dueños y principiantes curiosos.",
      outcomes: ["Aprender creando: cada línea se teclea y se verifica de verdad", "Tres programas en vivo: crea una página web, publícala y conviértela en aplicación", "Gratis, en español, en learn.pymeriq.com"],
    },
  },
];

export function productAssetDirectory(product) {
  return product.slug === "billing" ? "ap" : product.slug;
}

export const tutorials = [
  {
    slug: "organize-inventory-basics",
    category: "business",
    minutes: 6,
    date: "2026-05-28",
    en: {
      title: "A practical starting point for organizing inventory",
      excerpt: "Four decisions that create clearer stock visibility before adding more tools.",
      intro: "Clear inventory starts with shared definitions, not complex software.",
      outcome: "Create a simple inventory foundation your team can understand and repeat.",
      sections: [
        ["Start with what you need to know", "Choose the questions your inventory system must answer every day: what is available, where it is, and what needs attention."],
        ["Create one naming system", "Agree on simple product names and identifiers that every team member can recognize and use consistently."],
        ["Set a repeatable rhythm", "A small weekly review is more useful than a large cleanup that only happens when things go wrong."],
      ],
    },
    es: {
      title: "Un punto de partida práctico para organizar inventario",
      excerpt: "Cuatro decisiones que crean mayor visibilidad antes de añadir más herramientas.",
      intro: "Un inventario claro comienza con definiciones compartidas, no con software complejo.",
      outcome: "Crear una base simple de inventario que tu equipo pueda entender y repetir.",
      sections: [
        ["Comienza con lo que necesitas saber", "Elige las preguntas que tu sistema debe contestar cada día: qué hay disponible, dónde está y qué requiere atención."],
        ["Crea un solo sistema de nombres", "Define nombres e identificadores simples que todo el equipo pueda reconocer y usar consistentemente."],
        ["Establece un ritmo repetible", "Una revisión semanal pequeña es más útil que una limpieza grande que solo ocurre cuando algo falla."],
      ],
    },
  },
  {
    slug: "operational-tool-checklist",
    category: "learning",
    minutes: 5,
    date: "2026-05-14",
    en: {
      title: "How to decide if a tool solves a real operational problem",
      excerpt: "A short checklist for separating useful technology from unnecessary complexity.",
      intro: "The best tool is not the one with the longest feature list. It is the one that improves a real routine.",
      outcome: "Evaluate a tool by the operational result it can realistically improve.",
      sections: [
        ["Name the friction", "Describe the repeated problem in plain language before evaluating any solution."],
        ["Define a useful result", "Decide what should become faster, clearer, or more reliable after the tool is introduced."],
        ["Test the daily fit", "Consider who will use it, when they will use it, and whether it fits the way the work actually happens."],
      ],
    },
    es: {
      title: "Cómo decidir si una herramienta resuelve un problema operacional real",
      excerpt: "Una lista corta para separar tecnología útil de complejidad innecesaria.",
      intro: "La mejor herramienta no es la que tiene más funciones. Es la que mejora una rutina real.",
      outcome: "Evaluar una herramienta por el resultado operacional que realmente puede mejorar.",
      sections: [
        ["Nombra la fricción", "Describe el problema repetido en lenguaje sencillo antes de evaluar cualquier solución."],
        ["Define un resultado útil", "Decide qué debe ser más rápido, claro o confiable después de introducir la herramienta."],
        ["Evalúa su uso diario", "Considera quién la usará, cuándo y si encaja con la forma en que el trabajo realmente ocurre."],
      ],
    },
  },
  {
    slug: "personal-finance-weekly-review",
    category: "financial",
    minutes: 7,
    date: "2026-04-30",
    en: {
      title: "Build a calmer weekly personal finance review",
      excerpt: "A lightweight routine for understanding your money without watching it every day.",
      intro: "A consistent twenty-minute review can create more clarity than reacting to every transaction.",
      outcome: "Build a lightweight weekly routine that turns financial information into one useful next action.",
      sections: [
        ["Choose one weekly moment", "Pick a time you can protect and make it the default moment for reviewing your finances."],
        ["Review the important signals", "Look at balances, upcoming commitments, and unusual activity before going into individual details."],
        ["Choose one next action", "End each review with one concrete action so information turns into useful progress."],
      ],
    },
    es: {
      title: "Crea una revisión semanal de finanzas personales más tranquila",
      excerpt: "Una rutina liviana para entender tu dinero sin vigilarlo todos los días.",
      intro: "Una revisión consistente de veinte minutos puede crear más claridad que reaccionar a cada transacción.",
      outcome: "Crear una rutina semanal liviana que convierta información financiera en una próxima acción útil.",
      sections: [
        ["Elige un momento semanal", "Escoge un tiempo que puedas proteger y conviértelo en tu momento habitual para revisar tus finanzas."],
        ["Revisa las señales importantes", "Observa balances, compromisos próximos y actividad inusual antes de entrar en cada detalle."],
        ["Elige una próxima acción", "Termina cada revisión con una acción concreta para convertir información en progreso útil."],
      ],
    },
  },
];

export const content = {
  en: {
    nav: { products: "Products", tutorials: "Tutorials", about: "About", contact: "Contact", admin: "Admin" },
    actions: { learn: "View product direction", allProducts: "Explore products", allTutorials: "Read practical guides", contact: "Start a conversation", read: "Read practical guide", back: "Back to", visit: "Visit the live site" },
    status: { development: "In development", coming: "Coming soon", ecosystem: "Ecosystem concept", live: "Live now" },
    accessibility: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      navigation: "Main navigation",
      ecosystem: "Pymeriq ecosystem",
      switchLanguage: "Switch to Spanish",
    },
    placeholders: { email: "you@company.com" },
  },
  es: {
    nav: { products: "Productos", tutorials: "Tutoriales", about: "Nosotros", contact: "Contacto", admin: "Admin" },
    actions: { learn: "Ver dirección del producto", allProducts: "Explorar productos", allTutorials: "Leer guías prácticas", contact: "Comienza una conversación", read: "Leer guía práctica", back: "Volver a", visit: "Visitar el sitio en vivo" },
    status: { development: "En desarrollo", coming: "Próximamente", ecosystem: "Concepto del ecosistema", live: "Disponible" },
    accessibility: {
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      navigation: "Navegación principal",
      ecosystem: "Ecosistema Pymeriq",
      switchLanguage: "Cambiar a inglés",
    },
    placeholders: { email: "tu@empresa.com" },
  },
};

export const publicContent = {
  en: {
    footer: {
      description: "Practical technology for business, finance, and learning.",
      explore: "Explore",
      connect: "Connect",
    },
    home: {
      kicker: "Business operations. Personal finance. Practical learning.",
      title: 'One <span class="accent">practical</span> ecosystem for work, money, and skills.',
      lede: "Pymeriq brings together focused solutions for small and medium businesses, people managing their finances, and learners building useful skills.",
      ctas: { products: "Explore products", tutorials: "Read practical guides", contact: "Start a conversation" },
      proofLabel: "Why the name Pymeriq",
      proofPoints: [
        ["PYME", "For small and medium businesses"],
        ["Research", "Improve through research"],
        ["IQ", "Apply knowledge practically"],
      ],
      ecosystemLabel: "Three connected directions",
      satellites: {
        business: ["Business", "Tools for operations"],
        finance: ["Finance", "Tools for better decisions"],
        learning: ["Learning", "Tools for practical knowledge"],
      },
      ecosystemMapLabel: "Ecosystem product map",
      ecosystemMap: [
        ["Business", "Storefront, Warehouse, AP"],
        ["Finance", "PF"],
        ["Learning", "Learn It"],
      ],
      categoriesKicker: "Why one ecosystem",
      categoriesTitle: "Everyday problems rarely stay in one area.",
      categoriesText: "Clearer operations, steadier personal finances, and useful skills can reinforce each other. Pymeriq develops focused solutions across all three.",
      featuredKicker: "Products in the ecosystem",
      featuredTitle: "Focused products for<br>specific needs.",
      featuredText: "These product directions turn the three solution areas into practical tools, with clear purposes and transparent development status.",
      whyKicker: "Why Pymeriq",
      whyTitle: "Technology should earn its place.",
      whyText: "We begin with the work, decision, or habit that needs to improve. Then we research what can become clearer, simpler, and more dependable.",
      whyPoints: [
        ["Start with reality", "Pay attention to how people and smaller teams actually work."],
        ["Research the friction", "Look closely at what can become clearer, simpler, and more dependable."],
        ["Build for progress", "Use technology where it helps someone make a better next move."],
      ],
      learningKicker: "Pymeriq Learn It",
      learningTitle: "Educational programs, live today.",
      learningText: "Learn It's first three programs are live at learn.pymeriq.com: create a web page, publish it on the internet, and turn it into a real application — free, hands-on, with honest correction. These practical guides complement them.",
    },
    products: {
      kicker: "One ecosystem. Clear product directions.",
      title: "Practical products,<br><em>purposefully connected.</em>",
      text: "Explore focused solutions for operations, personal finance, and learning. Every product page explains its purpose, intended audience, and current status.",
      all: "All solutions",
      gridTitle: "Product directions",
    },
    productDetail: {
      purpose: "Product purpose",
      purposeTitle: "Built around the work that needs to happen.",
      valueLabel: "Practical value",
      audience: "Who it is for",
      capabilities: "Key capabilities",
      expectationTitle: "Current expectation",
      expectations: {
        development: "This product is actively being shaped. Its direction is clear, while availability and final scope will be shared as development progresses.",
        coming: "This is a planned product direction. Pymeriq will publish availability and confirmed capabilities when they are ready.",
        ecosystem: "This is an ecosystem concept that shows where Pymeriq is researching practical value. It is not presented as a launched product.",
        live: "This product is live and free to use today. Visit it and start — no account required.",
      },
      related: "Related ecosystem products",
      relatedTitle: "Part of a connected ecosystem.",
      visuals: "Product visuals",
      visualsTitle: "See the product direction in practice.",
    },
    tutorials: {
      kicker: "Pymeriq Learn It · Practical guides",
      title: "Practical knowledge<br><em>for useful progress.</em>",
      text: "These guides turn operational questions, financial habits, and technology decisions into clear actions you can test and repeat.",
      principle: "These guides are Pymeriq Learn It's free companion. The complete programs — starting with web development — are live at learn.pymeriq.com.",
      guideLabel: "Practical guide",
      minutesLabel: "min read",
      categoryLabels: { business: "Business guide", financial: "Financial guide", learning: "Learning guide" },
      outcome: "What this guide helps you do",
      gridTitle: "Practical guides",
      inThisGuide: "In this guide",
      calloutTitle: "Keep it practical",
      calloutText: "Choose one useful change from this guide and make it repeatable before adding more.",
    },
    about: {
      kicker: "Practical technology, built with purpose.",
      title: "Built from real problems.<br><em>Guided by useful intelligence.</em>",
      text: "Pymeriq is the parent brand for a growing ecosystem of practical business, financial, and learning solutions.",
      nameKicker: "Inside the name",
      nameTitle: "A name built from our way of working.",
      nameParts: {
        pyme: "The small and medium businesses whose real operating needs keep us grounded.",
        research: "Research: the habit of looking closely and asking what can work better.",
        iq: "Intelligence, knowledge, and learning applied to practical progress.",
      },
      operatorKicker: "An operator perspective",
      operatorTitle: "Start with how the work actually happens.",
      operatorText: "Pymeriq approaches technology from the work outward: observe the repeated friction, understand the people and decisions involved, and build only what can create a clearer next step.",
      operatorFlow: ["Observe the work", "Research the friction", "Build the useful step"],
      evolutionKicker: "One connected ecosystem",
      evolutionTitle: "Practical solutions shaped around real needs.",
      evolutionText: "Pymeriq connects business, financial, and learning solutions through one practical point of view: understand the problem, research what can work better, and build toward useful progress.",
    },
    contact: {
      kicker: "Contact Pymeriq",
      title: "Start with the problem<br><em>worth understanding.</em>",
      text: "Ask about the ecosystem, share an operational challenge, or explore a thoughtful collaboration. Clear context helps us have a more useful conversation.",
      emailTitle: "Email Pymeriq",
      emailText: "Every message is read directly by the team.",
      emailNote: "We reply within 1–2 business days.",
    },
    cta: { kicker: "Move the useful idea forward", title: "What needs a clearer solution?" },
    notFound: { title: "This path is still being researched.", action: "Return home" },
  },
  es: {
    footer: {
      description: "Tecnología práctica para negocios, finanzas y aprendizaje.",
      explore: "Explora",
      connect: "Conecta",
    },
    home: {
      kicker: "Operaciones de negocio. Finanzas personales. Aprendizaje práctico.",
      title: 'Un ecosistema <span class="accent">práctico</span> para el trabajo, el dinero y las destrezas.',
      lede: "Pymeriq reúne soluciones enfocadas para pequeños y medianos negocios, personas que gestionan sus finanzas y quienes desarrollan destrezas útiles.",
      ctas: { products: "Explorar productos", tutorials: "Leer guías prácticas", contact: "Comienza una conversación" },
      proofLabel: "Por qué el nombre Pymeriq",
      proofPoints: [
        ["PYME", "Para pequeños y medianos negocios"],
        ["Research", "Mejorar mediante investigación"],
        ["IQ", "Aplicar conocimiento en la práctica"],
      ],
      ecosystemLabel: "Tres direcciones conectadas",
      satellites: {
        business: ["Negocios", "Herramientas para operaciones"],
        finance: ["Finanzas", "Herramientas para mejores decisiones"],
        learning: ["Aprendizaje", "Herramientas para conocimiento práctico"],
      },
      ecosystemMapLabel: "Mapa de productos del ecosistema",
      ecosystemMap: [
        ["Negocios", "Storefront, Warehouse, AP"],
        ["Finanzas", "PF"],
        ["Aprendizaje", "Learn It"],
      ],
      categoriesKicker: "Por qué un ecosistema",
      categoriesTitle: "Los problemas cotidianos rara vez permanecen en una sola área.",
      categoriesText: "Operaciones más claras, finanzas personales más estables y destrezas útiles pueden fortalecerse entre sí. Pymeriq desarrolla soluciones enfocadas para las tres.",
      featuredKicker: "Productos del ecosistema",
      featuredTitle: "Productos enfocados para<br>necesidades específicas.",
      featuredText: "Estas direcciones convierten las tres áreas de solución en herramientas prácticas, con propósitos claros y estados de desarrollo transparentes.",
      whyKicker: "Por qué Pymeriq",
      whyTitle: "La tecnología debe ganarse su lugar.",
      whyText: "Comenzamos con el trabajo, la decisión o el hábito que necesita mejorar. Luego investigamos qué puede ser más claro, simple y confiable.",
      whyPoints: [
        ["Comenzar con la realidad", "Prestar atención a cómo realmente trabajan las personas y equipos pequeños."],
        ["Investigar la fricción", "Observar qué puede ser más claro, simple y confiable."],
        ["Crear para progresar", "Usar tecnología donde ayude a tomar un mejor próximo paso."],
      ],
      learningKicker: "Pymeriq Learn It",
      learningTitle: "Programas educativos, en vivo hoy.",
      learningText: "Los primeros tres programas de Learn It están en vivo en learn.pymeriq.com: crea una página web, publícala en internet y conviértela en una aplicación real — gratis, práctico y con corrección honesta. Estas guías prácticas los complementan.",
    },
    products: {
      kicker: "Un ecosistema. Direcciones claras.",
      title: "Productos prácticos,<br><em>conectados con propósito.</em>",
      text: "Explora soluciones enfocadas en operaciones, finanzas personales y aprendizaje. Cada página explica su propósito, audiencia y estado actual.",
      all: "Todas las soluciones",
      gridTitle: "Direcciones de producto",
    },
    productDetail: {
      purpose: "Propósito del producto",
      purposeTitle: "Creado alrededor del trabajo que hay que hacer.",
      valueLabel: "Valor práctico",
      audience: "Para quién es",
      capabilities: "Capacidades clave",
      expectationTitle: "Expectativa actual",
      expectations: {
        development: "Este producto se está desarrollando activamente. Su dirección es clara, mientras la disponibilidad y el alcance final se compartirán según avance el desarrollo.",
        coming: "Esta es una dirección de producto planificada. Pymeriq publicará su disponibilidad y capacidades confirmadas cuando estén listas.",
        ecosystem: "Este es un concepto del ecosistema que muestra dónde Pymeriq investiga valor práctico. No se presenta como un producto lanzado.",
        live: "Este producto está en vivo y es gratuito hoy. Entra y comienza — sin necesidad de cuenta.",
      },
      related: "Productos relacionados del ecosistema",
      relatedTitle: "Parte de un ecosistema conectado.",
      visuals: "Visuales del producto",
      visualsTitle: "Conoce la dirección del producto en la práctica.",
    },
    tutorials: {
      kicker: "Pymeriq Learn It · Guías prácticas",
      title: "Conocimiento práctico<br><em>para progreso útil.</em>",
      text: "Estas guías convierten preguntas operacionales, hábitos financieros y decisiones tecnológicas en acciones claras que puedes probar y repetir.",
      principle: "Estas guías son el complemento gratuito de Pymeriq Learn It. Los programas completos —empezando con desarrollo web— están en vivo en learn.pymeriq.com.",
      guideLabel: "Guía práctica",
      minutesLabel: "min de lectura",
      categoryLabels: { business: "Guía empresarial", financial: "Guía financiera", learning: "Guía de aprendizaje" },
      outcome: "Lo que esta guía te ayuda a lograr",
      gridTitle: "Guías prácticas",
      inThisGuide: "En esta guía",
      calloutTitle: "Mantenlo práctico",
      calloutText: "Elige un cambio útil de esta guía y hazlo repetible antes de añadir más.",
    },
    about: {
      kicker: "Tecnología práctica, creada con propósito.",
      title: "Creado desde problemas reales.<br><em>Guiado por inteligencia útil.</em>",
      text: "Pymeriq es la marca matriz de un ecosistema en crecimiento de soluciones prácticas para negocios, finanzas y aprendizaje.",
      nameKicker: "Dentro del nombre",
      nameTitle: "Un nombre creado desde nuestra forma de trabajar.",
      nameParts: {
        pyme: "Las pequeñas y medianas empresas cuyas necesidades reales nos mantienen enfocados.",
        research: "Research: el hábito de observar y preguntar qué puede funcionar mejor.",
        iq: "Inteligencia, conocimiento y aprendizaje aplicados al progreso práctico.",
      },
      operatorKicker: "Una perspectiva operacional",
      operatorTitle: "Comenzar con cómo ocurre el trabajo.",
      operatorText: "Pymeriq aborda la tecnología desde el trabajo hacia afuera: observa la fricción repetida, entiende a las personas y decisiones involucradas, y crea solo lo que puede producir un próximo paso más claro.",
      operatorFlow: ["Observar el trabajo", "Investigar la fricción", "Crear el paso útil"],
      evolutionKicker: "Un ecosistema conectado",
      evolutionTitle: "Soluciones prácticas creadas alrededor de necesidades reales.",
      evolutionText: "Pymeriq conecta soluciones de negocio, finanzas y aprendizaje mediante un punto de vista práctico: entender el problema, investigar qué puede funcionar mejor y construir hacia un progreso útil.",
    },
    contact: {
      kicker: "Contacta a Pymeriq",
      title: "Comienza con el problema<br><em>que vale entender.</em>",
      text: "Pregunta sobre el ecosistema, comparte un reto operacional o explora una colaboración con propósito. Un contexto claro ayuda a tener una conversación más útil.",
      emailTitle: "Escríbele a Pymeriq",
      emailText: "Cada mensaje lo lee directamente el equipo.",
      emailNote: "Respondemos en 1–2 días hábiles.",
    },
    cta: { kicker: "Lleva la idea útil hacia adelante", title: "¿Qué problema necesita una solución más clara?" },
    notFound: { title: "Esta ruta todavía está bajo investigación.", action: "Volver al inicio" },
  },
};

export const contactSubmissionTemplate = {
  id: "",
  name: "",
  email: "",
  topic: "",
  message: "",
  status: "new",
  submittedAt: "",
};

export const contactSubmissions = [];

export const companyContent = {
  brandName: "Pymeriq",
  previousBrandName: "Solveniq",
  defaultLocale: "en",
  supportedLocales: ["en", "es"],
};

export const siteSettings = {
  contactEmail: "hello@pymeriq.com",
  canonicalOrigin: "https://pymeriq.com",
  websiteStatus: "Foundation / prototype",
  brandTransition: {
    visible: true,
    currentCopyright: "© 2026 Pymeriq",
    futureCopyright: "© Pymeriq",
  },
};

export const routeMetadata = {
  en: {
    home: {
      title: "Pymeriq | A practical technology ecosystem",
      description: "Explore Pymeriq's connected ecosystem of practical solutions for business operations, personal finance, and learning.",
    },
    products: {
      title: "Products | Pymeriq",
      description: "Explore practical Pymeriq products with clear purposes, audiences, capabilities, and current ecosystem statuses.",
    },
    tutorials: {
      title: "Tutorials | Pymeriq",
      description: "Learn from practical Pymeriq guides for operations, financial habits, and better technology decisions.",
    },
    about: {
      title: "About Pymeriq",
      description: "Learn the meaning of Pymeriq and how its operator perspective shapes practical technology for real problems.",
    },
    contact: {
      title: "Contact | Pymeriq",
      description: "Contact Pymeriq about the ecosystem, an operational challenge, product directions, or thoughtful collaboration.",
    },
    notFound: {
      title: "Page not found | Pymeriq",
      description: "The requested Pymeriq page could not be found.",
    },
  },
  es: {
    home: {
      title: "Pymeriq | Un ecosistema de tecnología práctica",
      description: "Explora el ecosistema conectado de Pymeriq para operaciones de negocio, finanzas personales y aprendizaje.",
    },
    products: {
      title: "Productos | Pymeriq",
      description: "Explora productos prácticos de Pymeriq con propósitos, audiencias, capacidades y estados actuales claros.",
    },
    tutorials: {
      title: "Tutoriales | Pymeriq",
      description: "Aprende con guías prácticas de Pymeriq para operaciones, hábitos financieros y mejores decisiones tecnológicas.",
    },
    about: {
      title: "Nosotros | Pymeriq",
      description: "Conoce el significado de Pymeriq y cómo su perspectiva operacional guía tecnología práctica para problemas reales.",
    },
    contact: {
      title: "Contacto | Pymeriq",
      description: "Contacta a Pymeriq sobre el ecosistema, un reto operacional, productos o colaboraciones con propósito.",
    },
    notFound: {
      title: "Página no encontrada | Pymeriq",
      description: "No se pudo encontrar la página solicitada de Pymeriq.",
    },
  },
};

export const adminEntities = [
  { name: "Product", count: products.length, path: "products" },
  { name: "TutorialArticle", count: tutorials.length, path: "tutorials" },
  { name: "ContactSubmission", count: contactSubmissions.length, path: "contacts" },
  { name: "CompanyContent", count: Object.keys(companyContent).length ? 1 : 0, path: "company" },
  { name: "SiteSettings", count: Object.keys(siteSettings).length ? 1 : 0, path: "company" },
];
