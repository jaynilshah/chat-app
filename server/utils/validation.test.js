const expect = require('expect');

const {isRealString} = require('./validation.js');


describe('isRealString ',()=>{
    it('should reject non string values',()=>{
        expect(isRealString(123)).toBeFalsy();

    });

    it('should reject string with only spaces',()=>{
        expect(isRealString('    ')).toBeFalsy();
    });

    it('should allow non space characters',()=>{
        expect(isRealString('    ab    ')).toBeTruthy();
    });

})