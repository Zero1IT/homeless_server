use pets;

DELIMITER ;;

CREATE PROCEDURE searchNotWatched (
	currentUser INT,
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
END

DELIMITER ;

