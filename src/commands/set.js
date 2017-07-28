import fse from 'fs-extra';
import config from '../../config.json';

const writeConfigToFile = (newConfig) => {
	const configString = JSON.stringify(newConfig, null, '\t');
	fse.writeFileSync('config.json', `${configString}\n`, 'utf8');
};

const checkBoolean = value => ['true', 'false'].includes(value);

const accessConfigProperty = newValue => (obj, pathComponent, i, path) => {
	if (i === path.length - 1) {
		// eslint-disable-next-line no-param-reassign
		obj[pathComponent] = newValue;
		return config;
	}
	return obj[pathComponent];
};

const setBoolean = (variable, path) => (value) => {
	if (!checkBoolean(value)) {
		return `Cannot set ${variable} to ${value}.`;
	}
	const newValue = (value === 'true');
	path.reduce(accessConfigProperty(newValue), config);

	writeConfigToFile(config);
	return `Successfully set ${variable} to ${value}.`;
};

const set = ({ variable, value }, callback) => {
	const getType = {
		json: setBoolean('json output', ['json']),
		testnet: setBoolean('testnet', ['liskJS', 'testnet']),
	};

	const returnValue = Object.keys(getType).includes(variable)
		? getType[variable](value)
		: 'Unsupported variable name.';

	return (callback && typeof callback === 'function')
		? callback(returnValue)
		: returnValue;
};

export default function setCommand(vorpal) {
	vorpal
		.command('set <variable> <value>')
		.description('Set configuration <variable> to <value>.')
		.action(set);
}
