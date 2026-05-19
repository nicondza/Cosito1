const firebaseConfig = {
  apiKey: 'AIzaSyCBeFZHDdt2av9I4d0EN_fFSugZ7f9prKQ',
  authDomain: 'bestiario-9a59a.firebaseapp.com',
  databaseURL: 'https://bestiario-9a59a-default-rtdb.firebaseio.com',
  projectId: 'bestiario-9a59a',
  storageBucket: 'bestiario-9a59a.firebasestorage.app',
  messagingSenderId: '877990974200',
  appId: '1:877990974200:web:f94f40c25ea9c7fb52210d',
  measurementId: 'G-V3TK3ZS1VQ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();
const charactersRef = database.ref('characters');

const buttons = document.querySelectorAll('.menu-btn');
const panels = document.querySelectorAll('.panel');
const personajesPanel = document.querySelector('#personajes');
const addCharacterButton = document.querySelector('.add-character-btn');

const characterTypes = [
  { type: 'Brujas', clans: ['Luna Carmesí', 'Hijas del Caldero', 'Las Espinas Negras', 'Coven Eclipse'] },
  { type: 'Vampiros', clans: ['Sangre Antigua', 'Noctis', 'Dracul Vesper', 'Hijos del Último Colmillo'] },
  { type: 'Fantasmas', clans: ['Ecos Vacíos', 'Los Errantes', 'Susurro Gris', 'Cadena Eterna'] },
  { type: 'Demonios', clans: ['Fuego Abisal', 'Devoralmas', 'Cuernos Rojos', 'Trono Infernal'] },
  { type: 'Ángeles', clans: ['Corona Celeste', 'Alas del Alba', 'Virtud Suprema', 'Los Vigilantes'] },
  { type: 'Licántropos', clans: ['Colmillo Lunar', 'Manada Gris', 'Sangre Salvaje', 'Hijos del Bosque Negro'] },
  { type: 'Nigromantes', clans: ['Mano Sepulcral', 'Reyes del Osario', 'Culto del Fin', 'Los Resucitados'] },
  { type: 'Dragones', clans: ['Escama Dorada', 'Furia Volcánica', 'Alas Eternas', 'Trono Dracónido'] },
  { type: 'Sirenas', clans: ['Marea Azul', 'Canto Mortal', 'Hijas del Coral Negro', 'Las Ahogadoras'] },
  { type: 'Cazadores', clans: ['Orden Plateada', 'Los Exiliados', 'Cruz de Hierro', 'Ojo del Cuervo'] },
  { type: 'Hadas', clans: ['Polvo Lunar', 'Jardín Viviente', 'Corte Esmeralda', 'Alas de Cristal'] },
  { type: 'Titanes', clans: ['Rompemontes', 'Hijos del Trueno', 'Colosos del Norte', 'Sangre de Piedra'] },
  { type: 'Espíritus', clans: ['Llama Serena', 'Los Transparentes', 'Viento Antiguo', 'Ceniza Blanca'] },
  { type: 'Elfos Oscuros', clans: ['Sombras de Ébano', 'Corte Nocturna', 'Dagas Violetas', 'Veneno Silente'] },
  { type: 'Paladines', clans: ['Sol Inmortal', 'Martillo Sagrado', 'Juramento Real', 'Guardia del Alba'] },
  { type: 'Asesinos', clans: ['Diente Negro', 'La Última Sombra', 'Silencio Carmesí', 'Manos Invisibles'] },
  { type: 'Magos', clans: ['Torre Arcana', 'Ojo Astral', 'Biblioteca Prohibida', 'Hijos del Vacío'] },
  { type: 'Elementales', clans: ['Clan Ígneo', 'Hijos del Tifón', 'Corazón Glacial', 'Raíz Primordial'] },
  { type: 'Gárgolas', clans: ['Piedra Viva', 'Vigías Eternos', 'Alas de Mármol', 'Guardianes de Catedral'] },
  { type: 'Reapers', clans: ['La Guadaña', 'Fin Absoluto', 'Custodios del Umbral', 'Hueso Negro'] },
  { type: 'Orcos', clans: ['Mandíbula Roja', 'Hacha Salvaje', 'Cráneo Partido', 'Guerreros del Pantano'] },
  { type: 'Goblins', clans: ['Dedos Largos', 'Ratas Verdes', 'Dinamita Negra', 'Los Chatarreros'] },
  { type: 'Alquimistas', clans: ['Oro Filosofal', 'Frascos Prohibidos', 'Vapor Esmeralda', 'Elixir Supremo'] },
  { type: 'Caballeros Malditos', clans: ['Armadura Vacía', 'Cruz Sangrienta', 'Los Caídos', 'Hierro Profano'] },
  { type: 'Bestias Mutantes', clans: ['Carne Tóxica', 'Colmillos Rotos', 'Laboratorio X', 'Hijos del Error'] },
  { type: 'Monjes', clans: ['Puño Celestial', 'Camino Silente', 'Lotus Negro', 'Respiración Divina'] },
  { type: 'Piratas', clans: ['Marea Roja', 'Kraken Negro', 'La Calavera Azul', 'Tempestad Salvaje'] },
  { type: 'Androides', clans: ['Código Omega', 'Titanio Vivo', 'Unidad Eclipse', 'Protocolos Negros'] },
  { type: 'Cyborgs', clans: ['Carne Mecánica', 'Acero Neural', 'División Hex', 'Núcleo Fantasma'] },
  { type: 'Mutantes', clans: ['ADN Caos', 'Hijos Gamma', 'Sangre Rota', 'Evolución X'] },
  { type: 'Samuráis', clans: ['Flor Carmesí', 'Acero Blanco', 'Dragón del Este', 'Luna Cortante'] },
  { type: 'Ninjas', clans: ['Niebla Negra', 'Serpiente Silente', 'Clan Kage', 'Ojos Rojos'] },
  { type: 'Dioses Antiguos', clans: ['Panteón Perdido', 'Los Primordiales', 'Trono Estelar', 'Ojo Cósmico'] },
  { type: 'Marionetistas', clans: ['Hilos Malditos', 'Teatro Sangriento', 'Sonrisa de Madera', 'Dedos Eternos'] },
  { type: 'Payasos Oscuros', clans: ['Circo Infernal', 'Carcajada Muerta', 'Máscara Rota', 'Fiesta Macabra'] },
  { type: 'Espantapájaros', clans: ['Campo Muerto', 'Paja Maldita', 'Ojos de Cuervo', 'Harvest Doom'] },
  { type: 'Científicos Locos', clans: ['Laboratorio Omega', 'Cerebros Rotos', 'Proyecto Caos', 'Neo Frankenstein'] },
  { type: 'Ángeles Caídos', clans: ['Alas Negras', 'Exilio Divino', 'Pecado Celestial', 'Trono Quebrado'] },
  { type: 'Parásitos', clans: ['Hambre Eterna', 'Carne Ajena', 'Enjambre Negro', 'Los Infectados'] },
  { type: 'Brujos del Tiempo', clans: ['Arena Infinita', 'Reloj Carmesí', 'Hijos del Segundo Final', 'Eclipse Temporal'] },
  { type: 'Gladiadores', clans: ['Arena Roja', 'Coloso Imperial', 'Bestias del Coliseo', 'Cadena de Oro'] },
  { type: 'Djinns', clans: ['Lámpara Negra', 'Deseo Maldito', 'Arena Azul', 'Fuego del Desierto'] },
  { type: 'Robots Bélicos', clans: ['Unidad Ragnarok', 'Hierro Brutal', 'Omega Titan', 'Guerra Nuclear'] },
  { type: 'Revenants', clans: ['Los Regresados', 'Tumba Vacía', 'Sangre del Más Allá', 'Venganza Eterna'] },
  { type: 'Druidas', clans: ['Bosque Viviente', 'Colmillo Verde', 'Raíz Antigua', 'Hijos del Roble'] },
  { type: 'Inquisidores', clans: ['Cruz Blanca', 'Fuego Purificador', 'Veredicto Final', 'Los Penitentes'] },
  { type: 'Arlequines', clans: ['Sonrisa Escarlata', 'Cartas del Caos', 'Danza Torcida', 'Teatro Lunar'] },
  { type: 'Serafines', clans: ['Séptima Luz', 'Corona Dorada', 'Alas Eternas', 'Juicio Celestial'] },
  { type: 'Quimeras', clans: ['Carne Fusionada', 'Bestia Alfa', 'Proyecto Génesis', 'Mil Fauces'] },
  { type: 'Hijos del Vacío', clans: ['Eclipse Negro', 'La Nada Viva', 'Estrellas Muertas', 'Fin del Cosmos'] },
];

const typeColorPalette = [
  '#8e44ad', '#8b0000', '#b7c7d9', '#d35400', '#f1c40f',
  '#7f8c8d', '#4b0082', '#c0392b', '#00a8cc', '#c0c0c0',
  '#2ecc71', '#a0522d', '#dfe6e9', '#2c3e50', '#f39c12',
  '#111111', '#3498db', '#16a085', '#6c7a89', '#34495e',
  '#27ae60', '#7fbf3f', '#f5b041', '#5d6d7e', '#9b59b6',
  '#d6a2e8', '#1f618d', '#95a5a6', '#00bcd4', '#e056fd',
  '#e74c3c', '#2d3436', '#6c5ce7', '#8e5a2a', '#e84393',
  '#c2b280', '#48c9b0', '#2f3640', '#6ab04c', '#f6b93b',
  '#e67e22', '#00cec9', '#7f8fa6', '#7b241c', '#145a32',
  '#ecf0f1', '#ff7675', '#ffd700', '#e17055', '#000814',
];

const characterTypeColors = Object.fromEntries(
  characterTypes.map((entry, index) => [entry.type, typeColorPalette[index]]),
);

const storageKey = 'cronicas-personajes';
const migrationKey = 'cronicas-personajes-firebase-migrated';
const localCharacters = JSON.parse(localStorage.getItem(storageKey) || '[]');
let characters = [];
let filePreview = '';
let activeProfileId = null;
let hasReceivedFirebaseData = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;

    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === targetId);
    });
  });
});

function getCharacterRef(characterId) {
  return database.ref(`characters/${characterId}`);
}

function getTimestamp() {
  return new Date().toISOString();
}

function setSyncStatus(message, type = 'loading') {
  const status = document.querySelector('.firebase-status');
  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.status = type;
}

function normalizeCharacter(character, fallbackId) {
  const now = getTimestamp();

  return {
    id: character.id || fallbackId || crypto.randomUUID(),
    name: character.name || '',
    type: character.type || '',
    clan: character.clan || '',
    magic: character.magic || '',
    strength: character.strength || '',
    intelligence: character.intelligence || '',
    speed: character.speed || '',
    story: character.story || '',
    image: character.image || '',
    createdAt: character.createdAt || now,
    updatedAt: character.updatedAt || now,
  };
}

async function saveCharacter(character) {
  const timestamp = getTimestamp();
  const characterToSave = normalizeCharacter({
    ...character,
    createdAt: character.createdAt || timestamp,
    updatedAt: timestamp,
  });

  await getCharacterRef(characterToSave.id).set(characterToSave);
}

async function migrateLocalCharacters() {
  if (localStorage.getItem(migrationKey) === 'true' || !localCharacters.length || characters.length) {
    return;
  }

  await Promise.all(localCharacters.map((character) => saveCharacter(normalizeCharacter(character))));
  localStorage.setItem(migrationKey, 'true');
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return entities[character];
  });
}

function hexToRgb(hexColor) {
  const normalizedHex = hexColor.replace('#', '');
  const colorNumber = Number.parseInt(normalizedHex, 16);

  return {
    red: (colorNumber >> 16) & 255,
    green: (colorNumber >> 8) & 255,
    blue: colorNumber & 255,
  };
}

function mixColor(hexColor, targetColor, weight) {
  const base = hexToRgb(hexColor);
  const target = hexToRgb(targetColor);
  const mixed = ['red', 'green', 'blue'].map((channel) => {
    const value = Math.round(base[channel] * (1 - weight) + target[channel] * weight);
    return value.toString(16).padStart(2, '0');
  });

  return `#${mixed.join('')}`;
}

function getTypeColorStyles(type) {
  const typeColor = characterTypeColors[type] || '#b4862e';
  const typeColorDark = mixColor(typeColor, '#000000', 0.45);
  const typeColorLight = mixColor(typeColor, '#ffffff', 0.35);

  return [
    `--type-color: ${typeColor}`,
    `--type-color-dark: ${typeColorDark}`,
    `--type-color-light: ${typeColorLight}`,
  ].join('; ');
}

function updateTypeColorPreview() {
  const typeSelect = document.querySelector('#character-type');
  const colorPreview = document.querySelector('.type-color-preview');
  const selectedColor = characterTypeColors[typeSelect.value];

  if (!selectedColor) {
    colorPreview.style.cssText = '';
    colorPreview.textContent = 'Selecciona un tipo para ver su color asignado.';
    return;
  }

  colorPreview.style.cssText = getTypeColorStyles(typeSelect.value);
  colorPreview.innerHTML = `Color asignado: <strong>${typeSelect.value}</strong>`;
}

function renderCharacterCard(character) {
  const safeName = escapeHtml(character.name);
  const safeImage = escapeHtml(character.image);
  const imageMarkup = character.image
    ? `<img class="character-card-image" src="${safeImage}" alt="Imagen de ${safeName}">`
    : '<div class="character-card-image placeholder-image">Sin imagen</div>';

  return `
    <button class="character-card" type="button" data-character-id="${escapeHtml(character.id)}" style="${getTypeColorStyles(character.type)}" aria-label="Abrir perfil de ${safeName}">
      <span class="character-card-header">${safeName}</span>
      ${imageMarkup}
      <span class="character-card-footer">
        <span class="meta"><strong>Tipo:</strong> <span class="character-type-pill">${escapeHtml(character.type)}</span></span>
        <span class="meta"><strong>Clan:</strong> ${escapeHtml(character.clan)}</span>
        <span class="stats-list" aria-label="Atributos de ${safeName}">
          <span>Magia: ${escapeHtml(character.magic)}</span>
          <span>Fuerza: ${escapeHtml(character.strength)}</span>
          <span>Inteligencia: ${escapeHtml(character.intelligence)}</span>
          <span>Velocidad: ${escapeHtml(character.speed)}</span>
        </span>
        <span class="character-card-cta">Ver perfil y editar</span>
      </span>
    </button>
  `;
}

function renderGallery() {
  const gallery = document.querySelector('.character-gallery');
  gallery.innerHTML = characters.length
    ? characters.map(renderCharacterCard).join('')
    : '<p class="empty-gallery">Todavía no hay personajes guardados.</p>';
}

function closeProfile() {
  activeProfileId = null;
  document.querySelector('.character-profile').classList.add('hidden');
  document.querySelector('.character-gallery').classList.remove('hidden');
  addCharacterButton.classList.remove('hidden');
}

function updateProfileClanOptions(selectedClan = '') {
  const typeSelect = document.querySelector('#profile-character-type');
  const clanSelect = document.querySelector('#profile-character-clan');
  const selectedType = characterTypes.find((entry) => entry.type === typeSelect.value);

  clanSelect.innerHTML = '';
  if (!selectedType) {
    clanSelect.append(createOption('', 'Selecciona primero un tipo'));
    clanSelect.disabled = true;
    return;
  }

  clanSelect.disabled = false;
  clanSelect.append(createOption('', 'Selecciona un clan'));
  selectedType.clans.forEach((clan) => clanSelect.append(createOption(clan, clan)));
  clanSelect.value = selectedClan;
}

function updateProfileImagePreview(imageSource) {
  const preview = document.querySelector('#profile-image-preview');
  const currentImageInput = document.querySelector('#profile-image-current');

  currentImageInput.value = imageSource;
  preview.src = imageSource;
  preview.classList.toggle('hidden', !imageSource);
}

function renderProfile(character) {
  const profile = document.querySelector('.character-profile');
  const imagePreview = character.image
    ? `<img id="profile-image-preview" class="preview-image" src="${escapeHtml(character.image)}" alt="Imagen actual de ${escapeHtml(character.name)}">`
    : '<img id="profile-image-preview" class="preview-image hidden" alt="Imagen actual del personaje">';

  activeProfileId = character.id;
  profile.innerHTML = `
    <button class="back-to-gallery-btn" type="button">← Volver a personajes</button>
    <form class="profile-form" style="${getTypeColorStyles(character.type)}">
      <div class="profile-heading">
        <div>
          <p class="profile-kicker">Perfil del personaje</p>
          <h2>${escapeHtml(character.name)}</h2>
        </div>
        <span class="character-type-pill">${escapeHtml(character.type)}</span>
      </div>
      <div class="profile-grid">
        <div class="profile-fields">
          <label>
            Nombre del personaje
            <input name="name" type="text" required value="${escapeHtml(character.name)}">
          </label>
          <label>
            Tipo
            <select id="profile-character-type" name="type" required></select>
          </label>
          <label>
            Clan
            <select id="profile-character-clan" name="clan" required></select>
          </label>
          <div class="stats-grid">
            <label>
              Puntos de magia
              <input name="magic" type="number" min="1" max="100" required value="${escapeHtml(character.magic)}">
            </label>
            <label>
              Puntos de fuerza
              <input name="strength" type="number" min="1" max="100" required value="${escapeHtml(character.strength)}">
            </label>
            <label>
              Puntos de inteligencia
              <input name="intelligence" type="number" min="1" max="100" required value="${escapeHtml(character.intelligence)}">
            </label>
            <label>
              Puntos de velocidad
              <input name="speed" type="number" min="1" max="100" required value="${escapeHtml(character.speed)}">
            </label>
          </div>
          <label>
            Historia del personaje
            <textarea name="story" rows="8" required>${escapeHtml(character.story)}</textarea>
          </label>
        </div>
        <aside class="profile-image-panel" aria-label="Imagen del personaje">
          ${imagePreview}
          <input id="profile-image-current" type="hidden" value="${escapeHtml(character.image)}">
          <label>
            URL de imagen de perfil
            <input id="profile-character-image-url" name="imageUrl" type="url" value="${character.image && !character.image.startsWith('data:') ? escapeHtml(character.image) : ''}" placeholder="https://ejemplo.com/imagen.jpg">
          </label>
          <label>
            Reemplazar con imagen del dispositivo
            <input id="profile-character-image-file" name="imageFile" type="file" accept="image/*">
          </label>
        </aside>
      </div>
      <div class="form-actions">
        <button class="cancel-character-btn" type="button">Cancelar</button>
        <button class="save-character-btn" type="submit">Guardar cambios</button>
      </div>
    </form>
  `;

  document.querySelector('.character-gallery').classList.add('hidden');
  document.querySelector('.character-creator').classList.add('hidden');
  addCharacterButton.classList.add('hidden');
  profile.classList.remove('hidden');

  const profileTypeSelect = document.querySelector('#profile-character-type');
  characterTypes.forEach((entry) => profileTypeSelect.append(createOption(entry.type, entry.type)));
  profileTypeSelect.value = character.type;
  updateProfileClanOptions(character.clan);
  profileTypeSelect.addEventListener('change', () => updateProfileClanOptions());

  document.querySelector('.back-to-gallery-btn').addEventListener('click', closeProfile);
  document.querySelector('.profile-form .cancel-character-btn').addEventListener('click', closeProfile);
  document.querySelector('#profile-character-image-url').addEventListener('input', (event) => {
    updateProfileImagePreview(event.target.value.trim());
  });
  document.querySelector('#profile-character-image-file').addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => updateProfileImagePreview(reader.result));
    reader.readAsDataURL(file);
  });
  document.querySelector('.profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileImage = document.querySelector('#profile-image-current').value.trim();
    const characterToUpdate = characters.find((entry) => entry.id === activeProfileId);
    if (!characterToUpdate) {
      return;
    }

    try {
      await saveCharacter({
        ...characterToUpdate,
        name: formData.get('name').trim(),
        type: formData.get('type'),
        clan: formData.get('clan'),
        magic: formData.get('magic'),
        strength: formData.get('strength'),
        intelligence: formData.get('intelligence'),
        speed: formData.get('speed'),
        story: formData.get('story').trim(),
        image: profileImage || formData.get('imageUrl').trim(),
      });
      closeProfile();
    } catch (error) {
      console.error('No se pudo guardar el personaje en Firebase:', error);
      setSyncStatus('No se pudieron guardar los cambios. Revisa la conexión o las reglas de Firebase.', 'error');
    }
  });
}

function openProfile(characterId) {
  const character = characters.find((entry) => entry.id === characterId);
  if (character) {
    renderProfile(character);
  }
}

function updateClanOptions() {
  const typeSelect = document.querySelector('#character-type');
  const clanSelect = document.querySelector('#character-clan');
  const selectedType = characterTypes.find((entry) => entry.type === typeSelect.value);

  updateTypeColorPreview();
  clanSelect.innerHTML = '';
  if (!selectedType) {
    clanSelect.append(createOption('', 'Selecciona primero un tipo'));
    clanSelect.disabled = true;
    return;
  }

  clanSelect.disabled = false;
  clanSelect.append(createOption('', 'Selecciona un clan'));
  selectedType.clans.forEach((clan) => clanSelect.append(createOption(clan, clan)));
}

function updatePreview() {
  const urlInput = document.querySelector('#character-image-url');
  const urlPreview = document.querySelector('#url-preview');
  const filePreviewImage = document.querySelector('#file-preview');

  urlPreview.src = urlInput.value.trim();
  urlPreview.classList.toggle('hidden', !urlInput.value.trim());

  filePreviewImage.src = filePreview;
  filePreviewImage.classList.toggle('hidden', !filePreview);
}

function resetForm() {
  const form = document.querySelector('.character-form');
  form.reset();
  filePreview = '';
  updateClanOptions();
  updatePreview();
}

function closeForm() {
  document.querySelector('.character-creator').classList.add('hidden');
  addCharacterButton.classList.remove('hidden');
  resetForm();
}

function openForm() {
  document.querySelector('.character-creator').classList.remove('hidden');
  addCharacterButton.classList.add('hidden');
  document.querySelector('#character-name').focus();
}

function createCharacterForm() {
  personajesPanel.insertAdjacentHTML(
    'beforeend',
    `
      <p class="firebase-status" data-status="loading">Conectando con Firebase...</p>
      <div class="character-creator hidden" aria-label="Formulario para crear personaje">
        <form class="character-form">
          <button class="close-character-form" type="button" aria-label="Cerrar formulario">×</button>
          <h2>Crear personaje</h2>
          <label>
            Nombre del personaje
            <input id="character-name" name="name" type="text" required placeholder="Ej. Lyra Nocturna">
          </label>
          <label>
            Tipo
            <select id="character-type" name="type" required>
              <option value="">Selecciona un tipo</option>
            </select>
          </label>
          <div class="type-color-preview" aria-live="polite">Selecciona un tipo para ver su color asignado.</div>
          <label>
            Clan
            <select id="character-clan" name="clan" required disabled>
              <option value="">Selecciona primero un tipo</option>
            </select>
          </label>
          <div class="stats-grid">
            <label>
              Puntos de magia
              <input name="magic" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de fuerza
              <input name="strength" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de inteligencia
              <input name="intelligence" type="number" min="1" max="100" required placeholder="1-100">
            </label>
            <label>
              Puntos de velocidad
              <input name="speed" type="number" min="1" max="100" required placeholder="1-100">
            </label>
          </div>
          <label>
            Historia del personaje
            <textarea name="story" rows="5" required placeholder="Cuenta el origen, hazañas y secretos del personaje"></textarea>
          </label>
          <label>
            URL de imagen de perfil
            <input id="character-image-url" name="imageUrl" type="url" placeholder="https://ejemplo.com/imagen.jpg">
          </label>
          <label>
            O selecciona una imagen desde tu dispositivo
            <input id="character-image-file" name="imageFile" type="file" accept="image/*">
          </label>
          <div class="form-actions">
            <button class="cancel-character-btn" type="button">Cancelar</button>
            <button class="save-character-btn" type="submit">Guardar</button>
          </div>
        </form>
        <aside class="preview-pane" aria-label="Vista previa de imágenes">
          <h3>Vista previa</h3>
          <div class="preview-grid">
            <div class="preview-box">
              <span>Desde URL</span>
              <img id="url-preview" class="preview-image hidden" alt="Vista previa de imagen por URL">
            </div>
            <div class="preview-box">
              <span>Desde archivo</span>
              <img id="file-preview" class="preview-image hidden" alt="Vista previa de imagen seleccionada">
            </div>
          </div>
          <p class="preview-note">Si cargas una imagen desde archivo, se usará esa imagen al guardar; si no, se usará la URL.</p>
        </aside>
      </div>
      <section class="character-gallery" aria-label="Galería de personajes"></section>
      <section class="character-profile hidden" aria-label="Perfil del personaje"></section>
    `,
  );

  const typeSelect = document.querySelector('#character-type');
  characterTypes.forEach((entry) => typeSelect.append(createOption(entry.type, entry.type)));
  typeSelect.addEventListener('change', updateClanOptions);

  document.querySelector('#character-image-url').addEventListener('input', updatePreview);
  document.querySelector('#character-image-file').addEventListener('change', (event) => {
    const [file] = event.target.files;
    if (!file) {
      filePreview = '';
      updatePreview();
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      filePreview = reader.result;
      updatePreview();
    });
    reader.readAsDataURL(file);
  });

  document.querySelector('.cancel-character-btn').addEventListener('click', closeForm);
  document.querySelector('.close-character-form').addEventListener('click', closeForm);
  document.querySelector('.character-gallery').addEventListener('click', (event) => {
    const card = event.target.closest('.character-card');
    if (card) {
      openProfile(card.dataset.characterId);
    }
  });

  document.querySelector('.character-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const character = {
      id: crypto.randomUUID(),
      name: formData.get('name').trim(),
      type: formData.get('type'),
      clan: formData.get('clan'),
      magic: formData.get('magic'),
      strength: formData.get('strength'),
      intelligence: formData.get('intelligence'),
      speed: formData.get('speed'),
      story: formData.get('story').trim(),
      image: filePreview || formData.get('imageUrl').trim(),
    };

    try {
      await saveCharacter(character);
      closeForm();
    } catch (error) {
      console.error('No se pudo guardar el personaje en Firebase:', error);
      setSyncStatus('No se pudo guardar el personaje. Revisa la conexión o las reglas de Firebase.', 'error');
    }
  });
}

addCharacterButton.textContent = 'Crear personaje';
addCharacterButton.addEventListener('click', openForm);
createCharacterForm();
renderGallery();
setSyncStatus('Conectando con Firebase...', 'loading');

charactersRef.on(
  'value',
  async (snapshot) => {
    const data = snapshot.val() || {};
    characters = Object.entries(data)
      .map(([id, character]) => normalizeCharacter(character, id))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    hasReceivedFirebaseData = true;
    renderGallery();
    setSyncStatus('Personajes sincronizados con Firebase y visibles en otros dispositivos.', 'success');

    try {
      await migrateLocalCharacters();
    } catch (error) {
      console.error('No se pudieron migrar personajes locales a Firebase:', error);
      setSyncStatus('Firebase está conectado, pero no se pudieron migrar personajes locales anteriores.', 'error');
    }
  },
  (error) => {
    console.error('No se pudo leer Firebase:', error);
    setSyncStatus('No se pudo conectar con Firebase. Revisa la conexión o las reglas de la base de datos.', 'error');

    if (!hasReceivedFirebaseData && localCharacters.length) {
      characters = localCharacters.map((character) => normalizeCharacter(character));
      renderGallery();
    }
  },
);
