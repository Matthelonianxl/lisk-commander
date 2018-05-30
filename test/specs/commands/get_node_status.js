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
import { setUpCommandGetNodeStatus } from '../../steps/setup';
import * as given from '../../steps/1_given';
import * as when from '../../steps/2_when';
import * as then from '../../steps/3_then';

describe('get node status command', () => {
	beforeEach(setUpCommandGetNodeStatus);
	Given('an action "get node status"', given.anAction, () => {
		Given('a Lisk API Instance', given.aLiskAPIInstance, () => {
			Given('an options object', given.anOptionsObject, () => {
				When(
					'the action is called with the options',
					when.theActionIsCalledWithTheOptions,
					() => {
						Then(
							'it should call node getConstants',
							then.itShouldCallNodeGetConstants,
						);
						Then(
							'it should call node getStatus',
							then.itShouldCallNodeGetStatus,
						);
						Then(
							'it should not call node getForgingStatus',
							then.itShouldNotCallNodeGetForgingStatus,
						);
					},
				);
				Given('a boolean option "forging"', given.aBooleanOption, () => {
					Given(
						'a Lisk API Instance getForgingStatus rejects with error',
						given.aLiskAPIInstanceGetForgingStatusRejectsWithError,
						() => {
							When(
								'the action is called with the options',
								when.theActionIsCalledWithTheOptions,
								() => {
									Then(
										'it should call node getConstants',
										then.itShouldCallNodeGetConstants,
									);
									Then(
										'it should call node getStatus',
										then.itShouldCallNodeGetStatus,
									);
									Then(
										'it should call node getForgingStatus',
										then.itShouldCallNodeGetForgingStatus,
									);
									Then(
										'it should call node getForgingStatus',
										then.itShoulHaveErrorMessageForForgingStatus,
									);
								},
							);
						},
					);
					When(
						'the action is called with the options',
						when.theActionIsCalledWithTheOptions,
						() => {
							Then(
								'it should call node getConstants',
								then.itShouldCallNodeGetConstants,
							);
							Then(
								'it should call node getStatus',
								then.itShouldCallNodeGetStatus,
							);
							Then(
								'it should call node getForgingStatus',
								then.itShouldCallNodeGetForgingStatus,
							);
						},
					);
				});
			});
		});
	});
});