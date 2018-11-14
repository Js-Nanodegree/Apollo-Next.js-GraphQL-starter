import 'assert';
import chai from 'chai';

const expect = chai.expect;

import User from '../user.model';

describe('Test user model', function() {
 //Save object with 'name' value of 'Mike"
 it('Should throw an error when the email is missing', function(done) {
  new User({}).validate((error) => {
   expect(error.errors.email).to.exist;
   done();
  });
 });

 it('Should not allow invalid email', function(done) {
  new User({ email: 'tomanagle@gmail' }).save((error) => {
   expect(error).to.exist;
   done();
  });
 });

});