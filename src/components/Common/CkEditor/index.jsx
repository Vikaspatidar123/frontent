/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormFeedback, Label } from 'reactstrap';
import { ClassicEditor } from 'ckeditor5';
import { editorConfig } from './constants';
import 'ckeditor5/ckeditor5.css';

const CkEditor = ({
	initialData,
	onChangeHandler,
	label,
	isError,
	errorMsg,
	isRequired,
}) => {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);
	return (
		<div
			className="editor-container editor-container_classic-editor"
			ref={editorContainerRef}
		>
			{label && <Label className="form-label">{label}</Label>}
			{isRequired && label && <span className="text-danger"> *</span>}
			<div ref={editorRef}>
				{isLayoutReady && (
					<CKEditor
						editor={ClassicEditor}
						config={editorConfig}
						data={initialData}
						onChange={(event, editor) => {
							const data = editor.getData();
							onChangeHandler(data);
						}}
					/>
				)}
			</div>
			{isError && errorMsg ? (
				<FormFeedback type="invalid" className="d-block">
					{errorMsg}
				</FormFeedback>
			) : null}
		</div>
	);
};

CkEditor.defaultProps = {
	initialData: '',
	label: '',
	isError: '',
	errorMsg: '',
	isRequired: false,
	onChangeHandler: () => null,
};

CkEditor.propTypes = {
	initialData: PropTypes.string,
	label: PropTypes.string,
	isError: PropTypes.string,
	errorMsg: PropTypes.string,
	isRequired: PropTypes.bool,
	onChangeHandler: PropTypes.func,
};

export default CkEditor;
