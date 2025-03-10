CREATE TABLE `file_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	`type` text,
	`url` text,
	`parentId` int,
	`size` text,
	CONSTRAINT `file_table_id` PRIMARY KEY(`id`)
);
