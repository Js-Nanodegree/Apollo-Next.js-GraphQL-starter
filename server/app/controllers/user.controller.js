import Subscribe from '../models/subscribe.model';
import User from '../models/user.model';
import attachResolverType from '../utils/attachResolverType';

function Me(_, {}, context) {
  return context.req.user;
}

function invite(_, { email, message }, context) {
  console.log({ email });
  console.log({ message });

  // Check that the email doesn't already exist in the subscribe model

  // Add the user to the subscribe model

  // Send an email with the registration link
}

async function Users(_, {}, context) {
  const users = await User.find()
    .select('-password')
    .lean()
    .exec();

  return {
    count: users.length,
    nodes: users,
    message: 'Successfully queried users'
  };
}

export default {
  Me,
  invite,
  Users
};
