<script setup lang="ts">
import { useIntroData } from "~/composables/useIntroData";
const { data, error } = useIntroData();
</script>
<template>
    <div
        v-if="data"
        id="about"
        class="section flex min-h-screen grid-cols-1 flex-col"
    >
        <div id="intro-content" class="bloc grid grow">
            <div class="content-center">
                <!-- <genericTitle :data="data" /> -->
                <genericTitle
                    :title="data.title"
                    :subtitle="data.subtitle"
                    hn="1"
                />
                <div class="bloc-content">
                    <p>{{ data.description }}</p>
                    <div class="tags-container">
                        <genericTags :skills="data.skills" />
                    </div>
                    <genericCta
                        v-if="data.cvurl"
                        :newwindow="true"
                        :linktext="data.cvtxt"
                        :linkurl="data.cvurl"
                        htmlTag="p"
                        componentClass="cta"
                    />
                </div>
            </div>
        </div>
        <div
            id="intro-footer"
            class="relative grid shrink grid-cols-2 md:grid-cols-4"
        >
            <div class="intro-footer-item">
                <h3 class="footer-title">{{ data.locationtitle }}</h3>
                <p v-html="data.locationdescription" />
            </div>
            <div v-if="data.opquasturl" class="intro-footer-item">
                <h3 class="footer-title">
                    {{ data.opquasttitle }}
                </h3>
                <p>
                    <a
                        :href="data.opquasturl"
                        :title="`${data.opquastdescription} (nouvelle fenêtre)`"
                        target="_blank"
                    >
                        {{ data.opquastdescription }}
                    </a>
                </p>
            </div>
            <div class="intro-footer-item">
                <h3 class="footer-title">{{ data.situationtitle }}</h3>
                <p v-html="data.situationdescription" />
            </div>
            <div class="intro-footer-item">
                <h3 class="footer-title">{{ data.xptitle }}</h3>
                <p>{{ data.xpdescription }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    @reference "~/assets/styles/config/utilities.css";
    /* @import "~/assets/styles/about.css"; */
    #about {
        p {
            margin-bottom: 0;
        }

        #intro-content {
            position: relative;
            &::before {
                content: "";
                position: absolute;
                width: 100vw;
                height: 100%;
                display: block;
                left: 50%;
                transform: translateX(-50%);
                background-image: url(/avatar.webp);
                background-size: auto 77vh;
                background-attachment: scroll;
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: bottom 0 left
                    calc(
                        (100vw - var(--container)) / 2 +
                            clamp(25rem, 13.966rem + 17.241vw, 35rem)
                    );
                z-index: -1;
                bottom: 0;
                mix-blend-mode: color-burn;
            }

            .content-center {
                max-width: clamp(35rem, 18.448rem + 25.862vw, 50rem);
                padding: 5rem 0;
            }
            .bloc-content {
                p:not(.cta) {
                    font-size: clamp(1.5em, 0.948em + 0.862vw, 2em);
                    line-height: initial;
                }
                .tags-container {
                    margin-top: 2.55rem;
                    margin-bottom: 2.55rem;
                }
            }
        }

        #intro-footer {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                width: 100vw;
                height: 100%;
                background-color: var(--dark);
                z-index: -1;
                transform: translateX(-50%);
            }
            .intro-footer-item {
                padding: clamp(1em, 0.024em + 2.711vh, 2.8em)
                    clamp(1em, 0.741em + 0.811vw, 1.9em);
                border: clamp(0, -0.115em + 0.36vw, 0.4rem) solid var(--dark);
            }
            .intro-footer-item:nth-child(odd) {
                background-color: var(--primary-10);
            }

            .intro-footer-item .footer-title {
                @apply title-picto;
                margin-bottom: 1rem;
                font-family: var(--regular);
                font-size: var(--text-base);
            }
            .intro-footer-item p {
                display: inline-grid;
            }
        }
    }

    @keyframes fade-avatar {
        0% {
            opacity: 1;
            /* clip-path: inset(0 0 0 0); */
        }

        100% {
            opacity: 0;
            /* clip-path: inset(0 0 100% 0); */
        }
    }
    @-webkit-keyframes fade-avatar {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
    @-moz-keyframes fade-avatar {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
    @-o-keyframes fade-avatar {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
    @supports (animation-range: 40vh 50vh) {
        #about {
            #intro-content::before {
                -webkit-animation: fade-avatar 1s linear forwards;
                -moz-animation: fade-avatar 1s linear forwards;
                -o-animation: fade-avatar 1s linear forwards;
                animation: fade-avatar 1s linear forwards;

                animation-timeline: scroll();
                animation-range: entry-crossing 0vh entry-crossing 60vh;
            }
        }
    }

    html.mode-light #about #intro-content {
        &::before {
            filter: contrast(0.5) grayscale(1);
        }
    }

    /************************/
    /****** Responsive ******/
    /************************/

    @media only screen and (0 < width < 64rem) {
        #about {
            min-height: calc(100vh - var(--headerHeight));
        }
    }
    @media only screen and (0 < width < 40rem) {
        #about {
            #intro-footer {
                .intro-footer-item:nth-child(odd) {
                    background-color: inherit;
                }
                .intro-footer-item:nth-child(3n + 1) {
                    background-color: var(--primary-10);
                }
            }
        }
    }

</style>
