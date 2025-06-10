import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, vi } from "vitest";
import About from "~/components/block/about.vue";

vi.mock("~/composables/useIntroData", () => ({
    useIntroData: () => ({
        data: ref({
            title: "Titre",
            subtitle: "Sous-titre",
            description: "Description de test",
            skills: ["Skill1", "Skill2"],
            cvurl: "https://example.com/cv.pdf",
            cvtxt: "Télécharger le CV",
            locationtitle: "Localisation",
            locationdescription: "Paris",
            opquasturl: "https://opquast.com",
            opquasttitle: "Opquast",
            opquastdescription: "Certification Opquast",
            situationtitle: "Situation",
            situationdescription: "Disponible",
            xptitle: "Expérience",
            xpdescription: "5 ans",
        }),
    }),
}));

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
/*it("should have a call-to-action element", async () => {
    const component = await mountSuspended(About);
    const cta = component.find(".cta a");
    expect(cta.exists()).toBe(true);
    expect(cta.attributes("href")).toBeTruthy();
});*/
