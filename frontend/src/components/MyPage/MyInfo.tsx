import { Avatar, FormHelperText, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store";
import { palette } from "../../styles/palette";
import { api } from "../../utils/api";
import InputPassword from "../account/InputPassword";
import InputWithChannelOut from "../account/InputWithChannelOut";
import InputWithPhone from "../account/InputWithPhone";
import { ButtonBlue } from "../ButtonStyled";
import InputWithLabel from "../InputWithLabel";
import Modal from "../Modal";
import SnacbarTell from "../SnacbarTell";

interface MyInfoData {
  userName: string;
  email: string;
  birth: string;
  phone: string;
}

function MyPage() {
  const navigate = useNavigate();

  // 데이터 받아오기
  const { userName } = useSelector((state: RootState) => state.userInfo);
  const { id } = useSelector((state: RootState) => state.userInfo);
  const { departName } = useSelector((state: RootState) => state.depart);

  const [mydataInfo, setMydataInfo] = useState<MyInfoData>({
    userName: "",
    email: "",
    birth: "",
    phone: "",
  });

  useEffect(() => {
    console.log(id);
    api
      .get(`/user/${id}`)
      .then(function (response) {
        console.log("성공", response);
        setMydataInfo({
          ...mydataInfo,
          userName: response.data.userName,
          email: response.data.email,
          birth: response.data.birth,
          phone: response.data.phone,
        });
        setName(userName);
        setEmail(response.data.email);
        setBirth(response.data.birth);
        setPhoneNumber(response.data.phone);
      })
      .catch(function (error) {
        console.log("에러발생 : " + error);
      });
  }, []);

  // 모달 보이기 여부
  // 회원 탈퇴 모달
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // 채널 나가기 모달
  const [isChannelOUtModal, setChannelOUtModal] = useState<boolean>(false);

  // 수정하기 눌렀나
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 회원정보 수정 알림
  const [openEdit, setEditOpen] = useState(false);
  const [openNoEdit, setNoEditOpen] = useState(false);

  const InfoSubmit = async (e: any) => {
    e.preventDefault();
    await api
      .put("/user/updateUser", {
        userId: id,
        password: password,
        userName: name,
        email: email,
        birth: birthState,
        phone: phoneNumber,
      })
      .then(function (response) {
        setEditOpen(true);
        setIsEdit(false);
        console.log("response:", response);
      })
      .catch(function (error) {
        setNoEditOpen(true);
        console.log("Error", error);
      });
  };

  // 데이터 수정하기
  //이름, 아이디, 비밀번호, 비밀번호 확인, 생일, 이메일, 폰번호
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [birthState, setBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  //const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>("");

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(true);

  // 수정 정규식
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const regex = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ][^0-9\s/g]{1,24}$/;
    if (!regex.test(e.target.value)) {
      setNameMessage(
        "영어와 한글을 조합한 2글자 이상 24글자 미만으로 입력해주세요."
      );
      setIsName(false);
    } else setIsName(true);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\~!@#$%^&*])[^\s]{6,12}$/;
    if (!regex.test(e.target.value)) {
      setPasswordMessage(
        "영어 대문자, 영어 소문자, 숫자, 특수문자 각 1개 이상을 포함한 비밀번호 6~12자만 가능합니다."
      );
      setIsPassword(false);
    } else setIsPassword(true);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (password != e.target.value) {
      setPasswordConfirmMessage("위에 입력한 비밀번호와 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else setIsPasswordConfirm(true);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex =
      /^[0-9a-zA-Z]([_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setEmail(e.target.value);
    if (!regex.test(e.target.value)) {
      setEmailMessage("이메일 형식이 아닙니다");
      setIsEmail(false);
    } else setIsEmail(true);
  };

  const onChangePhonNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPhoneNumber(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(e.target.value);
  };

  // 탈퇴
  const [openOut, setOpenOut] = useState(false);

  const userOut = async (e: any) => {
    e.preventDefault();
    await api
      .put(`/user/delete/${id}`)
      .then(function (response) {
        console.log("response:", response);
        navigate("/");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  return (
    <Main>
      <SnacbarTell
        open={openEdit}
        setOpen={setEditOpen}
        message="회원정보가 수정 되었습니다."
        type="success"
      />
      <SnacbarTell
        open={openNoEdit}
        setOpen={setNoEditOpen}
        message="회원정보 수정에 실패했습니다."
        type="error"
      />
      {!isEdit ? (
        <>
          <Content>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                bgcolor: palette.yellow_3,
                marginBottom: 6,
                fontSize: 40,
              }}
            >
              {userName}
            </Avatar>
            <Grid>
              <SpanStyle>Name</SpanStyle>
              <InputWithLabel
                disabled
                name={""}
                placeholder={""}
                value={userName}
              />

              <SpanStyle>ID</SpanStyle>
              <InputWithLabel disabled name={""} placeholder={""} value={id} />

              <SpanStyle>Email</SpanStyle>
              <InputWithLabel
                disabled
                name={""}
                placeholder={""}
                value={mydataInfo.email}
              />

              <SpanStyle>Channel</SpanStyle>
              <InputWithLabel
                disabled
                name={""}
                placeholder={""}
                value={departName}
              />
            </Grid>
            <UserEdit onClick={() => setIsEdit(true)}>회원정보수정</UserEdit>
          </Content>
          <MemberWithdrawal onClick={() => setOpenModal(true)}>
            회원탈퇴
          </MemberWithdrawal>
        </>
      ) : (
        <Content>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              bgcolor: palette.yellow_3,
              marginBottom: 6,
              fontSize: 40,
            }}
          >
            {userName}
          </Avatar>
          <StyledPage>
            <div>
              <SetGrid>
                <SpanStyle>Name</SpanStyle>
                <InputWithLabel
                  name={"name"}
                  placeholder={userName}
                  value={name}
                  onChange={onChangeName}
                />
                <SpanStyle>ID</SpanStyle>
                <InputWithLabel
                  disabled
                  name={"id"}
                  placeholder={"ID"}
                  value={id}
                />
                <SpanStyle>Password</SpanStyle>
                <InputPassword
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={onChangePassword}
                />
                <SpanStyle>Password 확인</SpanStyle>
                <InputWithLabel
                  name="password2"
                  placeholder="비밀번호 확인"
                  type="password"
                  value={passwordConfirm}
                  onChange={onChangePasswordConfirm}
                />
              </SetGrid>
            </div>
            <Vline />
            <div>
              <SetGrid>
                <SpanStyle>Birth</SpanStyle>
                <InputWithLabel
                  name={""}
                  placeholder={mydataInfo.birth.replace(
                    /(\d{4})(\d{2})(\d{2})/,
                    "$1-$2-$3"
                  )}
                  value={birthState.replace(
                    /(\d{4})(\d{2})(\d{2})/,
                    "$1-$2-$3"
                  )}
                  onChange={onChangeBirth}
                />

                <SpanStyle>Email</SpanStyle>
                <InputWithLabel
                  name="email"
                  placeholder="이메일"
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                />
                <SpanStyle>Channel</SpanStyle>
                <InputWithChannelOut
                  disabled
                  name={""}
                  placeholder={""}
                  value={departName}
                  onClick={() => setChannelOUtModal(true)}
                />

                <SpanStyle>Phone</SpanStyle>
              </SetGrid>
            </div>
          </StyledPage>
          <InputWithPhone_Phone>
            <InputWithPhone
              name="phoneNumber"
              placeholder={mydataInfo.phone}
              phonNumber={phoneNumber}
              onChange={onChangePhonNumber}
              isCertifiedSuccess={setIsPhoneNumber}
            />
          </InputWithPhone_Phone>
          <NameHelperText>
            {name.length > 0 && !isName && (
              <FormHelperText disabled variant="filled">
                {nameMessage}{" "}
              </FormHelperText>
            )}
          </NameHelperText>
          <PwHelperText>
            {password.length > 0 && !isPassword && (
              <FormHelperText disabled variant="filled">
                {passwordMessage}
              </FormHelperText>
            )}
          </PwHelperText>
          <PwCheckHelperText>
            {passwordConfirm.length > 0 && !isPasswordConfirm && (
              <FormHelperText disabled variant="filled">
                {passwordConfirmMessage}
              </FormHelperText>
            )}
          </PwCheckHelperText>
          <EmailHelperText>
            {email.length > 0 && !isEmail && (
              <FormHelperText disabled variant="filled">
                {emailMessage}
              </FormHelperText>
            )}
          </EmailHelperText>
          <UserEdit onClick={InfoSubmit}
          disabled={
                !(
                  (
                    isName &&
                    isPassword &&
                    isPasswordConfirm &&
                    isEmail &&
                    isPhoneNumber
                  )
                )
              }
            >
              저장하기
            </UserEdit>
            {!(
              (
                isName &&
                isPassword &&
                isPasswordConfirm &&
                isEmail &&
                isPhoneNumber
              )
            ) && (
              <p style={{ color: `${palette.red}` }}>
                정보를 수정하려면 올바르게 입력해주세요.
              </p>
            )}
        </Content>
      )}
      {isOpenModal && (
        <Modal onClickToggleModal={() => setOpenModal(false)}>
          <p>정말로 탈퇴하시겠습니까?</p>
          <p>
            탈퇴시 관련 데이터들이 삭제 됩니다.
            <br />
            재가입시 데이터를 복구 할 수 없습니다.
          </p>
          <div>
            <button>아니오</button>
            <button onClick={userOut}>탈퇴</button>
          </div>
        </Modal>
      )}
      {isChannelOUtModal && (
        <Modal
          width="500px"
          onClickToggleModal={() => setChannelOUtModal(false)}
        >
          <span>채널 나가기 안내</span>
          <p>정말로 채널을 나가시겠습니까?</p>
          <div>
            <button>채널 나가기</button>
          </div>
        </Modal>
      )}
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  margin-top: 50px;
  transform: translate(-50%);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 115px 300px;
  grid-template-rows: minmax(1fr, auto);
  row-gap: 40px;
  column-gap: 30px;
  align-items: stretch;
`;

const SetGrid = styled.div`
  display: grid;
  grid-template-columns: 115px 300px;
  grid-template-rows: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 40px;
  align-items: stretch;
`;

const SpanStyle = styled.span`
  padding: 12px 0px;
  width: 100%;
  height: 18px;
  border-radius: 8px;
  font-weight: bold;
  background: ${palette.blue_1};
  color: black;
  border: 0px solid;
  font-size: 0.9rem;
  text-align: center;
`;

const InputWithPhone_Phone = styled.div`
  width: 300px;
  position: absolute;
  right: 0%;
  margin-top: 440px;
`;

const NameHelperText = styled.span`
  width: 320px;
  position: absolute;
  left: 14.2%;
  margin-top: 237px;
`;

const PwHelperText = styled.span`
  width: 300px;
  position: absolute;
  left: 14.2%;
  margin-top: 402px;
`;

const PwCheckHelperText = styled.span`
  width: 300px;
  position: absolute;
  left: 14.2%;
  margin-top: 486px;
`;

const EmailHelperText = styled.span`
  width: 300px;
  position: absolute;
  right: 0.5%;
  margin-top: 322.5px;
`;

const MemberWithdrawal = styled.button`
  background: ${palette.pink_1};
  color: ${palette.red};
  font-size: 0.8rem;
  border-radius: 1rem;
  border: 0px solid;
  padding: 0.5rem 1.2rem;
  font-weight: bold;

  position: absolute;
  right: 2%;
  margin-top: 730px;

  cursor: pointer;
  &:active,
  &:hover {
    filter: brightness(90%);
    background: ${palette.pink_1};
  }
`;

const UserEdit = styled(ButtonBlue)`
  font-size: 0.8rem;
  padding: 0.8rem 1.2rem;
  margin-top: 80px;
`;

const StyledPage = styled.div`
  display: flex;
  column-gap: 50px;
  height: 330px;
`;

const Vline = styled.div`
  border-left: 1px dashed ${palette.gray_3};
  height: 100%;
`;

export default MyPage;
