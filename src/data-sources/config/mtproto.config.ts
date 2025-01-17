import * as path from 'node:path';

const MTProto = require('@mtproto/core');

export const mtproto = new MTProto({
  api_id: '12512524125',
  api_hash: 'sadgsdgt23512a1a2a243q242aq4',
  storageOptions: {
    path: path.resolve(__dirname, '../../data/mtproto_session.json'),
  },
});

export const authenticate = async () => {
  try {
    const { phone_code_hash } = await mtproto.call('auth.sendCode', {
      phone_number: '+380662281488',
      settings: {
        _: 'codeSettings',
      },
    });

    console.log('Phone code hash:', phone_code_hash);

    const code = '12345';
    const signInResult = await mtproto.call('auth.signIn', {
      phone_number: '+380662281488',
      phone_code_hash,
      phone_code: code,
    });

    console.log('SignIn Result:', signInResult);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

