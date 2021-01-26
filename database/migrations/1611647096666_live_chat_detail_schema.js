'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveChatDetailSchema extends Schema {
  up () {
    this.alter('live_chat_details', (table) => {
      // alter table
      table.string("user_name",254).notNullable()
    })
  }

  down () {
    this.table('live_chat_details', (table) => {
      // reverse alternations
    })
  }
}

module.exports = LiveChatDetailSchema
