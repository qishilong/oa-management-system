import React from 'react'
import ReactEcharts from "echarts-for-react"

const AgeColumn = ({ renderList, styleData }) => {
    const options = {
        title: { text: "平均年龄" },
        xAxis: { max: Math.ceil(Math.max(...renderList.map(item => item.age))) },
        yAxis: {
            type: "category",
            data: renderList.map(item => item.name),
            inverse: true,
            max: 1
        },
        series: [{
            realTimeSort: true,
            type: "bar",
            data: renderList.map(item => item.age),
            label: {
                show: true,
                position: "top"
            }
        }]
    }
    return (
        <div className="staff-amount-container" style={{ ...styleData }}>
            <ReactEcharts className="react_for_echarts" option={options} />
        </div>
    )
}

export default AgeColumn
