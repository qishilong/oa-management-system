import React from 'react'
import EchartsReact from "echarts-for-react";
import { dateFormat } from "utils/dateFormat"

const ViolationChart = ({ title, renderList }) => {
    const xData = renderList.xData.map(item => dateFormat(item))
    const option = {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        yAxis: [{ type: 'value', minInterval: 1 }], // minInterVal  展示整数
        xAxis: [
            {
                type: 'category',
                data: xData,
            },
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                left: '9%',
                bottom: 0,
                start: 0,
                end: 60,
            },
        ],
        series: [
            {
                name: title + '人数',
                type: 'bar',
                data: renderList.yData,
                label: {
                    show: true,
                    precision: 1,
                    position: 'top',
                    valueAnimation: true,
                },
            },
        ],
    }

    return (
        <div className="block-container">
            <EchartsReact
                className='react_for_echarts'
                style={{ width: "100%", height: "100%" }}
                option={option}
            />
        </div>
    )
}

export default ViolationChart
