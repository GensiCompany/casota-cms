<template>
    <div>
        <a-table
            :data-source="variants"
            :pagination="false"
            :scroll="{ x: 1000 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="index"
                title="STT"
                align="center"
                :width="60"
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="thumbnail"
                title="Ảnh Thumbnail"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <div class="border-[1px] border-solid border-gray-5 rounded-md">
                        <img
                            v-if="record.thumbnail !== ''"
                            :src="record.thumbnail"
                            alt=""
                            class="w-full h-20 object-cover"
                        >
                        <p v-else>
                            Không có dữ liệu
                        </p>
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.title || '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="price"
                title="Giá tiền"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.price | currencyFormat }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="option1"
                title="Màu sắc"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.option1 || '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="option2"
                title="Kích cỡ"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.option2 || '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                title="Ngày tạo"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.createdAt | dateFormat() }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="80"
            >
                <template #default="record">
                    <a-dropdown placement="bottomRight" :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay" class="!w-40">
                            <a-menu-item @click="$refs.VariantDialog.open(record)">
                                Chỉnh sửa
                            </a-menu-item>
                            <a-menu-item
                                class="!text-danger-100"
                                :disabled=" record.isDeleted"
                                @click="() => {
                                    variantSelected = record,
                                    $refs.ConfirmDialog.open();
                                }"
                            >
                                {{ record.isDeleted ? "Không thể xóa" : "Xóa" }}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>

        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa người dùng"
            @confirm="confirmDelete"
        >
            <div class="text-center">
                <p class="text-lg">
                    Bạn chắc chắn xóa sản phẩm này chứ?
                </p>
                <span class="block"><span class="font-semibold">Lưu ý</span>: hành động sẽ không thể hoàn tác</span>
            </div>
        </ConfirmDialog>

        <VariantDialog ref="VariantDialog" :product-selected-id="$route.params.id" />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import VariantDialog from '@/components/products/variants/Dialog.vue';

    export default {
        components: {
            ConfirmDialog,
            VariantDialog,
        },
        props: {
            variants: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                variantSelected: null,
            };
        },

        methods: {
            async confirmDelete() {
                try {
                    await this.$api.productVariants.delete(this.$route.params.id, this.variantSelected._id);
                    this.$message.success('Xóa sản phẩm thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
