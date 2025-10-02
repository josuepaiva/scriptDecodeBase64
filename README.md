# Node.js SFTP File Downloader & Decoder

A simple yet robust Node.js script to automatically connect to an SFTP server, download a Base64-encoded file, decode it, and save the result locally. This script is built with modern JavaScript (`async/await`) for clean, readable code.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (v14.x or later recommended)
* npm (usually comes with Node.js)

---

## 🚀 Setup & Installation

Follow these steps to get the project up and running.

### 1. Get the Code
Clone this repository or simply download the `download.js` and `package.json` files into a new project folder.

### 2. Install Dependencies
Navigate to your project directory in the terminal and run the following command to install the required packages (`ssh2` and `dotenv`):

```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env` in the root of your project directory. This file will store your sensitive credentials. Add the following variables, replacing the placeholder values with your own:

```env
# SFTP Server Credentials
SFTP_HOST=your_sftp_server.com
SFTP_PORT=22
SFTP_USER=your_username
SFTP_PHRASE=your_passphrase
```
> **🔐 Security Note:** Remember to add the `.env` file to your `.gitignore` to prevent committing your credentials to version control.

### 4. Configure Script Paths
Open the `index.js` file and update the `remotePath` variable to point to the correct file on your SFTP server.

```javascript
// Path of the file on the remote SFTP server
const remotePath = '/path/on/server/to/your/file.txt';
```

---

## ▶️ Usage

Once the setup is complete, you can run the script with a single command from your project's root directory:

```bash
node index.js
```

The script will connect to the server, download and decode the file, and place the results in the `output` folder. You will see progress logged in your console.

---

## 📂 Project Structure

```
.
├── node_modules/
├── output/                  # Folder for downloaded & decoded files
├── .env                     # Your secret credentials
├── .gitignore               # Ignores .env and node_modules
├── index.js              # The main script
├── package.json             # Project dependencies
└── package-lock.json
```