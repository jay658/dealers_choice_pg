module.exports = `
DROP TABLE IF EXISTS theRoles;
DROP TABLE IF EXISTS theCast;

CREATE TABLE theCast(
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(50),
    intelligence VARCHAR(50)
);

CREATE TABLE theRoles(
    id INTEGER PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    cast_id INTEGER REFERENCES theCast(id)
);

INSERT INTO theCast (id, name, species, intelligence) VALUES (1, 'Charlie Kelly', 'Human', 'No');
INSERT INTO theCast (id, name, species, intelligence) VALUES (2, 'Ronald ''Mac'' McDonald', 'Human', 'No');
INSERT INTO theCast (id, name, species, intelligence) VALUES (3, 'Dennis Reynolds', 'Human', 'No');
INSERT INTO theCast (id, name, species, intelligence) VALUES (4, 'Deandra ''Sweet Dee'' Reynolds', 'Bird', 'No');
INSERT INTO theCast (id, name, species, intelligence) VALUES (5, 'Frank Reynolds', 'Half of a Human', 'Maybe, but probably no');
INSERT INTO theRoles (id, role, cast_id) VALUES (1, 'Wild Card', 1);
INSERT INTO theRoles (id, role, cast_id) VALUES (2, 'Janitor', 1);
INSERT INTO theRoles (id, role, cast_id) VALUES (3, 'Bouncer', 2);
INSERT INTO theRoles (id, role, cast_id) VALUES (4, 'Manager', 2);
INSERT INTO theRoles (id, role, cast_id) VALUES (5, 'Psychopath', 3);
INSERT INTO theRoles (id, role, cast_id) VALUES (6, 'Bird', 4);
INSERT INTO theRoles (id, role, cast_id) VALUES (7, 'Business Man', 5);
INSERT INTO theRoles (id, role, cast_id) VALUES (8, 'Waitress', 4);
`