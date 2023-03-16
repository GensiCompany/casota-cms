<template>
    <div class="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0">
        <div class="relative h-28 w-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-5 border-[2px] border-solid border-gray-5">
            <img :src="product.variant.thumbnail || ''" :alt="product.variant.title || ''" class="h-full w-full object-contain object-center">
        </div>
        <div class="ml-3 sm:ml-6 flex flex-1 flex-col">
            <div>
                <div class="flex justify-between ">
                    <div class="flex-[1.5] w-full sm:w-auto mb-4 md:mb-0">
                        <h3 class="text-lg font-semibold">
                            {{ `${ product.variant.title + ' - ' + product.variant.option1 }` || '' }}
                        </h3>
                        <div class="mt-3 flex justify-between w-full sm:hidden relative">
                            <div class="flex items-center border-2 border-[#22c55e] rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                                <span class="text-[#22c55e] !leading-none">{{ product.variant.price | currencyFormat }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="hidden flex-1 sm:flex justify-end">
                        <div class="mt-0.5">
                            <div class="flex items-center border-2 border-[#22c55e] rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                                <span class="text-[#22c55e] !leading-none">{{ product.variant.price | currencyFormat }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block text-center relative w-full sm:w-auto">
                    <div class="flex items-center justify-between space-x-5 relative z-10">
                        <div class="flex items-center justify-between w-[104px] sm:w-28">
                            <button
                                class="w-6 h-6 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700
                                        disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                                :disabled="isEdit || product.quantity <= 1"
                                @click="changeCountProduct(-1)"
                            >
                                <i class="text-3xl isax isax-minus" />
                            </button>
                            <span class="select-none block flex-1 text-center leading-none">{{ product.quantity || 1 }}</span>
                            <button
                                class="w-6 h-6 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700
                                        disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                                :disabled="isEdit"
                                @click="changeCountProduct(1)"
                            >
                                <i class="text-3xl isax isax-add" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden md:block flex mt-auto mb-3 items-end justify-end text-sm">
                <button
                    :disabled="isEdit"
                    class="relative z-10 flex items-center font-medium text-primary-6000 hover:text-primary-500 text-sm "
                    @click="removeProduct"
                >
                    <span>Xóa</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import _get from 'lodash/get';

    export default {
        components: {
        },

        props: {
            product: {
                type: Object,
                default: () => {},
            },
            isEdit: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                productSelected: null,
            };
        },

        computed: {

        },

        methods: {
            _get,

            removeProduct() {
                this.$emit('remove', this.product);
            },

            changeCountProduct(value) {
                this.$emit('changeCount', this.product, value);
            },
        },
    };
</script>
