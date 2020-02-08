DROP TABLE IF EXISTS nitt_user;
DROP TABLE IF EXISTS vehicle_entry;
DROP TABLE IF EXISTS person_entry;

CREATE TABLE nitt_user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name VARCHAR(255) NOT NULL,
  nitt_id VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE person_entry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  person_name VARCHAR(255) NOT NULL,
  purpose_of_visit VARCHAR(255) NOT NULL,
  from_dest VARCHAR(255) NOT NULL,
  to_dest VARCHAR(255) NOT NULL,
  face_image VARCHAR(255) NOT NULL,
  is_nitt BOOLEAN NOT NULL,
  user_id VARCHAR(255),
  is_vehicle BOOLEAN NOT NULL,
  entry_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  exited BOOLEAN NOT NULL,
  vehicle_number VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(255) NOT NULL,
  vehicle_number_image VARCHAR(255) NOT NULL,
  vehicle_image VARCHAR(255) NOT NULL,
  exit_time TIMESTAMP
); 
