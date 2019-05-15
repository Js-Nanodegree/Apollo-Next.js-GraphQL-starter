import path from 'path';
import renderTemplate from '../helpers/renderTemplate';

describe('Render template helper', () => {
  it('should return html', async () => {
    /*
     * Send the full template path to the template to make it independant of file location or directory structure
     */
    const template = path.join(__dirname, '../templates/test.template.ejs');

    const params = {};

    const result = await renderTemplate({ template, params });

    expect(typeof result).toBe('string');
  });

  it('should throw for invalid file location', async () => {
    /*
     * Send the full template path to the template to make it independant of file location or directory structure
     */
    const template = path.join(
      __dirname,
      '../templates/does-not-exist.template.ejs'
    );

    const params = {};

    expect(renderTemplate({ template, params })).rejects.toThrow();
  });
});
