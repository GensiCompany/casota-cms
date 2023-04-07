<template>
    <div class="flex justify-between bg-[#d7d7d7] min-h-screen">
        <div class="hidden md:block">
            <TheSidebar ref="sidebar" :setting="setting" />
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
    import { mapState } from 'vuex';
    import TheSidebar from '@/components/layout/TheSidebar.vue';
    import TheHeader from '@/components/layout/TheHeader.vue';
    import TheFooter from '@/components/layout/TheFooter.vue';

    export default {
        components: {
            TheSidebar,
            TheHeader,
            TheFooter,
        },

        async fetch() {
            await this.fetchData();
        },

        computed: {
            ...mapState('settings', ['setting']),
        },

        methods: {
            async fetchData() {
                try {
                    await this.$store.dispatch('settings/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                }
            },
        },
    };
</script>
