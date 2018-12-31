const expect = require('expect');

var {generateMessage} = require('./message');



describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var message = generateMessage('Admin','Test text');


        expect(message.from).toBe('Admin');
        expect(message.text).toBe('Test text');
        expect(typeof message.createdAt).toBe('number');
    })
})