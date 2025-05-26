<script lang="ts" setup>
const observerOptions = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0,
};

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const eltToActive = document.querySelector(
                `#header-nav a[href="#${id}"]`,
            );
            console.log(entry.intersectionRatio);
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
