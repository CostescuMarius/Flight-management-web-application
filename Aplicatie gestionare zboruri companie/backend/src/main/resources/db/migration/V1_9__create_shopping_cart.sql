CREATE TABLE IF NOT EXISTS shopping_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    ticket_id INT,
    cantity INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (ticket_id) REFERENCES ticket (id)
);