import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import handlebars from 'handlebars';

type Properties = {
    name: string;
    context: object;
};

const getTemplate = ({ name, context }: Properties): string => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, `../../../templates/${name}.hbs`),
        'utf8',
    );
    const template = handlebars.compile(emailTemplateSource);
    return template(context);
};

export { getTemplate };
