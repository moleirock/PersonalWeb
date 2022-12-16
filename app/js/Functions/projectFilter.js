const filterButtons = document.querySelectorAll(".filter-list__item");
const projectItems = document.querySelectorAll(".project__item");
const projectContainer = document.querySelector(".projexts__content");
export function projectFilter(){
    filterButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach((button) => {
                button.classList.remove("filterActive");
            });
            e.target.classList.add("filterActive");
            const filter = button.dataset.filter;
            console.log(filter);
            projectItems.forEach((project) => {
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
    projectVisibility();
    
};



//function that use intersection observer to animate the elements when they are in the element projectContainer
function projectVisibility(){
    const options = {
        root: projectContainer,
        threshold: .8
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("outView");
            } else {
                entry.target.classList.add("outView");

            }
        });
    }, options);

    projectItems.forEach((project) => {
        observer.observe(project);
    });
}
