document.addEventListener('DOMContentLoaded', () => {
currentTheme.subscribe(theme => {
  applyThemeToPage(theme);
});


document.body.appendChild(themedThemeSelector());
document.body.appendChild(spacer({ height: '2rem' }));

const title = new Stream('My Document');
const layoutHeader = column([  
  reactiveText(title, { tag: 'h2', size: '1.5rem' }),
  editText(title, { placeholder: 'Enter document title' }),
  ], { gap: '1.5rem', align: 'center', justify: 'center' });
document.body.appendChild(container(layoutHeader, { padding: '2rem' }));

document.body.appendChild(spacer({ height: '2rem' }));
const edit2 = new Stream('');
const gridLayout = grid([
  reactiveText(edit2, { size: '2rem', weight: 'bold' }),  
  reactiveText(title, { tag: 'h2', size: '4.5rem' }),
  reactiveText(edit2, { size: '2rem', weight: 'bold' }),  
  reactiveText(title, { tag: 'h2', size: '4.5rem' }),
  reactiveText(edit2, { size: '2rem', weight: 'bold' }),  
  reactiveText(title, { tag: 'h2', size: '4.5rem' }),
  reactiveText(edit2, { size: '2rem', weight: 'bold' }),  
  reactiveText(title, { tag: 'h2', size: '4.5rem' }),
], { columns: '1fr 1fr', gap: '1rem' });
document.body.appendChild(container(gridLayout, { padding: '2rem'}));

document.body.appendChild(spacer({ height: '2rem' }));

const layout2 = column([      
  spacer({ height: '2rem' }),
  editText(edit2, { placeholder: 'Type here...' }),
  spacer({ height: '2rem' }),
  divider(),
  spacer({ height: '2rem' }),
  reactiveText(edit2, { tag: 'h2', size: '1.5rem' }),
]);
document.body.appendChild(container(layout2, { padding: '2rem'}));



});
