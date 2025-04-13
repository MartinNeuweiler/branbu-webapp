exports.up = function(knex) {
  return knex.schema
    .createTable('messages', table => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('sender_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('receiver_id').references('id').inTable('users').onDelete('CASCADE');
      table.text('content').notNullable();
      table.boolean('read').defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable('conversations', table => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('creator_id').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('brand_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('status').defaultTo('active');
      table.jsonb('metadata').defaultTo('{}');
      table.timestamps(true, true);
    })
    .raw(`
      CREATE TRIGGER update_messages_updated_at
        BEFORE UPDATE ON messages
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `)
    .raw(`
      CREATE TRIGGER update_conversations_updated_at
        BEFORE UPDATE ON conversations
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('messages')
    .dropTableIfExists('conversations');
}; 