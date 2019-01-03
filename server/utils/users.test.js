const expect = require('expect');

const {Users} = require('./users');

var users;

beforeEach(()=>{
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Abc',
        room: 'Test-1'
    },{
        id: '2',
        name: 'Abc1',
        room: 'Test-2'
    },{
        id: '3',
        name: 'Abc2',
        room: 'Test-1'
    }]
});

describe('Users',()=>{
    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id : 123,
            name: 'ABC',
            room: 'Test'
        };
        users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });


    it('should return names room Test-1',()=>{
        var userList = users.getUserList('Test-1');

        expect(userList).toEqual(['Abc','Abc2']);
    });
    it('should return names room Test-2',()=>{
        var userList = users.getUserList('Test-2');

        expect(userList).toEqual(['Abc1']);
    });
    it('should remove a user',()=>{

        var user = users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    
    });
    it('should not remove a user',()=>{
        var user = users.removeUser('5');
        expect(user).not.toBeDefined();
        expect(users.users.length).toBe(3);

    });
    it('should find user',()=>{
        var user = users.getUser('2');

        expect(user.id).toBe('2');
    });
    it('should not find user',()=>{
        var user = users.getUser('6');

        expect(user).not.toBeDefined();
    });
});