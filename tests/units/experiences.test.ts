import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect } from "vitest";
import Experiences from "~/components/block/experiences.vue";

// Component mounting
it("should mount the component Experiences", async () => {
    const component = await mountSuspended(Experiences);
    expect(component.exists()).toBe(true);
});

// h2
it("should have a h2 tags non empty with the classe 'title'", async () => {
    const component = await mountSuspended(Experiences);
    const h2Tags = component.find("h2");
    expect(h2Tags.classes()).toContainEqual("title");
    expect(h2Tags.text()).not.toHaveLength(0);
});

// Swiper container
it("should render the swiper-container element", async () => {
    const component = await mountSuspended(Experiences);
    const swiperContainer = component.find("#XpSwiper");
    expect(swiperContainer.exists()).toBe(true);
});

// Swiper slides
it("should render x swiper-slide elements according to the total number of experiences", async () => {
    const component = await mountSuspended(Experiences);
    const swiperSlides = component.findAll(".slide").length;
    const experiencesLength = component.findAll(".slide-item").length;
    expect(swiperSlides).toBeGreaterThan(0);
    expect(Math.ceil(experiencesLength / 4)).toEqual(swiperSlides);
});
it("should render a maximum of 4 experiences in each data group", async () => {
    const component = await mountSuspended(Experiences);
    const swiperSlides = component.findAll(".slide");
    swiperSlides.forEach((slide) => {
        const slideItems = slide.findAll(".slide-item");
        expect(slideItems.length).toBeLessThanOrEqual(4);
    });
});
it("should render all the informations for each experiences", async () => {
    const component = await mountSuspended(Experiences);
    const slides = component.findAll(".slide-item");
    slides.forEach((slide) => {
        // Title
        const slideTitle = slide.find(".xp-content").find(".xp-title");
        expect(slideTitle.text()).not.toHaveLength(0);
        // Company
        const slideCompany = slide.find(".xp-content").find(".xp-title + p");
        if (slideCompany.exists()) {
            expect(slideCompany.text()).not.toHaveLength(0);
        }
        // Location - attendance
        const slideLocationAttendance = slide
            .find(".xp-content")
            .find(".xp-content .xp-title + p");
        if (slideLocationAttendance.exists()) {
            const slideLocationAttendanceTxt = slideLocationAttendance.text();
            const [slideLocationTxt, slideAttendanceTxt = ""] =
                slideLocationAttendanceTxt.includes(" - ")
                    ? slideLocationAttendanceTxt.split(" - ")
                    : [slideLocationAttendanceTxt];
            expect(slideLocationTxt).not.toHaveLength(0);
        }
        // Description
        const slideDesc = slide.find(".xp-desc");
        if (slideDesc.exists()) {
            expect(slideDesc.text()).not.toHaveLength(0);
        }
        // Date
        const slideDate = slide.find(".xp-date");
        if (slideDate.exists()) {
            expect(slideDate.text()).not.toHaveLength(0);
        }
        // Skills
        const slideSkills = slide.findAll(".tags");
        if (slideSkills.length > 0) {
            slideSkills.forEach((skill) => {
                skill.findAll("li").forEach((item) => {
                    expect(item.text()).not.toHaveLength(0);
                });
            });
        }
    });
});
it("should render h3 tag for each experience title and title should be the first element of the slide", async () => {
    const component = await mountSuspended(Experiences);
    const slides = component.findAll(".slide-item");
    slides.forEach((slide) => {
        const slideTitle = slide.find(".xp-content").find(".xp-title");
        expect(slideTitle.element.tagName.toLowerCase()).toBe("h3");
        const xpContent = slide.find(".xp-content");
        expect(slideTitle.element).toBe(xpContent.element.firstElementChild);
    });
});
it("should render a related aria-describedby tag for each group of skills", async () => {
    const component = await mountSuspended(Experiences);
    const slides = component.findAll(".slide-item");
    slides.forEach((slide) => {
        const slideSkills = slide.findAll(".tags");
        if (slideSkills.length > 0) {
            slideSkills.forEach((skill) => {
                expect(skill.element.previousElementSibling).toBeTruthy();
                const ariaDescribedById =
                    skill.element.previousElementSibling?.getAttribute("id");
                const ulAriaDescribedBy =
                    skill.element.getAttribute("aria-describedby");
                expect(ariaDescribedById).toBe(ulAriaDescribedBy);
            });
        }
    });
});

// Navigation buttons
it("should render navigation buttons", async () => {
    const component = await mountSuspended(Experiences);
    const prevButton = component.find(".swiper-btn-prev");
    const nextButton = component.find(".swiper-btn-next");
    expect(prevButton.exists()).toBe(true);
    expect(nextButton.exists()).toBe(true);
});
