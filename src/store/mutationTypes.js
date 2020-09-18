// Common
export const commonTypes = {
    RESET: 'RESET',
    SET_TIMEZONES: 'SET_TIMEZONES',
    SET_GENRES: 'SET_GENRES',
    SET_AUDIO_KEYS: 'SET_AUDIO_KEYS',
}

// Auth
export const authTypes = {
    SIGNUP: 'SIGNUP',
    LOGIN: 'LOGIN',
}

// Loading
export const loadingTypes = {
    SET_STATUS: 'SET_STATUS',
}

// Track Add Wizard
export const trackAddWizardTypes = {
    UPDATE_FORM: 'UPDATE_FORM',
    SET_LICENSES: 'SET_LICENSES',
    UPDATE_LICENSE: 'UPDATE_LICENSE',
}

// Account
export const meTypes = {
    // User
    SET_USER: 'SET_USER',

    // Licenses
    SET_LICENSES: 'SET_LICENSES',
    UPDATE_LICENSE: 'UPDATE_LICENSE',

    // Tracks
    SET_BEATS: 'SET_BEATS',
    ADD_BEAT: 'ADD_BEAT',
    UPDATE_BEAT: 'UPDATE_BEAT',
    DELETE_BEAT: 'DELETE_BEAT',
    REORDER_BEAT: 'REORDER_BEAT',

    SET_SOUND_KITS: 'SET_SOUND_KITS',
    ADD_SOUND_KIT: 'ADD_SOUND_KIT',
    UPDATE_SOUND_KIT: 'UPDATE_SOUND_KIT',
    DELETE_SOUND_KIT: 'DELETE_SOUND_KIT',
    REORDER_SOUND_KIT: 'REORDER_SOUND_KIT',

    SET_BEAT_PACKS: 'SET_BEAT_PACKS',
    ADD_BEAT_PACK: 'ADD_BEAT_PACK',
    UPDATE_BEAT_PACK: 'UPDATE_BEAT_PACK',
    DELETE_BEAT_PACK: 'DELETE_BEAT_PACK',
    REORDER_BEAT_PACK: 'REORDER_BEAT_PACK',
    SET_RELATED_BEAT_PACK: 'SET_RELATED_BEAT_PACK',

    // Videos
    SET_VIDEOS: 'SET_VIDEOS',
    ADD_VIDEO: 'ADD_VIDEO',
    UPDATE_VIDEO: 'UPDATE_VIDEO',
    DELETE_VIDEO: 'DELETE_VIDEO',
    REORDER_VIDEO: 'REORDER_VIDEO',
    SET_RELATED_TRACKS: 'SET_RELATED_TRACKS',

    // Links
    SET_LINKS: 'SET_LINKS',
    ADD_LINK: 'ADD_LINK',
    UPDATE_LINK: 'UPDATE_LINK',
    DELETE_LINK: 'DELETE_LINK',
    REORDER_LINK: 'REORDER_LINK',

    //Account
    SET_PURCHASES: 'SET_PURCHASES',
    SET_PAYMENT_METHODS: 'SET_PAYMENT_METHODS',
    ADD_PAYMENT_METHOD: 'ADD_PAYMENT_METHOD',
    UPDATE_PAYMENT_METHOD: 'UPDATE_PAYMENT_METHOD',
    DELETE_PAYMENT_METHOD: 'DELETE_PAYMENT_METHOD',
    SET_BANK_INFO: 'SET_BANK_INFO',
    SET_NOTIFICATION: 'SET_NOTIFICATION',
}

//Profiles
export const profileTypes = {
    SET_PROFILE: 'SET_PROFILE',
    SET_BEATS: 'SET_BEATS',
    SET_SOUND_KITS: 'SET_SOUND_KITS',
    SET_VIDEOS: 'SET_VIDEOS',
    SET_LINKS: 'SET_LINKS',
    SET_GENRES: 'SET_GENRES',
    SET_LICENSES: 'SET_LICENSES',
    ADD_CART_ITEM: 'ADD_CART_ITEM',
    REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
}

//Marketing
export const marketingTypes = {
    //Messages
    SET_SEND_TO: 'SET_SEND_TO',
    SET_SMS_DATA: 'SET_SMS_DATA',
    SET_MESSAGES: 'SET_MESSAGES',
    ADD_MESSAGE: 'ADD_MESSAGE',
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',

    //Subscribers
    SET_SUBSCRIBERS: 'SET_SUBSCRIBERS',
    ADD_SUBSCRIBER: 'ADD_SUBSCRIBER',
    UPDATE_SUBSCRIBER: 'UPDATE_SUBSCRIBER',
    SET_TAGS: 'SET_TAGS',
}
