import React, {useState} from 'react'
import { CreinoxForm, Inputs } from "components";

export default () => {

    const [state, setstate] = useState(843)

    return <>This is my test:<br/>

        <button type="button" onClick={() => {setstate(842)}}>
            
            hi</button>
        <Inputs.MyComboboxAsyncFK
            value = {state}
            inputid="test1"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={{ companyType: 2 }}
        />
       
    </>
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