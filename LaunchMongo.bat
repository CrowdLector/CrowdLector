@ECHO OFF

if not exist MongoDB mkdir MongoDB
mongod --dbpath ./MongoDB/