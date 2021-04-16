<?php

	class Constants {
		const PAGE_HOME = 'home';
		const PAGE_SHOP = 'shop';
		const PAGE_DETAILS = 'details';
		const PAGE_LOGIN = 'login';
		const PAGE_PROFILE = 'profile';
		const PAGE_CART = 'cart';
		const PAGES = [
			self::PAGE_HOME,
			self::PAGE_SHOP,
			self::PAGE_DETAILS,
			self::PAGE_LOGIN,
			self::PAGE_PROFILE,
			self::PAGE_CART,
		];
	}

	if(!in_array($_GET['page'], Constants::PAGES)){
		header('Location: /?page=' . Constants::PAGE_HOME);
		exit();
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<?php include("view/inc/head.html"); ?>
	</head>
	<body>
		<div id="container">
			<div id="header">
				<?php include("view/inc/header.html"); ?>
			</div>
			<div id="page">
				<?php include("view/inc/pages.php"); ?>
			</div>
			<div id="footer">
				<?php include("view/inc/footer.html"); ?>
			</div>
		</div>
	</body>
</html>