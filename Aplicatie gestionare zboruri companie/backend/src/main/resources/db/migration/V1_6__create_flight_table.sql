CREATE TABLE IF NOT EXISTS flight (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plane_id INT,
    departure_airport_id INT,
    arrival_airport_id INT,
    departure_date TIMESTAMP,
    arrival_date TIMESTAMP,
    FOREIGN KEY (plane_id) REFERENCES plane(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (departure_airport_id) REFERENCES airport(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (arrival_airport_id) REFERENCES airport(id) ON DELETE CASCADE ON UPDATE CASCADE
);