export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:8080/api',
    endpoints: {
      albums: {
        base: '/user/albums',
        search: '/user/albums/search',
        yearSort: '/user/albums/year'
      },
      auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        register: '/auth/register'
      },
      songs: {
        base: '/user/songs',
        search: '/user/songs/search',
        audio: '/songs'
      },
      admin: {
        albums: '/admin/albums',
        songs: '/admin/songs',
        users: '/admin/users',
        userRoles: '/admin/users/:id/roles'
      }
    },
    defaultPagination: {
      pageSize: 20,
      pageIndex: 0
    }
  }
};
