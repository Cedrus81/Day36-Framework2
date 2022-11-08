export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomInt,
    getRandomCurrency,
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomInt(max, min) {
    return Math.floor(Math.random() * max) + min
}

function getRandomCurrency() {
    let number = Math.random() * 3
    if (number > 2) return 'EUR'
    if (number > 1) return 'ILS'
    return 'USD'
}