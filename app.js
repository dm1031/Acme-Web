const express = require('express');
const db = require('./db');
const app = express();
module.exports = app;

app.use((req, res, next) => {
    db.getPages()
    .then(pages => {
        req.pages = pages;
    })
    next();
})

app.get('/pages/:id', (req, res, next) => {
    db.getContent(req.params.id)
    .then(content => res.send(`
    <html>
    <head>
    <link rel = 'stylesheet' href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' />
    </head>
    <body>
    <div class = 'container'>
        <h1>Acme Web</h1>
        <ul class = 'nav nav-tabs'>
            ${req.pages.map(page => {
                return `
                <a href = '/pages/${page.id}' class = 'nav-link'>
                <span class = 'nav nav-item'>${page.name}</span>
                </a>
                    `;
                }
            ).join(' ')
        }
        </ul>
        <p>
        <div>
            ${content.map(page => {
                return `
                <div><h2>${page.name}</h2></div>
                <div>${page.body}</div>`;
                }).join('')
            }
        </div>
    </div>
    </body>
    </html>`
    )
)
    .catch(next);
})

