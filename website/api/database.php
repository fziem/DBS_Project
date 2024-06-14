<?php
include '.htsecrets';
$conn = pg_connect("host=$db_server dbname=$db_user user=$db_name password=$db_pass connect_timeout=2");
    
if (!$conn) {
    http_response_code(500);
    exit;
}
