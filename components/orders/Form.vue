<template>
    <div :class="`w-full 'bg-white' : 'bg-[#18191a]' px-3 xl:px-0 overflow-auto pb-4`">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 xl:col-span-6 p-3 rounded-md bg-white">
                    <p>1. Thông tin người đặt</p>
                    <a-form-model-item prop="userId" label="Người đặt">
                        <SelectRemote
                            v-model="form.userId"
                            placeholder="Chọn người dùng"
                            fetch-url="users/fetchAll"
                            option-label="email"
                            option-value="_id"
                            store="users"
                            store-prop="users"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="form.shippingInfo"
                        class="!mt-5"
                        label="Tên người nhận"
                        prop="shippingInfo.shippingName"
                    >
                        <a-input
                            v-model="form.shippingInfo.shippingName"
                            placeholder="Tên người nhận"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="form.shippingInfo"
                        class="!mt-5"
                        label="Số điện thoại người nhận"
                        prop="shippingInfo.shippingPhone"
                    >
                        <a-input
                            v-model="form.shippingInfo.shippingPhone"
                            placeholder="Số điện thoại người nhận"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="form.shippingInfo"
                        class="!mt-5"
                        label="Địa chỉ người nhận"
                        prop="shippingInfo.shippingAddress"
                    >
                        <a-textarea
                            v-model="form.shippingInfo.shippingAddress"
                            placeholder="Địa chỉ của người nhận"
                            :auto-size="{ minRows: 3, maxRows: 4 }"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item class="!mt-5" label="Ghi chú">
                        <a-textarea
                            v-model="form.note"
                            placeholder="Địa chỉ của người nhận"
                            :auto-size="{ minRows: 3, maxRows: 4 }"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                </div>
                <div :class="`col-span-12 xl:col-span-6`">
                    <div class="bg-white p-3 mb-3 rounded-md">
                        <p> 2. Sản phẩm trong đơn hàng </p>
                        <a-form-model-item prop="orderItems" label="Sản phẩm trong giỏ hàng">
                            <a-select
                                v-model="stateSelectVariant"
                                :disabled="isEdit"
                                placeholder="Tìm kiếm sản phẩm"
                                @change="changeCart"
                            >
                                <a-select-option v-for="variant in allVariants" :key="variant._id" :value="variant._id">
                                    {{ variant.title }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <div v-for="orderItem in form.orderItems" :key="orderItem.variantId" class="mt-3 grid grid-cols-1 gap-y-3">
                            <ProductCard
                                :product="orderItem"
                                :is-edit="isEdit"
                                @changeCount="changeCount"
                                @remove="() => {
                                    $refs.ConfirmDialog.open(),
                                    variantSelected = orderItem
                                }"
                            />
                        </div>
                        <a-form-model-item prop="orderItems" class="!mt-5" label="Phí vận chuyển">
                            <a-input
                                v-model="form.shippingFee"
                                placeholder="Phí vận chuyển"
                                :disabled="isEdit"
                            />
                        </a-form-model-item>
                    </div>
                </div>
            </div>
        </a-form-model>
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa sản phẩm ?"
            content="Bạn chắc chắn muốn xóa sản phẩm này chứ ?"
            @confirm="remove"
        />
    </div>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty';
    import { mapState, mapGetters } from 'vuex';
    import _cloneDeep from 'lodash/cloneDeep';
    import SelectRemote from '@/components/filters/MonggoDBSelect.vue';
    import ProductCard from '@/components/orders/ProductCard.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    const form = {
        note: '',
        userId: '',
        shippingFee: 0,
        orderItems: [],
        shippingInfo: {
            shippingName: '',
            shippingPhone: '',
            shippingAddress: '',
        },
    };

    export default {
        components: {
            SelectRemote,
            ProductCard,
            ConfirmDialog,
        },

        props: {
            order: {
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
                stateSelectVariant: null,
                form: this.order ? _cloneDeep(this.order) : _cloneDeep(form),
                rules: {
                    userId: [{ required: true, message: 'Vui lòng nhập tên người nhận', trigger: 'blur' }],
                    'shippingInfo.shippingName': [{ required: true, message: 'Vui lòng nhập tên người nhận', trigger: 'blur' }],
                    'shippingInfo.shippingPhone': [{ required: true, message: 'Vui lòng nhập số điện thoại người nhận', trigger: 'blur' }],
                    'shippingInfo.shippingAddress': [{ required: true, message: 'Vui lòng nhập địa chỉ người nhận', trigger: 'blur' }],
                },
                variantSelected: null,
            };
        },

        computed: {
            ...mapGetters('products', ['allVariants']),
            ...mapState('products/categories', ['categories']),
        },

        watch: {
            order() {
                this.form = this.order ? _cloneDeep(this.order) : _cloneDeep(form);
            },
        },

        methods: {
            _isEmpty,

            changeCart(id) {
                const product = this.allVariants.find((item) => item._id === id);
                const hasProductId = this.form.orderItems.findIndex((item) => item.variantId === id);
                const hasProduct = this.form.orderItems.find((item) => item.variantId === id);
                if (hasProductId === -1 && !hasProduct) {
                    this.form.orderItems.unshift({
                        variant: {
                            ...product,
                        },
                        variantId: id,
                        quantity: 1,
                    });
                } else {
                    this.form.orderItems[hasProductId] = {
                        variant: {
                            ...product,
                        },
                        variantId: id,
                        quantity: hasProduct.quantity = +hasProduct.quantity + 1,
                    };
                }
                this.stateSelectVariant = null;
            },

            changeCount(_product, value) {
                const hasProductId = this.form.orderItems.findIndex((item) => item.variantId === _product.variantId);
                this.form.orderItems[hasProductId] = {
                    ..._product,
                    variantId: _product.variantId,
                    quantity: _product.quantity += +value,
                };
                this.$forceUpdate();
            },

            remove() {
                this.form.orderItems = this.form.orderItems.filter((item) => item.variantId !== this.variantSelected.variantId);
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
