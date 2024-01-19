const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : process.env.RDS_DB_ENDPOINT,
    user     : process.env.RDS_DB_USERNAME,
    password : process.env.RDS_DB_PASSWORD,
    database : process.env.RDS_DB_NAME
});
const createEmailsTableQuery = `
CREATE TABLE IF NOT EXISTS emails (
    id INT AUTO_INCREMENT,
    user_id INT,
    email VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;
connection.query(createEmailsTableQuery, function (error, results, fields) {
    if (error) throw error;
    // emails table created
});

function addEmailForUser(connection, userId, email) {
    const query = "INSERT INTO emails (user_id, email) VALUES (?, ?)";
    connection.query(query, [userId, email], function (error, results, fields) {
        if (error) throw error;
        // Email added for user
    });
}
//addEmailForUser(connection, 1, 'anotheremail@example.com');
function createUser(connection, username, email, password) {
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(query, [username, email, password], function (error, results, fields) {
        if (error) throw error;
        // User created
    });
}
createUser(connection, 'newuser', 'newuser@example.com', 'password');