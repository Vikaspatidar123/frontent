import { call, put, takeEvery } from 'redux-saga/effects';

// Login Redux States
import { FETCH_DISPUTE_DETAILS, FETCH_DISPUTES_START } from './actionTypes';
import {
	fetchDisputeFail,
	fetchDisputesFail,
	fetchDisputesSuccess,
	fetchDisputeSuccess,
} from './actions';
import { getDisputeDetails, getDisputes } from '../../network/getRequests';

function* fetchDisputes({ payload }) {
	try {
		yield call(getDisputes, payload);
		yield put(
			fetchDisputesSuccess({
				count: 19,
				rows: [
					{
						id: '20',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T07:36:04.847Z',
						updatedAt: '2024-07-15T07:36:04.847Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '19',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:38:44.421Z',
						updatedAt: '2024-07-15T05:38:44.421Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '18',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:19:21.768Z',
						updatedAt: '2024-07-15T05:19:21.768Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '16',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:17:57.546Z',
						updatedAt: '2024-07-15T05:17:57.546Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '15',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:17:57.544Z',
						updatedAt: '2024-07-15T05:17:57.544Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '14',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:17:56.318Z',
						updatedAt: '2024-07-15T05:17:56.318Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '13',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:17:56.315Z',
						updatedAt: '2024-07-15T05:17:56.315Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '12',
						userId: '19',
						subject:
							'I am many issue in playing the casino games and other transactions',
						status: 'pending',
						createdAt: '2024-07-15T05:17:33.969Z',
						updatedAt: '2024-07-15T05:17:33.969Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '11',
						userId: '19',
						subject: 'test ',
						status: 'pending',
						createdAt: '2024-07-15T05:17:33.963Z',
						updatedAt: '2024-07-15T05:17:33.963Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '10',
						userId: '19',
						subject: 'test ',
						status: 'pending',
						createdAt: '2024-07-15T05:17:05.896Z',
						updatedAt: '2024-07-15T05:17:05.896Z',
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
				],
			})
		);
	} catch (error) {
		yield put(fetchDisputesFail(error));
	}
}

function* fetchDisputeDetails({ payload }) {
	try {
		yield call(getDisputeDetails, payload);
		yield put(
			fetchDisputeSuccess({
				id: '18',
				userId: '19',
				subject: 'test ',
				status: 'pending',
				createdAt: '2024-07-15T05:19:21.768Z',
				updatedAt: '2024-07-15T05:19:21.768Z',
				threadMessages: [
					{
						id: '8',
						userId: '19',
						adminId: null,
						threadId: '18',
						content: 'Please deposit 100 RS',
						adminRead: false,
						userRead: false,
						createdAt: '2024-07-15T05:38:39.249Z',
						updatedAt: '2024-07-15T05:38:39.249Z',
						threadAttachements: [
							{
								id: '4',
								messageId: '8',
								filePath:
									'https://gammastack-casino.s3.us-east-1.amazonaws.com/assets/query/18.jpeg',
								createdAt: '2024-07-15T05:38:40.799Z',
								updatedAt: '2024-07-15T05:38:40.799Z',
							},
						],
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '11',
						userId: '17',
						adminId: null,
						threadId: '18',
						content: 'Please deposit 100 RS',
						adminRead: false,
						userRead: false,
						createdAt: '2024-07-15T07:36:19.229Z',
						updatedAt: '2024-07-15T07:36:19.229Z',
						threadAttachements: [],
						user: {
							id: '17',
							username: 'rocio78@hotmail.com',
							email: 'mariasoledad.salcedoarchuleta@gmail.com',
						},
					},
					{
						id: '6',
						userId: '19',
						adminId: null,
						threadId: '18',
						content: 'Please deposit 100 RS',
						adminRead: false,
						userRead: true,
						createdAt: '2024-07-15T05:35:19.830Z',
						updatedAt: '2024-07-15T07:39:33.044Z',
						threadAttachements: [],
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
					{
						id: '1',
						userId: '19',
						adminId: null,
						threadId: '18',
						content: 'Hello I have query',
						adminRead: false,
						userRead: true,
						createdAt: '2024-07-15T05:19:21.777Z',
						updatedAt: '2024-07-15T07:39:41.245Z',
						threadAttachements: [],
						user: {
							id: '19',
							username: 'marcoantonio_arguellosaldivar@yahoo.com',
							email: 'pilar_aguilarsegura@yahoo.com',
						},
					},
				],
			})
		);
	} catch (err) {
		yield put(fetchDisputeFail(err));
	}
}

function* disputesSaga() {
	yield takeEvery(FETCH_DISPUTES_START, fetchDisputes);
	yield takeEvery(FETCH_DISPUTE_DETAILS, fetchDisputeDetails);
}

export default disputesSaga;
