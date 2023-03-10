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
            </div>
        </a-form-model>
        <div class="h-[300px]">
            <GmapMap
                ref="gmapMap"
                class="flex-grow flex flex-col w-full h-full"
                :center="{lat: 21.027815961169388, lng: 105.852286278556}"
                :zoom="12"
                :options="{
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: true,
                    disableDefaultUi: false,
                    clickableIcons: false,
                    clickable:true,
                }"
                map-type-id="roadmap"
                @click="mark"
            >
                <GmapMarker
                    :position="{
                        lat: +form.lat,
                        lng: +form.lng,
                    }"
                    :icon="markerIcon"
                />
            </GmapMap>
        </div>
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
        lat: 21.027815961169388,
        lng: 105.852286278556,
    };

    export default {
        props: {
            contact: Object,
        },

        data() {
            return {
                form: this.contact
                    ? _cloneDeep(this.contact)
                    : _cloneDeep(defaultForm),
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
                markerIcon: {
                    url: '/images/map-pin.png',
                    scaledSize: { width: 45, height: 45 },
                    labelOrigin: { x: 25, y: -25 },
                },
            };
        },

        watch: {
            contact() {
                this.form = this.contact
                    ? _cloneDeep(this.contact)
                    : _cloneDeep(defaultForm);
            },

            'form.lat': {
                handler() {
                    this.$forceUpdate();
                },
                deep: true,
                immediate: true,
            },
        },

        methods: {
            mark(event) {
                if (!this.disabled) {
                    this.form.lat = event.latLng.lat();
                    this.form.lng = event.latLng.lng();
                }
            },

            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
