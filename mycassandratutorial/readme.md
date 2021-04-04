docker-compose up
mvn spring-boot:run
docker pull cassandra:latest
docker run -d --name cassandra-node -p 9042:9042 cassandra
docker exec -it cassandra-node bash
cqlsh
CREATE KEYSPACE test_ks WITH replication = { 'class': 'SimpleStrategy', 'replication_factor':1};
USE test_ks; 
CREATE TABLE test_ks.user_dt1(user_id int PRIMARY KEY, user_name text, city text);
CREATE TABLE test_ks.tutorial(id uuid PRIMARY KEY, title text, description text, published boolean);
SELECT * FROM system_schema.keyspaces;


npm install node-cassandra-cql

https://github.com/jorgebay/node-cassandra-cql
https://www.tutorialspoint.com/expressjs/expressjs_routing.htm
https://express-cassandra.readthedocs.io/en/stable/installation/

mkdir mycassandratutorial
cd mycassandratutorial
npm init
npm install --save express
npm install express-cassandra