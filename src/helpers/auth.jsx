export default function auth () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: 'Jason Berney',
                uid: 'jasonrberney',
            })
        }, 2000)
    })
}