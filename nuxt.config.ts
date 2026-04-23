// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: {
        enabled: true,
    },
    debug: false,
    logLevel: process.env.NODE_ENV === "production" ? "silent" : "info",
    features: {
        inlineStyles: false,
    },
    ssr: true,
    nitro: {
        preset: "static",
    },
    app: {
        head: {
            htmlAttrs: {
                lang: "fr",
            },
            title: "Éloïse Lombard – Développeur frontend Vue.js / Nuxt.js à Besançon (Doubs) | Portfolio",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "theme-color",
                    content: "#90ff00",
                },
                {
                    name: "description",
                    content: "Éloïse Lombard, développeur frontend Vue.js / Nuxt.js à Besançon (Doubs). Création d’interfaces accessibles et optimisées pour l’expérience utilisateur. Certification Opquast.",                    
                },
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
                { rel: "icon", type: "image/jpg", href: "/favicon.ico" },
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
        '@nuxt/fonts',
        "@nuxt/image",
        "@nuxt/test-utils/module",
        "@nuxtjs/html-validator",
        "nuxt-swiper",
    ],
    image: {
        provider: 'ipx'
    },
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
});
