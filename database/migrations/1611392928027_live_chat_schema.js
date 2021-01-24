'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveChatSchema extends Schema {
  up () {
    this.create('live_chats', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('socket_id', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('live_chats')
  }
}

module.exports = LiveChatSchema
