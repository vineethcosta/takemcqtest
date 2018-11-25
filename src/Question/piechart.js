import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

 class Piechart extends Component{

    render(){
        
       const x=this.props.correct;
       const y=this.props.wrong;
        const data = {
            labels: [
              'Wrong',
              'Correct',
              
            ],
            datasets: [{
              data: [y,x],
              backgroundColor: [
              '#cd0000',
              '#008000',
              
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#006400',
              
              ]
            }]
        };
            const options = {
                maintainAspectRatio: false,
                responsive: false,
                legend: {
                  position: 'left',
                  labels: {
                    boxWidth: 10
                  }
                }
              }
         
        return(<div>
            <Pie 
            data={data}
            options={{
              options
            
        
            }}
            />
            </div>
        );
    }
}
 
export default  Piechart;