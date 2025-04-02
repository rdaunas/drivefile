ALTER TABLE `file_table` RENAME COLUMN `parent` TO `parentId`;--> statement-breakpoint
DROP INDEX `parent_inndex` ON `file_table`;--> statement-breakpoint
DROP INDEX `parent_inndex` ON `folder_table`;--> statement-breakpoint
CREATE INDEX `parent_index` ON `file_table` (`parentId`);--> statement-breakpoint
CREATE INDEX `parent_index` ON `folder_table` (`parent`);