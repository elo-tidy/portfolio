<template>
    <header
        id="header"
        role="banner"
        class="flex flex-row justify-between lg:block lg:justify-normal"
    >
        <!-- <colorMode /> -->
        <div id="skip-link">
            <p>
                <nuxtLink href="#main" title="Passer au contenu principal"
                    >Passer au contenu principal</nuxtLink
                >
            </p>
        </div>
        <LayoutHeaderNav />
        <layoutHeaderLinks />
    </header>
</template>
