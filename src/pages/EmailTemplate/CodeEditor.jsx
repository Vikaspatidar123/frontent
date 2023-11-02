/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { highlight, languages } from 'prismjs';
import { Button } from 'reactstrap';
import uuid from 'react-uuid';
import Editor from 'react-simple-code-editor';
import { CreateDynamicStyles } from './style';
import '../../assets/scss/custom/pages/_cms.scss';

export default function CodeEditor({
	HTML,
	setTemplate,
	dynamicData,
	initial,
	theme,
	resettable,
	height,
	themeTransitionSpeed,
	mobileQuery,
	setRequiredKeyData,
	setFieldValue,
	details = false,
	cmsByPageId,
	disabled,
}) {
	const DynamicStyles = CreateDynamicStyles(themeTransitionSpeed, mobileQuery);

	const _resettable = resettable !== undefined ? resettable : true;

	// save initial state of the editor
	const [_HTML, setHTML] = useState(HTML || '');
	const [_dynamicData, setdynamicData] = useState(dynamicData || '');

	useEffect(() => {
		setTemplate(_HTML);
	}, [_HTML]);

	useEffect(() => {
		setdynamicData(dynamicData);
	}, [dynamicData]);

	// if no default language is passed, set html as visible
	const [selected, setSelected] = useState(initial || 'HTML');

	// generate unique id for this iframe
	const iFrameId = uuid();
	const [iFrame, setIFrame] = useState(null);

	useEffect(() => {
		setHTML(HTML);
		setTemplate(HTML);
		if (document) {
			const frame = document.getElementById(`codepen-iframe-${iFrameId}`)
				.contentWindow.document;

			setIFrame(frame);
			writeInFrame(frame, _HTML, _dynamicData);
		}
		writeInFrame(iFrame, HTML, dynamicData);
	}, [HTML]);

	const resetIFrame = () => {
		const resetButton = document.getElementById(`codepen-reset-${iFrameId}`);

		resetButton.classList.add('codepen-reset-active');
		setTimeout(() => {
			resetButton.classList.remove('codepen-reset-active');
		}, 400);

		setHTML(HTML || '');
		setdynamicData(dynamicData || '');

		writeInFrame(iFrame, HTML, dynamicData);

		checkForUndefined(iFrame);
	};

	const insertDynamicDataInTemplate = (HTML, dynamicData) => {
		let returnEmail = HTML;

		if (dynamicData) {
			try {
				const data = JSON.parse(dynamicData);
				Object.keys(data).forEach((dynamicKey) => {
					const pattern = new RegExp(`{{{ *${dynamicKey} *}}}`, 'g');
					returnEmail = returnEmail.replaceAll(pattern, data[dynamicKey]);
				});
			} catch {
				returnEmail = HTML;
			}
		}
		return returnEmail;
	};

	const checkForUndefined = () => {
		const frame = document.getElementById(`codepen-iframe-${iFrameId}`)
			.contentWindow.document;

		if (frame.body?.innerHTML?.includes('undefined')) {
			frame.body.innerHTML = '';
		}
	};

	const writeInFrame = async (frame, HTML, dynamicData) => {
		if (frame) {
			frame.open();
			const newHTML = await insertDynamicDataInTemplate(HTML, dynamicData);
			frame.writeln(newHTML);
			frame.close();
		}
	};

	const updateTextArea = (type, val) => {
		let tmpHTML = _HTML;
		let tmpDynamacData = _dynamicData;

		if (type === 'HTML') {
			setHTML(val);
			tmpHTML = val;
		} else if (type === 'dynamicData') {
			setdynamicData(val);
			setRequiredKeyData(JSON.parse(val));
			tmpDynamacData = val;
		}

		writeInFrame(iFrame, tmpHTML, tmpDynamacData);
	};

	return (
		<div className="codepen">
			<DynamicStyles />
			<div className="codepen-title-flex td">
				{_resettable && (
					<Button
						type="button"
						to="#"
						className="btn btn-sm btn-soft-primary .btn-rounded"
						onClick={resetIFrame}
					>
						<i className="mdi mdi-reload" id={`codepen-reset-${iFrameId}`} />
					</Button>
				)}
			</div>

			<div style={{ height: height || '350px' }} className="codepen-display td">
				<div className="codepen-editors">
					<div className="codepen-editor-picker td">
						<button
							type="button"
							disabled={details}
							className={`td ${
								selected === 'HTML' ? 'codepen-title-selected ' : ''
							}`}
							onClick={() => setSelected('HTML')}
						>
							HTML
						</button>
						<button
							className={`td ${
								selected === 'dynamicData' ? 'codepen-title-selected ' : ''
							}`}
							type="button"
							disabled={details}
							onClick={() => setSelected('dynamicData')}
						>
							TEST DATA
						</button>
					</div>

					<div
						className={`codepen-editor td ${
							selected === 'HTML' ? '' : 'codepen-editor-inactive'
						}`}
					>
						{selected === 'HTML' && (
							<Editor
								disabled={details || disabled}
								className="textarea-editor"
								value={_HTML}
								onValueChange={(newVal) => updateTextArea('HTML', newVal)}
								highlight={(code) => highlight(code, languages.html, 'html')}
							/>
						)}
					</div>
					<div
						className={`codepen-editor td ${
							selected === 'dynamicData' ? '' : 'codepen-editor-inactive'
						}`}
					>
						{selected === 'dynamicData' && (
							<Editor
								disabled={details || disabled}
								value={_dynamicData}
								onValueChange={(newVal) =>
									updateTextArea('dynamicData', newVal)
								}
								highlight={(code) => highlight(code, languages.js, 'js')}
							/>
						)}
					</div>
				</div>

				<div className="codepen-results td">
					<div className="codepen-results-title td">Results</div>
					<div className="codepen-iframe-container td">
						<iframe
							disabled={details}
							scrolling="yes"
							title="react-codepen-editor"
							marginWidth="0"
							marginHeight="0"
							className="td"
							id={`codepen-iframe-${iFrameId}`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
