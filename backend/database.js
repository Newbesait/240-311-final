const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'Warrun', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'newbesait@gmail.com' },
        
    ]
}
let books = {
    list: [
        { id: 1, name: "Math", author:"Aj.Keng", page:200 ,stock:1 },
        { id: 2, name: "Novel", author:"Jhon", page:500 ,stock:0  }
    ]
}

const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.users = users 
exports.books = books 

exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setUsers = function(_users) { 
  users = _users;
}

exports.setStudent = function(_books) { 
    books = _books;
  }
  

// === validate username/password ===
exports.isValidUser = async (username, password) => { 
    const index = users.users.findIndex(item => item.username === username) 
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}