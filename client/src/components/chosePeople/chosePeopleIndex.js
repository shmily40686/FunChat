import React from "react";
import { withRouter } from 'react-router';
import './ChosePeopleIndex.css';

class ChosePeopleIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: "",
            active: ""
        }
        this.toggleOpen = this.toggleOpen.bind(this)
    }

    toggleOpen(e) {

        const index = e.currentTarget.dataset.index;
        const ele = this[`panel${index}`];
        ele.classList.toggle('open')
        ele.classList.toggle('open-active')
        const panels = document.querySelectorAll('.panel');
        panels.forEach((panel) => {
            if(panel.dataset.index !== index) {
                panel.classList.remove('open')
                panel.classList.remove('open-active')
            }
        })
    }

    

    render() {
        return (
            <div>
                <div className="ChosePeopleIndex">
                    <div className={`panel panel5`} ref={el => this.panel5 = el} onClick={(e) => this.toggleOpen(e)} data-index="5">
                       <p>hello</p>
                       <p>English</p>
                       <p className="description"><button onClick={() => this.props.history.push("/select")}>SELECT</button>English is a West Germanic language that was first spoken in Anglo-Saxon England in the early Middle Ages. It is spoken in many countries around the world.</p>
                   </div>
                    <div className={`panel panel1`} ref={el => this.panel1 = el} onClick={(e) => this.toggleOpen(e)} data-index="1">
                        <p>你好</p>
                        <p>Mandarin</p>
                        <p className="description"><button onClick={() => this.props.history.push("/select")}>SELECT</button>Mandarin is by far the largest of the seven or ten Chinese dialect groups, spoken by 70 percent of all Chinese speakers over a large geographical area</p>
                    </div>
                    <div className={`panel panel2`} ref={el => this.panel2 = el} onClick={(e) => this.toggleOpen(e)} data-index="2">
                        <p>hola</p>
                        <p>Spanish</p>
                        <p className="description"><button onClick={() => this.props.history.push("/select")}>SELECT</button>Spanish is a part of the Ibero-Romance group of languages, which evolved from several dialects of Vulgar Latin in Iberia after the collapse of the Western Roman Empire in the 5th century.</p>
                    </div>
                    <div className={`panel panel3`} ref={el => this.panel3 = el} onClick={(e) => this.toggleOpen(e)} data-index="3">
                        <p>こんにちは</p>
                        <p>Japanese</p>
                        <p className="description"><button onClick={() => this.props.history.push("/select")}>SELECT</button>Japanese is an agglutinative, mora-timed language with simple phonotactics, a pure vowel system, phonemic vowel and consonant length, and a lexically significant pitch-accent.</p>
                    </div>
                    <div className={`panel panel4`} ref={el => this.panel4 = el} onClick={(e) => this.toggleOpen(e)} data-index="4">
                        <p>Hallo</p>
                        <p>German</p>
                        <p className="description"><button onClick={() => this.props.history.push("/select")}>SELECT</button>German is a West Germanic language that is mainly spoken in Central Europe. It is the most widely spoken and official or co-official language in Germany, Austria, Switzerland, South Tyrol in Italy, the German-speaking Community of Belgium and Liechtenstein.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ChosePeopleIndex)