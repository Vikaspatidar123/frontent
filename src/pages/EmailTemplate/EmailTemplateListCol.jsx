const EmailTemplateId = ({ cell }) => cell.value ?? '';

const Label = ({ cell }) => cell.value ?? '';

const Primary = ({ cell }) => (cell.value ? 'Yes' : 'No');

export { EmailTemplateId, Label, Primary };
