const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project__item");

export function projectFilter(){
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            console.log(filter);
            projects.forEach((project) => {
                if (filter === "all") {
                    project.style.display = "block";
                } else {
                    if (project.dataset.technologies.includes(filter)) {
                        project.style.display = "block";
                    } else {
                        project.style.display = "none";
                    }
                }
            });
        });
    });
};
