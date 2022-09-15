import { ObjectInterface } from '../../node_modules/my-world/common/interface';

function deepCopy(obj: any) {
    const type = {}.toString.call(obj);
    switch (type) {
        case '[object Object]':
            return deepObj(obj);
        case '[object Array]':
            return deepArr(obj);
        default:
            return obj;
    }
}
function deepObj(obj: ObjectInterface<any>) {
    let result = Object.create({});
    for (let [key, value] of Object.entries(obj)) {
        result[key] = deepCopy(value);
    }
    return result;
}
function deepArr(arr: Array<any>) {
    let result = new Array();
    for (let value of Object.values(arr)) {
        result.push(deepCopy(value));
    }
    return result;
}
export { deepCopy };
