import UserModel from '@model/User';

const users = [
  {
    googleID: 'google',
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
    googleID: 'google',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'worker.haris.beslic@gmail.com',
    role: 'worker',
  },
  {
    googleID: 'google',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'elvedinabeslic@gmail.com',
    role: 'administration',
  },
  {
    googleID: 'google',
    name: 'Haris Beslic',
    picture:
      'https://lh6.googleusercontent.com/-FwUSIsv5swQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsGlmTqN214GHnnbCne1n9WtWuSA/s96-c/photo.jpg',
    facebookLink: '',
    twitterLink: '',
    phone: '',
    blocked: false,
    email: 'haris.beslic@stu.ibu.edu.ba',
    role: 'professor',
  },
];

export const user = () => users.map(user => new UserModel(user).save());

export const findProfessor = () => UserModel.findOne({ role: 'professor' });
