'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LiveChatDetailSchema extends Schema {
  up () {
    this.create('live_chat_details', (table) => {
      table.increments()
      table.integer('send_user_id').notNullable()
      table.integer('receive_user_id').notNullable()
      table.string('message', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('live_chat_details')
  }
}

module.exports = LiveChatDetailSchema
