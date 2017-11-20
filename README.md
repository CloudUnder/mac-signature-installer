# HTML Email Signature Installer for Mail.app (macOS)

[![Build Status](https://travis-ci.org/CloudUnder/mac-signature-installer.svg?branch=master)](https://travis-ci.org/CloudUnder/mac-signature-installer)
[![npm version](https://badge.fury.io/js/mac-signature-installer.svg)](https://badge.fury.io/js/mac-signature-installer)

This repository contains a shell script (Bash), which should make it easier
for Mac users to install custom email signatures in the Mail.app.

Although it is not an app with a fancy UI, it is still much easier to use
than trying to do all steps manually in the Terminal.

This is particularly handy for companies who want to provide their employees
a fairly easy way to install email signatures.

> The script expects that you already have a `.mailsignature` file ready to
be installed. This script does not create or convert the signature itself.

Please be aware that this script has not been tested very much yet and so far
only on macOS 10.12 (Sierra). In theory it should also work for some older
versions. Although the script should be pretty safe to use, use at your
own risk and as always make sure to have a backup of your data. Let us know
if it works for you.


## How it works

The script has a few sanity-checks built in, which, for example, checks the
version of the operating system and if the provided *mailsignature* file
(very) roughly looks like it is one and not something completely else.

It tries to detect the Mail directory used by the Mail.app and should be able
to also recognize if the Mail settings are iCloud-synced.

If everything looks well, the user is instructed to go into the Mail
preferences, create or pick a signature to be replaced and enter the name
into the Terminal window and continue with *Enter*.

The script then tries to find that signature in the settings and will only
proceed if found.

The user is then asked to quit Mail to ensure that changes do not conflict
with the running app. The script will continue automatically as soon as
Mail has terminated.

The script will then override the existing `.mailsignature` file with the
new file provided and the user may open Mail again.


## Usage

### 1. Pass file as an argument

Example:

```shell
./mac-signature-installer.command mysignature.mailsignature
```


### 2. Bake in the signature

Especially for a company-wide email signature roll-out, it may be useful
to prepare or generate a custom script for each employee with their
signature already baked into the script. This makes it even easier as
users can run the installer script by simply double-clicking the
`.command` file.

To embed the signature into the script, insert the signature data between
the two lines containing the string `EndOfStaticRawSignature`.

If a signature is embedded, the filename argument will be ignored.


### 2.1 JavaScript for baking

To generate a copy of the installer script with the signature already baked
in as described, you may find the included JavaScript function useful. The
function is also available as Node.js package via
`npm install mac-signature-installer`.

```js
const macSignatureInstaller = require('mac-signature-installer');
const mailsignature = '...'; // You have to provide this
const shellScript = macSignatureInstaller(mailsignature);
// You may then e.g. write the content (string) to disk.
```


## Change Log

### 0.2.0

- If signature does not contain the `Mime-Version: 1.0` header, the necessary MIME headers will be generated automatically.
- You can now set `FIXED_SIGNATURE_NAME` in the installer script to hard-code a name for the signature. The user will then not be asked to enter the name of the signature.
