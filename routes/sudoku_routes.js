module.exports = (app, sudoku_api) => {

    app.get('/', (req, res) => {res.sendFile('index.html')});
    app.get('/api/new-game/:mode', sudoku_api.all)

}