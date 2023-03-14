import Auth from '@/api/auth';
import Users from '@/api/users';
import Uploaders from '@/api/uploaders';
import Banners from '@/api/banners';
import Blogs from '@/api/blogs';
import Categories from '@/api/categories';
import Faqs from '@/api/faqs';
import Products from '@/api/products';
import ProductVariants from '@/api/products/variants';
import Settings from '@/api/settings';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        users: Users(context.$axios),
        banners: Banners(context.$axios),
        blogs: Blogs(context.$axios),
        categories: Categories(context.$axios),
        faqs: Faqs(context.$axios),
        uploaders: Uploaders(context.$axios),
        products: Products(context.$axios),
        productVariants: ProductVariants(context.$axios),
        settings: Settings(context.$axios),
    };

    // Inject $api
    inject('api', factories);
};
