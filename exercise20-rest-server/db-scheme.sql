CREATE TABLE IF NOT EXISTS `opiskelijat` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'laskuri',
  `snimi` varchar(50) DEFAULT NULL COMMENT 'sukunimi',
  `enimi` varchar(50) DEFAULT NULL COMMENT 'etunimi',
  `onumero` varchar(6) DEFAULT NULL COMMENT 'opiskelijanumero',
  `opisteet` int(3) DEFAULT NULL COMMENT 'opintopisteet',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;

INSERT INTO `opiskelijat` (`snimi`, `enimi`, `onumero`, `opisteet`) VALUES
	('Pekkanen', 'Pekka', 'a1235', 130),
	('Nykänen', 'Matti', 'y9342', 90),
	('Vallaton', 'Ville', 'j9494', 112);