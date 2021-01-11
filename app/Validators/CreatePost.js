'use strict'

class CreatePost {
  get rules () {
    return {
      // validation rules
      'title': 'required',
      'post': 'required'
    }
  }
  get messages() {
    return {
      'required': '{{ field }} is required.',
    }
  }
  async fails(error) {      
    return this.ctx.response.send(error); 	
}
}

module.exports = CreatePost
