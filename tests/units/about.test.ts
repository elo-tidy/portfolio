import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect } from "vitest";
import About from "../../components/block/about.vue";

// Component mounting
it("should mount the component About", async () => {
    const component = await mountSuspended(About);
    expect(component.exists()).toBe(true);
});

// h1
it("should have one h1 tag non empty with no classes", async () => {
    const component = await mountSuspended(About);
    expect(component.find("h1").classes()).toHaveLength(0);
    expect(component.find("h1").text()).not.toHaveLength(0);
});

// h2
it("should have one h2 tag non empty with the classe 'title'", async () => {
    const component = await mountSuspended(About);
    expect(component.find("h2").classes()).toContainEqual("title");
    expect(component.find("h2").text()).not.toHaveLength(0);
});

// Description
it("should contain description text non empty", async () => {
    const component = await mountSuspended(About);
    expect(component.find(".bloc-content").find("p").text()).not.toHaveLength(
        0,
    );
});

// cta
it("should have a call-to-action button or link", async () => {
    const component = await mountSuspended(About);
    const cta = component.find("a, button");
    expect(cta.exists()).toBe(true);
    expect(cta.attributes("href")).toBeTruthy();
});
