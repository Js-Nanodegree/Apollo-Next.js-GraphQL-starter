import fs from 'fs';
import ejs from 'ejs-promise';

interface IInput {
  template: string;
  params: any;
}

const renderTemplate = async ({
  template,
  params
}: IInput): Promise<string> => {
  const file = fs.existsSync(template);

  // Throw an error if the file does not exist
  if (!file) {
    throw new Error(`Could not find the ${template} in path ${file}`);
  }

  return await ejs.renderFile(
    template,
    params,
    {},
    (error: Error, result: Promise<string>) => {
      if (error) {
        return error;
      }
      return result
        .then(function(data: string) {
          return data;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
  );
};

export default renderTemplate;
