<?php

if($is_login)
	$this->page('index');
else
	$this->page('login');

?>