const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');

// Function to create list items
const liMaker = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
};

// Load items from localStorage and display them
let items = JSON.parse(localStorage.getItem('items')) ||
 [];

items.forEach((item) => {
    liMaker(item);
});

// Handle form submission (adding a new item)
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const itemText = input.value.trim();
    if (itemText) {
        // Add the item to the array and update localStorage
        items.push(itemText);
        localStorage.setItem('items', JSON.stringify(items));

        // Create a list item and append it
        liMaker(itemText);

        // Clear the input field
        input.value = '';
    }
});

// Clear all items and localStorage
button.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    items = []; // Reset the items array
});
