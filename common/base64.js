class Base64 {
    constructor() {
        this.m_arrDec = [];
        this.m_arrEnc = [];
    }

    // Get base64 character from index
    getB64char(nIndex) {
        const szTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        if (nIndex >= 0 && nIndex < 64) {
            return szTable.charAt(nIndex);
        }
        return '=';
    }

    // Get base64 index from character
    getB64Index(ch) {
        if (ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 'A'.charCodeAt(0);
        if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 26;
        if (ch >= '0' && ch <= '9') return ch.charCodeAt(0) - '0'.charCodeAt(0) + 52;
        if (ch === '+') return 62;
        if (ch === '/') return 63;
        return -1;
    }

    // Encode function
    encode(szSrc) {
        if (szSrc.length === 0) {
            return '';
        }

        let p64 = '';
        let len = szSrc.length;
        for (let i = 0; i < len - 2; i += 3) {
            let b0 = szSrc.charCodeAt(i) >> 2;
            let b1 = ((szSrc.charCodeAt(i) & 0x3) << 4) | (szSrc.charCodeAt(i + 1) >> 4);
            let b2 = ((szSrc.charCodeAt(i + 1) & 0xF) << 2) | (szSrc.charCodeAt(i + 2) >> 6);
            let b3 = szSrc.charCodeAt(i + 2) & 0x3F;
            p64 += this.getB64char(b0) + this.getB64char(b1) + this.getB64char(b2) + this.getB64char(b3);
        }

        let remainder = len % 3;
        if (remainder > 0) {
            let b0 = szSrc.charCodeAt(len - remainder) >> 2;
            let b1 = ((szSrc.charCodeAt(len - remainder) & 0x3) << 4);
            p64 += this.getB64char(b0) + this.getB64char(b1) + '=='.slice(0, 3 - remainder);
        }

        return p64;
    }

    // Decode function
    decode(szSrc) {
        let pbuf = '';
        let len = szSrc.length;
        for (let i = 0; i < len; i += 4) {
            let b0 = this.getB64Index(szSrc.charAt(i));
            let b1 = this.getB64Index(szSrc.charAt(i + 1));
            let b2 = this.getB64Index(szSrc.charAt(i + 2));
            let b3 = this.getB64Index(szSrc.charAt(i + 3));

            pbuf += String.fromCharCode((b0 << 2) | (b1 >> 4));
            if (b2 !== -1) pbuf += String.fromCharCode(((b1 & 0xF) << 4) | (b2 >> 2));
            if (b3 !== -1) pbuf += String.fromCharCode(((b2 & 0x3) << 6) | b3);
        }

        return pbuf;
    }
}