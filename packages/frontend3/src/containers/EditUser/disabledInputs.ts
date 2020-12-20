export const inputs: {
  label: string;
  name: '_id' | 'googleID' | 'name' | 'email' | 'phone';
  className: string;
}[] = [
  {
    label: 'User ID',
    name: '_id',
    className: 'col-md-3 mb-2',
  },
  {
    label: 'User Google ID',
    name: 'googleID',
    className: 'col-md-3 mb-2',
  },
  {
    label: 'Name',
    name: 'name',
    className: 'col-md-3 mb-2',
  },
  {
    label: 'Email Address',
    name: 'email',
    className: 'col-md-3 mb-2',
  },
  {
    label: 'Phone Number',
    name: 'phone',
    className: 'col-md-4 mb-2',
  },
];
