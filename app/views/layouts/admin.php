<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="/css/styles.css">
	<title><?=$title?></title>
	<script src="/js/core.js"></script>
	<script src="/js/custom.js"></script>
</head>
<body lang="ru">
<div class="container">
    <div class="flash"><?=$flash?></div>
    <h2 class="title">
        <a href="<?=$this->route('admin')?>" class="login">Привет, <?=$admin?></a>
        Admin Panel
        <a href="<?=$this->route('admin/logout')?>" class="logout">Выйти</a>
    </h2>
    <ul class="menu radius">
        <li><a href="<?=$this->route('admin/usercreate')?>">Создать Пользователя</a></li>
    </ul>
    <?include 'app/views/'.$content_view.'.php';?>
    <div class="notice"><?=$notice?></div>
</div>
</body>
</html>