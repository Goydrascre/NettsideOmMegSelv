document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

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

const gråbutton = document.getElementById('gråfilterButton');
const body = document.body;

// Funksjon for å oppdatere filtertilstanden
function updateFilterState(isFiltered) {
  if (isFiltered) {
    body.classList.add('filtered');
    gråbutton.textContent = 'Deaktiver gråtone';
  } else {
    body.classList.remove('filtered');
    gråbutton.textContent = 'Aktiver gråtone';
  }
  // Oppdater localStorage
  localStorage.setItem('filterEnabled', isFiltered);
}

// Håndter klikk på knappen
button.addEventListener('click', () => {
  const isFiltered = body.classList.contains('filtered');
  updateFilterState(!isFiltered); // Bytt tilstand
});
// local storage greier //
const isFiltered = localStorage.getItem('filterEnabled') === 'true';
updateFilterState(isFiltered);
if (isFiltered) {
  body.classList.add('filtered');
}