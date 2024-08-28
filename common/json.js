if (typeof JSON_INCLUDED === 'undefined') {
    var JSON_INCLUDED = true;

    // Số nguyên 8 bit có dấu
    class Int8 {
        constructor(value) {
            this.value = value & 0xFF;
            if (this.value > 0x7F) this.value = this.value - 0x100;
        }
    }

    // Số nguyên 16 bit có dấu
    class Int16 {
        constructor(value) {
            this.value = value & 0xFFFF;
            if (this.value > 0x7FFF) this.value = this.value - 0x10000;
        }
    }

    // Số nguyên 32 bit có dấu
    class Int32 {
        constructor(value) {
            this.value = value | 0;  // Chuyển đổi sang số nguyên 32 bit
        }
    }

    // Số nguyên 64 bit có dấu (sử dụng BigInt)
    class Int64 {
        constructor(value) {
            this.value = BigInt(value);
        }
    }

    // Số nguyên 8 bit không dấu
    class UInt8 {
        constructor(value) {
            this.value = value & 0xFF;
        }
    }

    // Số nguyên 16 bit không dấu
    class UInt16 {
        constructor(value) {
            this.value = value & 0xFFFF;
        }
    }

    // Số nguyên 32 bit không dấu
    class UInt32 {
        constructor(value) {
            this.value = value >>> 0; // Chuyển đổi sang số nguyên không dấu
        }
    }

    // Số nguyên 64 bit không dấu (sử dụng BigInt)
    class UInt64 {
        constructor(value) {
            this.value = BigInt(value);
        }
    }

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

        constructor(type = JValue.TYPE.E_NULL) {
            this.m_eType = type;
            this.m_Value = this.initializeValue(type);
        }

        initializeValue(type) {
            switch (type) {
                case JValue.TYPE.E_INT:
                    return 0;
                case JValue.TYPE.E_BOOL:
                    return false;
                case JValue.TYPE.E_FLOAT:
                    return 0.0;
                case JValue.TYPE.E_ARRAY:
                    return [];
                case JValue.TYPE.E_OBJECT:
                    return {};
                case JValue.TYPE.E_STRING:
                    return '';
                case JValue.TYPE.E_DATE:
                    return new Date();
                case JValue.TYPE.E_DATA:
                    return '';
                default:
                    return null;
            }
        }

        asInt() {
            return this.m_Value || 0;
        }

        asBool() {
            return this.m_Value || false;
        }

        asFloat() {
            return this.m_Value || 0.0;
        }

        asInt64() {
            return BigInt(this.m_Value || 0);
        }

        asString() {
            return this.m_Value || '';
        }

        asCString() {
            return this.m_Value ? this.m_Value.toString() : '';
        }

        asDate() {
            return this.m_Value instanceof Date ? this.m_Value : new Date();
        }

        asData() {
            return this.m_Value || '';
        }

        assignData(val, size) {
            this.m_eType = JValue.TYPE.E_DATA;
            this.m_Value = val.slice(0, size);
        }

        assignDate(val) {
            this.m_eType = JValue.TYPE.E_DATE;
            this.m_Value = new Date(val * 1000);
        }

        assignDateString(val) {
            this.assignDate(val);
        }

        type() {
            return this.m_eType;
        }

        size() {
            if (Array.isArray(this.m_Value)) {
                return this.m_Value.length;
            } else if (typeof this.m_Value === 'object' && this.m_Value !== null) {
                return Object.keys(this.m_Value).length;
            }
            return 0;
        }

        clear() {
            this.m_eType = JValue.TYPE.E_NULL;
            this.m_Value = null;
        }

        at(index) {
            if (Array.isArray(this.m_Value) || typeof this.m_Value === 'object') {
                return this.m_Value[index];
            }
            return null;
        }

        has(key) {
            if (typeof this.m_Value === 'object' && this.m_Value !== null) {
                return key in this.m_Value;
            }
            return false;
        }

        push_back(val) {
            if (Array.isArray(this.m_Value)) {
                this.m_Value.push(val);
                return true;
            }
            return false;
        }

        isInt() {
            return this.m_eType === JValue.TYPE.E_INT;
        }

        isNull() {
            return this.m_eType === JValue.TYPE.E_NULL;
        }

        isBool() {
            return this.m_eType === JValue.TYPE.E_BOOL;
        }

        isFloat() {
            return this.m_eType === JValue.TYPE.E_FLOAT;
        }

        isArray() {
            return this.m_eType === JValue.TYPE.E_ARRAY;
        }

        isObject() {
            return this.m_eType === JValue.TYPE.E_OBJECT;
        }

        isString() {
            return this.m_eType === JValue.TYPE.E_STRING;
        }

        isEmpty() {
            return this.m_Value === null || this.m_Value === undefined || this.m_Value.length === 0;
        }

        isData() {
            return this.m_eType === JValue.TYPE.E_DATA;
        }

        isDate() {
            return this.m_eType === JValue.TYPE.E_DATE;
        }

        toJSON() {
            return this.m_Value;
        }

        static null = new JValue(JValue.TYPE.E_NULL);
        static nullData = '';

        // Cần thiết để ghi ra JSON
        write() {
            return JSON.stringify(this.m_Value);
        }

        // Ghi với style (thêm không gian hoặc dấu xuống dòng tùy chọn)
        styleWrite() {
            return JSON.stringify(this.m_Value, null, 2);
        }

        // Đọc từ chuỗi JSON
        read(jsonStr) {
            try {
                this.m_Value = JSON.parse(jsonStr);
                return true;
            } catch (e) {
                console.error('Error parsing JSON:', e);
                return false;
            }
        }
    }

    class JReader {
        constructor() {
            this.m_pBeg = null;
            this.m_pEnd = null;
            this.m_pCur = null;
            this.m_pErr = null;
            this.m_strErr = '';
        }
    
        static TokenType = {
            E_Error: 0,
            E_End: 1,
            E_Null: 2,
            E_True: 3,
            E_False: 4,
            E_Number: 5,
            E_String: 6,
            E_ArrayBegin: 7,
            E_ArrayEnd: 8,
            E_ObjectBegin: 9,
            E_ObjectEnd: 10,
            E_ArraySeparator: 11,
            E_MemberSeparator: 12
        };
    
        parse(pdoc, root) {
            this.m_pBeg = pdoc;
            this.m_pCur = pdoc;
            this.m_pEnd = pdoc + pdoc.length;
            this.m_pErr = null;
            this.m_strErr = '';
    
            return this.readValue(root);
        }
    
        error() {
            return this.m_strErr;
        }
    
        skipSpaces() {
            while (this.m_pCur < this.m_pEnd && /\s/.test(this.m_pCur[0])) {
                this.m_pCur++;
            }
        }
    
        skipComment() {
            if (this.m_pCur[0] === '/' && this.m_pCur[1] === '/') {
                while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '\n') {
                    this.m_pCur++;
                }
            }
            if (this.m_pCur[0] === '/' && this.m_pCur[1] === '*') {
                this.m_pCur += 2;
                while (this.m_pCur < this.m_pEnd && (this.m_pCur[0] !== '*' || this.m_pCur[1] !== '/')) {
                    this.m_pCur++;
                }
                if (this.m_pCur < this.m_pEnd) {
                    this.m_pCur += 2;
                }
            }
        }
    
        match(pattern) {
            if (this.m_pCur.substring(0, pattern.length) === pattern) {
                this.m_pCur += pattern.length;
                return true;
            }
            return false;
        }
    
        readToken(token) {
            this.skipSpaces();
            token.pbeg = this.m_pCur;
            switch (this.m_pCur[0]) {
                case 'n':
                    if (this.match('null')) {
                        token.type = JReader.TokenType.E_Null;
                        return true;
                    }
                    break;
                case 't':
                    if (this.match('true')) {
                        token.type = JReader.TokenType.E_True;
                        return true;
                    }
                    break;
                case 'f':
                    if (this.match('false')) {
                        token.type = JReader.TokenType.E_False;
                        return true;
                    }
                    break;
                // Thêm các case khác để đọc token số, chuỗi, mảng, đối tượng...
                default:
                    return this.addError("Unexpected token", this.m_pCur);
            }
            return false;
        }
    
        readValue(jval) {
            let token = {};
            if (!this.readToken(token)) {
                return this.addError("Invalid token", this.m_pCur);
            }
            switch (token.type) {
                case JReader.TokenType.E_Null:
                    jval.m_eType = JValue.TYPE.E_NULL;
                    jval.m_Value = null;
                    break;
                case JReader.TokenType.E_True:
                    jval.m_eType = JValue.TYPE.E_BOOL;
                    jval.m_Value = true;
                    break;
                case JReader.TokenType.E_False:
                    jval.m_eType = JValue.TYPE.E_BOOL;
                    jval.m_Value = false;
                    break;
                case JReader.TokenType.E_Integer:
                    jval.m_eType = JValue.TYPE.E_INT;
                    jval.m_Value = parseInt(token.pbeg, 10);  // Chuyển đổi chuỗi thành số nguyên
                    break;
                case JReader.TokenType.E_Real:
                    jval.m_eType = JValue.TYPE.E_FLOAT;
                    jval.m_Value = parseFloat(token.pbeg);  // Chuyển đổi chuỗi thành số thực
                    break;
                case JReader.TokenType.E_String:
                    jval.m_eType = JValue.TYPE.E_STRING;
                    jval.m_Value = token.pbeg.substring(0, token.pend - token.pbeg);  // Gán giá trị chuỗi trực tiếp từ token
                    break;
                case JReader.TokenType.E_ArrayBegin:
                    return this.readArray(jval);
                case JReader.TokenType.E_DictionaryBegin:
                    return this.readDictionary(jval);
                default:
                    return this.addError("Unexpected token type", this.m_pCur);
            }
            return true;
        }
    
        readArray(jval) {
            jval.m_eType = JValue.TYPE.E_ARRAY;
            jval.m_Value = [];
            this.m_pCur++; // Bỏ qua dấu '['
            this.skipSpaces();
    
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== ']') {
                let elem = new JValue();
                if (!this.readValue(elem)) {
                    return false;
                }
                jval.m_Value.push(elem);
                this.skipSpaces();
                if (this.m_pCur[0] === ',') {
                    this.m_pCur++;
                    this.skipSpaces();
                }
            }
            this.m_pCur++; // Bỏ qua dấu ']'
            return true;
        }
    
        readObject(jval) {
            jval.m_eType = JValue.TYPE.E_OBJECT;
            jval.m_Value = {};
            this.m_pCur++; // Bỏ qua dấu '{'
            this.skipSpaces();
    
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '}') {
                let key = new JValue();
                if (!this.readString(key)) {
                    return false;
                }
                this.skipSpaces();
                if (this.m_pCur[0] !== ':') {
                    return this.addError("Expected ':' after key", this.m_pCur);
                }
                this.m_pCur++; // Bỏ qua dấu ':'
                this.skipSpaces();
    
                let val = new JValue();
                if (!this.readValue(val)) {
                    return false;
                }
                jval.m_Value[key.asString()] = val;
                this.skipSpaces();
                if (this.m_pCur[0] === ',') {
                    this.m_pCur++;
                    this.skipSpaces();
                }
            }
            this.m_pCur++; // Bỏ qua dấu '}'
            return true;
        }
    
        readString(jval) {
            if (this.m_pCur[0] !== '"') {
                return this.addError("Expected '\"' to begin a string", this.m_pCur);
            }
            this.m_pCur++; // Bỏ qua dấu '"'
            let start = this.m_pCur;
    
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '"') {
                this.m_pCur++;
            }
            jval.m_eType = JValue.TYPE.E_STRING;
            jval.m_Value = this.m_pCur.substring(start, this.m_pCur - start);
            this.m_pCur++; // Bỏ qua dấu '"'
            return true;
        }
    
        decodeNumber(token, jval) {
            let numStr = token.pbeg.substring(0, token.pend - token.pbeg);
            if (numStr.includes('.') || numStr.includes('e') || numStr.includes('E')) {
                jval.m_eType = JValue.TYPE.E_FLOAT;
                jval.m_Value = parseFloat(numStr);
            } else {
                jval.m_eType = JValue.TYPE.E_INT;
                jval.m_Value = parseInt(numStr, 10);
            }
            return true;
        }
    
        decodeString(token, decoded) {
            decoded = token.pbeg.substring(0, token.pend - token.pbeg);
            return true;
        }
    
        decodeDouble(token, jval) {
            let numStr = token.pbeg.substring(0, token.pend - token.pbeg);
            jval.m_eType = JValue.TYPE.E_FLOAT;
            jval.m_Value = parseFloat(numStr);
            return true;
        }
    
        GetNextChar() {
            if (this.m_pCur < this.m_pEnd) {
                return this.m_pCur++;
            }
            return null;
        }
    
        addError(message, ploc) {
            this.m_strErr = message + " at " + (ploc - this.m_pBeg);
            return false;
        }
    }
    class JWriter {
        constructor() {
            this.m_strDoc = '';
            this.m_strTab = '';
            this.m_bAddChild = false;
            this.m_childValues = [];
        }
    
        static FastWrite(jval, strDoc) {
            strDoc.value = '';  // reset the string
            JWriter.FastWriteValue(jval, strDoc);
        }
    
        static FastWriteValue(jval, strDoc) {
            switch (jval.type()) {
                case JValue.TYPE.E_NULL:
                    strDoc.value += 'null';
                    break;
                case JValue.TYPE.E_BOOL:
                    strDoc.value += jval.asBool() ? 'true' : 'false';
                    break;
                case JValue.TYPE.E_INT:
                case JValue.TYPE.E_FLOAT:
                    strDoc.value += jval.m_Value.toString();
                    break;
                case JValue.TYPE.E_STRING:
                    strDoc.value += `"${jval.asString()}"`;
                    break;
                case JValue.TYPE.E_ARRAY:
                    strDoc.value += '[';
                    for (let i = 0; i < jval.size(); i++) {
                        if (i > 0) strDoc.value += ',';
                        JWriter.FastWriteValue(jval.at(i), strDoc);
                    }
                    strDoc.value += ']';
                    break;
                case JValue.TYPE.E_OBJECT:
                    strDoc.value += '{';
                    let keys = Object.keys(jval.m_Value);
                    for (let i = 0; i < keys.length; i++) {
                        if (i > 0) strDoc.value += ',';
                        strDoc.value += `"${keys[i]}":`;
                        JWriter.FastWriteValue(jval.at(keys[i]), strDoc);
                    }
                    strDoc.value += '}';
                    break;
                default:
                    break;
            }
        }
    
        StyleWrite(jval) {
            this.m_strDoc = '';
            this.StyleWriteValue(jval);
            return this.m_strDoc;
        }
    
        PushValue(strval) {
            if (this.m_bAddChild) {
                this.m_childValues.push(strval);
            } else {
                this.m_strDoc += strval;
            }
        }
    
        StyleWriteValue(jval) {
            switch (jval.type()) {
                case JValue.TYPE.E_NULL:
                    this.PushValue('null');
                    break;
                case JValue.TYPE.E_BOOL:
                    this.PushValue(jval.asBool() ? 'true' : 'false');
                    break;
                case JValue.TYPE.E_INT:
                case JValue.TYPE.E_FLOAT:
                    this.PushValue(jval.m_Value.toString());
                    break;
                case JValue.TYPE.E_STRING:
                    this.PushValue(`"${jval.asString()}"`);
                    break;
                case JValue.TYPE.E_ARRAY:
                    this.StyleWriteArrayValue(jval);
                    break;
                case JValue.TYPE.E_OBJECT:
                    this.PushValue('{\n');
                    this.m_strTab += '  ';
                    let keys = Object.keys(jval.m_Value);
                    for (let i = 0; i < keys.length; i++) {
                        if (i > 0) this.PushValue(',\n');
                        this.PushValue(this.m_strTab + `"${keys[i]}": `);
                        this.StyleWriteValue(jval.at(keys[i]));
                    }
                    this.m_strTab = this.m_strTab.slice(0, -2);
                    this.PushValue('\n' + this.m_strTab + '}');
                    break;
                default:
                    break;
            }
        }
    
        StyleWriteArrayValue(jval) {
            if (this.isMultineArray(jval)) {
                this.PushValue('[\n');
                this.m_strTab += '  ';
                for (let i = 0; i < jval.size(); i++) {
                    if (i > 0) this.PushValue(',\n');
                    this.PushValue(this.m_strTab);
                    this.StyleWriteValue(jval.at(i));
                }
                this.m_strTab = this.m_strTab.slice(0, -2);
                this.PushValue('\n' + this.m_strTab + ']');
            } else {
                this.PushValue('[');
                for (let i = 0; i < jval.size(); i++) {
                    if (i > 0) this.PushValue(', ');
                    this.StyleWriteValue(jval.at(i));
                }
                this.PushValue(']');
            }
        }
    
        isMultineArray(jval) {
            return jval.size() > 3 || jval.m_Value.some(val => Array.isArray(val) || typeof val === 'object');
        }
    
        static v2s(val) {
            return val.toString();
        }
    
        static vstring2s(val) {
            return val ? `"${val}"` : '""';
        }
    
        static d2s(t) {
            return new Date(t * 1000).toISOString();
        }
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    class PReader {
        constructor() {
            this.m_pBeg = null;
            this.m_pEnd = null;
            this.m_pCur = null;
            this.m_pErr = null;
            this.m_strErr = '';
    
            // Binary specific
            this.m_pTrailer = null;
            this.m_uObjects = 0;
            this.m_uOffsetSize = 0;
            this.m_pOffsetTable = null;
            this.m_uDictParamSize = 0;
        }
    
        static TokenType = {
            E_Error: 0,
            E_End: 1,
            E_Null: 2,
            E_True: 3,
            E_False: 4,
            E_Key: 5,
            E_Data: 6,
            E_Date: 7,
            E_Integer: 8,
            E_Real: 9,
            E_String: 10,
            E_ArrayBegin: 11,
            E_ArrayEnd: 12,
            E_ArrayNull: 13,
            E_DictionaryBegin: 14,
            E_DictionaryEnd: 15,
            E_DictionaryNull: 16,
            E_ArraySeparator: 17,
            E_MemberSeparator: 18,
        };
    
        parse(pdoc, len, root) {
            this.m_pBeg = pdoc;
            this.m_pCur = pdoc;
            this.m_pEnd = pdoc + len;
            this.m_pErr = null;
            this.m_strErr = '';
    
            return this.readValue(root, {});
        }
    
        error() {
            return this.m_strErr;
        }
    
        readToken(token) {
            this.skipSpaces();
            token.pbeg = this.m_pCur;
            if (this.m_pCur >= this.m_pEnd) {
                token.type = JReader.TokenType.E_End;
                return false;
            }
        
            switch (this.m_pCur[0]) {
                case 'n':
                    if (this.match("null")) {
                        token.type = JReader.TokenType.E_Null;
                        token.pend = this.m_pCur;
                        return true;
                    }
                    break;
        
                case 't':
                    if (this.match("true")) {
                        token.type = JReader.TokenType.E_True;
                        token.pend = this.m_pCur;
                        return true;
                    }
                    break;
        
                case 'f':
                    if (this.match("false")) {
                        token.type = JReader.TokenType.E_False;
                        token.pend = this.m_pCur;
                        return true;
                    }
                    break;
        
                case '"':
                    this.m_pCur++;
                    while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '"') {
                        this.m_pCur++;
                    }
                    if (this.m_pCur < this.m_pEnd && this.m_pCur[0] === '"') {
                        token.type = JReader.TokenType.E_String;
                        token.pend = ++this.m_pCur;
                        return true;
                    }
                    break;
        
                case '[':
                    token.type = JReader.TokenType.E_ArrayBegin;
                    this.m_pCur++;
                    token.pend = this.m_pCur;
                    return true;
        
                case ']':
                    token.type = JReader.TokenType.E_ArrayEnd;
                    this.m_pCur++;
                    token.pend = this.m_pCur;
                    return true;
        
                case '{':
                    token.type = JReader.TokenType.E_DictionaryBegin;
                    this.m_pCur++;
                    token.pend = this.m_pCur;
                    return true;
        
                case '}':
                    token.type = JReader.TokenType.E_DictionaryEnd;
                    this.m_pCur++;
                    token.pend = this.m_pCur;
                    return true;
        
                case ',':
                    token.type = JReader.TokenType.E_ArraySeparator;
                    this.m_pCur++;
                    token.pend = this.m_pCur;
                    return true;
        
                case ':':
                    token.type = JReader.TokenType.E_MemberSeparator;
                    this.m_pCur++;
                    token.pend = this.m_pCur;
                    return true;
        
                default:
                    if (this.m_pCur[0] === '-' || (this.m_pCur[0] >= '0' && this.m_pCur[0] <= '9')) {
                        let start = this.m_pCur;
                        if (this.m_pCur[0] === '-') this.m_pCur++;
                        while (this.m_pCur < this.m_pEnd && this.m_pCur[0] >= '0' && this.m_pCur[0] <= '9') {
                            this.m_pCur++;
                        }
                        if (this.m_pCur < this.m_pEnd && this.m_pCur[0] === '.') {
                            this.m_pCur++;
                            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] >= '0' && this.m_pCur[0] <= '9') {
                                this.m_pCur++;
                            }
                            token.type = JReader.TokenType.E_Real;
                        } else {
                            token.type = JReader.TokenType.E_Integer;
                        }
                        token.pend = this.m_pCur;
                        return true;
                    }
                    break;
            }
        
            token.type = JReader.TokenType.E_Error;
            token.pend = this.m_pCur;
            return false;
        }
    
        readLabel(label) {
            this.skipSpaces();
        
            if (this.m_pCur >= this.m_pEnd) {
                return this.addError("Unexpected end of input while reading label", this.m_pCur);
            }
        
            if (this.m_pCur[0] !== '"') {
                return this.addError("Expected '\"' at the beginning of label", this.m_pCur);
            }
        
            this.m_pCur++;
        
            let start = this.m_pCur;
        
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '"') {
                if (this.m_pCur[0] === '\\') { 
                    this.m_pCur++;
                }
                this.m_pCur++;
            }
        
            if (this.m_pCur >= this.m_pEnd || this.m_pCur[0] !== '"') {
                return this.addError("Expected '\"' at the end of label", this.m_pCur);
            }
        
            label.value = this.m_pCur.substring(start, this.m_pCur - start);
        
            this.m_pCur++;
        
            this.skipSpaces();
        
            if (this.m_pCur >= this.m_pEnd || this.m_pCur[0] !== ':') {
                return this.addError("Expected ':' after label", this.m_pCur);
            }
        
            this.m_pCur++;
        
            return true;
        }
    
        readValue(jval, token) {
            if (!this.readToken(token)) {
                return this.addError("Invalid token", this.m_pCur);
            }
        
            switch (token.type) {
                case PReader.TokenType.E_Null:
                    jval.m_eType = JValue.TYPE.E_NULL;
                    jval.m_Value = null;
                    break;
        
                case PReader.TokenType.E_True:
                    jval.m_eType = JValue.TYPE.E_BOOL;
                    jval.m_Value = true;
                    break;
        
                case PReader.TokenType.E_False:
                    jval.m_eType = JValue.TYPE.E_BOOL;
                    jval.m_Value = false;
                    break;
        
                case PReader.TokenType.E_Integer:
                    jval.m_eType = JValue.TYPE.E_INT;
                    jval.m_Value = parseInt(token.pbeg, 10);
                    break;
        
                case PReader.TokenType.E_Real:
                    jval.m_eType = JValue.TYPE.E_FLOAT;
                    jval.m_Value = parseFloat(token.pbeg);
                    break;
        
                case PReader.TokenType.E_String:
                    jval.m_eType = JValue.TYPE.E_STRING;
                    jval.m_Value = token.pbeg.substring(0, token.pend - token.pbeg);
                    break;
        
                case PReader.TokenType.E_ArrayBegin:
                    return this.readArray(jval);
        
                case PReader.TokenType.E_DictionaryBegin:
                    return this.readDictionary(jval);
        
                case PReader.TokenType.E_Data:
                    return this.decodeData(token, jval);
        
                case PReader.TokenType.E_Date:
                    jval.m_eType = JValue.TYPE.E_DATE;
                    jval.m_Value = new Date(token.pbeg.substring(0, token.pend - token.pbeg));
                    break;
        
                default:
                    return this.addError("Unexpected token type", this.m_pCur);
            }
        
            return true;
        }
    
        readArray(jval) {
            jval.m_eType = JValue.TYPE.E_ARRAY;
            jval.m_Value = [];
            this.m_pCur++; // Skip '['
            this.skipSpaces();
    
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== ']') {
                let elem = new JValue();
                if (!this.readValue(elem, {})) {
                    return false;
                }
                jval.m_Value.push(elem);
                this.skipSpaces();
                if (this.m_pCur[0] === ',') {
                    this.m_pCur++;
                    this.skipSpaces();
                }
            }
            this.m_pCur++; // Skip ']'
            return true;
        }
    
        readDictionary(jval) {
            jval.m_eType = JValue.TYPE.E_OBJECT;
            jval.m_Value = {};
            this.m_pCur++; // Skip '{'
            this.skipSpaces();
    
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '}') {
                let key = new JValue();
                if (!this.readString(key)) {
                    return false;
                }
                this.skipSpaces();
                if (this.m_pCur[0] !== ':') {
                    return this.addError("Expected ':' after key", this.m_pCur);
                }
                this.m_pCur++; // Skip ':'
                this.skipSpaces();
    
                let val = new JValue();
                if (!this.readValue(val, {})) {
                    return false;
                }
                jval.m_Value[key.asString()] = val;
                this.skipSpaces();
                if (this.m_pCur[0] === ',') {
                    this.m_pCur++;
                    this.skipSpaces();
                }
            }
            this.m_pCur++; // Skip '}'
            return true;
        }
    
        readNumber() {
            this.skipSpaces();  // Bỏ qua các khoảng trắng trước khi bắt đầu đọc số
        
            let start = this.m_pCur;  // Lưu vị trí bắt đầu của chuỗi số
        
            if (this.m_pCur[0] === '-') {
                this.m_pCur++;  // Nếu có dấu âm, bỏ qua dấu trừ
            }
        
            // Đọc các chữ số nguyên trước dấu chấm thập phân
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] >= '0' && this.m_pCur[0] <= '9') {
                this.m_pCur++;
            }
        
            // Kiểm tra nếu có dấu chấm thập phân
            if (this.m_pCur < this.m_pEnd && this.m_pCur[0] === '.') {
                this.m_pCur++;  // Bỏ qua dấu chấm thập phân
        
                // Đọc các chữ số sau dấu chấm thập phân
                while (this.m_pCur < this.m_pEnd && this.m_pCur[0] >= '0' && this.m_pCur[0] <= '9') {
                    this.m_pCur++;
                }
            }
        
            // Kiểm tra nếu có phần mũ (exponent)
            if (this.m_pCur < this.m_pEnd && (this.m_pCur[0] === 'e' || this.m_pCur[0] === 'E')) {
                this.m_pCur++;  // Bỏ qua chữ 'e' hoặc 'E'
        
                // Kiểm tra nếu có dấu âm hoặc dương cho phần mũ
                if (this.m_pCur < this.m_pEnd && (this.m_pCur[0] === '-' || this.m_pCur[0] === '+')) {
                    this.m_pCur++;
                }
        
                // Đọc các chữ số của phần mũ
                while (this.m_pCur < this.m_pEnd && this.m_pCur[0] >= '0' && this.m_pCur[0] <= '9') {
                    this.m_pCur++;
                }
            }
        
            // Trích xuất chuỗi số từ vị trí bắt đầu đến vị trí hiện tại
            let numStr = this.m_pCur.substring(start, this.m_pCur);
        
            // Chuyển đổi chuỗi số thành giá trị số
            let value;
            if (numStr.includes('.') || numStr.includes('e') || numStr.includes('E')) {
                value = parseFloat(numStr);  // Nếu có dấu chấm hoặc mũ, chuyển đổi thành số thực
            } else {
                value = parseInt(numStr, 10);  // Nếu không, chuyển đổi thành số nguyên
            }
        
            // Kiểm tra nếu giá trị không hợp lệ
            if (isNaN(value)) {
                return this.addError("Invalid number format", start);
            }
        
            // Trả về giá trị số đã đọc được
            return value;
        }
    
        readString(jval) {
            this.skipSpaces();  // Bỏ qua các khoảng trắng trước khi bắt đầu đọc chuỗi
        
            if (this.m_pCur >= this.m_pEnd || this.m_pCur[0] !== '"') {
                // Nếu không gặp dấu ngoặc kép mở hoặc đã đến cuối chuỗi, thêm lỗi và trả về false
                return this.addError("Expected '\"' at the beginning of string", this.m_pCur);
            }
        
            this.m_pCur++;  // Bỏ qua dấu ngoặc kép mở để bắt đầu đọc chuỗi
        
            let start = this.m_pCur;  // Lưu vị trí bắt đầu của chuỗi
        
            while (this.m_pCur < this.m_pEnd && this.m_pCur[0] !== '"') {
                if (this.m_pCur[0] === '\\') {  // Kiểm tra ký tự escape
                    this.m_pCur++;  // Bỏ qua ký tự escape và tiếp tục đọc ký tự tiếp theo
                }
                this.m_pCur++;  // Tiếp tục đọc ký tự tiếp theo
            }
        
            if (this.m_pCur >= this.m_pEnd || this.m_pCur[0] !== '"') {
                // Nếu không gặp dấu ngoặc kép đóng hoặc đã đến cuối chuỗi, thêm lỗi và trả về false
                return this.addError("Expected '\"' at the end of string", this.m_pCur);
            }
        
            // Trích xuất chuỗi từ vị trí bắt đầu đến vị trí hiện tại
            let strValue = this.m_pCur.substring(start, this.m_pCur);
        
            // Gán giá trị chuỗi cho jval và thiết lập loại dữ liệu là chuỗi
            jval.m_eType = JValue.TYPE.E_STRING;
            jval.m_Value = this.unescapeString(strValue);  // Xử lý ký tự escape trong chuỗi nếu cần
        
            this.m_pCur++;  // Bỏ qua dấu ngoặc kép đóng
        
            return true;  // Trả về true nếu đọc chuỗi thành công
        }
    
        decodeNumber(token, jval) {
            // Trích xuất chuỗi số từ token
            let numStr = token.pbeg.substring(0, token.pend - token.pbeg);
        
            // Kiểm tra nếu chuỗi số chứa dấu chấm thập phân hoặc mũ (exponent)
            if (numStr.includes('.') || numStr.includes('e') || numStr.includes('E')) {
                // Nếu có dấu chấm thập phân hoặc mũ, chuyển đổi chuỗi thành số thực
                jval.m_eType = JValue.TYPE.E_FLOAT;
                jval.m_Value = parseFloat(numStr);
            } else {
                // Nếu không, chuyển đổi chuỗi thành số nguyên
                jval.m_eType = JValue.TYPE.E_INT;
                jval.m_Value = parseInt(numStr, 10);
            }
        
            // Kiểm tra nếu giá trị số không hợp lệ (NaN)
            if (isNaN(jval.m_Value)) {
                return this.addError("Invalid number format", token.pbeg);
            }
        
            return true;  // Trả về true nếu việc giải mã số thành công
        }
    
        decodeString(token, decoded, filter = true) {
            // Trích xuất chuỗi từ token
            let rawStr = token.pbeg.substring(0, token.pend - token.pbeg);
        
            if (filter) {
                // Nếu cần lọc các ký tự escape
                decoded.value = this.unescapeString(rawStr);
            } else {
                // Nếu không cần lọc, giữ nguyên chuỗi
                decoded.value = rawStr;
            }
        
            return true;  // Trả về true nếu việc giải mã chuỗi thành công
        }
    
        decodeDouble(token, jval) {
            // Trích xuất chuỗi số từ token
            let numStr = token.pbeg.substring(0, token.pend - token.pbeg);
        
            // Chuyển đổi chuỗi thành số thực (double)
            jval.m_eType = JValue.TYPE.E_FLOAT;
            jval.m_Value = parseFloat(numStr);
        
            // Kiểm tra nếu giá trị số không hợp lệ (NaN)
            if (isNaN(jval.m_Value)) {
                return this.addError("Invalid double format", token.pbeg);
            }
        
            return true;  // Trả về true nếu việc giải mã số thực thành công
        }
    
        skipSpaces() {
            while (this.m_pCur < this.m_pEnd && /\s/.test(this.m_pCur[0])) {
                this.m_pCur++;
            }
        }
    
        addError(message, ploc) {
            this.m_strErr = `${message} at ${ploc - this.m_pBeg}`;
            return false;
        }
    
        parseBinary(pbdoc, len, pv) {
            this.m_pCur = pbdoc;  // Đặt con trỏ hiện tại tới đầu dữ liệu nhị phân
            this.m_pEnd = pbdoc + len;  // Đặt con trỏ kết thúc tới cuối dữ liệu nhị phân
        
            // Kiểm tra xem độ dài dữ liệu có đủ để chứa phần header tối thiểu không
            if (len < 8) {
                return this.addError("Binary data too short", this.m_pCur);
            }
        
            // Đọc phần header của dữ liệu nhị phân
            let header = this.m_pCur.substring(0, 8);
            this.m_pCur += 8;
        
            if (header !== "bplist00") {
                return this.addError("Invalid binary plist header", this.m_pCur);
            }
        
            // Đọc trailer ở cuối file để lấy thông tin cần thiết cho việc phân tích
            this.m_pTrailer = this.m_pEnd - 32;
            this.m_uObjects = this.readUInt64(this.m_pTrailer + 16);
            this.m_uOffsetSize = this.readUInt8(this.m_pTrailer + 7);
            this.m_pOffsetTable = this.m_pCur;  // Giả sử offset table nằm sau header
        
            // Đọc dữ liệu nhị phân chính
            return this.readBinaryValue(this.m_pCur, pv);
        }
        
        readUInt64(p) {
            // Chuyển đổi 8 byte thành một giá trị 64-bit unsigned integer
            let high = (p.charCodeAt(0) << 24) | (p.charCodeAt(1) << 16) | (p.charCodeAt(2) << 8) | p.charCodeAt(3);
            let low = (p.charCodeAt(4) << 24) | (p.charCodeAt(5) << 16) | (p.charCodeAt(6) << 8) | p.charCodeAt(7);
            return (high * 0x100000000) + low;  // Kết hợp phần cao và thấp để tạo thành giá trị 64-bit
        }
        
        readUInt8(p) {
            // Đọc 1 byte và chuyển đổi thành một giá trị 8-bit unsigned integer
            return p.charCodeAt(0);
        }
        
        readBinaryValue(pcur, pv) {
            let type = this.readUInt8(pcur);  // Đọc loại dữ liệu từ byte đầu tiên
        
            switch (type) {
                case 0x00:
                    // Trường hợp null hoặc đối tượng rỗng
                    pv.m_eType = JValue.TYPE.E_NULL;
                    pv.m_Value = null;
                    return true;
        
                case 0x01:
                    // Trường hợp boolean false
                    pv.m_eType = JValue.TYPE.E_BOOL;
                    pv.m_Value = false;
                    return true;
        
                case 0x09:
                    // Trường hợp boolean true
                    pv.m_eType = JValue.TYPE.E_BOOL;
                    pv.m_Value = true;
                    return true;
        
                case 0x10:
                    // Trường hợp chuỗi UTF-8
                    let length = this.readUInt8(pcur + 1);  // Đọc độ dài chuỗi
                    pv.m_eType = JValue.TYPE.E_STRING;
                    pv.m_Value = pcur.substring(2, 2 + length);  // Trích xuất chuỗi từ dữ liệu nhị phân
                    return true;
        
                case 0x11:
                    // Trường hợp chuỗi UTF-16 (mỗi ký tự là 2 byte)
                    let utf16Length = this.readUInt8(pcur + 1) * 2;  // Đọc độ dài chuỗi (mỗi ký tự chiếm 2 byte)
                    pv.m_eType = JValue.TYPE.E_STRING;
                    pv.m_Value = '';  // Khởi tạo chuỗi rỗng
                    for (let i = 2; i < 2 + utf16Length; i += 2) {
                        let charCode = (pcur.charCodeAt(i) << 8) | pcur.charCodeAt(i + 1);  // Đọc từng ký tự UTF-16
                        pv.m_Value += String.fromCharCode(charCode);
                    }
                    return true;
        
                case 0x20:
                    // Trường hợp số nguyên 8-bit
                    pv.m_eType = JValue.TYPE.E_INT;
                    pv.m_Value = this.readUInt8(pcur + 1);  // Đọc số nguyên 8-bit
                    return true;
        
                case 0x21:
                    // Trường hợp số nguyên 16-bit
                    pv.m_eType = JValue.TYPE.E_INT;
                    pv.m_Value = this.readUInt16(pcur + 1);  // Đọc số nguyên 16-bit
                    return true;
        
                case 0x22:
                    // Trường hợp số nguyên 32-bit
                    pv.m_eType = JValue.TYPE.E_INT;
                    pv.m_Value = this.readUInt32(pcur + 1);  // Đọc số nguyên 32-bit
                    return true;
        
                case 0x23:
                    // Trường hợp số nguyên 64-bit
                    pv.m_eType = JValue.TYPE.E_INT;
                    pv.m_Value = this.readUInt64(pcur + 1);  // Đọc số nguyên 64-bit
                    return true;
        
                case 0x40:
                    // Trường hợp dữ liệu (data)
                    let dataLength = this.readUInt8(pcur + 1);  // Đọc độ dài dữ liệu
                    pv.m_eType = JValue.TYPE.E_DATA;
                    pv.m_Value = pcur.substring(2, 2 + dataLength);  // Trích xuất dữ liệu nhị phân
                    return true;
        
                case 0x30:
                    // Trường hợp số thực (float)
                    pv.m_eType = JValue.TYPE.E_FLOAT;
                    pv.m_Value = this.readFloat(pcur + 1);  // Đọc số thực (float) 32-bit
                    return true;
        
                case 0x31:
                    // Trường hợp số thực (double)
                    pv.m_eType = JValue.TYPE.E_FLOAT;
                    pv.m_Value = this.readDouble(pcur + 1);  // Đọc số thực (double) 64-bit
                    return true;
        
                case 0x50:
                    // Trường hợp mảng
                    let arraySize = this.readUInt8(pcur + 1);  // Đọc kích thước mảng
                    pv.m_eType = JValue.TYPE.E_ARRAY;
                    pv.m_Value = [];
                    for (let i = 0; i < arraySize; i++) {
                        let element = new JValue();
                        this.readBinaryValue(pcur + 2 + i * this.m_uOffsetSize, element);  // Đọc từng phần tử mảng
                        pv.m_Value.push(element);
                    }
                    return true;
        
                case 0x60:
                    // Trường hợp đối tượng (dictionary)
                    let dictSize = this.readUInt8(pcur + 1);  // Đọc kích thước dictionary
                    pv.m_eType = JValue.TYPE.E_OBJECT;
                    pv.m_Value = {};
                    for (let i = 0; i < dictSize; i++) {
                        let key = new JValue();
                        let value = new JValue();
                        this.readBinaryValue(pcur + 2 + i * 2 * this.m_uOffsetSize, key);  // Đọc khóa
                        this.readBinaryValue(pcur + 2 + (i * 2 + 1) * this.m_uOffsetSize, value);  // Đọc giá trị
                        pv.m_Value[key.asString()] = value;
                    }
                    return true;
        
                // Xử lý các loại dữ liệu khác nếu cần thiết...
        
                default:
                    return this.addError("Unsupported binary data type", pcur);
            }
        }
    
        getUInt24FromBE(v) {
            return (v.charCodeAt(0) << 16) | (v.charCodeAt(1) << 8) | v.charCodeAt(2);
        }
    
        byteConvert(v, size) {
            // Implement byte conversion logic here...
        }
    
        getUIntVal(v, size) {
            let val = 0;
            for (let i = 0; i < size; i++) {
                val = (val << 8) | v.charCodeAt(i);
            }
            return val;
        }
    
        readUIntSize(pcur, size) {
            // Implement read unsigned int size logic here...
            return false;
        }
    
        readBinaryValue(pcur, pv) {
            // Implement binary value reading logic here...
            return false;
        }
    
        readUnicode(pcur, size, pv) {
            pv.m_eType = JValue.TYPE.E_STRING;
            pv.m_Value = pcur.substring(0, size);
            return true;
        }
    
        static XMLUnescape(strval) {
            strval = strval.replace(/&lt;/g, '<');
            strval = strval.replace(/&gt;/g, '>');
            strval = strval.replace(/&amp;/g, '&');
            strval = strval.replace(/&quot;/g, '"');
            strval = strval.replace(/&apos;/g, "'");
            return strval;
        }
    }

    unescapeString(str)
        return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
                  .replace(/\\n/g, '\n')
                  .replace(/\\r/g, '\r')
                  .replace(/\\t/g, '\t')
                  .replace(/\\b/g, '\b')
                  .replace(/\\f/g, '\f')
                  .replace(/\\"/g, '"')
                  .replace(/\\\\/g, '\\');

}
