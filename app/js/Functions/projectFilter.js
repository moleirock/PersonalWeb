const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project__item");

export function projectFilter(){
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            console.log(filter);
            projects.forEach((project) => {
                if (filter === "all") {
                    project.classList.remove("display-none");
                } else {
                    if (project.dataset.technologies.includes(filter)) {
                      project.classList.remove("display-none");
                    } else {
                      project.classList.add("display-none");
                    }
                }
            });
        });
    });
};
