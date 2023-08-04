import nProperty from "nested-property";
import keys from "all-object-keys";

const stringToJson = (sub: string) => {
    let cleanedString = sub.replace(/"/g, '').replace(/ /g, '').replace(/{/g, '').replace(/}/g, '').replace(/\n/g, '');
    let list = cleanedString.split(',').map(x => {
        let keyValue = x.split(':');
        return {key: keyValue[0], value: keyValue[1]}
    });
    return list;
}

const flatJson = (inputString: any|string) => {
    if(typeof(inputString) === 'string'){
        inputString = stringToJson(inputString)
    }
    const allKeys = keys(inputString);
	let flatJson = {};
	for (let newKey of allKeys) {
		let value = nProperty.get(inputString, newKey);
		flatJson[newKey] = value
	}
	return inputString;
}

const getValue =(json, finalKey) => {
    let value: any;
        for (value in json) {
                if(json[value].key == finalKey){
                    return json[value].value;
                }
        }
        return "";
}

export { getValue, flatJson, stringToJson };