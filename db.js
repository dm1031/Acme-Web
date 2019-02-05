const pg = require('pg');
const client = new pg.Client('postgress://localhost/acme_web_db');

client.connect();

function getPages() {
    return client.query(`SELECT * from pages`)
    .then(response => response.rows);
}

function getContent(id) {
    return client.query(`SELECT * from content WHERE page_id = $1`, [id])
    .then(response => response.rows);
}

function sync() {
    return client.query(SEED);
}

const SEED = `
    DROP TABLE IF EXISTS content;
    DROP TABLE IF EXISTS pages;
    CREATE TABLE pages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) unique,
        is_home_page BOOLEAN
    );
    CREATE TABLE content (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) unique,
        body TEXT,
        page_id integer references pages(id)
    );
    INSERT INTO pages(name, is_home_page) values ('Home', true);
    INSERT INTO pages(name, is_home_page) values ('Employees', false);
    INSERT INTO pages(name, is_home_page) values ('Contact', false);
    INSERT INTO content(name, body, page_id) values ('Welcome to the Home Page', 'We so look forward to having you browse our site', 1);
    INSERT INTO content(name, body, page_id) values ('Moe', 'Moe is our CEO!!!', 2);
    INSERT INTO content(name, body, page_id) values ('Larry', 'Larry is our CTO!!!', 2);
    INSERT INTO content(name, body, page_id) values ('Curly', 'Curly is our COO!!!', 2);
    INSERT INTO content(name, body, page_id) values ('Phone', 'Call us at 212-555-1212', 3);
    INSERT INTO content(name, body, page_id) values ('Fax', 'Fax us at 212-555-1212', 3);
`;

module.exports = {
    getPages,
    getContent,
    sync
}
