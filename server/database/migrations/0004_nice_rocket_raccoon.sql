CREATE TABLE `usersToProducts` (
	`userId` integer,
	`productId` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usersToProducts_userId_productId_unique` ON `usersToProducts` (`userId`,`productId`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `iems`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `daps`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `dacs`;