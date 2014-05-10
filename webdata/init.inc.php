<?php

error_reporting(E_ALL ^ E_STRICT ^ E_NOTICE);

include(__DIR__ . '/stdlibs/pixframework/Pix/Loader.php');
set_include_path(__DIR__ . '/stdlibs/pixframework/'
    . PATH_SEPARATOR . __DIR__ . '/models'
);

Pix_Loader::registerAutoLoad();

if (file_exists(__DIR__ . '/config.php')) {
    include(__DIR__ . '/config.php');
}
Pix_Table::setLongQueryTime(3);

define('ROOTPATH', __DIR__);
if (!file_exists(__DIR__ . '/config.json')) {
    die("Config file not found.");
}
$fp = file_get_contents(__DIR__ . '/config.json');
if (!$fp) {
    die("Can't open config file.");
}

$config = json_decode($fp);
class Config
{
    private static $_config = null;
    public static function load($config) {
        self::$_config = $config;
    }
    public static function get($key) {
        if (isset(self::$_config->$key)) {
            return self::$_config->$key;
        } else {
            return "";
        }
    }
}

Config::load(json_decode($fp));
/*
if (!preg_match('#pgsql://([^:]*):([^@]*)@([^/]*)/(.*)#', strval(getenv('PGSQL_DATABASE_URL')), $matches)) {
    die('pgsql only');
}
$options = array(
    'host' => $matches[3],
    'user' => $matches[1],
    'password' => $matches[2],
    'dbname' => $matches[4],
);

Pix_Table::setDefaultDb(new Pix_Table_Db_Adapter_PgSQL($options));
 */
