<template>
    <div v-if="show" class="w-screen h-screen overflow-hidden fixed z-[9999] bg-white">
        <div class="w-screen h-screen flex justify-center flex-col items-center">
            <div>
                <span class="w-40 h-40 animate-[spining_1s_linear_infinite] rounded-full flex flex-col justify-center items-center border-[4px] border-solid border-prim-100/50 border-t-prim-100" />
                <!-- <i class=" animate-[spining_1s_linear_infinite] text-[8rem] leading-[10rem] fas fa-circle-notch" /> -->
            </div>
            <div class="flex justify-center flex-col items-center mt-20">
                <h1 class="text-prim-100 text-[40px] sm:text-[70px] font-bold uppercase tracking-[10px]">
                    CASOTA
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
    import _clamp from 'lodash/clamp';

    export default {
        data() {
            return {
                percent: 0,
                show: false,
                canSuccess: true,
                color: '#3EC08D',
                failedColor: '#F56C6C',
            };
        },

        methods: {
            start() {
                this.show = true;
                this.canSuccess = true;
                if (this._timer) {
                    clearInterval(this._timer);
                    this.percent = 0;
                }

                this._cut = 2;
                this._timer = setInterval(() => {
                    this.increase(this._cut * Math.random());
                }, 100);

                return this;
            },

            set(num) {
                this.show = true;
                this.canSuccess = true;
                this.percent = Math.floor(num);
                return this;
            },

            get() {
                return Math.floor(this.percent);
            },

            increase(num) {
                this.percent = _clamp(this.percent + Math.floor(num), 0, 98);
                return this;
            },

            decrease(num) {
                this.percent = _clamp(this.percent - Math.floor(num), 0, 98);
                return this;
            },

            finish() {
                this.percent = 100;
                this.hide();
                return this;
            },

            pause() {
                clearInterval(this._timer);
                return this;
            },

            hide() {
                clearInterval(this._timer);
                this._timer = null;
                setTimeout(() => {
                    this.show = false;
                    this.$root.$nextTick(() => {
                        setTimeout(() => {
                            this.percent = 0;
                        }, 200);
                    });
                }, 500);
                return this;
            },

            fail() {
                this.canSuccess = false;
                return this;
            },
        },
    };
</script>

<style>
    .nuxt-progress {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 2px;
        width: 0%;
        transition: width 0.2s, opacity 0.4s;
        opacity: 1;
        background-color: #efc14e;
        z-index: 999999;
    }
</style>
