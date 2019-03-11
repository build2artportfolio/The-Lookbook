// Update with your config settings.

module.exports = {
	testing: {
		client: "pg",
		connection: {
			host: "localhost",
			database: "thelookbooktest",
			user: "michael",
			password: "password"
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		}
	},

	development: {
		client: "pg",
		connection: {
			host: "localhost",
			database: "thelookbooktest",
			user: "michael",
			password: "password"
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		}
	},

	production: {
		client: "postgresql",
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: "./data/migrations"
		},
		seeds: {
			directory: "./data/seeds"
		}
	}
};
