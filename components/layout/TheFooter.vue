<template>
    <div class="flex justify-between items-center bg-white border-t-gray-40 border-t-[1px] py-2 px-4 md:px-8 text-xs md:text-base">
        <div class="!text-black">
            &copy; {{ currentYear }} - <a href="#" class="!text-black hover:underline">CASOTA CMS</a>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            currentYear() {
                return (new Date()).getFullYear();
            },
        },
    };
</script>
