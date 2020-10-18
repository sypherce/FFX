<?php
declare(strict_types = 1);
$filename = $_GET["filename"];
if($filename) {
	switch($filename) {
		case "away_message.txt":
		/*	$contents = file_get_contents($filename);
			if($contents == "_")
				echo("");

			echo(file_get_contents($filename));
			break;*/
		default:
			echo(file_get_contents("./" . $filename));
			break;
	}
}
elseif($value_arg) {
	switch($value_arg) {
		case "battle":
		case "room":
		case "gil":
		case "time":
			echo(file_get_contents("assets/" . $value_arg . ".txt"));
			break;
		default:
			break;
	}
}
?>