import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import './index.scss';

interface IState {
    cpuData: number[];
    intervalNum: number;
    activeValue: string;
}

class chart extends React.Component<IState> {
    chartRef: any;
    state = {
        cpuData: [120] as number[],
        intervalNum: -1,
        activeValue: 'cpu'
    };
    componentDidMount() {
        let num = setInterval(() => {
            const { cpuData } = this.state;
            if (cpuData.length > 60) {
                cpuData.pop();
            }
            cpuData.unshift(Math.ceil(Math.random() * 20 + 30));
            this.setState({ cpuData });
        }, 1000);
        this.setState({ intervalNum: num });
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalNum);
    }
    render() {
        const option = this.getOption();
        const { cpuData } = this.state;
        if (this.chartRef) {
            this.chartRef.getEchartsInstance().setOption(option);
        }
        return (
            <React.Fragment>
                <div className='chartContainer'>
                    <ul>
                        <li className='active'>
                            <h5>CPU</h5>
                            <p>{`${cpuData[0]}%`}</p>
                        </li>
                        <li>
                            <h5>内存</h5>
                            <p>12.5/15.9 GB（79%）</p>
                        </li>
                        <li>
                            <h5>磁盘</h5>
                            <p>343G/1.8T（20%）</p>
                        </li>
                        <li>
                            <h5>IO</h5>
                            <p>netIO:0B/0B</p>
                            <p>blockIO:90.9MB/410KB</p>
                        </li>
                    </ul>
                    <ReactEcharts
                        ref={e => {
                            this.chartRef = e;
                        }}
                        option={option}
                        notMerge={false}
                        lazyUpdate={true}
                        style={{ height: '200px', width: '400px' }}
                    />
                </div>
            </React.Fragment>
        );
    }
    getOption = () => {
        // cpu占用率可能超过100%，图中仍然展示100%，但元数据不做修改，因此在option中做遍历处理
        const { cpuData } = this.state;
        let data = cpuData.map((e: any) => {
            if (e > 100) {
                return 100;
            }
            return e;
        });
        const option = {
            title: {
                text: 'CPU使用率',
                show: true,
                top: '13',
                left: 'center'
            },
            xAxis: {
                inverse: true,
                type: 'category',
                // 生成一个长度为61的，默认值为1-61的数组
                // 不能直接用new Array(61).map来遍历赋值，因为这种初始化数组的方式只有长度，是一个不可遍历的对象
                data: Array.apply(null, Array(61)).map((e, i) => i),
                boundaryGap: false,
                axisTick: { show: false },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#1890ff',
                        type: 'solid'
                    }
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: '#1890ff',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    interval: 100000,
                    showMinLabel: true,
                    showMaxLabel: true,
                    textStyle: {
                        color: '#999',
                        fontSize: 12
                    },
                    formatter: (value: any) => {
                        if (parseInt(value) === 0) return value;
                        else return `${value}秒`;
                    }
                }
            },
            yAxis: {
                nameTextStyle: {
                    color: '#999',
                    fontSize: 12
                },
                max: 100,
                type: 'value',
                position: 'right',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#1890ff',
                        type: 'solid'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#f1f1f1',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    interval: 100000,
                    showMinLabel: false,
                    showMaxLabel: true,
                    formatter: '{value}%',
                    textStyle: {
                        color: '#999',
                        fontSize: 12
                    }
                }
            },
            series: [
                {
                    data: data,
                    animation: false,
                    type: 'line',
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            width: 1.5,
                            color: '#1890ff'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: '#1890ff'
                                    },
                                    {
                                        offset: 0.8,
                                        color: '#1890ff'
                                    }
                                ],
                                false
                            ),
                            shadowColor: '#1890ff',
                            shadowBlur: 10,
                            opacity: 0.2
                        }
                    }
                }
            ]
        };
        return option;
    };
}

export default chart;
