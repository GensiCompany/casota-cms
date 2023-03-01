import AOS from 'aos';
import 'aos/dist/aos.css';
import Vue from 'vue';

const mixin = {
    mounted() {
        AOS.init({
            offset: 400,
            duration: 1000,
            achorPlacement: 'top ',
        });
    },
};
Vue.mixin(mixin);
