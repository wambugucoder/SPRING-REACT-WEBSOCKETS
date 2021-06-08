import { Input} from 'antd';
import "./login.css";
import React from "react";


function Login({onSearch}){
  const { Search } = Input;
    return(
        <Search className="nametag"
        placeholder="Input Chat UserName"
        allowClear
        enterButton={"Join Chat😊"}
        size="large"
        maxLength={10}
        onSearch={onSearch}
        />
    );

}
export default Login;