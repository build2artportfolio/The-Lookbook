exports.up = function(knex, Promise) {
	return knex.schema.createTable("posts", table => {
		table.increments();
		table.string("title").notNullable();
		table.string("description");
		table.string("imageUrl");
		table
			.integer("artistId")
			.unsigned()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("posts");
};
