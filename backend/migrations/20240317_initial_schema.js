exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('role').notNullable().defaultTo('user');
      table.string('status').notNullable().defaultTo('active');
      table.timestamp('email_verified_at').nullable();
      table.timestamp('last_login_at').nullable();
      table.timestamps(true, true);
    })
    .createTable('profiles', table => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('type').notNullable(); // 'brand' or 'creator'
      table.text('bio').nullable();
      table.jsonb('social_links').defaultTo('{}');
      table.jsonb('preferences').defaultTo('{}');
      table.timestamps(true, true);
    })
    .createTable('refresh_tokens', table => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('token').notNullable();
      table.timestamp('expires_at').notNullable();
      table.timestamps(true, true);
    })
    .raw(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `)
    .raw(`
      CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `)
    .raw(`
      CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('refresh_tokens')
    .dropTableIfExists('profiles')
    .dropTableIfExists('users')
    .raw('DROP FUNCTION IF EXISTS update_updated_at_column CASCADE');
}; 