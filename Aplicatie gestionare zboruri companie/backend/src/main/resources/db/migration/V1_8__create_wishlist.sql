CREATE TABLE IF NOT EXISTS user_ticket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    ticket_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (ticket_id) REFERENCES ticket (id)
);