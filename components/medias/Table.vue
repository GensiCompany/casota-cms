<template>
    <div>
        <a-table
            :data-source="medias"
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
                :custom-render="
                    (text, record, index) =>index+1
                "
            />
            <a-table-column
                key="source"
                title="Ảnh"
                :width="150"
                align="center"
                data-index="source"
            >
                <template #default="source">
                    <img :src="source" alt="/" class="rounded-md w-full h-28 object-cover">
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="150"
                align="center"
                data-index="title"
            >
                <template #default="title">
                    <p v-if="title">
                        {{ title }}
                    </p>
                    <p v-else>
                        {{ 'Không có Tiêu đề' }}
                    </p>
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
                key="action"
                title="Thao tác"
                align="center"
                :width="100"
                fixed="right"
            >
                <template #default="media">
                    <a-button
                        type="primary"
                        class="!bg-prim-100 !border-transparent !leading-[10px]"
                        shape="circle"
                        @click="() => {
                            mediaSelected = media,
                            $refs.MediasDialog.open(media)
                        }"
                    >
                        <i class="isax isax-edit" />
                    </a-button>
                    <a-button
                        type="primary"
                        shape="circle"
                        class="!bg-prim-100 !border-transparent !leading-[10px]"
                        @click="() => {
                            mediaSelected = media,
                            $refs.ConfirmDialog.open()}"
                    >
                        <i class="isax isax-trash" />
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa Ảnh"
            content="Bạn chắc chắn xóa ảnh này ?"
            @confirm="confirmDelete"
        />
        <MediasDialog ref="MediasDialog" />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import MediasDialog from '@/components/medias/Dialog.vue';

    export default {
        components: {
            ConfirmDialog,
            MediasDialog,
        },

        props: {
            medias: {
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
                mediaSelected: null,
            };
        },
        computed: {
        },

        methods: {
            async confirmDelete() {
                try {
                    await this.$api.medias.delete(this.mediaSelected._id);
                    this.$message.success('Xóa ảnh thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
