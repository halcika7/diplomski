import UserModel from '@model/User';

const users = [
  {
    googleID: '1',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'harisbeslic32@gmail.com',
    role: 'admin',
  },
  {
    googleID: '2',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'harisbeslic@gmail.com',
    role: 'worker',
  },
  {
    googleID: '3',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'haris2@gmail.com',
    role: 'administration',
  },
  {
    googleID: '4',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'beslic32@gmail.com',
    role: 'professor',
  },
];

export const user = () => users.map(user => new UserModel(user).save());

export const findProfessor = () => UserModel.findOne({ role: 'professor' });
