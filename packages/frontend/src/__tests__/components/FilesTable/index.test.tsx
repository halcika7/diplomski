import React from 'react';
import { mount } from 'enzyme';

import FilesTable from '@components/UI/FilesTable';

const deleteFiles = jest.fn();
const deleteFile = jest.fn();

const docs = [
  {
    _id: 1,
    binding: '',
    copies: 1,
    name: 'sajojid.pdf',
    pages: 2,
    paper: '',
    path: '',
    price: 2,
    print: 'Black/White',
  },
  {
    _id: 2,
    binding: 'jfojidj',
    copies: 1,
    name: 'sajojid.docx',
    pages: 2,
    paper: '',
    path: '',
    price: 2,
    print: 'Black/White',
  },
];

describe('Testing FilesTable component', () => {
  it('should render FilesTable', () => {
    const component = mount(
      <FilesTable
        documents={docs as any}
        totalPrice={2}
        deleteFile={deleteFile}
        deleteFiles={deleteFiles}
      />
    );

    expect(component.find('h4').length).toBe(1);
    expect(component.find('table').length).toBe(1);

    component.find('.btn-danger').at(0).simulate('click');
    component.find('.btn-danger').at(1).simulate('click');

    component.unmount();
  });

  it('should render FilesTable without delete file button', () => {
    const component = mount(
      <FilesTable
        documents={docs as any}
        totalPrice={2}
        deleteFiles={deleteFiles}
      />
    );

    expect(component.find('h4').length).toBe(1);
    expect(component.find('table').length).toBe(1);

    component.find('.btn-danger').at(0).simulate('click');

    component.unmount();
  });
});
