<?php

if ($_POST['soulgem'] !== '')
{
	echo "error";
	exit();
}

$msg = "Name: " . $_POST["first"] . " " . $_POST["last"] . "\n";
$msg .= "Email: " . $_POST["email"] . "\n";
$msg .= "Phone: " . $_POST["phone"] . "\n";
$msg .= "Venue: " . $_POST["venue"] . "\n";
$msg .= "Dates: " . $_POST["dates"] . "\n\n";
$msg .= $_POST["message"] . "\n";

// use wordwrap() if lines are longer than 70 characters
//$msg = wordwrap($msg,70);

// send email
mail("jack@jacksutherland.com", "Band Contact", $msg, "From: no-reply@jacksutherland.com");

echo "success";

exit();

?>