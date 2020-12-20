import { truncText } from '../../helpers/truncText';

describe('Testing truncText helper', () => {
  it('should use first case value.length < 50', () => {
    const text = truncText('123');

    expect(text.length).toBe(3);
  });

  it('should use second case value.length > 50', () => {
    const text = truncText(
      'jdsoijfoijsdfoijsdoifjosifjofndkjsfnsdnfndssfsdnfsiwnsfiviunviqevninefvnefiwnvineifnvinewvinefivniefnvuienfivnewifuvnieunfvinweivninefwivuniefwvinef;vnewinfvewvnofwenovineownvio'
    );

    expect(text.length).toBe(53);
  });
});
