export function generateRandomString() {
    return Math.random().toString(32).slice(2)
}

export function generateFingerprint() {
    return 'fp_'+generateRandomString();
}

export function generateAPIKey() {
    return 'voy-'+[...Array(4)].map(generateRandomString).join('')
}