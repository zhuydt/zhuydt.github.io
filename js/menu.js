document.addEventListener('DOMContentLoaded', function() {
  // Toggle menu chính trên mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
  });

  // Toggle submenu trên mobile
  const submenuParents = document.querySelectorAll('.has-submenu > a');

  submenuParents.forEach(link => {
    link.addEventListener('click', function(e) {
      // Chỉ xử lý trên màn hình nhỏ (mobile)
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Ngăn link nhảy trang

        const parentLi = this.parentElement;
        parentLi.classList.toggle('open');
      }
    });
  });
});
