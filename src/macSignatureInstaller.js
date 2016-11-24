/**!
 * HTML Email Signature Installer for Mail.app (macOS)
 * Copyright (c) 2016 Cloud Under Ltd
 * @license MIT
 */

const shellScript = require('raw!../mac-signature-installer.command');
const keyword = 'EndOfStaticRawSignature';
const search = `${keyword}\n${keyword}`;

/**
 * Put in the signature encoded as email message and you'll get the
 * installer Bash script returned, with the signature embedded.
 */
function macSignatureInstaller(message) {
	if (message.includes(keyword)) {
		throw new Error(`String must not include the word ${keyword}`);
	}
	return message ? shellScript.replace(search, `${keyword}\n${message}\n${keyword}`) : shellScript;
};

module.exports = macSignatureInstaller;
