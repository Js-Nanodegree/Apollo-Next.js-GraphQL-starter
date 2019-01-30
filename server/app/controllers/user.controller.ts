import User from "../models/user.model";
import { IContext } from "../types/generic";

function Me(_: null, {}, context: IContext) {
  return context.req.user;
}

type TinviteInput = {
  email: string;
  message: string;
};
function invite(_: null, { email, message }: TinviteInput) {
  console.log({ email });
  console.log({ message });

  // Check that the email doesn't already exist in the subscribe model

  // Add the user to the subscribe model

  // Send an email with the registration link
}

async function Users(_: null, {}) {
  const users = await User.find()
    .select("-password")
    .lean()
    .exec();

  return {
    count: users.length,
    nodes: users,
    message: "Successfully queried users"
  };
}

export default {
  Me,
  invite,
  Users
};
