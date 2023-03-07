<template>
    <div class="flex justify-between bg-[#d7d7d7] min-h-screen">
        <div class="hidden md:block">
            <TheSidebar ref="sidebar" />
        </div>
        <div class="flex-grow flex flex-col h-screen overflow-x-hidden">
            <TheHeader @toggleSidebar="$refs.sidebar.toggleCollapsed()" />
            <div class="flex-grow overflow-y-auto max-h-screen custom-scroll flex flex-col bg-white">
                <nuxt class="m-3 md:m-6 flex-grow" />
            </div>
            <TheFooter />
        </div>
    </div>
</template>

<script>
    import TheSidebar from '@/components/layout/TheSidebar.vue';
    import TheHeader from '@/components/layout/TheHeader.vue';
    import TheFooter from '@/components/layout/TheFooter.vue';

    export default {
        components: {
            TheSidebar,
            TheHeader,
            TheFooter,
        },
    };
</script>
