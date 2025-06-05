<script lang="ts" setup>
const observerOptions = {
    root: null,
    rootMargin: "-1px 0px -100% 0px",
    threshold: 0,
};

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const eltToActive = document.querySelector(
                `#header-nav a[href="#${id}"]`,
            );
            if (entry.isIntersecting) {
                eltToActive?.classList.add("active");
            } else {
                eltToActive?.classList.remove("active");
            }
        });
    }, observerOptions);
    document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
    });

    const unobserveSections = () => {
        const currentDevice = getBreakpoints();

        if (currentDevice !== "is-lg+") {
            document.querySelectorAll(".section").forEach((section) => {
                observer.unobserve(section);
            });

            const navElt = document.querySelectorAll("#header-nav a");
            navElt.forEach((element) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        } else {
            document.querySelectorAll(".section").forEach((section) => {
                observer.observe(section);
            });
        }
    };
    unobserveSections();
    window.addEventListener("resize", () => {
        unobserveSections();
    });
});
</script>
<template>
    <div class="container-bloc mx-auto">
        <ColorMode class="invisible fixed top-0" />
        <blockAbout />
        <blockSkills />
        <blockExperiences />
    </div>
</template>
