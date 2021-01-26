'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveChatSchema extends Schema {
  up () {
    this.alter('live_chats', (table) => {
      // alter table
      table.string('user_name', 254).notNullable()
    })
  }

  down () {
    this.table('live_chats', (table) => {
      // reverse alternations
    })
  }
}

module.exports = LiveChatSchema
