import { set } from 'lodash'
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy,
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

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
export function setStatusChange(obj, target, value = true, callback = null, duration = 3000) {
    set(obj, target, value)
    setTimeout(() => {
        if (callback) {
            callback()
        }
        set(obj, target, null)
    }, duration)
}

/**
 * Generate HTML image src attribute from a base64 encoded image.
 * @param {string} base64 
 * @return {string|null}
 */
export function base64ImgToSrc(base64) {
    if (base64) {
        return `data:image/jpeg;base64,${base64}`
    }
    return null
}