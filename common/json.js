class JValue {
    static TYPE = {
        E_NULL: 0,
        E_INT: 1,
        E_BOOL: 2,
        E_FLOAT: 3,
        E_ARRAY: 4,
        E_OBJECT: 5,
        E_STRING: 6,
        E_DATE: 7,
        E_DATA: 8,
    };

    constructor(value = null) {
        this.value = value;
        this.type = this.detectType(value);
    }

    detectType(value) {
        if (value === null) return JValue.TYPE.E_NULL;
        if (typeof value === 'number' && Number.isInteger(value)) return JValue.TYPE.E_INT;
        if (typeof value === 'boolean') return JValue.TYPE.E_BOOL;
        if (typeof value === 'number' && !Number.isInteger(value)) return JValue.TYPE.E_FLOAT;
        if (Array.isArray(value)) return JValue.TYPE.E_ARRAY;
        if (typeof value === 'object') return JValue.TYPE.E_OBJECT;
        if (typeof value === 'string') return JValue.TYPE.E_STRING;

        return JValue.TYPE.E_NULL;
    }

    asInt() {
        if (this.type === JValue.TYPE.E_INT) return this.value;
        return 0;
    }

    asBool() {
        if (this.type === JValue.TYPE.E_BOOL) return this.value;
        return false;
    }

    asFloat() {
        if (this.type === JValue.TYPE.E_FLOAT) return this.value;
        return 0.0;
    }

    asString() {
        if (this.type === JValue.TYPE.E_STRING) return this.value;
        return '';
    }

    type() {
        return this.type;
    }

    clear() {
        this.value = null;
        this.type = JValue.TYPE.E_NULL;
    }

    at(index) {
        if (this.type === JValue.TYPE.E_ARRAY && index >= 0 && index < this.value.length) {
            return this.value[index];
        }
        return null;
    }

    has(key) {
        if (this.type === JValue.TYPE.E_OBJECT) {
            return this.value.hasOwnProperty(key);
        }
        return false;
    }
}