module.exports = (app, sudoku_api) => {

    app.get('/', (req, res) => {res.sendFile('index.html')});
    app.post('/check', sudoku_api.checker)
    app.get('/api/new-game/:mode', sudoku_api.all)
    app.use(function(req, res) {
        res.redirect('/');
    });
}