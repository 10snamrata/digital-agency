document.addEventListener('DOMContentLoaded', function() {
  var dropdown = document.querySelector('.dropdown2');

  dropdown.addEventListener('mouseover', function() {
    document.querySelector('.dropdown-content').style.display = 'block';
  });

  dropdown.addEventListener('mouseout', function() {
    document.querySelector('.dropdown-content').style.display = 'none';
  });
});



      function toggleDropdown() {
          var dropdown = document.getElementById("dropdown");
          if (dropdown.style.display === "block") {
              dropdown.style.display = "none";
          } else {
              dropdown.style.display = "block";
          }
      }

      // Close the dropdown if the user clicks outside of it
      window.onclick = function (event) {
          if (!event.target.matches('.hamburger-icon')) {
              var dropdown = document.getElementById("dropdown");
              if (dropdown.style.display === "block") {
                  dropdown.style.display = "none";
              }
          }
      };
