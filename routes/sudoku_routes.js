module.exports = (app, sudoku_api,user_api) => {

    app.get('/', (req, res) => {res.sendFile('index.html')});
    app.post('/login', user_api.auth)
    app.post('/signup', user_api.createUser)
    app.post('/check', sudoku_api.checker)
    app.get('/api/new-game/:mode', sudoku_api.all)
    app.use(function(req, res) {
        res.redirect('/');
    });
}