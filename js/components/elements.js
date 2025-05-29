function reactiveText(stream, options = {}, themeStream = currentTheme) {
  const el = document.createElement(options.tag || 'p');

  function applyStyles(theme) {
    const fonts = theme.fonts || {};
    const colors = theme.colors || {};
    
    applyTheme(el, options);

    el.style.fontSize = options.size || '1rem';
    el.style.fontWeight = options.weight || 'normal';
    el.style.textAlign = options.align || 'left';
    el.style.fontStyle = options.italic ? 'italic' : 'normal';
    el.style.textDecoration = options.underline ? 'underline' : 'none';
    el.style.textTransform = options.uppercase
      ? 'uppercase'
      : options.lowercase
      ? 'lowercase'
      : options.capitalize
      ? 'capitalize'
      : 'none';
    el.style.fontFamily = options.monospace ? fonts.monospace : fonts.base || 'sans-serif';
    el.style.color = options.color || colors.foreground;
    el.style.backgroundColor = options.bg || 'transparent';
    if (options.margin) el.style.margin = options.margin;
  }

  stream.subscribe(value => {
    el.textContent = value;
  });

  themeStream.subscribe(theme => applyStyles(theme));
 
  return el;
}

function editText(stream, options = {}, themeStream = currentTheme) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = stream.get();
  input.placeholder = options.placeholder || '';

  function applyStyles(theme) {
    const fonts = theme.fonts || {};
    const colors = theme.colors || {};

    // ✅ This line was missing
    applyTheme(input, options);

    input.style.fontSize = options.size || '1rem';
    input.style.width = options.width || '100%';
    input.style.fontFamily = options.monospace
      ? fonts.monospace
      : fonts.base || 'sans-serif';
    input.style.backgroundColor = options.bg || colors.primary || '#333';
    input.style.color = options.color || colors.foreground || '#eee';
    input.style.border = 'none';
    input.style.borderRadius = '4px';
    input.style.padding = options.padding || '0.5rem';
    input.style.transition = 'background-color 0.3s, color 0.3s';

    if (options.margin) input.style.margin = options.margin;
  }

  input.addEventListener('input', () => {
    stream.set(input.value);
  });

  stream.subscribe(value => {
    if (input.value !== value) {
      input.value = value;
    }
  });

  themeStream.subscribe(theme => applyStyles(theme));
  applyStyles(themeStream.get()); // Initial style

  return input;
}
