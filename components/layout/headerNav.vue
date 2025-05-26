<script setup lang="ts"></script>
<template>
    <div id="header-nav">
        <button
            class="visible lg:invisible"
            id="hamburger"
            title="Ouvrir le menu principal"
            data-txt="Fermer le menu principal"
        >
            <span class="inner">
                <span class="sr">Ouvrir le menu de principal</span>
            </span>
        </button>
        <nav role="navigation" class="invisible lg:visible">
            <ul>
                <li>
                    <NuxtLink to="#about"><span>Introduction</span></NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#skills"><span>Compétences</span></NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#experiences"
                        ><span
                            >Parcours professionnel et formations</span
                        ></NuxtLink
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>
