const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taekwondo'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/api/scores', (req, res) => {
    const { judge_id, accuracy, presentation, technical } = req.body;
    const query = 'INSERT INTO scores (judge_id, accuracy, presentation, technical) VALUES (?, ?, ?, ?)';
    db.query(query, [judge_id, accuracy, presentation, technical], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: result.insertId, judge_id, accuracy, presentation, technical });
        }
    });
});

app.get('/api/scores', (req, res) => {
    const query = 'SELECT * FROM scores';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // In-memory storage
// let scores = [];
// let judges = [];
// let scoreIdCounter = 1;
// let judgeIdCounter = 1;

// app.post('/api/scores', (req, res) => {
//     const { judge_id, accuracy, presentation, technical } = req.body;
//     const newScore = { id: scoreIdCounter++, judge_id, accuracy, presentation, technical };
//     scores.push(newScore);
//     res.status(201).send(newScore);
// });

// app.get('/api/scores', (req, res) => {
//     res.status(200).send(scores);
// });

// app.post('/api/judges', (req, res) => {
//     const { username, password } = req.body;
//     const newJudge = { id: judgeIdCounter++, username, password };
//     judges.push(newJudge);
//     res.status(201).send(newJudge);
// });

// app.get('/api/judges', (req, res) => {
//     res.status(200).send(judges);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

