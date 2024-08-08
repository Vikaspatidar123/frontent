const EmailTemplateId = ({ value }) => value ?? '';

const Label = ({ value }) => value ?? '';

const Primary = ({ value }) => (value ? 'Yes' : 'No');

export { EmailTemplateId, Label, Primary };
