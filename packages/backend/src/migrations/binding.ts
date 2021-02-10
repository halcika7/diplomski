import Binding from '@model/Binding';

const bindings = [
  {
    name: 'Wire',
    upTo25: 0.33,
    from25upTo50: 0.23,
    from50upTo100: 0.4,
    from100upTo150: 0.3,
    available: true,
  },
  {
    name: 'Soft',
    upTo25: 1.3,
    from25upTo50: 0.5,
    from50upTo100: 0.4,
    from100upTo150: 0.3,
    available: true,
  },
];

export const binding = () => bindings.map(b => new Binding(b).save());
