@ECHO OFF

REM https://stackoverflow.com/questions/37856155/mysql-upgrade-failed-innodb-tables-doesnt-exist
REM https://serverfault.com/questions/761001/mysql-authentification-plugin-is-not-loaded
REM https://jee-appy.blogspot.com/2016/10/plugin-not-loaded-mysql.html
REM https://stackoverflow.com/questions/5555328/error-1396-hy000-operation-create-user-failed-for-jacklocalhost


mysql -h localhost -u root < diytools.sql