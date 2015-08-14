-- Trigger for insert in table jur_current_state_game
DELIMITER //
CREATE TRIGGER INSERT_STATE_GAME AFTER INSERT ON jur_users
FOR EACH ROW 
BEGIN
    INSERT INTO jur_current_state_game VALUES(NEW.id,1,1,1,0);
END;//
DELIMITER;

-- Trigger for insert table juer_duel_result
DELIMITER $$
CREATE TRIGGER INSERT_DUEL_RESULT AFTER INSERT ON jur_duel
FOR EACH ROW 
BEGIN
    INSERT INTO jur_duel_result VALUES('',NEW.id,'','','','');
END;$$
DELIMITER;