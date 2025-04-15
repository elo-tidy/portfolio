import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect } from "vitest";
import Skills from "../../components/block/skills.vue";

// Component mounting
it("should mount the component Skills", async () => {
    const component = await mountSuspended(Skills);
    expect(component.exists()).toBe(true);
});

// h2
it("should have two h2 tags non empty with the classe 'title'", async () => {
    const component = await mountSuspended(Skills);
    const h2Tags = component.findAll("h2");
    expect(h2Tags.length).toEqual(2);
    h2Tags.forEach((item) => {
        expect(item.classes()).toContainEqual("title");
        expect(item.text()).not.toHaveLength(0);
    });
});

// Hard skills
it("should display hard skills items with svg icons and labels, label should be placed before icon in html", async () => {
    const component = await mountSuspended(Skills);
    const skillItems = component.findAll(".skill-item");
    expect(skillItems.length).toBeGreaterThan(0);

    skillItems.forEach((item) => {
        expect(item.find(".skill-icon").exists()).toBe(true);
        expect(item.find(".skill-icon img[src$='.svg']").exists()).toBe(true);
        expect(item.find(".skill-label").exists()).toBe(true);
        expect(item.find(".skill-label").text()).not.toHaveLength(0);
        expect(item.find(".skill-label").element).toBe(
            item.element.firstElementChild,
        );
    });
});

// Soft skills
it("should display soft skills items", async () => {
    const component = await mountSuspended(Skills);
    const skillItems = component.findAll("#soft-skills li");
    expect(skillItems.length).toBeGreaterThan(0);
    skillItems.forEach((item) => {
        expect(item.text()).not.toHaveLength(0);
    });
});
