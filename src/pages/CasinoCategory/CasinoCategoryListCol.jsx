import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const GameCategoryId = (cell) => {
    return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
}
const Email = (cell) => {
    return cell.value ? cell.value : "";
};

const CreatedAt = (cell) => {
    console.log('cell321321123: ', cell);
    return cell.value ? cell.value : "";
};

const UpdatedAt = (cell) => {
    return cell.value ? cell.value : "";
};

const IsActive = (cell) => {
    return cell.value ? 'Active' : "In-Active";
};

const Status = (cell) => {
    switch (cell.value) {
        case "Active":
            return <Badge className="bg-success">Active</Badge>
        case "New":
            return <Badge className="bg-info">New</Badge>
        case "Close":
            return <Badge className="bg-danger">Close</Badge>
    }
};


export {
    GameCategoryId,
    Email,
    Status,
    CreatedAt,
    UpdatedAt,
    IsActive,
};