<?
	//echo $_GET['user_id'];
	//echo $_GET['user_pw'];
	$ok_id = "abcdef";
	$ok_pw = "123456";
	$my_id = $_GET['user_id'];
	$my_pw = $_GET['user_pw'];

	if($ok_id == $my_id && $ok_pw == $my_pw ){
		echo "ok_member";
	} else{
		echo "no_member";
	}
?>