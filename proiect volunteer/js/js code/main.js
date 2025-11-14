// Când se încarcă pagina, cerem lista de anunțuri din backend
document.addEventListener('DOMContentLoaded', () => {
  loadAnnouncements();

  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    loadAnnouncements(query);
  });
});

function loadAnnouncements(query = '') {
  fetch('api/get_announcements.php')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('announcements');
      container.innerHTML = '';

      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        container.innerHTML = '<p>Niciun anunț găsit.</p>';
        return;
      }

      filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'announcement';
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p><b>Locație:</b> ${item.location}</p>
          <a href="${item.url}" target="_blank">Vezi detalii</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Eroare la încărcarea anunțurilor:', err));
}
