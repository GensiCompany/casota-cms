import Auth from '@/api/auth';
import Users from '@/api/users';
import Banners from '@/api/banners';
import Blogs from '@/api/blogs';
import Categories from '@/api/categories';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        users: Users(context.$axios),
        banners: Banners(context.$axios),
        blogs: Blogs(context.$axios),
        categories: Categories(context.$axios),
    };

    // Inject $api
    inject('api', factories);
};
