const crypto = require('crypto');
const fs = require('fs');

class OpenSSL {
    constructor() {

        this.initOpenSSL();
    }

    initOpenSSL() {

        console.log('OpenSSL initialized.');
    }

    getCertSubjectCN(certData) {
        const cert = crypto.X509Certificate.fromPEM(certData);
        const subjectCN = cert.subject.split('/').find(part => part.startsWith('CN=')).split('=')[1];
        return subjectCN;
    }

    getCMSInfo(cmsData) {

        try {
            const cmsInfo = {}; 
            // CMS parsing logic here...
            console.log('Parsed CMS data:', cmsInfo);
            return cmsInfo;
        } catch (error) {
            console.error('Error parsing CMS data:', error);
            return null;
        }
    }

    getCMSContent(cmsData) {

        try {
            const cmsContent = crypto.CMS.verify(cmsData, null, {
                policies: ['default']
            });
            return cmsContent;
        } catch (error) {
            console.error('Error extracting CMS content:', error);
            return null;
        }
    }

    generateCMS(signerCertFile, signerPKeyFile, cdHashData, cdHashPlist) {
        try {
            const signerCert = fs.readFileSync(signerCertFile);
            const signerPKey = fs.readFileSync(signerPKeyFile);

            const cms = crypto.CMS.sign(signerCert, signerPKey, {
                data: cdHashData,
                detached: true,
                policies: ['default']
            });

            // handling logic
            return cms;
        } catch (error) {
            console.error('Error generating CMS:', error);
            return null;
        }
    }

    signAssetInit(signerCertFile, signerPKeyFile, provisionFile, entitlementsFile, password) {
        try {
            this.m_strProvisionData = fs.readFileSync(provisionFile, 'utf8');
            this.m_strEntitlementsData = fs.readFileSync(entitlementsFile, 'utf8');

            const certData = fs.readFileSync(signerCertFile);
            const keyData = fs.readFileSync(signerPKeyFile);

            this.m_x509Cert = crypto.X509Certificate.fromPEM(certData);
            this.m_evpPKey = crypto.createPrivateKey({ key: keyData, passphrase: password });

            this.m_strSubjectCN = this.getCertSubjectCN(certData);
            this.m_strTeamId = this.m_strSubjectCN;  // Placeholder, modify as needed

            console.log('Signer asset initialized successfully.');
        } catch (error) {
            console.error('Error initializing signer asset:', error);
            return false;
        }
        return true;
    }

    generateAssetCMS(cdHashData, cdHashesPlist, codeDirectorySlotSHA1, altnateCodeDirectorySlot256) {
        return this.generateCMS(this.m_x509Cert, this.m_evpPKey, cdHashData, cdHashesPlist);
    }
}

class ZSignAsset extends OpenSSL {
    constructor() {
        super();
        this.m_strTeamId = '';
        this.m_strSubjectCN = '';
        this.m_strProvisionData = '';
        this.m_strEntitlementsData = '';
        this.m_evpPKey = null;
        this.m_x509Cert = null;
    }

    init(signerCertFile, signerPKeyFile, provisionFile, entitlementsFile, password) {
        return this.signAssetInit(signerCertFile, signerPKeyFile, provisionFile, entitlementsFile, password);
    }

    generateCMS(cdHashData, cdHashesPlist, codeDirectorySlotSHA1, altnateCodeDirectorySlot256) {
        return this.generateAssetCMS(cdHashData, cdHashesPlist, codeDirectorySlotSHA1, altnateCodeDirectorySlot256);
    }
}

module.exports = {
    ZSignAsset
};