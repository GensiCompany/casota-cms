<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Hình ảnh Instagram" />
                <div class="flex gap-5">
                    <a-button
                        v-if="isEdit"
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                        @click="isEdit = !isEdit"
                    >
                        Chỉnh sửa
                    </a-button>
                    <a-button
                        v-if="!isEdit"
                        @click="cancelUpdate"
                    >
                        Hủy
                    </a-button>
                    <a-button
                        v-if="!isEdit"
                        type="primary"
                        class="!bg-prim-100 !border-prim-100"
                    >
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-5">
            <MediasForm :is-edit="isEdit" :data="medias" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import MediasForm from '@/components/medias/Form.vue';

    export default {
        components: {
            MediasForm,
        },

        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                loading: false,
                isEdit: true,
            };
        },

        computed: {
            ...mapState('medias', ['medias']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách Instagram',
                link: '/medias',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    // await this.$store.dispatch('medias/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async cancelUpdate() {
                this.isEdit = !this.isEdit;
                await this.$nuxt.refresh();
                this.$forceUpdate();
            },
        },

        head() {
            return {
                title: 'Danh sách Instagram',
            };
        },
    };
</script>
