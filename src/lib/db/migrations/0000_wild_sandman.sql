CREATE TABLE `auto_bidding_config` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`max_bid_amount` integer NOT NULL,
	`alert_percentage` integer NOT NULL,
	`reserved_amount` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `auto_bidding_items` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`item_id` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `bids` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`user_name` text NOT NULL,
	`bid_amount` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`current_bid` integer NOT NULL,
	`auction_start_time` integer NOT NULL,
	`auction_end_time` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`message` text NOT NULL,
	`type` text NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auto_bidding_config_user_name_unique` ON `auto_bidding_config` (`user_name`);--> statement-breakpoint
CREATE INDEX `starting_price_index` ON `items` (`current_bid`);--> statement-breakpoint
CREATE INDEX `starting_price_and_id_index` ON `items` (`current_bid`,`id`);