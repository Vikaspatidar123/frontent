/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Id = (cell) => (cell.value ? cell.value : '');

const Name = (cell) => (cell.value ? cell.value : '');

const Code = (cell) => (cell.value ? cell.value : '');

const ExchangeRate = (cell) => (cell.value ? cell.value : '');

const LoyaltyPoints = (cell) => (cell.value ? cell.value : '');

const Type = (cell) => (cell.value ? cell.value : '');

const Primary = (cell) => (cell.value ? cell.value : '');

const Actions = () => <i className="dripicons-dots-3" />;

export { Id, Name, Actions, Code, Type, Primary, LoyaltyPoints, ExchangeRate };
