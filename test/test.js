// const assert = require('chai').assert;
const expect = require('chai').expect;

// var assert = require('assert');
const _ = require('../lib/bundle');


describe('macSignatureInstaller()', function () {

	context('when message contains the EOM keyword EndOfStaticRawSignature', function() {
		it('should throw an Error', function () {
			expect(function () { _('...\n...EndOfStaticRawSignature...\n...') }).to.throw(Error, /must not include/);
		});
	});

	context('when message is an empty string', function() {
		const result = _('');

		it('should return a non-empty string', function () {
			expect(result).to.be.a('string').which.is.not.empty;
		});
	});

	context('when message is a non-empty string and not the EOM keyword', function() {
		const randomMessage = 'The time is: ' + new Date().toISOString();
		const resultWithString = _(randomMessage);
		const resultWithEmptyString = _('');

		it('should return a non-empty string', function () {
			expect(resultWithString).to.be.a('string').which.is.not.empty;
		});

		it('should contain the message', function () {
			expect(resultWithString).to.have.string(randomMessage);
		});

		it('should only differ in length by the length of the message + 1 line break', function () {
			expect(resultWithString).to.have.lengthOf(resultWithEmptyString.length + randomMessage.length + 1);
		});

		it('should have the message wrapped in the EOM keyword', function () {
			expect(resultWithString).to.have.string('RAW_SIGNATURE << EndOfStaticRawSignature\n' + randomMessage + '\nEndOfStaticRawSignature\n');
		});
	});

});
