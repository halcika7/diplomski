import Paper from '@model/Paper';

const papers = [
  {
    name: 'A0',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A1',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A2',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A3',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A4',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A5',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A6',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A7',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A8',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A9',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'A10',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B0',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B1',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B1+',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B2',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B2+',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B3',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B4',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B5',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B6',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B7',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B8',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B9',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'B10',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C0',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C1',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C2',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C3',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C4',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C5',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C6',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C7',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C8',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C9',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
  {
    name: 'C10',
    blackWhitePrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    colorPrinting: {
      upTo250: 0.8,
      from250upTo500: 0.5,
      from500upTo1000: 0.4,
      from1000: 0.2,
    },
    available: true,
  },
];

export const paper = () => papers.map(paper => new Paper(paper).save());
