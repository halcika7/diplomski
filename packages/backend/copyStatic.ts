// eslint-disable-next-line import/no-extraneous-dependencies
import * as shell from 'shelljs';

shell.cp('-R', 'src/public/', 'dist/public/');
