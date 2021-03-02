const fs = require('fs');
const path = require('path');

const packagesToPatch = [
  'animated',
  'core',
  'konva',
  'native',
  'shared',
  'three',
  'web',
  'zdog',
];

packagesToPatch.forEach(patchPackage);

function patchPackage(package = '@nivo/line') {
  const packageJsonPath = path.join(
    '..',
    '..',
    'node_modules',
    '@react-spring',
    package,
    'package.json'
  );
  console.log(
    '🚀 ~ file: prebuild.js ~ line 24 ~ patchPackage ~ packageJsonPath',
    packageJsonPath
  );
  try {
    const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    const modifiedPackageJson = packageJson.replace(
      '"sideEffects": false,',
      ''
    );
    fs.writeFileSync(packageJsonPath, modifiedPackageJson, {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.log(
      '🚀 ~ file: prebuild.js ~ line 33 ~ patchPackage ~ error',
      error
    );
  }
}
