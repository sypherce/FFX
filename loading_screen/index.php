<!DOCTYPE HTML>
<html lang="en-us">
<head>
<meta charset="UTF-8">
<title><?php echo $_GET["message"];?></title>
<link rel="stylesheet" href="main.css?time=<?php echo time();?>">
<script type="module" src="main.js?time=<?php echo time();?>"></script>
</head>
<body onload="init('<?php echo $_GET["game"];?>', <?php echo $_GET["color_set"];?>);">
<audio id="myAudio" autoplay>Your browser does not support the audio element.</audio>
<div class="glitch-wrapper">
<div class="glitch" data-text="<?php echo $_GET["message"];?>"><?php echo $_GET["message"];?></div>
</div>
<canvas id="main"></canvas>
</body>
</html>
