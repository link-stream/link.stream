export const constants = {
    vuexLocalStorage: {
        key: 'ls',
    },
    cookies: {
        auth: {
            name: 'ls',
            expires: 1 / 3, // One third of a day (8 hrs)
        },
        pendingUser: {
            name: 'pendingUser',
        },
    },
    links: {
        image: {
            aspectRatio: 1,
        },
    },
    user: {
        profileBannerAspectRatio: 0.254364,
        visibilities: {
            public: 1,
            private: 2,
        },
        account: {
            videosPerPage: 20,
            menuHiddenBreakpoint: 992,
        },
    },
}
