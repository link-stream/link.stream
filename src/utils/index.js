import { set } from 'lodash'

/**
 * Change the status of target object for duration.
 * This function is useful to change status in animations.
 *
 * @param {<Object>} obj
 * @param {<String>} target
 * @param {<Boolean>} value
 * @param {<Function>} callback
 * @param {<Number>} duration
 * @return
 */
export function setStatusChange(
    obj,
    target,
    value = true,
    callback = null,
    duration = 3000
) {
    set(obj, target, value)
    setTimeout(() => {
        if (callback) {
            callback()
        }
        set(obj, target, null)
    }, duration)
}

/**
 * Get the thumb image URL of a YouTube video.
 * @param {string} videoId
 * @return {string}
 */
export function getYtVideoThumbUrl(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}
