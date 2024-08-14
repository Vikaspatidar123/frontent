/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import {
	AccessibilityHelp,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	GeneralHtmlSupport,
	Heading,
	HtmlEmbed,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	Paragraph,
	SelectAll,
	ShowBlocks,
	SimpleUploadAdapter,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Undo,
} from 'ckeditor5';
import CustomUploadAdapter from './CustomUploaderAdapter';

function customUploadAdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
		return new CustomUploadAdapter(loader);
	};
}

export const editorConfig = {
	extraPlugins: [customUploadAdapterPlugin],
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'showBlocks',
			'selectAll',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
			'code',
			'|',
			'link',
			'insertImage',
			'insertTable',
			'codeBlock',
			'htmlEmbed',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'|',
			'accessibilityHelp',
		],
		shouldNotGroupWhenFull: false,
	},
	plugins: [
		AccessibilityHelp,
		Autoformat,
		AutoImage,
		AutoLink,
		Autosave,
		Bold,
		Code,
		CodeBlock,
		Essentials,
		GeneralHtmlSupport,
		Heading,
		HtmlEmbed,
		ImageBlock,
		ImageCaption,
		ImageInline,
		ImageInsert,
		ImageInsertViaUrl,
		ImageResize,
		ImageStyle,
		ImageTextAlternative,
		ImageToolbar,
		ImageUpload,
		Italic,
		Link,
		LinkImage,
		List,
		ListProperties,
		Paragraph,
		SelectAll,
		ShowBlocks,
		SimpleUploadAdapter,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		Undo,
	],
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph',
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1',
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2',
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3',
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4',
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5',
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6',
			},
		],
	},
	htmlSupport: {
		allow: [
			{
				name: /^.*$/,
				styles: true,
				attributes: true,
				classes: true,
			},
		],
	},
	image: {
		toolbar: [
			'toggleImageCaption',
			'imageTextAlternative',
			'|',
			'imageStyle:inline',
			'imageStyle:wrapText',
			'imageStyle:breakText',
			'|',
			'resizeImage',
		],
	},
	// 	initialData: `
	//   <!DOCTYPE html>
	// <html lang="en">

	// <head>
	// <title>Welcome</title>
	// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
	// <link rel="preconnect" href="https://fonts.googleapis.com">
	// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	// <link rel="stylesheet"
	//   href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">
	// <style>
	//   * {
	//     box-sizing: border-box;
	//     padding: 0;
	//     margin: 0;
	//   }
	// </style>
	// </head>

	// <body>
	// <table border="0"
	//   style="width: 600px; background-color: #0B195C; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
	//   <tbody>
	//     <tr>
	//       <td style="padding: 20px;">
	//         <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
	//       </td>
	//     </tr>
	//     <tr>
	//       <td style="text-align: center;">
	//       </td>
	//     </tr>
	//     <tr>
	//       <td style="text-align: center;">
	//         <div style="min-height: 260px; margin-top: 40px; align-items: center; padding: 20px;">
	//           <h6
	//             style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
	//             <span style="color: #68E752; display: block;">Welcome {{{userName}}}</span>
	//           </h6>
	//           <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Hello {{{playerFullName}}}</h3>
	//           <p style="color: #ffffff; letter-spacing: .5px; text-align: left;">Money won is twice as sweet as money
	//             earned. Start your Gambling journey with us and win exciting rewards.</p>
	//           <a style="color: #ffffff;" target="_blank" href={{{siteLoginUrl}}}>
	//             <button type="button"
	//               style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; margin-top: 50px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
	//               Get Started</button></a>
	//         </div>
	//       </td>
	//     </tr>
	//     <tr>
	//       <td style="text-align: center; padding: 15px 20px 15px;">
	//         <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023
	//           {{{siteName}}}</p>
	//       </td>
	//     </tr>
	//   </tbody>
	// </table>
	// </body>

	// </html>

	//   `,
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file',
				},
			},
		},
	},
	list: {
		properties: {
			styles: true,
			startIndex: true,
			reversed: true,
		},
	},
	placeholder: 'Type or paste your content here!',
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties',
		],
	},
};
