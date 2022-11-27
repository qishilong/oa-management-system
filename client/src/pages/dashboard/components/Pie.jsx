import React from 'react';
import ReactEChart from 'echarts-for-react';

const Pie = ({
    title,
    renderList,
    styleData,
    showSidebar = false,
    isEmpty = false,
    isArea = false,
}) => {
    const option = {
        title: { text: title, left: 'left' },
        tooltip: { trigger: 'item' },
        legend: showSidebar && { orient: 'vertical', left: 'left', top: 'center' },
        series: {
            name: title,
            type: 'pie',
            radius: isEmpty ? ['50%', '70%'] : '50%',
            center: ['55%', '55%'],
            data: renderList,
            roseType: isArea && 'area',
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, .0.5)',
                },
                normal: {
                    label: { show: true, formatter: '{b} ({d}%)' },
                    labelLine: { show: true },
                },
            },
        },
    };
    return (
        <div className="staff-amount-container" style={{ ...styleData }}>
            <ReactEChart className="react_for_echarts" option={option} />
        </div>
    );
};

export default Pie;
