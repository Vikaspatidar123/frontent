const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

export default safeStringify;
