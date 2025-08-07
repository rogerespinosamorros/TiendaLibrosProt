

// Rutas usadas en la aplicación por navegación

const ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    POST_BOOK: '/admin/book/post',
    EDIT_BOOK: (id) => `/admin/book/${id}/edit`,
    ORDERS: '/admin/orders',
  },

  CUSTOMER: {
    DASHBOARD: '/customer/dashboard',
    CART: '/customer/cart',
    ORDERS: '/customer/orders',
    PROFILE: '/customer/profile',
  },
};

export default ROUTES;
