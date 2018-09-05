/*
 * LiskHQ/lisk-commander
 * Copyright © 2017–2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import { test } from '@oclif/test';
import * as elements from 'lisk-elements';
import * as config from '../../../../src/utils/config';
import * as print from '../../../../src/utils/print';
import * as getInputsFromSources from '../../../../src/utils/input';

describe('transaction:create:secondpassphrase', () => {
	const defaultInputs = {
		passphrase: '123',
		secondPassphrase: '456',
	};
	const defaultTransaction = {
		amount: '10000000000',
		recipientId: '123L',
		senderPublicKey: null,
		timestamp: 66492418,
		type: 0,
		fee: '10000000',
		recipientPublicKey: null,
		asset: {},
	};

	const printMethodStub = sandbox.stub();

	const setupTest = () =>
		test
			.stub(print, 'default', sandbox.stub().returns(printMethodStub))
			.stub(config, 'getConfig', sandbox.stub().returns({}))
			.stub(
				elements.default.transaction,
				'registerSecondPassphrase',
				sandbox.stub().returns(defaultTransaction),
			)
			.stub(
				getInputsFromSources,
				'default',
				sandbox.stub().resolves(defaultInputs),
			)
			.stdout();

	describe('transaction:create:secondpassphrase', () => {
		setupTest()
			.command(['transaction:create:secondpassphrase'])
			.it('should create second passphrase transaction', () => {
				expect(getInputsFromSources.default).to.be.calledWithExactly({
					passphrase: {
						source: undefined,
						repeatPrompt: true,
					},
					secondPassphrase: {
						source: undefined,
						repeatPrompt: true,
					},
				});
				expect(
					elements.default.transaction.registerSecondPassphrase,
				).to.be.calledWithExactly(defaultInputs);
				return expect(printMethodStub).to.be.calledWithExactly(
					defaultTransaction,
				);
			});
	});

	describe('transaction:create:secondpassphrase --passphrase=xxx', () => {
		setupTest()
			.command(['transaction:create:secondpassphrase', '--passphrase=pass:123'])
			.it(
				'should create second passphrase transaction with passphrase from flag',
				() => {
					expect(getInputsFromSources.default).to.be.calledWithExactly({
						passphrase: {
							source: 'pass:123',
							repeatPrompt: true,
						},
						secondPassphrase: {
							source: undefined,
							repeatPrompt: true,
						},
					});
					expect(
						elements.default.transaction.registerSecondPassphrase,
					).to.be.calledWithExactly(defaultInputs);
					return expect(printMethodStub).to.be.calledWithExactly(
						defaultTransaction,
					);
				},
			);
	});

	describe('transaction:create:secondpassphrase --passphrase=xxx --second-passphrase=xxx', () => {
		setupTest()
			.command([
				'transaction:create:secondpassphrase',
				'--passphrase=pass:123',
				'--second-passphrase=pass:456',
			])
			.it(
				'should create second passphrase transaction with passphrase and second passphrase from flag',
				() => {
					expect(getInputsFromSources.default).to.be.calledWithExactly({
						passphrase: {
							source: 'pass:123',
							repeatPrompt: true,
						},
						secondPassphrase: {
							source: 'pass:456',
							repeatPrompt: true,
						},
					});
					expect(
						elements.default.transaction.registerSecondPassphrase,
					).to.be.calledWithExactly(defaultInputs);
					return expect(printMethodStub).to.be.calledWithExactly(
						defaultTransaction,
					);
				},
			);
	});

	describe('transaction:create:secondpassphrase --no-signature', () => {
		setupTest()
			.command(['transaction:create:secondpassphrase', '--no-signature'])
			.it(
				'should create second passphrase transaction withoug passphrase',
				() => {
					expect(getInputsFromSources.default).to.be.calledWithExactly({
						passphrase: null,
						secondPassphrase: {
							source: undefined,
							repeatPrompt: true,
						},
					});
					expect(
						elements.default.transaction.registerSecondPassphrase,
					).to.be.calledWithExactly(defaultInputs);
					return expect(printMethodStub).to.be.calledWithExactly(
						defaultTransaction,
					);
				},
			);
	});
});
