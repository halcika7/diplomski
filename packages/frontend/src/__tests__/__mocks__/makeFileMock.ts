export class MockFile {
  create(mimeType = 'plain/txt') {
    const name = 'mock.txt';
    const size = 1024;

    function range(count: number) {
      let output = '';
      for (let i = 0; i < count; i += 1) {
        output += 'a';
      }
      return output;
    }

    const blob = new Blob([range(size)], { type: mimeType }) as any;
    blob.lastModifiedDate = new Date();
    blob.name = name;

    return blob;
  }
}
