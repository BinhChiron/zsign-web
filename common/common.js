function isRegularFile(filePath) {
    const fs = require('fs');
    try {
        const stats = fs.statSync(filePath);
        return stats.isFile();
    } catch (e) {
        return false;
    }
}

function mapFile(filePath, offset = 0, size = null, ro = true) {
    const fs = require('fs');
    const fd = fs.openSync(filePath, ro ? 'r' : 'r+');
    const bufferSize = size || fs.statSync(filePath).size;

    const buffer = Buffer.alloc(bufferSize);
    fs.readSync(fd, buffer, 0, bufferSize, offset);
    fs.closeSync(fd);

    return buffer;
}

function writeFile(filePath, data) {
    const fs = require('fs');
    try {
        fs.writeFileSync(filePath, data);
        return true;
    } catch (e) {
        return false;
    }
}

function appendFile(filePath, data) {
    const fs = require('fs');
    try {
        fs.appendFileSync(filePath, data);
        return true;
    } catch (e) {
        return false;
    }
}

function readFile(filePath) {
    const fs = require('fs');
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        return null;
    }
}

function createFolder(folderPath) {
    const fs = require('fs');
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        return true;
    } catch (e) {
        return false;
    }
}

function removeFile(filePath) {
    const fs = require('fs');
    try {
        fs.unlinkSync(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

function removeFolder(folderPath) {
    const fs = require('fs');
    try {
        fs.rmdirSync(folderPath, { recursive: true });
        return true;
    } catch (e) {
        return false;
    }
}

function isFileExists(filePath) {
    const fs = require('fs');
    return fs.existsSync(filePath);
}

function getFileSize(filePath) {
    const fs = require('fs');
    try {
        const stats = fs.statSync(filePath);
        return stats.size;
    } catch (e) {
        return -1;
    }
}

function swap16(val) {
    return ((val & 0xFF) << 8) | ((val >> 8) & 0xFF);
}

function swap32(val) {
    return ((val & 0xFF) << 24) | ((val >> 8) & 0xFF) << 16 | ((val >> 16) & 0xFF) << 8 | ((val >> 24) & 0xFF);
}

function swap64(val) {
    const lo = swap32(val & 0xFFFFFFFF);
    const hi = swap32(val >> 32);
    return (BigInt(lo) << 32n) | BigInt(hi);
}

module.exports = {
    isRegularFile,
    mapFile,
    writeFile,
    appendFile,
    readFile,
    createFolder,
    removeFile,
    removeFolder,
    isFileExists,
    getFileSize,
    swap16,
    swap32,
    swap64
};
