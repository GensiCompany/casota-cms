<template>
    <div>
        <img class="w-[50%] h-auto mx-auto rounded-md" src="/images/update.jpg" alt="/">
        <h4 class="mt-4 text-center text-xl">Tính năng đang nghiên cứu phát triển</h4>
    </div>
</template>

<script>

    export default {
        components: {
        },

        data() {
            return {
            };
        },

        computed: {
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tổng quát',
                link: '/',
            }]);
        },

        methods: {
        },

        head() {
            return {
                title: 'Tổng quát',
            };
        },
    };
</script>
