const checkToken = require('./checkToken')
module.exports = (app, sudoku_api,user_api,admin_api) => {
    app.get('/', (req, res) => {res.sendFile('index.html')});
    app.post('/login', user_api.sign_in)
    app.post('/signup', user_api.createUser)
    app.post('/edit',checkToken, user_api.editUser)
    app.post('/api/check',checkToken, sudoku_api.checker)
    app.get('/login', (req,res) => {
        res.redirect('/#/login')
    });
    app.get('/signup', (req,res) => {
        res.redirect('/#/signup')
    });
    app.post('/verify', user_api.verify)
    app.get('/api/admin/log', admin_api.view_log)
    app.get('/api/game/:mode/:level', checkToken, sudoku_api.generateboard)
    app.get('/api/users/highscore', sudoku_api.highscore)
    app.get('/api/user/', checkToken,user_api.userData)
    app.use((req, res) => {
        res.redirect('/');
    });

    
}