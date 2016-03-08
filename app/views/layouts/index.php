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
    <?php include 'app/views/'.$content_view.'.php'; ?>
    <div class="notice"><?=$notice?></div>
</div>
</body>
</html>