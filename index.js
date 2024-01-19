


document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.dropdown');

    dropdown.addEventListener('mouseover', function() {
      document.querySelector('.dropdown-content').style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function() {
      document.querySelector('.dropdown-content').style.display = 'none';
    });
  });