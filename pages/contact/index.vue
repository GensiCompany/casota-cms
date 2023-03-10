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
            <ContactForm ref="contactForm" :contact="contacts" @submit="updateContact" />
        </div>
    </div>
</template>

<script>
    // import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import ContactForm from '@/components/contact/Form.vue';

    export default {
        components: {
            ContactForm,
        },

        async fetch() {
            // await this.fetchData();
        },

        data() {
            return {
                loading: false,
                contacts: null,
            };
        },

        computed: {
            // ...mapState('images', ['images', 'pagination']),
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
                    // await this.$store.dispatch('images/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            updateContact() {
                console.log(1);
            },
        },

        head() {
            return {
                title: 'Liên hệ',
            };
        },
    };
</script>
