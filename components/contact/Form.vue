<template>
    <div class="h-full flex flex-col gap-4">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
        >
            <div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 mb-2">
                    <a-form-model-item class="md:col-span-2" label="Tên công ty" prop="companyName">
                        <a-input v-model="form.companyName" placeholder="Tên công ty" />
                    </a-form-model-item>
                    <a-form-model-item label="Số điện thoại" prop="phoneNumber">
                        <a-input v-model="form.phoneNumber" placeholder="Số điện thoại" />
                    </a-form-model-item>
                    <a-form-model-item label="Email" prop="email">
                        <a-input v-model="form.email" placeholder="Email" />
                    </a-form-model-item>
                </div>
                <a-form-model-item label="Địa chỉ" prop="address">
                    <a-input v-model="form.address" placeholder="Địa chỉ" />
                </a-form-model-item>
                <a-form-model-item label="Nhúng bản đồ" prop="iframe">
                    <a-textarea
                        v-model="form.map"
                        :auto-size="{ minRows: 3, maxRows: 4 }"
                        placeholder="Nhúng iframe vào đây"
                        :spellcheck="false"
                        @change="changeMap"
                    />
                </a-form-model-item>
            </div>
        </a-form-model>
        <div class="map-iframe h-[300px]" v-html="form.map === '' ? defaultMap : form.map" />
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import {
        validEmail,
        phoneValidator,
    } from '@/utils/form';

    const defaultForm = {
        companyName: '',
        address: '',
        phoneNumber: '',
        email: '',
        map: '',
    };

    export default {
        props: {
            contact: Object,
        },

        data() {
            return {
                form: this.contact ? _cloneDeep(this.contact) : _cloneDeep(defaultForm),
                rules: {
                    companyName: [{ required: true, message: 'Vui lòng nhập tên công ty - doanh nghiệp', trigger: 'blur' }],
                    address: [{ required: true, message: 'Vui lòng nhập địa chỉ', trigger: 'change' }],
                    email: [{
                        required: true, validator: validEmail, message: 'Vui lòng nhập đúng định dạng email', trigger: ['change', 'blur'],
                    }],
                    phoneNumber: [{
                        required: true, validator: phoneValidator, message: 'Vui lòng nhập đúng định dạng số điện thoại', trigger: ['change', 'blur'],
                    }],
                },
                defaultMap: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29789.444663766186!2d105.82668445893559!3d21.045462965012675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab111d6509a3%3A0xa889b563318408b2!2zQuG7h25oIHZp4buHbiBQaOG7lWkgVHJ1bmcgxrDGoW5n!5e0!3m2!1svi!2s!4v1679195838257!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
            };
        },

        watch: {
            contact() {
                this.form = this.contact ? _cloneDeep(this.contact) : _cloneDeep(defaultForm);
                if (this.form.map.split(' ')[0] !== '<iframe') {
                    this.form.map = this.defaultMap;
                }
            },
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },

            changeMap() {
                if (this.form.map.split(' ')[0] !== '<iframe') {
                    this.form.map = this.defaultMap;
                }
            },
        },
    };
</script>

<style lang="scss">
    .map-iframe {
        iframe {
            @apply w-full h-[300px] #{!important};
        }
    }
</style>
