import User from '../models/user.model'

function Me(_, {}, context) {
	// console.log('me', context.req.user);
	// console.log('headers', context.req.headers);
	return context.req.user;
}

export default {
	Me
}
