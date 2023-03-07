<template>
    <div>
        <a-table
            :data-source="users"
            :pagination="false"
            :scroll="{ x: 1200 }"
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
                key="fullName"
                title="Họ và tên"
                :width="150"
                align="left"
            >
                <template #default="record">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <a-avatar
                                size="large"
                                :src="record.avatar"
                                icon="user"
                                class="flex-shrink-0"
                            />
                            <span class="flex flex-col text-start">
                                <span class="font-semibold">{{ record.fullname || '--' }}</span>
                                <span>{{ record.email }}</span>
                            </span>
                        </div>
                    </div>
                </template>
            </a-table-column>
            <!-- <a-table-column
                key="email"
                title="Email"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.email }}</span>
                </template>
            </a-table-column> -->
            <a-table-column
                key="phoneNumber"
                title="Số điện thoại"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.phoneNumber }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="address"
                title="Địa chỉ"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span v-if="record.address">{{ record.address.province?.name || '--' }}</span>
                    <span v-else>--</span>
                </template>
            </a-table-column>
            <a-table-column
                key="gender"
                title="Giới tính"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <span>{{ GENDER_LABEL[record.gender] || '--' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.status }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                title="Ngày tạo"
                :width="120"
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
                            <a-menu-item>
                                <nuxt-link :to="`/users/${record._id}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item>
                                <nuxt-link :to="`/users/${record._id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="!text-danger-100" @click="refs.ConfirmDialog.open()">
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>

        <Pagination class="mt-5" :data="pagination" />
        <ConfirmDialog
            ref="confirmDelete"
            title="Xóa danh mục"
            content="Bạn chắc chắn xóa danh mục này ?"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script>
    import Pagination from '@/components/shared/Pagination.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import { mapDataFromOptions } from '@/utils/data';
    import { USER_GENDER_OPTIONS } from '@/constants/user/gender';

    export default {
        components: {
            Pagination,
            ConfirmDialog,
        },
        props: {
            users: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
        },

        data() {
            return {
                USER_GENDER_OPTIONS,
                categorySelected: null,
            };
        },

        computed: {
            GENDER_LABEL() {
                return this.mapDataFromOptions(USER_GENDER_OPTIONS, 'value', 'label');
            },
        },

        methods: {
            mapDataFromOptions,

            async confirmDelete() {
                try {
                    await this.$api.postCategories.delete(this.categorySelected._id);
                    this.$message.success('Xóa thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
