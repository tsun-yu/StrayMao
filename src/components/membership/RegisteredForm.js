import React, { useState, useEffect } from 'react'
import "../../styles/membership/custom.scss";
import { withRouter } from 'react-router-dom'
import {MEMBER_API_URL} from "../../actions/membership/actionTypes";
import ImageUploading from 'react-images-uploading';

function RegisteredForm(props) {
    const [dataLoading, setDataLoading] = useState(false)
    const [memberName, setMemberName] = useState('')
    const [memberPic, setMemberPic] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [birthday, setBirthday] = useState('')
    const [telephone, setTelephone] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [goAdd , setGoAdd] = useState(true);  //控制可否執行新增

    //預覽上傳照片
    const [file, setFile] = useState(null);
    const fileHandler = event => {
          // console.log(event.target.files[0]);
        let reader = new FileReader();
          reader.onload = function(e) {
            setFile(e.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        };
    
    //檢核密碼及確認密碼
    useEffect(() => {
      const $password2 = document.querySelector("#exampleInputPassword2");
      if(password != password2){
        $password2.style.borderColor = "red";
        $password2.nextElementSibling.innerHTML = "不相符";
        setGoAdd(false);
      }else{
        $password2.style.borderColor = "";
        $password2.nextElementSibling.innerHTML = "";
        setGoAdd(true);
      }
    },[password , password2])

    async function addUserToSever() {
      if(goAdd){
        // 開啟載入指示
        setDataLoading(true)
        
        const newData = { memberName,  memberPic, password, birthday, telephone, mobile, email,  address}
        console.log(newData)
    
        // 連接的伺服器資料網址
        const url = MEMBER_API_URL + '/addMember';
    
        // 注意資料格式要設定，伺服器才知道是json格式
        const request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(newData),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
    
        console.log(JSON.stringify(newData))
    
        const response = await fetch(request)
        const data = await response.json();
    
        console.log('伺服器回傳的json資料', data)
        // 要等驗証過，再設定資料(簡單的直接設定)
    
        //直接在一段x秒關掉指示器
        setTimeout(() => {
          setDataLoading(false)
          alert('喵~ ，您的會員資格已生效 !!')
          props.history.push('/memberInfo')
        }, 500)
      }
    }

    // 一開始就會開始載入資料
    // useEffect(() => {
    //   getUserFromServer(userid)
    // }, [])
  
    // 每次users資料有變動就會X秒後關掉載入指示
    // useEffect(() => {
    //   setTimeout(() => {
    //     setDataLoading(false)
    //   }, 1000)
    // }, [userid])

    const loading = (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
    )
    
    const display = (
        <>
            <div className="RegisteredTopic">註冊會員</div>
            <div className="memberInfoBackground">
                <form className="infoForm RegisteredForm" name="form1" onsubmit="checkForm(); return false;" novalidate>
                    <div className="wrapFlex1">
                        <div className="form-group memberImg">
                            <label for="memberUpLoadImg" >請上傳個人照片</label>
                            <div className="addNew">
                                <div className="viewImg imgCover">
                                    <img src={file} alt={""} />
                                </div>
                                <input type="file" className="upLoadImg" 
                                onChange={fileHandler} 
                                />
                            </div>
                        </div>

                         <div className="wrapFlex2 registeredFlex">
                <div className="form-group fgFlex">
                    <label for="infoInputName"><span class="red-stars">**</span>姓&emsp;&emsp;&emsp;名：</label>
                    <input 
                        type="text" 
                        className="form-control infoInput1" 
                        id="infoInputName" 
                        placeholder="Enter name"
                        value={memberName}
                        onChange={(event) => {
                            setMemberName(event.target.value)
                        }}
                        required/>
                    <small class="form-text error-msg"></small>
                </div>
    
                <div className="form-group fgFlex registeredBirthday">
                    <label for="infoInputBirthday">出生年月日：</label>
                    <input 
                        type="date" 
                        className="form-control infoInput1" 
                        id="infoInputBirthday" 
                        placeholder="Enter birthday"
                        value={birthday}
                        onChange={(event) => {
                            setBirthday(event.target.value)
                        }}
                        />
                </div>
  
                <div className="form-group fgFlex">
                    <label for="infoInputMobile"><span class="red-stars">**</span>行&nbsp;動&nbsp;電&nbsp;話：</label>
                    <input 
                        type="text" 
                        className="form-control infoInput1" 
                        id="infoInputMobile" 
                        placeholder="Enter mobile" 
                        pattern="09\d{2}-?\d{3}-?\d{3}"
                        value={mobile}
                        onChange={(event) => {
                            setMobile(event.target.value)
                        }} 
                        required/>
                    <br/>
                    <small id="mobileHelp" className="form-text text-muted inputTip">請輸入格式09xx-xxx-xxx</small>
                    <small class="form-text error-msg"></small>
                </div>
                <div className="form-group fgFlex">
                    <label for="infoInputTelephone"><span class="red-stars">**</span>連&nbsp;絡&nbsp;電&nbsp;話：</label>
                    <input 
                        type="text" 
                        className="form-control infoInput1" 
                        id="infoInputTelephone" 
                        placeholder="Enter telephone" 
                        pattern="?\d{2}-?\d{4}-?\d{4}"
                        value={telephone}
                        onChange={(event) => {
                            setTelephone(event.target.value)
                        }}
                        />
                    <br/>
                    <small id="mobileHelp" className="form-text text-muted inputTip">請輸入格式xx-xxxx-xxxx</small>
                    <small class="form-text error-msg"></small>
                </div>
            </div>
        </div>

        <div className="wrapFlex2">
            <div className="form-group fgFlex">
                <label for="infoInputEmail1"><span class="red-stars">**</span>電&nbsp;子&nbsp;信&nbsp;箱：</label>
                <input 
                    type="email" 
                    className="form-control infoInput2" 
                    id="infoInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }} 
                    required/>
                <small class="form-text error-msg"></small>
            </div>

            <div className="form-group fgFlex registeredAddress">
                <label for="infoInputAddress">連&nbsp;絡&nbsp;地&nbsp;址：</label>
                <textarea 
                    className="form-control infoInput2" 
                    id="infoInputAddress" 
                    rows="3"
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value)
                    }}
                ></textarea>
            </div>
        </div>

        <div className="wrapFlex3 registeredFlex">
            <div className="form-group fgFlex">
                <label for="exampleInputPassword1"><span class="red-stars">**</span>請輸入密碼：</label>
                <input 
                    type="password" 
                    className="form-control infoInput" 
                    id="exampleInputPassword1" 
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      // checkPassword12();
                    }}
                    required/>
                <br/>
                <small id="mobileHelp" className="form-text text-muted inputTip">請輸入至少6碼英數大小寫</small>
                <small class="form-text error-msg"></small>
            </div>

            <div className="form-group fgFlex registeredPassword">
                <label for="exampleInputPassword1"><span class="red-stars">**</span>再輸入一次密碼：</label>
                <input 
                    type="password" 
                    className="form-control infoInput" 
                    id="exampleInputPassword2" 
                    placeholder="Password Again" 
                    required
                    onChange={(event) => {
                      setPassword2(event.target.value);
                      // checkPassword12();
                    }}
                    />
                <small class="form-text error-msg"></small>
            </div>
        </div>
        <div className="btn-group registeredInfoTop" role="group" aria-label="Basic example">
            <button type="button" 
                    className="btn btn-primary memberBtnLeft"
                    onClick={() => {
                      props.history.push('/homeTest');
                    }}
            >取消註冊&nbsp;&lt;回首頁&gt;</button>
            <button 
                type="button"
                onClick={() => {
                    addUserToSever()
                }} 
                className="btn btn-primary memberBtnRight"
            >確認送出</button>
        </div>
    </form>
</div>
</>
)

return (
  <>
    {/* <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
    /> */}

    {dataLoading ? loading : display}
  </>
)}

export default withRouter(RegisteredForm)