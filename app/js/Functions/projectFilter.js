const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project__item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    projects.forEach((project) => {
      if (filter === 'all') {
        project.style.display = 'block';
      } else {
        if (project.classList.contains(filter)) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      }
    });
  });
});