// Common
export const types = {
    RESET: 'RESET',
    SET_TIMEZONES: 'SET_TIMEZONES',
    SET_GENRES: 'SET_GENRES',
    SET_AUDIO_KEYS: 'SET_AUDIO_KEYS',
}

// Auth
export const authTypes = {
    SIGNUP: 'SIGNUP',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

// Logged In User
export const meTypes = {
    // User
    SET_USER: 'SET_USER',
    SET_VISIBILITIES: 'SET_VISIBILITIES',
    SET_LICENSES: 'SET_LICENSES',

    // Tracks
    SET_TRACKS: 'SET_TRACKS',

    // Videos
    SET_VIDEOS: 'SET_VIDEOS',
    UPDATE_VIDEO: 'UPDATE_VIDEO',
    DELETE_VIDEO: 'DELETE_VIDEO',
    REORDER_VIDEO: 'REORDER_VIDEO',

    // Links
    SET_LINKS: 'SET_LINKS',
    UPDATE_LINK: 'UPDATE_LINK',
    DELETE_LINK: 'DELETE_LINK',
    REORDER_LINK: 'REORDER_LINK',
}
