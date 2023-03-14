<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Liên hệ" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100" @click="$refs.contactForm.submit()">
                        <i class="isax isax-edit mr-2" />
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card flex-grow mt-4">
            <ContactForm ref="contactForm" :contact="setting" @submit="updateContact" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import ContactForm from '@/components/contact/Form.vue';

    export default {
        components: {
            ContactForm,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                contacts: null,
            };
        },

        computed: {
            ...mapState('settings', ['setting']),
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Liên hệ',
                link: '/contact',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('settings/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateContact(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('settings/update', form);
                    this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Liên hệ',
            };
        },
    };
</script>
