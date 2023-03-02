<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Liên hệ" />
                <div class="flex gap-5">
                    <a-button type="primary" class="!bg-prim-100 !border-prim-100">
                        <i class="fas fa-plus mr-2" />
                        Thêm mới
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
    // import GiftEvent from '@/components/settings/gift/Table.vue';
    // import DisplayEvent from '@/components/settings/tables/Display.vue';
    // import TypeWheelEvent from '@/components/settings/tables/TypeWheel.vue';

    export default {
        components: {
            ContactForm,
            // GiftEvent,
            // DisplayEvent,
            // TypeWheelEvent,
        },

        async fetch() {
            // await this.fetchData();
        },
        data() {
            return {
                loading: false,
                contacts: {},
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
