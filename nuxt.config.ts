// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: {
        enabled: true,
    },
    debug: true,
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            title: "Eloïse Lombard - Portfolio",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "theme-color",
                    content: "#90ff00",
                },
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
                { rel: "icon", type: "image/png", href: "/favicon.ico" },
            ],
        },
    },
    css: ["~/assets/styles/app.css"],
    vite: {
        plugins: [tailwindcss()],
    },
    modules: [
        "@nuxtjs/supabase",
        "@nuxtjs/color-mode",
        "@nuxtjs/google-fonts",
        "@nuxt/image",
        "@nuxt/test-utils/module",
        "@nuxtjs/html-validator",
        "nuxt-swiper",
    ],
    supabase: {
        redirect: false,
    },
    colorMode: {
        preference: "dark", // default value of $colorMode.preference
        fallback: "dark", // fallback value if not system preference found
        hid: "nuxt-color-mode-script",
        globalName: "__NUXT_COLOR_MODE__",
        componentName: "ColorScheme",
        classPrefix: "mode-",
        classSuffix: "",
        storage: "localStorage", // or 'sessionStorage' or 'cookie'
        storageKey: "nuxt-color-mode",
        // dataValue: 'theme'
    },
    googleFonts: {
        families: {
            "Open Sans": {
                wght: [400, 600, 700],
                ital: [400],
            },
            Salsa: {
                wght: [400],
            },
        },
    },
    image: {
        // format: ["webp"],
        // dir: "assets/images",
        // domains: ["nuxtjs.org"],
    },
});
