exports.up = function(knex, Promise) {
	return knex.schema.createTable("posts", table => {
		table.increments();
		table.string("title").notNullable();
		table.string("description");
		table.string("imageUrl");
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("posts");
};
