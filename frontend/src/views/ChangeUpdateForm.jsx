import React, {useState} from 'react';
import axios from 'axios';

import AuthContext from '../context/AuthContext';

const ChangeUpdateForm = (props) => {
    // 서버에서 저장된 값 (GET /posts/<post_id>/)받아오기 -> input의 value로 자동 보여지게
    // 이미지 위에 띄워주기
    // 수정 후 submit하면 put 요청 보내기 /posts/<post_id>/ -> post의 id값 받아와서 ..
    // 저장된 명함 페이지로 이동
    const getCardDataItem = (e) => {
        e.preventDefault();
        
    }

    return (<></>);
}

export default ChangeUpdateForm;