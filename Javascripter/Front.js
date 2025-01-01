document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    if (!dropdown || !dropbtn || !dropdownContent) {
    }

    dropbtn.addEventListener('click', function (e) {
      e.stopPropagation(); // For å unngå å trigge document-klikk
      dropdownContent.style.display ='block'
    });

    // Klikk utenfor dropdown for å lukke den
    document.addEventListener('click', function () {
      dropdownContent.style.display = 'none';
    });
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});