document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    if (!dropdown || !dropbtn || !dropdownContent) {
    }

    dropbtn.addEventListener('click', function (e) {
      e.stopPropagation(); // For å unngå å trigge document-klikk
      dropdownContent.style.display ='block'
      dropbtn.classList.toggle("active");
    });

    // Klikk utenfor dropdown for å lukke den
    document.addEventListener('click', function () {
      dropdownContent.style.display = 'none';
      dropbtn.classList.remove("active");
    });
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});

const button = document.getElementById('filterButton');
const body = document.body;

// Funksjon for å oppdatere filtertilstanden
function updateFilterState(isFiltered) {
  if (isFiltered) {
    body.classList.add('filtered');
    button.textContent = 'Deaktiver gråtone';
  } else {
    body.classList.remove('filtered');
    button.textContent = 'Aktiver gråtone';
  }
  // Oppdater localStorage
  localStorage.setItem('filterEnabled', isFiltered);
}

// Når siden lastes, sjekk `localStorage`
document.addEventListener('DOMContentLoaded', () => {
  const isFiltered = localStorage.getItem('filterEnabled') === 'true';
  updateFilterState(isFiltered);
  body.classList.add('ready'); // Signaler at siden er klar
  if (isFiltered) {
    body.classList.add('filtered');
  }
});

// Håndter klikk på knappen
button.addEventListener('click', () => {
  const isFiltered = body.classList.contains('filtered');
  updateFilterState(!isFiltered); // Bytt tilstand
});
