<template>
    <div class="flex justify-between h-screen">
        <div
            class="flex-grow hidden md:block !bg-cover !bg-center"
            style="background: url('/images/update.jpg')"
        />
        <div class="w-screen md:w-[500px] flex flex-col items-center mx-4 my-4">
            <div class="flex-grow min-w-[400px] flex flex-col items-center justify-between h-full">
                <div />
                <div class="w-full">
                    <div class="flex items-center justify-center w-full mb-10">
                        <!-- <img src="/images/logo.png"> -->
                    </div>
                    <div class="mb-6 text-center">
                        <div class="text-prim-100 text-xl mb-2">
                            CASOTA - Chào mừng quay trở lại !
                        </div>
                        <div>Đăng nhập để tiếp tục sử dụng dịch vụ</div>
                    </div>
                    <nuxt />
                </div>
                <div>
                    &copy; {{ currentYear }} CASOTA
                </div>
            </div>
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
