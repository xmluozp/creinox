import React, {useState} from 'react'

export default () => {

    return <>This is my test:<br/>
    <FlipImage

        a="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"
        b="https://upload.wikimedia.org/wikipedia/commons/d/d9/Collage_of_Nine_Dogs.jpg"/>
    </>
}


const FlipImage = ({a, b}) => {

    
    const [state, setstate] = React.useState(true)

    const flip = () => {
        setstate(!state)
    }

    const styleFront = {
        transformStyle: 'preserve-3d',
        transform: 'rotateY(180deg)',
        transition: 'transform 0.6s',
    }

    const styleFront2 = {
        transformStyle: 'preserve-3d',
        transform: 'rotateY(0deg)',
        transition: 'transform 0.6s',
    }

    return (<div style={{perspective: 1000}}>
        <img src ={state?a:b} height='400' width='400' onClick={flip} style = {state?styleFront: styleFront2}/>
        </div>
    )

}




// ===========================================
const InjectionTest = () => {

    const [injector, setInjector] = useState(null)

    // 子组件初始化时候会运行这个，往外送一个 injector
    const handleGetInjector = (internalInjector) => {

        // 把接到的injector放在state里备用。
        setInjector(internalInjector);
    }

    // 使用injector
    const testInjection = () => {
        injector("changed1111");
    }

    return <div> 
        <button onClick={testInjection}>往内控件注入state</button> 
        <br/>
        <InjectionTestInner onGetInjector={handleGetInjector}/>
    
    </div>
}

class InjectionTestInner extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            test1: "notchange1",
            test2: "notchange2",
        }
    }

    componentDidMount() {

        const {onGetInjector} = this.props;

        // 往外传递injector。这里function要多套一层不然state里存的会是return不是function
        onGetInjector(()=>(newValue)=>{this.setState({test1: newValue})});
    }

    render() {
        return <>
            {this.state.test1}
            {this.state.test2}
        </>
    }

}