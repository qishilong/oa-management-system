import React from 'react'
import { Table } from "antd";
import { mapData } from "../../../utils/mapData"
import { formatYear } from '../../../utils/dateFormat';

const StaffTable = ({ staffList }) => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'userName',
            align: 'center',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            render: (record) => <span>{mapData.gender[record]}</span>,
            align: 'center',
        },
        {
            title: '年龄',
            dataIndex: 'idNumber',
            align: 'center',
            render: (record) => <span>{formatYear(record, 'age')}</span>,
        },
        {
            title: '籍贯',
            dataIndex: 'hometown',
            align: 'center',
            render: (record) => <span>{record ? record : '---'}</span>,
        },
        {
            title: '联系电话',
            dataIndex: 'mobile',
            align: 'center',
        },
        {
            title: '学历',
            dataIndex: 'education',
            align: 'center',
            render: (record) => <span>{mapData.education[record]}</span>,
        },
        {
            title: '工作年限',
            dataIndex: 'onboardingTime',
            align: 'center',
            render: (record) => (
                <span>
                    {!formatYear(record) ? '今年入职' : formatYear(record) + '年'}
                </span>
            ),
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            align: 'center',
            render: (src) => <img height="50" src={src} alt="" />,
        },
        {
            title: '毕业院校',
            dataIndex: 'graduatedSchool',
            align: 'center',
        },
    ];

    return (
        <Table
            dataSource={staffList}
            columns={columns}
            className="department-staff-list-wrapper"
            pagination={false}
            align="center"
            bordered={true}
            rowKey={record => record._id}
        />
    )
}

export default StaffTable
