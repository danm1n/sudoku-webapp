module.exports = (app, sudoku_api,user_api) => {

    app.get('/', (req, res) => {res.sendFile('index.html')});
    app.post('/login', user_api.auth)
    app.post('/signup', user_api.createUser)
    app.post('/check', sudoku_api.checker)
    app.get('/login', (req,res) => {
        res.redirect('/#/login')
    });
    app.get('/signup', (req,res) => {
        res.redirect('/#/signup')
    });
    app.post('/checker', user_api.check)
    app.get('/api/new-game/:mode', sudoku_api.all)
    app.use((req, res) => {
        res.redirect('/');
    });
}