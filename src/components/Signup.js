import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import { storage } from '../shared/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Portal from './Portal'


const SignUp = ( {onClose} ) => {

   
    const navigate = useNavigate();

    const profile_ref = React.useRef(null);
    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);
    const pw_check_ref = React.useRef(null);
    const nickname_ref = React.useRef(null);
    const outZone_ref = React.useRef();

    const [profile,setprofile] = React.useState("https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg");
    const [username, setUsername] = React.useState("");
    const [password, setPwd] = React.useState("");
    const [pwdCheck, setPwdCheck] = React.useState("");
    const [nickname, setNickName] = React.useState("");

   

    const UpImageUrl = async (e) => {

        
        const upload_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );

        
        const file_url = await getDownloadURL(upload_file.ref)
        profile_ref.current = { url: file_url };
        setprofile(profile_ref.current.url)
        
    };


    const signupdata = () => {
       
          
        axios({

             method: 'POST',            
             url: "/signup", 
             data:{
                username: username,
                password: password,
                passwordCheck: pwdCheck ,
                nickname: nickname,
                iconUrl: profile,
             },
             baseURL:"url"
         }).then((response) => {
                console.log(response)
            
            alert("회원가입을 축하드립니다!!")
            navigate('/login');

        }).catch((error) => {
            console.log(error)
            alert(error.response.data.message)
        })

    }
    
    const handlerId = (e) => {
        setUsername(e.target.value);
    }

    const handlerPw = (e) => {
        setPwd(e.target.value);
    }


    const handlerNickName = (e) => {
        setNickName(e.target.value);
    }
  
    const handlerPwcheck = (e) => {
        setPwdCheck(e.target.value);
    }
    
 
  
    return (
        <Portal>
            <Container >
        <Background ref ={outZone_ref} onClick={(e)=>{
            if (outZone_ref.current===e.target){
                onClose()
            }
        }}>
        <ModalBlock >
            <LinkContainer>
                이미 회원이신가요? <br />
                <Link to="/login">로그인하러가기</Link>
            </LinkContainer>
            <button onClick={onClose}> X</button>
            
            <Form>
                <Label >
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email"  placeholder="abc@example.com" ref={id_ref} onChange={handlerId} />
                    </div>
                </Label>
                <Label>
                    <span>닉네임</span>
                    <div>
                        <Input type="text" ref={nickname_ref}  onChange={handlerNickName} />
                    </div>
                    <Label>
                        <span>프로필사진</span>
                        <span>
                        <Inlabel htmlFor="files">사진 업로드</Inlabel> 
                        <img style={{width:'256px', height:'156px'}} src={profile} />
                        <Input2 type="file" id="files" ref={profile_ref} onChange={UpImageUrl} /> <br />
                        </span>
                      
                    </Label>
                </Label>
                <Label >
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" ref={pw_ref} onChange={handlerPw} />
                    </div>
                </Label>
                <Label >
                    <span>비밀번호 확인</span>
                    <div>
                        <Input
                            type="password"
                            onChange={handlerPwcheck}
                            ref={pw_check_ref}
                        />
                    </div>

                </Label>
                <Button onClick={signupdata} >회원가입</Button>
            </Form>
          </ModalBlock >
         </Background> 
         </Container>
         </Portal>
    );
}
const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    
`;

const ModalBlock = styled.div`

    position: absolute;
    top: 6.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: white;
    color: black;
    width: 700px;
    box-shadow: 1px 1px 1px 1px gray;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Inlabel =styled.label`
    
`

const Input2=styled.input`
 
`


const Header = styled.header`
  
`;

const Form = styled.div`

`;

const Label = styled.label`
 
`;

const Input = styled.input`
 
`;

const Button = styled.button`

`



export const LinkContainer = styled.p`

`;

export default SignUp