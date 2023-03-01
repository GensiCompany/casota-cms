<template>
    <button
        aria-label="scroll top"
        :class="scroll ? 'sm:top-[calc(100vh-10%)] top-[calc(100vh-22%)]' : '-top-[150px]'"
        class="fixed z-50 w-14 h-14 rounded-full bg-prim-100 text-white hover:bg-prim-100 transition-all duration-700 right-4 sm:right-8"
        @click="scrollToTop"
    >
        <span><i class="fas fa-arrow-up" /></span>
    </button>
</template>

<script>
    export default {
        props: {
            scroll: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isScroll: false,
            };
        },
        methods: {
            scrollToTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        },
    };
</script>
