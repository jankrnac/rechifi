CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text,
	`postId` integer,
	`userId` integer,
	`parentId` integer,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `elements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`data` text,
	`postId` integer,
	`type` text,
	`order` integer DEFAULT 0,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text,
	`type` text,
	`order` integer DEFAULT 0,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postId` integer,
	`userId` integer,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`tile` text NOT NULL,
	`type` text NOT NULL,
	`brand` text,
	`model` text,
	`gearType` text,
	`description` text,
	`userId` integer,
	`coverId` integer,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`coverId`) REFERENCES `files`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`email` text,
	`password` text,
	`avatarId` integer,
	`name` text,
	`other` text,
	`iems` text,
	`daps` text,
	`dacs` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`avatarId`) REFERENCES `files`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);