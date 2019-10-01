const checkToken = require('./checkToken')
module.exports = (app, sudoku_api,user_api) => {
    
    app.get('/', (req, res) => {res.sendFile('index.html')});
    app.post('/login', user_api.sign_in)
    app.post('/signup', user_api.createUser)
    app.post('/check', sudoku_api.checker)
    app.get('/login', (req,res) => {
        res.redirect('/#/login')
    });
    app.get('/signup', (req,res) => {
        res.redirect('/#/signup')
    });
    app.post('/verify', user_api.verify)
    app.get('/api/new-game/:mode', checkToken, sudoku_api.all)
    app.use((req, res) => {
        res.redirect('/');
    });

    
}