CREATE TABLE IF NOT EXISTS ticket (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flight_id INT,
    type VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flight(id) ON DELETE CASCADE ON UPDATE CASCADE
);