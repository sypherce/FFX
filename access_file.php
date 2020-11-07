<?php
declare(strict_types = 1);
$filename_arg = $_GET["filename"];
$game_arg = $_GET["game"];
$character_arg = $_GET["character"];
$stat_arg = $_GET["stat"];
$value_arg = $_GET["value"];
if($filename_arg) {
	switch($filename_arg) {
		/*case "away_message.txt":
			$contents = file_get_contents($filename);
			if($contents == "_")
				echo("");

			echo(file_get_contents($filename));
			break;*/
		default:
		echo(file_get_contents("./" . $filename_arg));
			break;
	}
}
elseif($character_arg && $stat_arg) {
	echo(file_get_contents("overlay/assets/" . $game_arg . "/" . $character_arg . "/" . $stat_arg . ".txt"));
}
elseif($value_arg) {
	switch($value_arg) {
		case "battle":
		case "room":
		case "gil":
		case "time":
			echo(file_get_contents("overlay/assets/" . $game_arg . "/" . $value_arg . ".txt"));
			break;
		default:
			break;
	}
}
?>
