<!DOCTYPE HTML>
<html lang="en-us">
<head>
<meta charset="UTF-8">
<title><?php echo $_GET["game"];?> Overlay</title>
<link rel="stylesheet" href="main.css">
<script type="module" src="main_<?php echo $_GET["game"];?>.js?time=<?php echo time();?>"></script>
</head>
<body onload="init('assets/<?php echo $_GET["game"];?>/background.png', 1920, 1080, 20);">
</body>
</html>
