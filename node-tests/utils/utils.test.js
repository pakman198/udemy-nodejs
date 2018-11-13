const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {
    describe('#add', () => {
        it('Should add 2 numbers', () => {
            const result = utils.add(3,2);
        
            expect(result).toBe(5).toBeA('number');
        });
    });
    
    describe('#asyncAdd', () => {
        it('Should asyncAdd 2 numbers', (done) => {
            utils.asyncAdd(3,2, (sum) => {
                expect(sum).toBe(5);
                done();
            });
        });
    });
    
    describe('#square', () => {
        it('Should square a number', () => {
            const result = utils.square(2);
        
            expect(result).toBe(4);
        });
    });

    describe('#asyncSquare', () => {
        it('Should asyncSquare 2 numbers', (done) => {
            utils.asyncSquare(3, (square) => {
                expect(square).toBe(9);
                done();
            });
        });
    });

    describe('#setName', () => {
        it('Should set firstName and lastName', () => {
            const user = {
                location: 'Philadelphia',
                age: 30,
            }
            const response = utils.setName(user, 'Pako Herrera');
        
            // console.log({user, response})
        
            expect(response).toInclude({
                firstName: 'Pako',
                lastName: 'Herrera'
            });
        });
    });
});