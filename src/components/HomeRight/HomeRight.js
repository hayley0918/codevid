import React from 'react'
import './HomeRight.css'
import Chart from '../Chart/Chart'

class HomeRight extends React.Component{
    constructor(){
        super()
        this.state = {
            chartData: {}
        }
    }

    componentWillMount(){
        this.getChartData()
    }

    getChartData(){
        // ajax calls here
        this.setState({
            chartData: {
				labels: ['1st August', '2nd August', '3rd August'],
				datasets:[
					{
						label: 'cases',
						data: [
							974284,
							739483,
							587685
						],
						backgroundColor:[
							'rgba(255,99,132,0.6)',
							'rgba(255,99,132,0.6)',
							'rgba(255,99,132,0.6)'
						]
					}
				]
			} 
        })
    }

    render(){
        return(
            <div className="HomeRight-container">
                <Chart chartData={this.state.chartData} caseType='Confirmed' legendPosition='top'/>
                <Chart chartData={this.state.chartData} caseType='Active' legendPosition='top'/>
                <Chart chartData={this.state.chartData} caseType='Recovered' legendPosition='top'/>
                <Chart chartData={this.state.chartData} caseType='Deceased' legendPosition='top'/>
            </div>
        )
    }
}

export default HomeRight