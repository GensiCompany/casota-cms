<template>
    <div>
        <a-table
            :data-source="policies"
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
                :custom-render="
                    (text, record, index) =>index + 1"
            />
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <nuxt-link :to="`/policies/${record._id}`">
                        {{ record.title }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="page"
                title="Tên Trang"
                align="center"
                :width="150"
            >
                <template #default="record">
                    <div>{{ PAGE_LABEL[record.page] }}</div>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                data-index="createdAt"
                title="Ngày tạo"
                align="center"
                :width="120"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="updatedAt"
                data-index="updatedAt"
                title="Cập nhật lần cuối"
                align="center"
                :width="120"
            >
                <template #default="updatedAt">
                    {{ updatedAt | dateFormat('dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                title="Thao tác"
                align="center"
                :width="100"
            >
                <template #default="record">
                    <a-dropdown placement="bottomRight" :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay" class="!w-40">
                            <a-menu-item>
                                <nuxt-link :to="`/policies/${record._id}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item>
                                <nuxt-link :to="`/policies/${record._id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item
                                @click="()=> {
                                    policySelected = record,
                                    $refs.ConfirmDialog.open();
                                }"
                            >
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>

        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa chính sách"
            content="Bạn chắc chắn xóa chính sách này ?"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import { PAGE_OPTIONS } from '@/constants/policies/page';
    import { mapDataFromOptions } from '@/utils/data';

    export default {
        components: {
            ConfirmDialog,
        },

        props: {
            policies: {
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
                PAGE_OPTIONS,
                policySelected: null,
            };
        },

        computed: {
            PAGE_LABEL() {
                return this.mapDataFromOptions(PAGE_OPTIONS, 'value', 'label');
            },
        },

        watch: {
        },

        methods: {
            mapDataFromOptions,

            async confirmDelete() {
                try {
                    await this.$api.policies.delete(this.policySelected._id);
                    this.$message.success('Xóa chính sách thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
