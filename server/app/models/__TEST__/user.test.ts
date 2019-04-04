import User from '../user.model';

describe('Test user model', function() {
  //Save object with 'name' value of 'Mike"
  it('Should throw an error when the email is missing', () => {
    new User({}).validate(error => {
      expect(error.errors.email).toBeTruthy();
    });
  });

  it('Should not allow invalid email', () => {
    new User({ email: 'tomanagle@gmail' }).save(error => {
      expect(error).toBeTruthy();
    });
  });
});
