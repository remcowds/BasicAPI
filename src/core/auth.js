const userService = require('../service/userService');

//aangemeld zijn afdwingen
module.exports = async function requireAuthentication(ctx, next) {
	const {
		authorization
	} = ctx.headers;

	const {
		authToken,
		...session
	} = await userService.checkAndParseSession(
		authorization
	);

	ctx.state.session = session;
	ctx.state.authToken = authToken;

	return next();
}