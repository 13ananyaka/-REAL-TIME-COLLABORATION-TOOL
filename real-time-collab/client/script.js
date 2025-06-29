const socket = io();
const textarea = document.getElementById('editor');

// Emit changes
textarea.addEventListener('input', () => {
  socket.emit('textChange', textarea.value);
});

// Listen for changes
socket.on('textUpdate', (data) => {
  textarea.value = data;
});
