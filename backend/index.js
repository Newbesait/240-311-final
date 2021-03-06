
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users
require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))


router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });



router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password,admin } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email,admin })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })


    let books = {
        list: [
            { id: 1, name: "Math", author:"Aj.Keng", page:200 ,stock:1,image:"https://e7.pngegg.com/pngimages/475/947/png-clipart-the-math-book-mathematics-textbook-textbooks-s-angle-class-thumbnail.png", },
            { id: 2, name: "Novel", author:"Jhon", page:500 ,stock:0,image:"https://images-na.ssl-images-amazon.com/images/I/51W+Fdn45+L._SX329_BO1,204,203,200_.jpg",  }
        ]
    }





router.get('/bookshelf', async (req, res) => { res.json(books.list) }) //for all

router.route('/bookja/:book_id')
    .put((req, res) => {
        const book_id = req.params.book_id
        const id = books.list.findIndex(item => +item.id === +book_id)
        books.list[id].name = req.body.name
        books.list[id].author = req.body.author
        books.list[id].page = req.body.page
        books.list[id].stock = req.body.stock
        res.json(books.list)
    })

    .delete((req, res) => {
        const book_id = req.params.book_id
       // console.log('bearId: ',book_id)
        books.list = books.list.filter(item => +item.id !== +book_id)
        res.json(books)
    })


router.post('/addbook', async (req, res) => {//for login user
    let newBook = {}
    newBook.id = (books.list.length) ? books.list[books.list.length - 1].id + 1 : 1
    newBook.name = req.body.name
    newBook.author = req.body.author
    newBook.page = req.body.page
    newBook.stock = req.body.stock
    newBook.image = req.body.image
    books = { "list": [...books.list, newBook] }
    res.json(req.books)
})

router.put('/borrow/:book_id', async (req, res) => {   
    const book_id = req.params.book_id
    const id = books.list.findIndex(item => +item.id === +book_id)
    if (books.list[id].stock > 0)
        books.list[id].stock--
        res.json(req.books)

})

router.put('/return/:book_id',async (req, res) => {     
    const book_id = req.params.book_id
    const id = books.list.findIndex(item => +item.id === +book_id)
        books.list[id].stock++
        res.json(req.books)
    })


router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

