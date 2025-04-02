CREATE TABLE `folder_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent` int,
	CONSTRAINT `folder_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `file_table` RENAME COLUMN `parentId` TO `parent`;--> statement-breakpoint
ALTER TABLE `file_table` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `file_table` MODIFY COLUMN `url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `file_table` MODIFY COLUMN `size` int NOT NULL;--> statement-breakpoint
CREATE INDEX `parent_inndex` ON `folder_table` (`parent`);--> statement-breakpoint
CREATE INDEX `parent_inndex` ON `file_table` (`parent`);--> statement-breakpoint
ALTER TABLE `file_table` DROP COLUMN `type`;