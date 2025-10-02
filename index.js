require('dotenv').config();

const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const config = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT || 22,
    username: process.env.SFTP_USER,
    passphrase: process.env.SFTP_PHRASE,
    privateKey: decodePrivateKey(process.env.SFTP_PRIVATE_KEY_PATH)
};

const remotePath = '/channelpartner/professional-services/backup/20250722194948-Lkp_Sequoia_Eligibility_07222025.csv';
const outputDir = path.join(__dirname, 'output');
const localEncodedPath = path.join(outputDir, 'downloaded_encoded_file.csv');
const localDecodedPath = path.join(outputDir, 'final_decoded_file.csv');

function decodePrivateKey(privateKey) {
    const privateKeyBuffer = Buffer.from(privateKey, 'base64');
    const decodedPrivateKey = privateKeyBuffer.toString('ascii');
    return decodedPrivateKey;
}

async function downloadAndDecode() {
    const conn = new Client();

    try {
        console.log(`Connecting to ${config.host}...`);

        await new Promise((resolve, reject) => {
            conn.on('ready', resolve).on('error', reject).connect(config);
        });
        console.log('✅ SSH client connected successfully.');

        const sftp = await new Promise((resolve, reject) => {
            conn.sftp((err, sftp) => {
                if (err) reject(err);
                resolve(sftp);
            });
        });
        console.log('🚀 SFTP session started.');

        console.log(`Downloading file from '${remotePath}'...`);
        await new Promise((resolve, reject) => {
            sftp.fastGet(remotePath, localEncodedPath, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
        console.log(`✅ Successfully downloaded encoded file to '${localEncodedPath}'`);

        console.log('📄 Starting Base64 decoding...');
        const encodedData = await new Promise((resolve, reject) => {
            fs.readFile(localEncodedPath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    reject(err);
                }
                console.log('File contents:', data.slice(0,20));
                resolve(data);
            });
        });
        const decodedData = Buffer.from(encodedData, 'base64');
        fs.writeFileSync(localDecodedPath, decodedData);
        console.log(`✨ Successfully decoded file to '${localDecodedPath}'`);

    } catch (err) {
        console.error('❌ An error occurred:', err.message);
    } finally {
        console.log('🔌 Closing SSH client connection.');
        conn.end();
    }
}

downloadAndDecode();