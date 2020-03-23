use pets;

DELIMITER ;;

DROP PROCEDURE IF EXISTS searchNotWatched;;
CREATE PROCEDURE searchNotWatched (
	currentUser int,
    _max tinyint unsigned
)
BEGIN
	select * from adverts 
	where id not in (
		select advertId from likes where userId = currentUser
		union
		select advertId from dislikes where userId = currentUser
		)
	and userId != currentUser
    limit _max;
END;;

DELIMITER ;