const Bluebird = require('bluebird')
const passport = require('passport')

const authenticate = (req, res, next) => new Bluebird((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return reject(err)
        }

        return resolve(user)
    })(req, res, next)
})

const login = (req, user) => new Bluebird((resolve, reject) => {
    req.login(user, (err) => {
        if (err) {
            return reject(err)
        }

        return resolve()
    })
})

const regenerateSession = req => new Bluebird((resolve, reject) => {
    req.session.regenerate((err) => {
        if (err) {
            return reject(err)
        }

        return resolve()
    })
})

const saveSession = req => new Bluebird((resolve, reject) => {
    req.session.save((err) => {
        if (err) {
            return reject(err)
        }

        return resolve()
    })
})

module.exports = (req, res, next) => Bluebird.resolve()
    .then(async () => {
        const user = await authenticate(req, res, next)

        if (!user) {
            return res.status(401).send('Invalid email or password')
        }
        await login(req, user)
        const temp = req.session.passport

        await regenerateSession(req)
        req.session.passport = temp

        await saveSession(req)

        return res.send()
    })
    .catch(next)


