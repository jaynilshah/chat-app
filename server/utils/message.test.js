const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');



describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var message = generateMessage('Admin','Test text');


        expect(message.from).toBe('Admin');
        expect(message.text).toBe('Test text');
        // expect(typeof(message.createdAt)).toBe('number');
    })
});


describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var message = generateLocationMessage('Admin',1,2);
        expect(message.from).toBe('Admin');
        expect(message.url).toBe('https://www.google.com/maps?q=1,2');
        // expect(typeof(message.createdAt) ).toBe('number');
    })
})